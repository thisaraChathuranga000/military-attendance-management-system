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

  const [open, setOpen] = React.useState(false);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [age, setAge] = React.useState('');
   
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedDate(event.target.value));
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowSelect(event.target.value === 'NotOnParade');
};

const handleChange = (event: SelectChangeEvent) => {
  setAge(event.target.value);
};
  return (
    <div>
        <h3>Rank : UDC</h3>
        <button>Logout</button><br />

        <input type="date" id="datePicker" value={selectedDate} onChange={handleDateChange}/>
        <br />

        <button onClick={handleClickOpen}>update</button>

        <p>Total count</p>
        <p>on perad count</p>
        <p>Not on perad count</p>
        <p>absent count</p>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         <h2>Update count</h2>
         <input type="text" placeholder='svc no'/>
         <input type="text" placeholder='intake'/>
         <label>Platoon</label>
        <select name="Platoon" id="Platoon">
            <option value="Alpha">Alpha</option>
            <option value="Beta">Beta</option>
            <option value="Cobra">Cobra</option>
            <option value="Delta">Delta</option>
        </select>

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
                    value={age}
                    label="Reason"
                    onChange={handleChange}
                    sx={{ width: "100px" }}
                >
                    <MenuItem value={1}>R1</MenuItem>
                    <MenuItem value={2}>R2</MenuItem>
                    <MenuItem value={3}>R3</MenuItem>
                    <MenuItem value={4}>R4</MenuItem>
                    <MenuItem value={5}>R5</MenuItem>
                    <MenuItem value={6}>R6</MenuItem>
                    <MenuItem value={7}>R7</MenuItem>
                    <MenuItem value={8}>R8</MenuItem>
                </Select>
            </FormControl>
        )}
        <br/>

        <button>submit</button>
      </Dialog>
    </div>
  )
}

export default Udc