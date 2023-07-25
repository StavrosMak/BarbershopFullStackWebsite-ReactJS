import './BookResult.css';
import { Link } from 'react-router-dom';
export default function BookResult({Response}) {

    return(
        <div className="BookResult">
            <p>{Response}</p>
            <Link className="submitBtn actionBtn " to='/myappointments'>MyAppointments</Link>
            <Link className="submitBtn actionBtn"  to='/#home'>Back to Home Page</Link>

        </div>
    )
    
}