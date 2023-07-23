import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import './MyProfile.css';
import '../AppointmentForm/AppointmentForm.css';

export default function MyProfile() {
    const [name, setName] = useState('');
     const [phone, setPhone] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const {  user } = useContext(AuthContext);

    useEffect(() => {
        const customerInfo = async () => {
            try {
                const UserID = user.id;
                const response = await axios.post('http://localhost:3001/customerInfo', {
                    UserID: UserID
                });
                setName(response.data[0].name);
                setPhone(response.data[0].phNumber);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        customerInfo();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const UserID = user.id;
            await axios.post('http://localhost:3001/updateCustomerInfo', {
                UserID: UserID,
                name: name,
                phNumber: phone
            });
            setSuccessMessage('Profile info updated successfully!');
        } catch (error) {
            console.error('Error updating profile info:', error);
        }
    };

    const handleNameChange = (e) => { setName(e.target.value); };
    const handlePhoneChange = (e) => { setPhone(e.target.value); };

    return (
        <div className="MyProfile">
            <form className="appointment-form" onSubmit={handleSubmit}>
                <h2>Update Profile Info</h2>
                <label>
                    Name: <input type="text" value={name} onChange={handleNameChange} required />
                </label>
                <br />
                <br />
                <label>
                    Phone: <input type="text" value={phone} onChange={handlePhoneChange} required />
                </label>
                <br />
                <button type="submit">Change</button>
                {successMessage && <p>{successMessage}</p>}
            </form>
        </div>
    );
}
