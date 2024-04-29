// import React, { useEffect, useState } from 'react'
// import { RootState } from '../redux/store';
// import { setSelectedDate } from '../redux/slice/dateSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
 
// function Soldiar() {
//     const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
//     const selectedUser = useSelector((state: RootState) => state.user.userData);
//     const dispatch = useDispatch();

//     const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         dispatch(setSelectedDate(event.target.value));
//     };

//     const [reason, setReason] = React.useState('');
//     const [showSelect, setShowSelect] = useState<boolean>(false);

//     const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setShowSelect(event.target.value === 'NotOnParade');
//     };

//     const handleChange = (event: SelectChangeEvent) => {
//         setReason(event.target.value);
//     };

//   return (
//     <div>

//         <h3>Name : {selectedUser?.name}</h3>
//         <h3>Rank : Soldier</h3>

//         <button>Logout</button><br />

//         <input type="date" id="datePicker" value={selectedDate} onChange={handleDateChange}/>
//         <br />

//         <FormControl>
//             <FormLabel id="demo-radio-buttons-group-label">Parade Participation</FormLabel>
//             <RadioGroup
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 defaultValue="OnParade"
//                 name="radio-buttons-group"
//                 onChange={handleRadioChange}
//             >
//                 <FormControlLabel value="OnParade" control={<Radio />} label="Yes, I have participated" />
//                 <FormControlLabel value="NotOnParade" control={<Radio />} label="No, I was unable to participate" /> 
//             </RadioGroup>
//         </FormControl>
//         <br/>

//         {showSelect && (
//             <FormControl>
//                 <InputLabel id="demo-pselect-small-label">Reason</InputLabel>
//                 <Select
//                     labelId="demo-select-small-label"
//                     id="demo-select-small"
//                     value={reason}
//                     label="Reason"
//                     onChange={handleChange}
//                     sx={{ width: "100px" }}
//                 >
//                     <MenuItem value={'New report Sick'}>New report Sick</MenuItem>
//                     <MenuItem value={'Report Sick'}>Report Sick</MenuItem>
//                     <MenuItem value={'EX PT/EX PARADE'}>EX PT/EX PARADE</MenuItem>
//                     <MenuItem value={'Hospital'}>Hospital</MenuItem>
//                     <MenuItem value={'M1 Room'}>M1 Room</MenuItem>
//                     <MenuItem value={'SD/LD'}>SD/LD</MenuItem>
//                     <MenuItem value={'Leave'}>Leave</MenuItem>
//                     <MenuItem value={'Medicle Leave'}>Medicle Leave</MenuItem>
//                     <MenuItem value={'Workout'}>Workout</MenuItem>
//                     <MenuItem value={'Theory/Practicle'}>Theory/Practicle</MenuItem>
//                     <MenuItem value={'Sports'}>Sports</MenuItem>
//                     <MenuItem value={'Other'}>Other</MenuItem>
//                 </Select>
//             </FormControl>
//         )}
//         <br/>
//         <button>Submit</button>
//     </div>
//   )
// }

// export default Soldiar

import React, { useEffect, useState } from 'react';
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
    const selectedUser = useSelector((state: RootState) => state.user.userData);
    const dispatch = useDispatch();

    const [reason, setReason] = useState('');
    const [showSelect, setShowSelect] = useState<boolean>(false);
    const [onParade, setOnParade] = useState<boolean>(true); // Initially set to true

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedDate(event.target.value));
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'OnParade'; // Check if "Yes, I have participated" is selected
        setOnParade(value); // Update onParade state based on the selected value
        setShowSelect(!value); // Update showSelect state based on the selected value
    };

    const handleChange = (event: SelectChangeEvent) => {
        setReason(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    onPerad: onParade, // Pass onParade state
                    notOnPerad: !onParade, // Calculate notOnPerad state
                    reason,
                    date: selectedDate,
                    userId: selectedUser?.id,
                }),
            });

            if (response.ok) {
                // Update component state or dispatch any redux actions if needed
                console.log('Attendance submitted successfully');
            } else {
                console.error('Failed to submit attendance');
            }
        } catch (error) {
            console.error('Error submitting attendance:', error);
        }
    };

    return (
        <div>
            <h3>Name : {selectedUser?.name}</h3>
            <h3>Rank : Soldier</h3>

            <button>Logout</button>
            <br />

            <input type="date" id="datePicker" value={selectedDate} onChange={handleDateChange} />
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
            <br />

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
                    <MenuItem value={'New report Sick'}>New report Sick</MenuItem>                   <MenuItem value={'Report Sick'}>Report Sick</MenuItem>
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
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Soldiar;
