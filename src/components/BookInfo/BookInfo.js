import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ModalContext } from "../../Context/ModalContext";
import Modal from "../Modal/Modal";
import './BookInfo.css'
import AppointmentForm from "../AppointmentForm/AppointmentForm";

export default function BookInfo({ selectedAppointment, handleNext }) {
  const { openModal, setModal } = useContext(ModalContext);
  const { isLoggedIn, user } = useContext(AuthContext);

  // console.log("bkInf - selected app - barberName:", selectedAppointment);
  // console.log("user", user);

  return (
    <div className="BookInfo">
      {(isLoggedIn) ? (
        <div className="loggedBox">
          <AppointmentForm handleNext={handleNext} loggedInUser={user} selectedAppointment={selectedAppointment} />
        </div>
      ) : (
        <div className="chooseMethod">
          <button className="method" onClick={() => setModal(true)}>Login to book</button>
        </div>
      )}
      {openModal && <Modal />}
    </div>
  );
}
