import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AuthContext } from '../../Context/AuthContext';
import format from 'date-fns/format';
import '../MyAppointments/MyAppointments.css';
import useFetchData from '../../CustomHooks/useFetchData';

export default function CollapsibleTable() {
  const { user } = useContext(AuthContext);


  const { data: appointments, cancelAppointment } = useFetchData('myappointments', user);//! Use customHook

  function Row(props) { //!rows
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [isExpired, setIsExpired] = React.useState(false);

    React.useEffect(() => {
      const currentDate = new Date();
      const appointmentDate = new Date(row.date);
      setIsExpired(appointmentDate < currentDate);
    }, [row.date]);

    const handleCancelAppointment = async () => {
      try {
        await cancelAppointment(row.AppointmentID); //!use cancel from hook.
      } catch (error) {
        console.log('Error Cancel Appointment:', error);
      }
    };

    return (
      <React.Fragment>
        <TableRow className='row' sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" align="right" scope="row">
            {format(new Date(row.date), 'yyyy-MM-dd')}
          </TableCell>
          <TableCell align="right">
            {isExpired ? 'Expired' : 'Available'}
          </TableCell>
        </TableRow>
        {/* Separate TableRow for displaying book info */}
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }} className='box2'>
                <Typography variant="h6" gutterBottom component="div">
                  Book Info
                </Typography>
                <Table size="small" className='tableA' aria-label="book info table">
                  <TableBody className='TableBody'>
                    <TableRow className='TableRow'>
                      <TableCell className="TableCell" >
                        AppID: {row.AppointmentID}{' '}
                      </TableCell>
                      <TableCell className="TableCell" >
                        Name: {row.name}{' '}
                      </TableCell>
                      <TableCell className="TableCell"   >Time: {row.time}</TableCell>
                      <TableCell className="TableCell"  >Phone: {row.Phone}</TableCell>
                      {isExpired ? null : (
                        <TableCell>
                          <button
                            type="submit"
                            className="CancelBtn TableCell"
                            onClick={handleCancelAppointment}
                          >
                            Cancel
                          </button>
                        </TableCell>
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <TableContainer component={Paper} className="appointmentsTable">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Appointments</TableCell>
            <TableCell align="right">Date of Appointment</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <Row
              key={appointment.AppointmentID}
              row={appointment}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
