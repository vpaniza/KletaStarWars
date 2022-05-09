import React, { useState } from "react";

const UserContext = React.createContext([{}, () => {}]);

let initialState;

try {
    const token = window.localStorage.getItem("token")
    initialState = token ? {token: token} : {};
} catch (err) {
    console.error(err);
    // If error do nothing.
}

const UserProvider = (props) => {
    const [state, setState] = useState(initialState);

    return (
        <UserContext.Provider value={[state, setState]}>
            {props.children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };