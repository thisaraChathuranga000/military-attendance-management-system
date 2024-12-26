import React, { useEffect, useState } from 'react'
import { RootState } from '../redux/store';
import { setSelectedDate } from '../redux/slice/dateSlice';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import { Box, Button, FormControl,  FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from '@mui/material';
import ParticipantTable from '../component/ParticipantTable';
import { listProps } from '../component/ParticipantTable';
import AbsentParticipantTable, { AbsentAttendedParticipantListProps, AbsentNotAttendedParticipantListProps } from '../component/AbsentParticipantTable';
import { logout } from '../redux/slice/authSlice';
import { 
  useGetAttendanceStatsQuery, 
  useGetAttendedUserDataQuery, 
  useGetNotAttendedUserDataQuery, 
  useGetNotAttendedUserDataReasonQuery,
  useGetAbsentAttendedUserDataQuery,
  useGetAbsentNotAttendedUserDataQuery,
  useGetAbsentNotAttendedUserDataReasonQuery
 } from '../redux/services/Attendance';

function Udc() {
  const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({svcNo: '',intake: '',platoon: 'Alpha'});
  const [open, setOpen] = useState<boolean>(false);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [onParade, setOnParade] = useState<boolean>(true);
  const [openOnParadeList, setOpenOnParadeList] = useState<boolean>(false);
  const [showOnParade, setShowOnParade] = useState<boolean>(false);
  const [openNotOnParadeList, setOpenNotOnParadeList] = useState<boolean>(false);
  const [showNotOnParade, setShowNotOnParade] = useState<boolean>(false);
  const [showAbsentUsers, setShowAbsentUsers] = useState<boolean>(false);
  const [openAbsentUsersList, setOpenAbsentUsersList] = useState<boolean>(false);

  const { data:attendance, error:attendanceError, isLoading:attendanceIsLoading } = useGetAttendanceStatsQuery(selectedDate);
  const { data:attendedUsersData, error:attendedUsersError, isLoading:attendedUsersIsLoading } = useGetAttendedUserDataQuery(selectedDate);
  const { data:notAttendedUsersData, error:notAttendedUsersError, isLoading:notAttendedUsersIsLoading } = useGetNotAttendedUserDataQuery(selectedDate);
  const { data:notAttendedUsersDataReason, error:notAttendedUsersReasonError, isLoading:notAttendedUsersReasonIsLoading } = useGetNotAttendedUserDataReasonQuery(selectedDate);
  const { data:absentAttendedUserData, error:absentAttendedUserDataError, isLoading:absentAttendedUserDataIsLoading } = useGetAbsentAttendedUserDataQuery(selectedDate);
  const { data:absentNotAttendedUserData, error:absentNotAttendedUserDataError, isLoading:absentNotAttendedUserDataIsLoading } = useGetAbsentNotAttendedUserDataQuery(selectedDate);
  const { data:absentNotAttendedUserDataReason, error:absentNotAttendedUserDataReasonError, isLoading:absentNotAttendedUserDataReasonIsLoading } = useGetAbsentNotAttendedUserDataReasonQuery(selectedDate);

  const handleCloseOnParadeList = () => {setOpenOnParadeList(false)};
  const handleCloseNotOnParadeList = () => {setOpenNotOnParadeList(false)};
  const handleClickNotOpenAbsentList = () => {setOpenAbsentUsersList(false)};
  const handleClickOpen = () => {setOpen(true);};
  const handleClose = () => {setOpen(false);};

  const handleClickOpenOnParadeList = () => {
    setOpenOnParadeList(true);
    setShowOnParade(true);
  };
  
  const handleClickOpenNotOnParadeList = () => {
    setOpenNotOnParadeList(true);
    setShowNotOnParade(true);
  }
  
  const handleClickOpenAbsentList = () => {
    setOpenAbsentUsersList(true);
    setShowAbsentUsers(true);
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedDate(event.target.value));
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === 'OnParade';
    setOnParade(value);
    setShowSelect(!value);

    if (value) {
      setReason('');
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
        const response = await fetch(`http://localhost:5000/attendance/update/${selectedUserId}/${selectedDate}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                onPerad: onParade,  
                notOnPerad: !onParade,
                reason,
                absent:true
            }),
        });

        if (response.ok) {
            alert('Attendance updated successfully');
        } else {
            alert('Failed to update attendance');
        }
    } catch (error) {
        console.error('Error submitting attendance:', error);
    }
  };

  useEffect(() => {
    fetchUserId(formData.svcNo,formData.platoon, formData.intake);
  }, [formData.svcNo,formData.platoon, formData.intake]);

  const handleChange = (e: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogOut = () => {
    window.location.replace('http://localhost:3000')
    dispatch(logout())
  };

  const handleReasonChange = (event: SelectChangeEvent) => {
    setReason(event.target.value);
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
                            <p style={{margin:"0"}}>Rank : Udc</p>
                            </div>
                            <img src="assets/images/Icon.png" alt="" width="20px" onClick={handleLogOut}/>
                        </div>
                    </Grid>
                </Grid>
          </Box>

          <Box sx={{py:6, pl:6, pr:6}}>
            <Grid container spacing={0}>
              <Grid item lg={6} xs={6} md={6}>
                  <div>
                    <p style={{fontSize:"20px", fontWeight:"600", margin:"0"}}>Parade Count</p>
                    <p style={{fontWeight:"400", marginTop:"5px"}}>Summary View of Parade Participants</p>
                  </div>
              </Grid>

              <Grid item lg={6} xs={6} md={6} container direction="row" justifyContent="flex-end" alignItems="center">
                  <Button variant="contained" sx={{maxWidth:350, backgroundColor:"#C68D4D", alignContent:"flex-end"}} onClick={handleClickOpen}>
                    update
                  </Button>
              </Grid>
            </Grid>
             
            <input type="date" id="datePicker" value={selectedDate} onChange={handleDateChange} style={{ padding:5, border:"1px solid #C68D4D", borderRadius:"5px", marginBottom:30}} />

            {attendanceError ? (
              <>Oh no, there was an error</>
            ) : attendanceIsLoading ? (
              <>Loading...</>
            ) : attendance ? (
              <Grid container spacing={0}>
                <Grid item lg={3} xs={6} md={8} sx={{backgroundColor:"#DAC0A3"}}>
                  <div style={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <p style={{paddingLeft:"25px", fontWeight:"500"}}>Total <br/>Participants</p>  
                    <h1 style={{paddingLeft:"35px", color:"#C68D4D", fontSize:"46px"}}>{attendance.total}</h1>               
                  </div>
                </Grid>

                <Grid item lg={3} xs={6} md={4} sx={{backgroundColor:"#EADBC8"}} onClick={handleClickOpenOnParadeList}>
                  <div style={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <p style={{paddingLeft:"25px", fontWeight:"500"}}>On Parade <br/>Participants</p>  
                    <h1 style={{paddingLeft:"35px", color:"#C68D4D", fontSize:"46px"}}>{attendance.onPerad}</h1>               
                  </div>
                </Grid>

                <Grid item lg={3} xs={6} md={4} sx={{backgroundColor:"#DAC0A3"}} onClick={handleClickOpenNotOnParadeList}>
                  <div style={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <p style={{paddingLeft:"25px", fontWeight:"500"}}>Not on Parade<br/>Participants</p>  
                    <h1 style={{paddingLeft:"35px", color:"#C68D4D", fontSize:"46px"}}>{attendance.notOnPerad}</h1>               
                  </div>
                </Grid>

                <Grid item lg={3} xs={6} md={8} sx={{backgroundColor:"#EADBC8"}} onClick={handleClickOpenAbsentList}>
                  <div style={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <p style={{paddingLeft:"25px", fontWeight:"500"}}>Non Responded <br/>Participants</p>  
                    <h1 style={{paddingLeft:"35px", color:"#C68D4D", fontSize:"46px"}}>{attendance.absent}</h1>               
                  </div>
                </Grid>
              </Grid>
            ) : null} 
          </Box>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box sx={{py:4, pl:4 , pr:2}}>
                <div style={{marginBottom:"20px"}}>
                  <p style={{fontSize:"20px", fontWeight:"600", margin:"0"}}>Update Participation</p>
                </div>

                <div style={{display:"flex", flexDirection:"column"}}>
                  <p style={{fontWeight:"500"}}>SVC</p>
                  <TextField fullWidth label="Enter SVC number" id="fullWidth" sx={{maxWidth:350 ,marginBottom:"10px"}} name="svcNo" onChange={handleChange}/>

                  <p style={{fontWeight:"500"}}>Platoon</p>
                  <FormControl sx={{ maxWidth:350, marginBottom:"10px" }}>
                    <Select
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      onChange={handleChange}
                      name="platoon"
                    >
                      <MenuItem defaultValue={"Alpha"}>Alpha</MenuItem>
                      <MenuItem value={"Beta"}>Beta</MenuItem>
                      <MenuItem value={"Cobra"}>Cobra</MenuItem>
                      <MenuItem value={"Delta"}>Delta</MenuItem>
                    </Select>
                  </FormControl>

                  <p style={{fontWeight:"500"}}>Intake</p>
                  <TextField fullWidth label="Enter Intake" id="fullWidth" sx={{maxWidth:350 ,marginBottom:"20px"}} name="intake" onChange={handleChange}/>

                  <div style={{display:"flex", flexDirection:"column"}}>
                      <div style={{marginRight:"200px", marginBottom:"10px"}}>
                          <p style={{fontWeight:"600", margin:"0"}}>Parade Participation *</p>
                      </div>

                      <div style={{display:"flex", flexDirection:"column"}}>
                      <FormControl sx={{marginBottom:2}}>
                          <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue="OnParade"
                              name="radio-buttons-group"
                              onChange={handleRadioChange}
                          >
                              <FormControlLabel value="OnParade" control={<Radio />} label="Participated" />
                              <FormControlLabel value="NotOnParade" control={<Radio />} label="Not participated" />
                          </RadioGroup>
                      </FormControl>

                      {showSelect && (
                          <FormControl sx={{marginBottom:2}}>
                              <InputLabel id="demo-prelect-small-label">Reason</InputLabel>
                              <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={reason}
                                  label="Reason"
                                  onChange={handleReasonChange}
                                  sx={{ maxWidth:450 }}
                              >
                                  <MenuItem value={'New report Sick'}>New report Sick</MenuItem>                   
                                  <MenuItem value={'Report Sick'}>Report Sick</MenuItem>
                                  <MenuItem value={'EX PT/EX PARADE'}>EX PT/EX PARADE</MenuItem>
                                  <MenuItem value={'Hospital'}>Hospital</MenuItem>
                                  <MenuItem value={'M1 Room'}>M1 Room</MenuItem>
                                  <MenuItem value={'SD/LD'}>SD/LD</MenuItem>
                                  <MenuItem value={'Leave'}>Leave</MenuItem>
                                  <MenuItem value={'Medical Leave'}>Medical Leave</MenuItem>
                                  <MenuItem value={'Workout'}>Workout</MenuItem>
                                  <MenuItem value={'Theory/Practical'}>Theory/Practical</MenuItem>
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
          </Dialog>

        {showOnParade && attendedUsersError ? (
            <p>error</p>
          ): attendedUsersIsLoading ? (
            <p>Loading...</p>
          ): attendedUsersData ? (
            <ParticipantTable 
              open={openOnParadeList} 
              title={'On Parade Participation'} 
              handleClose={handleCloseOnParadeList}
              list={attendedUsersData}
            />
          ) : null
        }

        {showNotOnParade && notAttendedUsersError && notAttendedUsersReasonError ? (
            <p>error</p>
          ) : notAttendedUsersIsLoading && notAttendedUsersReasonIsLoading ? (
            <p>Loading...</p>
          ) : notAttendedUsersData && notAttendedUsersDataReason ? (
            <ParticipantTable 
              open={openNotOnParadeList} 
              title={'Not on Parade Participation'} 
              handleClose={handleCloseNotOnParadeList} 
              showReason={true}
              list={notAttendedUsersData.map((user, index) => ({
                ...user,
                reason: notAttendedUsersDataReason[index]?.reason
              }))}
            />
          ) : null
        }

        {showAbsentUsers && absentAttendedUserDataError && absentNotAttendedUserDataError && absentNotAttendedUserDataReasonError ? (
            <p>error</p>
          ) : absentAttendedUserDataIsLoading && absentNotAttendedUserDataIsLoading && absentNotAttendedUserDataReasonIsLoading ? (
            <p>Loading...</p>
          ) : absentAttendedUserData && absentNotAttendedUserData && absentNotAttendedUserDataReason ? (
            <AbsentParticipantTable 
              open={openAbsentUsersList} 
              handleClose={handleClickNotOpenAbsentList} 
              attendedList={absentAttendedUserData}
              notAttendedList={absentNotAttendedUserData.map((user, index) => ({
                ...user,
                reason: absentNotAttendedUserDataReason[index]?.reason
              }))}
              showReason={true}
            />
          ) : null
        }

 
    </div>
  )
}

export default Udc
 