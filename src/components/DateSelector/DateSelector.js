import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import StaticDatePickerLandscape from '../Calend/Calend';
import useFetchData from '../../CustomHooks/useFetchData';
import './DateSelector.css';

// console.log("DateSelector rendered");

function DateSelector({ handleAppointmentSelect }) {
    // !states
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const currentDate = new Date();

    const { fetchAppointments } = useFetchData(); 

    // !Handlers
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const setNewSelectedItem = (appointment) => {
        selectedAppointment === appointment ? setSelectedAppointment(null) : setSelectedAppointment(appointment);
    };
    const fetchAppointmentsForSelectedDate = useCallback(
        async () => { //changes if selected date changes too.
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
                    <div className="Loading">Loading...</div>
                ) : (
                    <div className="AvailableHours">
                        {error ? (
                            <div className="Error">{error}</div>
                        ) : appointments.length === 0 ? (
                            <div className="Message">No appointments available.</div>
                        ) : (
                            appointments.map((appointment, index) => (
                                <div
                                    className={`AppointmentItem ${appointment === selectedAppointment ? 'selected' : ''
                                        }`}
                                    key={index}
                                    onClick={() => setNewSelectedItem(appointment)}
                                >
                                    <div className="BarberName">Barber Name: {appointment.name}</div>
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
