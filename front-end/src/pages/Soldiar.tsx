import React, { useState } from 'react';
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
import { Box, Button, FormHelperText, Grid } from '@mui/material';
import { logout } from '../redux/slice/authSlice';

function Soldier() {
    const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
    const selectedUser = useSelector((state: RootState) => state.user.userData);
    const dispatch = useDispatch();

    const [reason, setReason] = useState('');
    const [showSelect, setShowSelect] = useState<boolean>(false);
    const [onParade, setOnParade] = useState<boolean>(true);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedDate(event.target.value));
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === 'OnParade';
        setOnParade(value);
        setShowSelect(!value);
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
                    onPerad: onParade,
                    notOnPerad: !onParade,
                    reason,
                    date: selectedDate,
                    userId: selectedUser?.id,
                }),
            });

            if (response.ok) {
                alert('Attendance submitted successfully');
            } else {
                alert('Failed to submit attendance');
            }
        } catch (error) {
            console.error('Error submitting attendance:', error);
        }

        
    };

    const handleLogOut = () => {
        window.location.replace('http://localhost:3000')
        dispatch(logout())
    };

    return (
        <div>
            <Box>
                <Grid container sx={{backgroundColor:"#C68D4D"}}>
                    <Grid  item lg={6} md={6} xs={12} container sx={{pl:10, pt:5, pb:5, display:"flex", flexDirection:"column" }}>
                        <div style={{color:"#FFD9AF", display:"flex", flexDirection:"row", alignItems:"center"}}>
                            <img src="assets/images/largeLogo.png" alt="" width="100px" style={{paddingRight:25}}/>
                            <div style={{display:"flex", flexDirection:"column"}}>
                                <h2 style={{fontSize:"30px",margin: "0"  }}>Military Connect</h2>
                                <p style={{margin: "0", fontSize:"20px" }}>Attendance System for Military Users</p>
                            </div>
                        </div>
                    </Grid>

                    <Grid  item lg={6} md={6} xs={12} container sx={{pr:10, pt:5,  display:"flex", flexDirection:"column", backgroundImage: "url('assets/images/pattern.png')", color:"white",alignContent:"flex-end"}}>
                        <div style={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
                            <img src="assets/images/Avatar.png" alt="" width="50px" style={{paddingRight:15}}/>
                            <div style={{display:"flex", flexDirection:"column", paddingRight:15}}>
                            <p style={{margin:"0"}}>{selectedUser?.name}</p>
                            <p style={{margin:"0"}}>Rank : Soldier</p>
                            </div>
                            <img src="assets/images/Icon.png" alt="" width="20px" onClick={handleLogOut}/>
                        </div>
                    </Grid>
                </Grid>
            </Box>

            <Box>
                <div style={{paddingTop:40, paddingLeft:60}}> 
                <input type="date" id="datePicker" value={selectedDate} onChange={handleDateChange} style={{ padding:5, border:"1px solid #C68D4D", borderRadius:"5px", marginBottom:30}} />
                <div style={{display:"flex", flexDirection:"row"}}>
                    <div style={{marginRight:"200px"}}>
                        <p style={{fontWeight:"600", margin:"0"}}>Parade Participation *</p>
                        <p style={{margin:"0"}}>Select your parade participation status</p>
                    </div>

                    <div style={{display:"flex", flexDirection:"column"}}>
                    <FormControl sx={{marginBottom:2}}>
                        <FormLabel id="demo-radio-buttons-group-label">Parade Participation</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="OnParade"
                            name="radio-buttons-group"
                            onChange={handleRadioChange}
                        >
                            <FormControlLabel value="OnParade" control={<Radio />} label="Yes, I have participated" />
                            <FormHelperText sx={{margin:0}}>{`(Please select this option if you successfully engaged in the parade.)`}</FormHelperText>
                            <FormControlLabel value="NotOnParade" control={<Radio />} label="No, I was unable to participate" />
                            <FormHelperText sx={{margin:0}}>{`(Please select this option if you successfully engaged in the parade.)`}</FormHelperText>
                        </RadioGroup>
                    </FormControl>

                    {showSelect && (
                        <FormControl sx={{marginBottom:2}}>
                            <InputLabel id="demo-pselect-small-label">Reason</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={reason}
                                label="Reason"
                                onChange={handleChange}
                                sx={{ maxWidth:450 }}
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

                    <Button variant="contained" sx={{maxWidth:150, backgroundColor:"#C68D4D"}} onClick={handleSubmit}>
                        Submit
                    </Button>
                    </div>
                </div>
                </div>
            </Box>
        </div>
    );
}

export default Soldier;
