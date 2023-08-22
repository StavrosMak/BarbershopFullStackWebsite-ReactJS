import React, { useEffect, useContext, useState, useRef } from 'react';
import './MyProfile.css';
import '../AppointmentForm/AppointmentForm.css';
import { AuthContext } from '../../Context/AuthContext';
import useDatabase from '../../CustomHooks/useDatabase';

export default function MyProfile() {
    const nameRef = useRef();
    const phoneRef = useRef();
    const [resultMessage, setResultMessage] = useState('');
    const { user } = useContext(AuthContext);
    const { fetchCustomerInfo, updateCustomerInfo } = useDatabase();

    useEffect(() => {
        const customerInfo = async () => {
            try {
                const response = await fetchCustomerInfo(user.id);
                if (response && response.length > 0) {
                    const { name, phNumber } = response[0];
                    nameRef.current.value = name;
                    phoneRef.current.value = phNumber;
                }
            } catch (error) {
                console.error('Error fetching customer information:', error);
            }
        };
        customerInfo();
    }, [user, fetchCustomerInfo]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateCustomerInfo({ UserID: user.id, name: nameRef.current.value, phNumber: phoneRef.current.value });
            setResultMessage('Profile information updated successfully!');
        } catch (error) {
            setResultMessage('Unable to update profile information. Please try again later.');
            console.error('Error updating profile information:', error);
        }
    };

    return (
        <div className="MyProfile">
            <form className="appointment-form" onSubmit={handleSubmit}>
                <h2>Update Profile Info</h2>
                <label>
                        Display Name: <input type="text" ref={nameRef} required />
                </label>
                <br />
                <br />
                <label>
                    Phone: <input type="text" ref={phoneRef} pattern="[0-9]*" title="Enter only digits for the phone number" required />
                </label>
                <br />
                <button type="submit">Update</button>
                <p className='resultMessage'>{resultMessage}</p>
            </form>
        </div>
    );
}
