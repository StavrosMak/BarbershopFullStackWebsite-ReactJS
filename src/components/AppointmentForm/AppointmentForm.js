import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
// import axios from 'axios';
import useFetchData from '../../CustomHooks/useFetchData';
import './AppointmentForm.css';

const AppointmentForm = ({ handleNext, loggedInUser, selectedAppointment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [role, setRole] = useState(null);
  const { bookAppointment } = useFetchData();
  const { checkRole, fetchCustomerInfo } = useFetchData();

  useEffect(() => {
    const fetchRole = async () => {
      if (loggedInUser) {
        try {
          const value = await checkRole(loggedInUser.id);
          setRole(value[0].Role);
        } catch (error) {
          console.error('Error fetching role:', error);
        }
      }
    };
    fetchRole();
  }, [loggedInUser, checkRole]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        if (role === 2) { //only fill for customers.
          const response = await fetchCustomerInfo(loggedInUser.id);
          const { name, phNumber } = response[0];
          setName(name);
          setPhone(phNumber);
          setEmail(loggedInUser.email || '');
        }
        setSelectedDate(format(new Date(selectedAppointment.Date), 'yyyy-MM-dd'));
        setSelectedTime(selectedAppointment.Hours);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    if (loggedInUser && selectedAppointment && role !== null) {
      fetchInfo();
    }
  }, [loggedInUser, fetchCustomerInfo, selectedAppointment, role]);

  const handleNameChange = useCallback((e) => { setName(e.target.value); }, []);
  const handleEmailChange = useCallback((e) => { setEmail(e.target.value); }, []);
  const handlePhoneChange = useCallback((e) => { setPhone(e.target.value); }, []);
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const appointmentData = {
      UserID: loggedInUser.id,
      name,
      phone,
      email,
      date: selectedDate,
      time: selectedTime,
    };
    try {
      const response = await bookAppointment(appointmentData);
      if (response) {
        console.log(response);
        setName('');
        setEmail('');
        setPhone('');
        handleNext(response);
      }
    } catch (error) {
      console.error(error);
    }
  },
    [loggedInUser, name, phone, email, selectedDate, selectedTime, bookAppointment, handleNext]
  );

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