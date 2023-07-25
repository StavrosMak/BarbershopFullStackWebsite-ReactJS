
import { useState } from 'react';
import Axios from "axios";

export default function SignUpForm(props) {
    const { changeAuthMode,onClose } = props;

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [emailReg, setEmailReg] = useState('');

    const register = (event) => { //send info to backend.
        
        event.preventDefault(); // Prevent default form submission behavior
        Axios.post("http://localhost:3001/register", {
            username: usernameReg,
            password: passwordReg,
            email: emailReg,
        }).then((response) => {
            setUsernameReg('');
            setPasswordReg('');
            setEmailReg('');
            onClose();
            console.log(response);
        });
    };



    return (

        <>
            <div className='changeAuthFormBtn'>
                <p>Already registered?</p>
                <button onClick={changeAuthMode}>Sign In</button>
            </div>
            <form autoComplete="off">
                <label>
                    <p>Name:</p>
                    <input type="text" name="username" value={usernameReg} onChange={(e) => setUsernameReg(e.target.value)} placeholder="username" />
                </label>
                <label>
                    <p>Email:</p>
                    <input type="email" name="email" value={emailReg} onChange={(e) => setEmailReg(e.target.value)} placeholder='example@email.com' />
                </label>
                <label>
                    <p>Password:</p>
                    <input type="password" value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)} placeholder="password" required />
                </label>
                <button className="submitBtn" onClick={register} type="submit">Sign Up</button>
            </form>
        </>



    )
}