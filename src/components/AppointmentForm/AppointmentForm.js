import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import './AppointmentForm.css';

const AppointmentForm = ({ handleNext, loggedInUser, selectedAppointment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const response = await axios.post('http://localhost:3001/customerInfo', {
          UserID: loggedInUser.id
        });
        const { name, phNumber } = response.data[0];
        setName(name);
        setPhone(phNumber);
        setEmail(loggedInUser.email || '');
        setSelectedDate(format(new Date(selectedAppointment.Date), 'yyyy-MM-dd'));
        setSelectedTime(selectedAppointment.Hours);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    if (loggedInUser && selectedAppointment) {
      fetchCustomerInfo();
    }
  }, [loggedInUser, selectedAppointment]);

  const handleNameChange = useCallback((e) => {setName(e.target.value);}, []);
  const handleEmailChange = useCallback((e) => {setEmail(e.target.value);}, []);
  const handlePhoneChange = useCallback((e) => {setPhone(e.target.value);}, []);
  const handleSubmit = useCallback((e) => {e.preventDefault();
    const appointmentData = {
      UserID: loggedInUser.id,
      name,
      phone,
      email,
      date: selectedDate,
      time: selectedTime,
    };

    axios.post('http://localhost:3001/book', appointmentData)
      .then((response) => {
        console.log(response);
        setName('');
        setEmail('');
        setPhone('');
        handleNext(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [loggedInUser, name, phone, email, selectedDate, selectedTime, handleNext]);

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <label>Name:<input type="text" value={name} onChange={handleNameChange} required /></label>
      <br />
      <label>Email:<input type="email" value={email} onChange={handleEmailChange} required /></label>
      <br />
      <label>Phone:<input type="tel" value={phone} onChange={handlePhoneChange} required /></label>
      <br />
      <label>Date:<input type="text" placeholder={selectedDate} disabled={!!selectedAppointment} required /></label>
      <br />
      <label>Time:<input type="text" placeholder={selectedTime} disabled={!!selectedAppointment} required /></label>
      <br />
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
