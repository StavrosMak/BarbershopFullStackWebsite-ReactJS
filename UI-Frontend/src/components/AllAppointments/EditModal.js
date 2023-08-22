import React, { useRef } from 'react';
import './EditModal.css';
import format from 'date-fns/format';
const EditModal = ({ appointment, onClose, onSave }) => {
  const formRef = useRef(null);
  const currentDate = new Date().toISOString().slice(0, 10);

  const handleSave = () => {
    const formData = {
      name: formRef.current.name.value,
      date: formRef.current.date.value,
      Phone: formRef.current.Phone.value,
      time: formRef.current.time.value,
    };
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Appointment</h3>
        <form ref={formRef}>
          <label className="form-label">Customer Name:</label>
          <input
            className="form-input"
            type="text"
            name="name"
            defaultValue={appointment.name}
          />

          <label className="form-label">Appointment Date:</label>
          <input
            className="form-input"
            type="date"
            name="date"
            defaultValue={format(new Date(appointment.date), 'yyyy-MM-dd')}
            min={currentDate}
          />

          <label className="form-label">Phone:</label>
          <input
            className="form-input"
            type="text"
            name="Phone"
            defaultValue={appointment.Phone}
          />

          <label className="form-label">Appointment Time:</label>
          <input
            className="form-input"
            type="text"
            name="time"
            defaultValue={appointment.time}
          />
        </form>

        <div className="modal-actions">
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
