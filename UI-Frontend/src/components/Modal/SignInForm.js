import React, { useState, useContext, useRef } from 'react';
import Axios from "axios";
import { AuthContext } from '../../Context/AuthContext';

export default function SignInForm(props) {
    const [errorMessage, setErrorMessage] = useState('');

    const { handleLogin } = useContext(AuthContext);

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const login = (event) => {
        event.preventDefault();

        const usernameValue = usernameRef.current.value;
        const passwordValue = passwordRef.current.value;

        if (!usernameValue || !passwordValue) {
            setErrorMessage('Please fill all fields.');
            return;
        }

        Axios.post("http://localhost:3001/login", {
            username: usernameValue,
            password: passwordValue,
        }).then((response) => {
            if (response.data.length > 0) {
                handleLogin({
                    id: response.data[0].UserID,
                    name: response.data[0].username,
                    email: response.data[0].email,
                    password: response.data[0].password,
                });
                setErrorMessage('');
            }   else {
                setErrorMessage(response.data.message);
            }
        }).catch(() => {
            setErrorMessage('Wrong username/password combination!');
        });
    };

    const { changeAuthMode } = props;
    return (
        <>
            <div className='changeAuthFormBtn'>
                <p>Not registered yet?</p>
                <button onClick={changeAuthMode}>Sign Up</button>
            </div>
            <form autoComplete="off">
                <label>
                    <p>Name:</p>
                    <input
                        type="text"
                        required
                        ref={usernameRef}
                        placeholder="username"
                    />
                </label>
                <label>
                    <p>Password:</p>
                    <input
                        type="password"
                        ref={passwordRef}
                        placeholder="password"
                        required
                    />
                </label>
                <p style={{height:'15px'}} className="error">{errorMessage}</p>
                <button className="submitBtn" onClick={login} type="button">Sign In</button>
            </form>
        </>
    )
}
