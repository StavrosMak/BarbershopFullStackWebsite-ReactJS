import { useState, useEffect, useCallback } from 'react';
import format from 'date-fns/format';
import axios from 'axios';

const useFetchData = (token, user = null) => {
    const [data, setData] = useState([]);

    // Function to fetch appointments for a specific date
    const fetchAppointments = useCallback(async (date) => {//callback to prevent recreation.

        const formattedDate = format(new Date(date), 'yyyy-M-d');

        try {
            const response = await axios.get('http://localhost:3001/appointments', {
                params: {
                    date: formattedDate,
                },
            });
            // console.log('Response:', response);
            if (response.data) {
                return response.data;
            } else {
                throw new Error('Empty response from server.');
            }
        } catch (error) {
            console.error(error);
            throw new Error('An error occurred while fetching appointments.');
        }
    }, []);

    // Function to cancel an appointment
    const cancelAppointment = async (appointmentID) => {
        try {
            await axios.post('http://localhost:3001/myappointments/cancel', {
                AppID: appointmentID
            });
            // After cancellation, fetch the updated appointments
            fetchData();
        } catch (error) {
            console.log('Error Cancel Appointment:', error);
        }
    };
    const fetchData = useCallback(async () => { //re-create when user or token change.
        try {
            let response;
            if (token === 'cards') {
                response = await axios.get('http://localhost:3001/api/cards');
            } else if (token === 'myappointments') {
                if (!user || !user.id) {
                    throw new Error('User ID not provided.');
                }
                response = await axios.post('http://localhost:3001/myappointments', {
                    UserID: user.id,
                });
            } else {
                // Handle unknown token, you can set data to an empty array or do nothing.
                return;
            }
            setData(response.data);
        } catch (error) {
            console.error(`Error fetching ${token}:`, error);
        }
    }, [token, user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);



    // Return the data and the cancelAppointment function
    return { data, cancelAppointment, fetchAppointments };
};

export default useFetchData;
