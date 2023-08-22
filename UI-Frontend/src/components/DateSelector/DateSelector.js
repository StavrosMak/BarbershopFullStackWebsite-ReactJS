import React, { useState, useEffect, useCallback, useContext } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import StaticDatePickerLandscape from '../Calend/Calend';
import useDatabase from '../../CustomHooks/useDatabase';
import { AuthContext } from '../../Context/AuthContext';
import './DateSelector.css';


function DateSelector({ handleAppointmentSelect }) {
    // !states
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const currentDate = new Date();
    const [role, setRole] = useState(null);
    const { isLoggedIn, user } = useContext(AuthContext);
    const { checkRole, fetchAppointments, cancelAvailableAppointment } = useDatabase();



    useEffect(() => {
        const fetchRole = async () => {
            if (isLoggedIn) {
                try {
                    const value = await checkRole(user.id);
                    setRole(value[0].Role);
                } catch (error) {
                    console.error('Error fetching role:', error);
                }
            }
        };
        fetchRole();
    }, [user, checkRole, isLoggedIn]);


    // !Handlers
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const setNewSelectedItem = (appointment) => {
        selectedAppointment === appointment ? setSelectedAppointment(null) : setSelectedAppointment(appointment);
    };
    const fetchAppointmentsForSelectedDate = useCallback(
        async () => {
            if (selectedDate) {
                try {
                    setIsLoading(true);
                    setError(null);
                    const appointmentsData = await fetchAppointments(selectedDate);
                    setAppointments(appointmentsData);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    setError('An error occurred while fetching appointments.');
                    setIsLoading(false);
                }
            }
        }, [selectedDate, fetchAppointments]);

    useEffect(() => {
        if (selectedDate) {
            fetchAppointmentsForSelectedDate();
        }
    }, [selectedDate, fetchAppointmentsForSelectedDate]);

     const handleRemove = async (appointmentID) => {
        try {
            // Cancel the appointment in the database
            await cancelAvailableAppointment(appointmentID);
            fetchAppointmentsForSelectedDate();
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    };




    // !these 2 are for parent component.
    const handleAppointmentSelectCallback = useCallback(handleAppointmentSelect, [handleAppointmentSelect]);//will recreate only if function change.
    useEffect(() => {
        handleAppointmentSelectCallback(selectedAppointment);
    }, [selectedAppointment, handleAppointmentSelectCallback]);

    return (
        <div className="BookContainer">
            <div className="leftSide">
                <StaticDatePickerLandscape
                    handleDateChange={handleDateChange}
                    selectedDate={selectedDate}
                    currentDate={currentDate}
                />
            </div>
            <div className="rightSide">
                {isLoading ? (
                    <div className="Loading">...</div>
                ) : (
                    <div className="AvailableHours">
                        {error ? (
                            <div className="Error">{error}</div>
                        ) : appointments.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`Message ${appointments.length === 0 ? 'visible' : ''}`}>
                                No appointments available.
                            </motion.div>
                        ) : (
                            appointments.map((appointment, index) => (
                                <div
                                    className={`AppointmentItem ${appointment === selectedAppointment ? 'selected' : ''
                                        }`}
                                    key={index}
                                    onClick={() => setNewSelectedItem(appointment)}
                                >
                                    <div className='firstRowItem'>
                                        <div className="BarberName">Barber Name: {appointment.name}</div>
                                        {role === 1 ? (
                                            <button className='removeBtn' onClick={() => handleRemove(appointment.id)}>
                                                <i className="fa-regular fa-trash-can" style={{ color: "#e01b24" }}></i>
                                            </button>
                                        ) : ("")}
                                    </div>
                                    <div className="Date">Date: {format(new Date(appointment.Date), 'yyyy-MM-dd')}</div>
                                    <div className="StartTime">Start Time: {appointment.Hours}</div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
export default DateSelector;
