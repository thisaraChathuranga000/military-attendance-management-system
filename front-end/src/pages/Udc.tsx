import React, { useEffect, useState } from 'react'
import { RootState } from '../redux/store';
import { setSelectedDate } from '../redux/slice/dateSlice';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl,  FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent } from '@mui/material';

function Udc() {
  const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [onParade, setOnParade] = useState<boolean>(true);

  const [formData, setFormData] = useState({
    svcNo: '',
    intake: '',
    platoon: 'Alpha'
  });

  const [attendanceStats, setAttendanceStats] = useState({
    onPerad: 0,
    notOnPerad: 0,
    absent: 0,
    total: 0
  });

  const handleClickOpen = () => {setOpen(true);};
  const handleClose = () => {setOpen(false);};

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedDate(event.target.value));
    fetchData(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === 'OnParade';
    setOnParade(value);
    setShowSelect(!value);
  };

  const fetchData = async (date: string) => {
    try {
        const response = await fetch(`http://localhost:5000/attendance/stats/${date}`);
        if (response.ok) {
            const data = await response.json();
            setAttendanceStats(data);
        } else {
            console.error('Failed to fetch attendance stats');
        }
    } catch (error) {
        console.error('Error fetching attendance stats:', error);
    }
  };

  const fetchUserId = async (svcNo: string, platoon: string, intake:string ) => {
    try {
        const response = await fetch(`http://localhost:5000/users/${svcNo}/${platoon}/${intake}`);
        if (response.ok) {
            const id = await response.json();
            setSelectedUserId(id);
            console.log(id)
        } else {console.error('Failed to fetch UserId')}
    } catch (error) {console.error('Error fetching UserId:', error)}
  };

  const handleSubmit = async () => {
    try {
        const response = await fetch('http://localhost:5000/attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                onPerad: onParade,  
                notOnPerad: !onParade,
                reason,
                date: selectedDate,
                userId: selectedUserId,
                absent:true
            }),
        });

        if (response.ok) {
            console.log('Attendance submitted successfully');
        } else {
            console.error('Failed to submit attendance');
        }
    } catch (error) {
        console.error('Error submitting attendance:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedDate);
    fetchUserId(formData.svcNo,formData.platoon, formData.intake);
  }, [selectedDate, formData.svcNo,formData.platoon, formData.intake]);

  const handleChange = (e: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setReason(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div>
        <h3>Rank : UDC</h3>
        <button>Logout</button><br />

        <input type="date" id="datePicker" value={selectedDate} onChange={handleDateChange}/>
        <br />

        <button onClick={handleClickOpen}>update</button>

        <p>Total count: {attendanceStats.total}</p>
        <p>on perad count: {attendanceStats.onPerad}</p>
        <p>Not on perad count: {attendanceStats.notOnPerad}</p>
        <p>Absent count: {attendanceStats.absent}</p>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
              <h2>Update count</h2>
              <input type="text" placeholder='svc no' name="svcNo" onChange={handleChange} /><br />
              <label>Platoon</label>
              <select id="platoon" name="platoon" onChange={handleChange}>
                <option value="Alpha">Alpha</option>
                <option value="Beta">Beta</option>
                <option value="Cobra">Cobra</option>
                <option value="Delta">Delta</option>
              </select><br />
              <input type="text" placeholder='intake' name="intake" onChange={handleChange}/>
               

              <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Parade Participation</FormLabel>
                  <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="OnParade"
                      name="radio-buttons-group"
                      onChange={handleRadioChange}
                  >
                      <FormControlLabel value="OnParade" control={<Radio />} label="Yes, I have participated" />
                      <FormControlLabel value="NotOnParade" control={<Radio />} label="No, I was unable to participate" /> 
                  </RadioGroup>
              </FormControl>

              {showSelect && (
                  <FormControl>
                      <InputLabel id="demo-pselect-small-label">Reason</InputLabel>
                      <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={reason}
                          label="Reason"
                          onChange={handleChange}
                          sx={{ width: "100px" }}
                      >
                          <MenuItem value={'New report Sick'}>New report Sick</MenuItem>                   
                          <MenuItem value={'Report Sick'}>Report Sick</MenuItem>
                          <MenuItem value={'EX PT/EX PARADE'}>EX PT/EX PARADE</MenuItem>
                          <MenuItem value={'Hospital'}>Hospital</MenuItem>
                          <MenuItem value={'M1 Room'}>M1 Room</MenuItem>
                          <MenuItem value={'SD/LD'}>SD/LD</MenuItem>
                          <MenuItem value={'Leave'}>Leave</MenuItem>
                          <MenuItem value={'Medicle Leave'}>Medicle Leave</MenuItem>
                          <MenuItem value={'Workout'}>Workout</MenuItem>
                          <MenuItem value={'Theory/Practicle'}>Theory/Practicle</MenuItem>
                          <MenuItem value={'Sports'}>Sports</MenuItem>
                          <MenuItem value={'Other'}>Other</MenuItem>
                      </Select>
                  </FormControl>
                )}
              <br/>
              <button onClick={handleSubmit}>submit</button>
        </Dialog>
    </div>
  )
}

export default Udc

 

 