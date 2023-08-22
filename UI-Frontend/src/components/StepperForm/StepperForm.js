import React, { useState, useCallback } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import DateSelector from '../DateSelector/DateSelector';
import BookInfo from '../BookInfo/BookInfo';
import BookResult from '../BookResult/BookResult';
import './StepperForm.css';

const steps = ['Choose Appointment', 'Book', 'Result'];

export default function StepperForm() {
    const [selectedAppointment, setSelectedAppointment] = useState();
    const [response, setResponse] = useState('');
    const handleAppointmentSelect = useCallback((selectedAppointment) => {
        setSelectedAppointment(selectedAppointment ? selectedAppointment : null);
    }, []);

    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log(activeStep)
    };
    const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); };
    const handleAppointmentSubmit = (response) => {
        setResponse(response);
        handleNext();
    }
    return (
        <div className="stepper-container">
            <div className="StepperForm">
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
               
                    {activeStep !== steps.length && (
                        <div className='StepperContent'>
                            {activeStep === 0 ? (
                                <DateSelector handleAppointmentSelect={handleAppointmentSelect} />
                            ) : activeStep === 1 ? (
                                <BookInfo selectedAppointment={selectedAppointment} handleNext={handleAppointmentSubmit} />
                            ) : (
                                <BookResult Response={response} />
                            )}

                            <div className="button-container">
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0 || activeStep === 2}
                                    onClick={handleBack}
                                    className="button"
                                >
                                    Back
                                </Button>
                                {(activeStep < 1 && selectedAppointment != null) && ( //make next visible only for 1st page.
                                    <Button onClick={handleNext} className="button">
                                        Next
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
