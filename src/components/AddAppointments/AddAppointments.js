import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddAppointments({ handleCloseModal }) {
    const [barbers, setBarbers] = useState([]);
    const currentDate = new Date().toISOString().slice(0, 10);
    const [formData, setFormData] = useState({
        Employee: '',
        date: '',
        Hour: ''
    });

    // State variable to track the error message
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            date: currentDate,
        }));
    }, [currentDate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        if (!formData.Employee || !formData.date || !formData.Hour) {
            setErrorMessage('Please fill in all the fields.');
            return;
        }

        try {
            // Find the selected barber object from the list of barbers based on name
            const selectedBarber = barbers.find((barber) => barber.name === formData.Employee);

            if (!selectedBarber) {
                console.log('Selected barber not found');
                return;
            }

            // Extract the EmployeeID from the selected barber object
            const { EmployeeID } = selectedBarber;

            // Create the data object to send to the server
            const requestData = {
                ...formData,
                EmployeeID,
            };

            // Make the API call to insert the form data into the availabilityList
            const response = await axios.post('http://localhost:3001/api/availability', requestData);
            console.log('Saved data:', response.data);
            // Close the modal or perform any other actions upon successful save
            handleCloseModal();
        } catch (error) {
            console.log('Error saving data:', error);
        }
    };

    const fetchBarbers = async () => {
        try {
            // Make the API call to get the list of barbers
            const response = await axios.get('http://localhost:3001/api/employees');
            console.log(response);
            // Assuming the response data is an array of barbers, update the state with the data
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
                <h3>Edit Appointment</h3>
                <label className="form-label">Employee Name:</label>
                <select
                    className="form-input"
                    name="Employee"
                    value={formData.Employee}
                    onChange={handleChange}
                >
                    <option value="">Select an employee</option>
                    {barbers.map((barber) => (
                        <option key={barber.EmployeeID} value={barber.name}>
                            {barber.name}
                        </option>
                    ))}
                </select>

                <label className="form-label">Appointment Date:</label>
                <input
                    className="form-input"
                    type="date"
                    name="date"
                    value={formData.date}
                    min={currentDate}
                    onChange={handleChange}
                />

                <label className="form-label">Hour:</label>
                <input
                    className="form-input"
                    type="text"
                    name="Hour"
                    value={formData.Hour}
                    onChange={handleChange}
                />

                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display the error message if present */}

                <div className="modal-actions">
                    <button onClick={handleSave} className="save-btn">
                        Save
                    </button>
                    <button className="cancel-btn" onClick={handleCloseModal}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
