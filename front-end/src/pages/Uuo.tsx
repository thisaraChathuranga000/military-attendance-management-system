import React, { useState } from 'react';
import { RootState } from '../redux/store';
import { setSelectedDate } from '../redux/slice/dateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import ParticipantTable from '../component/ParticipantTable';
import AbsentParticipantTable from '../component/AbsentParticipantTable';
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

function Uuo() {
    const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
    const dispatch = useDispatch();
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
                            <p style={{margin:"0"}}>Rank : UUO</p>
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
    );
}

export default Uuo;
