import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import styles from '../styles/login.module.scss';

//const API_BASE_URL = 'http://localhost:5000/';
//const API_BASE_URL = '/';
const API_BASE_URL = "https://kleta-star-wars.herokuapp.com/";
 
const Login = ({ register }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState({message: '', statusCode: 200});
	const [showError, setShowError] = useState(false);
	const [registerUsername, setRegisterUsername] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [loginUsername, setLoginUsername] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [showRegisterOption, setShowRegisterOption] = useState(register);
	const [userContext, setUserContext] = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		handleShowError();
	}, [error]);

	// Create new user
	const registerUser = async () => {
		try{
			const resp = await axios.post(`${API_BASE_URL+"register"}`, {
				username: registerUsername,
				password: registerPassword
			}, { withCredentials: true });
			setIsSubmitting(false);
			setShowRegisterOption("false");
			navigate("/login");
		} catch(err){
			setIsSubmitting(false);
			console.error(err);
		}
	};
	
	// Login existing user
	const loginUser = async () => {
		try{
			const resp = await axios.post(`${API_BASE_URL+"login"}`, {
				username: loginUsername,
				password: loginPassword
			}, { withCredentials: true });
			setIsSubmitting(false);
			setUserContext(oldValues => {
				return { ...oldValues, token:  resp.data.token }
			});
			try {
				window.localStorage.setItem("token",  resp.data.token);
			} catch (e) {
				console.error("Error in storing token in local storage")
			}
			if(resp.status === 200){
				setError({message: "User login successful", statusCode: 200}); //this actually is no error
				navigate("/home");
			}
		} catch(err){
			setError({message: err.response.data, statusCode: err.response.status});
			setIsSubmitting(false);
			console.error(err);
		}
	};

	const handleShowError = () => {
		if(!isSubmitting && error.statusCode !== 200){
			setShowError(true);
		}else if(!isSubmitting && error.statusCode === 200){
			setShowError(false);
		}
	};

	const handleSubmit = (e, process) => {
		e.preventDefault();
		setIsSubmitting(true);
		if(showRegisterOption){
			if(registerUsername.length > 0 && registerPassword.length > 0){
				registerUser();
				setRegisterUsername("");
				setRegisterPassword("");
			}
		}
		if(!showRegisterOption){
			if(loginUsername.length > 0 && loginPassword.length > 0){
				loginUser();
				handleShowError();
				setLoginUsername("");
				setLoginPassword("");
			}
		}
	};

	return (
		<div className={styles["container"]}>
			<div className={styles["formContainer"]}>
				<form>
					<h1>{showRegisterOption ? "Register" : "Login"}</h1>
					{showError && 
						<p className={styles["error"]}>{error.message}</p>
					}
					<input
						placeholder="Username"
						value={showRegisterOption ? registerUsername : loginUsername}
						onChange={(e) => {!showRegisterOption ? setLoginUsername(e.target.value) : setRegisterUsername(e.target.value)}}
					/>
					<input
						placeholder="Password"
						type={"password"}
						value={showRegisterOption ? registerPassword : loginPassword}
						onChange={(e) => {!showRegisterOption ? setLoginPassword(e.target.value) : setRegisterPassword(e.target.value)}}
					/>
					<button onClick={handleSubmit} disabled={isSubmitting ? true : false}>Submit</button>
					{!showRegisterOption ?
						<p className={styles["notRegistered"]}>Not registered? <span onClick={(e) => setShowRegisterOption(!showRegisterOption)}>Sign up</span></p>
						:
						<p className={styles["notRegistered"]}>Already have an account? <span onClick={(e) => setShowRegisterOption(!showRegisterOption)}>Login</span></p>
					}
				</form>
			</div>
		</div>
	);
}
 
export default Login;
