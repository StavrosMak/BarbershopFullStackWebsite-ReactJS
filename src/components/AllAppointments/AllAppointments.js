import React, { useState, useContext, useEffect } from 'react';
import './AllAppointments.css';
import useFetchData from '../../CustomHooks/useFetchData';
import format from 'date-fns/format';
import EditModal from './EditModal';
import AddAppointments from '../AddAppointments/AddAppointments';
import { AuthContext } from '../../Context/AuthContext';

export default function AllAppointments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [Role, setRole] = useState('');
  const { isLoggedIn, user } = useContext(AuthContext);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const { data: appointments, cancelAppointment, updateAppointment, checkRole } = useFetchData('all');
  const [sortOrder, setSortOrder] = useState({
    column: null,
    type: 'asc',
  });

  useEffect(() => {
    const fetchRole = async () => {
      if (isLoggedIn && user) {
        try {
          const value = await checkRole(user.id);
          setRole(value[0].Role);
        } catch (error) {
          console.error("Error fetching role:", error);
        }
      }
    };
    fetchRole();
  }, [checkRole, isLoggedIn, user]);

  const sortedAppointments = [...appointments]
    .filter((appointment) => appointment.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder.column === 'name') {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortOrder.type === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      } else if (sortOrder.column === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder.type === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });

  const handleSort = (column) => {
    if (sortOrder.column === column) {
      setSortOrder({ ...sortOrder, type: sortOrder.type === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortOrder({ column, type: 'asc' });
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddAppointmentsModal, setShowAddAppointmentsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowEditModal(true);
  };

  const handleSaveChanges = (updatedAppointment) => {
    updateAppointment(selectedAppointment.AppointmentID, {
      name: updatedAppointment.name,
      date: format(new Date(updatedAppointment.date), 'yyyy-MM-dd'),
      phone: updatedAppointment.Phone,
      time: updatedAppointment.time,
    });
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowAddAppointmentsModal(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="AllAppointments">
      {Role === 1 ? (
        <>
          <div className="appointments-row">
            <div className="appointmentRowLeftSide">
              <h3>Appointments</h3>
            </div>
            <div className="appointmentRowRightSide">
              <div className="search-input">
                <input type="text" placeholder="Search Customer..." onChange={handleSearch} />
              </div>
              <div className="add-icon">
                <button onClick={() => setShowAddAppointmentsModal(!showAddAppointmentsModal)}>
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="mobile-sort-buttons">
            <button onClick={() => handleSort('name')}>
              Sort by Name {sortOrder.column === 'name' && sortOrder.type === 'asc' ? '↑' : '↓'}
            </button>
            <button onClick={() => handleSort('date')}>
              Sort by Date {sortOrder.column === 'date' && sortOrder.type === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th className="sortBtn">
                  <button onClick={() => handleSort('name')}>
                    Customer Name {sortOrder.column === 'name' && sortOrder.type === 'asc' ? '↑' : '↓'}
                  </button>
                </th>
                <th className="sortBtn">
                  <button onClick={() => handleSort('date')}>
                    Appointment Date {sortOrder.column === 'date' && sortOrder.type === 'asc' ? '↑' : '↓'}
                  </button>
                </th>
                <th>Appointment Time</th>
                <th>Action Buttons</th>
              </tr>
            </thead>
            <tbody>
              {sortedAppointments.map((appointment) => (
                <tr key={appointment.AppointmentID}>
                  <td>{appointment.name}</td>
                  <td>{format(new Date(appointment.date), 'yyyy-MM-dd')}</td>
                  <td>{appointment.time}</td>
                  <td className="adminsActionBtns">
                    <button className="cancelBtn" onClick={() => cancelAppointment(appointment.AppointmentID)}>
                      Cancel
                    </button>
                    <button onClick={() => handleEditClick(appointment)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showEditModal && selectedAppointment && (
            <EditModal appointment={selectedAppointment} onClose={handleCloseModal} onSave={handleSaveChanges} />
          )}
          {showAddAppointmentsModal && <AddAppointments handleCloseModal={handleCloseModal} />}
        </>
      ) : (
        <p style={{textAlign:"center", margin:"auto"}}>You don't have permission.</p>
      )}
    </div>
  );
}
