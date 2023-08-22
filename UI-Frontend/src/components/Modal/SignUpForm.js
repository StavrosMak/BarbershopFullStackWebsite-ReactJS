
import { useState } from 'react';
import Axios from "axios";

export default function SignUpForm(props) {
    const { changeAuthMode, onClose } = props;

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const register = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:3001/register", {
          username: usernameReg,
          password: passwordReg,
          email: emailReg,
        })
          .then((response) => {
            if (response.data && response.data.error) {
              setErrorMessage(response.data.error);
              
            } else {
              setUsernameReg('');
              setPasswordReg('');
              setEmailReg('');
              onClose();
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            
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
                <p className='errorMessage'>{errorMessage}</p>
                <button className="submitBtn" onClick={register} type="submit">Sign Up</button>
            </form>
        </>



    )
}