import React, { useEffect, useState } from 'react'
import { RootState } from '../redux/store';
import { setSelectedDate } from '../redux/slice/dateSlice';
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
 
function Soldiar() {
    const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
    const dispatch = useDispatch();

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedDate(event.target.value));
    };

    const [age, setAge] = React.useState('');
    const [showSelect, setShowSelect] = useState<boolean>(false);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowSelect(event.target.value === 'NotOnParade');
    };

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

  return (
    <div>

        <h3>Name : Amila Perera</h3>
        <h3>Rank : Soldier</h3>

        <button>Logout</button><br />

        <input type="date" id="datePicker" value={selectedDate} onChange={handleDateChange}/>
        <br />

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
        <br/>

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
        <button>Submit</button>
    </div>
  )
}

export default Soldiar