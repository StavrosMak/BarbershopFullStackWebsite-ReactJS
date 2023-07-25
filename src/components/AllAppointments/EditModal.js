import React from 'react';
import './EditModal.css';

const EditModal = ({ appointment, onClose, onSave }) => {
  const [formData, setFormData] = React.useState(appointment);
  const currentDate = new Date().toISOString().slice(0, 10);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Appointment</h3>
        <label className="form-label">Customer Name:</label>
        <input
          className="form-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label className="form-label">Appointment Date:</label>
        <input
          className="form-input"
          type="date"
          name="date"
          value={formData.date.slice(0, 10)}
          min={currentDate}
          onChange={handleChange}
        />

        <label className="form-label">Phone:</label>
        <input
          className="form-input"
          type="text"
          name="Phone"
          value={formData.Phone}
          onChange={handleChange}
        />

        <label className="form-label">Appointment Time:</label>
        <input
          className="form-input"
          type="text"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />

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
