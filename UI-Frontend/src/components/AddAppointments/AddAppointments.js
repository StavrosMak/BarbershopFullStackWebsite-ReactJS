import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function AddAppointments({ handleCloseModal }) {
    const [barbers, setBarbers] = useState([]);
    const currentDate = new Date().toISOString().slice(0, 10);
    const [errorMessage, setErrorMessage] = useState('');
    const HourRef = useRef();
    const DateRef = useRef();
    const EmployeeRef = useRef();


    const handleSave = async () => {
        if (!EmployeeRef.current.value || !DateRef.current.value || !HourRef.current.value) {
            setErrorMessage('Please fill in all the fields.');
            return;
        }
        try {
            const selectedBarber = barbers.find((barber) => barber.name === EmployeeRef.current.value);
            if (!selectedBarber) {
                console.log('Selected barber not found');
                return;
            }
            const { EmployeeID } = selectedBarber;
            const requestData = {
                Employee: EmployeeRef.current.value,
                date: DateRef.current.value,
                Hour: HourRef.current.value,
                EmployeeID,
            };
            await axios.post('http://localhost:3001/api/availability', requestData);
            handleCloseModal();
        } catch (error) {
            console.log('Error saving data:', error);
        }
    };


    const fetchBarbers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/employees');
            setBarbers(response.data);
        } catch (error) {
            console.log('Error fetching barbers:', error);
        }
    };

    useEffect(() => {
        fetchBarbers();
    }, []);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Add Appointment</h3>
                <label className="form-label">Employee Name:</label>
                <select className="form-input" name="Employee" ref={EmployeeRef}>
                    <option value="">Select an employee</option>
                    {barbers.map((barber) => (
                        <option key={barber.EmployeeID} value={barber.name}>{barber.name}</option>
                    ))}
                </select>

                <label className="form-label">Appointment Date:</label>
                <input className="form-input" type="date" name="date" ref={DateRef} defaultValue={currentDate} min={currentDate} />

                <label className="form-label">Hour:</label>
                <input className="form-input" type="text" name="Hour" ref={HourRef} />

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="modal-actions">
                    <button onClick={handleSave} className="save-btn">Save</button>
                    <button className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
