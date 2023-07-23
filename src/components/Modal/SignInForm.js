import { useState, useContext } from 'react';
import Axios from "axios";
import { AuthContext } from '../../Context/AuthContext';

export default function SignInForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { handleLogin } = useContext(AuthContext);

    const login = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (!username || !password) {
            setErrorMessage('Please fill all fields.');
            return;
        }
        Axios.post("http://localhost:3001/login", {
            username: username, //states
            password: password, //states
        }).then((response) => { //gets the data from db.
            if (response.data.length > 0) {
                handleLogin({ //save it inorder to share with all components.
                    id: response.data[0].UserID,
                    name: response.data[0].username,
                    email: response.data[0].email,
                    password: response.data[0].password
                });
                setErrorMessage(''); // Clear the error message if login is successful
            } else if (response.data.message) {
                setErrorMessage(response.data.message);
            } else {
                setErrorMessage('An error occurred during login.');
            }
        }).catch((error) => {
            setErrorMessage('An error occurred during login');
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
                    <input type="text" required name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
                </label>
                <label>
                    <p>Password:</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" required />
                </label>
                {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error message */}
                <button className="submitBtn" onClick={login} type="button">Sign In</button> {/* Set type to "button" */}
            </form>
        </>
    )
}
