import { useState, useEffect, useCallback } from 'react';
import format from 'date-fns/format';
import axios from 'axios';

const useDatabase = (token, user = null) => {
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

    const checkRole = useCallback(async (userID) => {
        try {
            const response = await axios.post('http://localhost:3001/role', {
                UserID: userID
            });
            return response.data;
        } catch (error) {
            console.error("Error while checking the role:", error);
        }
    }, []);


    const bookAppointment = async (appointmentData) => {
        try {
            const response = await axios.post('http://localhost:3001/book', appointmentData);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const fetchCustomerInfo = useCallback(async (userID) => {
        try {
            const response = await axios.post('http://localhost:3001/customerInfo', {
                UserID: userID
            });
            return response.data
        } catch (error) {
            return null;

        }
    }, []);


    // Cancel Function
    const cancelAppointment = async (appointmentID) => {
        try {
            await axios.delete('http://localhost:3001/myappointments/cancel', {
                data: {
                    id: appointmentID
                }
            });
            // After cancellation, fetch the updated appointments
            fetchData();
        } catch (error) {
            console.log('Error Cancel Appointment:', error);
        }
    };

        // Cancel Function
        const cancelAvailableAppointment = async (appointmentID) => {
            try {
                await axios.delete('http://localhost:3001/availableAppointments/cancel', {
                    data: {
                        AppID: appointmentID
                    }
                });
                // After cancellation, fetch the updated appointments

            } catch (error) {
                console.log('Error Cancel Appointment:', error);
            }
        };
    
    


    // Update Function
    const updateAppointment = async (appointmentID, updatedData) => {
        try {
            // Make the API call to update the appointment
            await axios.put(`http://localhost:3001/appointments/${appointmentID}`, updatedData);

            // After updating the appointment, fetch the updated appointments
            fetchData('all');
        } catch (error) {
            console.log('Error updating appointment:', error);
        }
    };


    const updateCustomerInfo = async ({ UserID, name, phNumber }) => {
        try {
            await axios.put('http://localhost:3001/updateCustomerInfo', {
                UserID: UserID,
                name: name,
                phNumber: phNumber
            });
        } catch (error) {
            console.error('Error updating profile info:', error);
        }
    }


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
            } else if (token === 'all') {
                response = await axios.get('http://localhost:3001/allappointments');
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
    return { data,cancelAvailableAppointment,updateCustomerInfo, cancelAppointment, fetchCustomerInfo, bookAppointment, checkRole, fetchAppointments, updateAppointment };
};

export default useDatabase;
