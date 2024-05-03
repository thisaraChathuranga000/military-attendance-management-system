import React, { useEffect, useState } from 'react'
import { RootState } from '../redux/store';
import { setSelectedDate } from '../redux/slice/dateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import ParticipantTable from '../component/ParticipantTable';
import { listProps } from '../component/ParticipantTable';
import AbsentParticipantTable, { AbsentAttendedParticipantListProps, AbsentNotAttendedParticipantListProps } from '../component/AbsentParticipantTable';

function DutyOfficer() {
    const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
    const dispatch = useDispatch();
    const [openOnParadeList, setOpenOnParadeList] = useState<boolean>(false);
    const [showOnParade, setShowOnParade] = useState<boolean>(false);
    const [openNotOnParadeList, setOpenNotOnParadeList] = useState<boolean>(false);
    const [showNotOnParade, setShowNotOnParade] = useState<boolean>(false);
    const [attendedUsers, setAttendedUsers] = useState<listProps[]>([]);
    const [notAttendedUsers, setNotAttendedUsers] = useState<listProps[]>([]);
    const [notAttendedReasons, setNotAttendedReasons] = useState<any[]>([]);
    const [showAbsentUsers, setShowAbsentUsers] = useState<boolean>(false);
    const [openAbsentUsersList, setOpenAbsentUsersList] = useState<boolean>(false);
    const [absentAttendedUsers, setAbsentAttendedUsers] = useState<AbsentAttendedParticipantListProps[]>([]);
    const [absentNotAttendedUsers, setAbsentNotAttendedUsers] = useState<AbsentNotAttendedParticipantListProps[]>([]);
    const [absentNotAttendedReasons, setAbsentNotAttendedReasons] = useState<any[]>([]);
    

    const handleClickOpenOnParadeList = () => {
      setOpenOnParadeList(true);
      setShowOnParade(true);
    };
    const handleCloseOnParadeList = () => {setOpenOnParadeList(false)};

    const handleClickOpenNotOnParadeList = () => {
      setOpenNotOnParadeList(true);
      setShowNotOnParade(true);
    }
    const handleCloseNotOnParadeList = () => {setOpenNotOnParadeList(false)};

    const handleClickOpenAbsentList = () => {
      setOpenAbsentUsersList(true);
      setShowAbsentUsers(true);
    }

    const handleClickNotOpenAbsentList = () => {setOpenAbsentUsersList(false)};

    
    const [attendanceStats, setAttendanceStats] = useState({
      onPerad: 0,
      notOnPerad: 0,
      absent: 0,
      total: 0
    });

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedDate(event.target.value));
        fetchData(event.target.value);
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

    const fetchAttendedUserData = async (date:string) => {
      try {
          const response = await fetch(`http://localhost:5000/attendance/attended-users/${date}`);
          if (response.ok) {
              const data = await response.json();
              setAttendedUsers(data);
          } else {
              console.error('Failed to fetch attended users data');
          }
      } catch (error) {
          console.error('Error fetching attended users data:', error);
      }
    };

    const fetchNotAttendedUserData = async (date:string) => {
      try {
          const usersResponse = await fetch(`http://localhost:5000/attendance/not-attended-users/${date}`);
          if (usersResponse.ok) {
              const usersData = await usersResponse.json();
              setNotAttendedUsers(usersData);
          } else {
              console.error('Failed to fetch not attended users data');
          }

          const reasonsResponse = await fetch(`http://localhost:5000/attendance/not-attended-users/reason/${date}`);
          if (reasonsResponse.ok) {
              const reasonsData = await reasonsResponse.json();
              setNotAttendedReasons(reasonsData);
          } else {
              console.error('Failed to fetch not attended reasons data');
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    const fetchAbsentAttendedUserData = async (date:string) => {
      try {
          const response = await fetch(`http://localhost:5000/attendance/absent/attended-users/${date}`);
          if (response.ok) {
              const data = await response.json();
              setAbsentAttendedUsers(data);
          } else {
              console.error('Failed to fetch attended users data');
          }
      } catch (error) {
          console.error('Error fetching attended users data:', error);
      }
    };

    const fetchAbsentNotAttendedUserData = async (date:string) => {
      try {
          const usersResponse = await fetch(`http://localhost:5000/attendance/absent/not-attended-users/${date}`);
          if (usersResponse.ok) {
              const usersData = await usersResponse.json();
              setAbsentNotAttendedUsers(usersData);
          } else {
              console.error('Failed to fetch not attended users data');
          }

          const reasonsResponse = await fetch(`http://localhost:5000/attendance/absent/not-attended-users/reason/${date}`);
          if (reasonsResponse.ok) {
              const reasonsData = await reasonsResponse.json();
              setAbsentNotAttendedReasons(reasonsData);
          } else {
              console.error('Failed to fetch not attended reasons data');
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchData(selectedDate)
      fetchAttendedUserData(selectedDate)
      fetchNotAttendedUserData(selectedDate)
      fetchAbsentAttendedUserData(selectedDate)
      fetchAbsentNotAttendedUserData(selectedDate)
    }, [selectedDate]);

    const handleLogOut = () => {
      window.location.replace('http://localhost:3000/sign-in')
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
                            <p style={{margin:"0"}}>Rank : Duty Officer</p>
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

            <Grid container spacing={0}>
              <Grid item lg={3} xs={6} md={8} sx={{backgroundColor:"#DAC0A3"}}>
                <div style={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
                  <p style={{paddingLeft:"25px", fontWeight:"500"}}>Total <br/>Participants</p>  
                  <h1 style={{paddingLeft:"35px", color:"#C68D4D", fontSize:"46px"}}>{attendanceStats.total}</h1>               
                </div>
              </Grid>

              <Grid item lg={3} xs={6} md={4} sx={{backgroundColor:"#EADBC8"}} onClick={handleClickOpenOnParadeList}>
                <div style={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
                  <p style={{paddingLeft:"25px", fontWeight:"500"}}>On Parade <br/>Participants</p>  
                  <h1 style={{paddingLeft:"35px", color:"#C68D4D", fontSize:"46px"}}>{attendanceStats.onPerad}</h1>               
                </div>
              </Grid>

              <Grid item lg={3} xs={6} md={4} sx={{backgroundColor:"#DAC0A3"}} onClick={handleClickOpenNotOnParadeList}>
                <div style={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
                  <p style={{paddingLeft:"25px", fontWeight:"500"}}>Not on Parade<br/>Participants</p>  
                  <h1 style={{paddingLeft:"35px", color:"#C68D4D", fontSize:"46px"}}>{attendanceStats.notOnPerad}</h1>               
                </div>
              </Grid>

              <Grid item lg={3} xs={6} md={8} sx={{backgroundColor:"#EADBC8"}} onClick={handleClickOpenAbsentList}>
                <div style={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
                  <p style={{paddingLeft:"25px", fontWeight:"500"}}>Non Responded <br/>Participants</p>  
                  <h1 style={{paddingLeft:"35px", color:"#C68D4D", fontSize:"46px"}}>{attendanceStats.absent}</h1>               
                </div>
              </Grid>
            </Grid>
          </Box>

          {showOnParade &&(
            <ParticipantTable 
              open={openOnParadeList} 
              title={'On Parade Participation'} 
              handleClose={handleCloseOnParadeList}
              list={attendedUsers}
              />
          )}

          {showNotOnParade &&(
            <ParticipantTable 
              open={openNotOnParadeList} 
              title={'Not on Parade Participation'} 
              handleClose={handleCloseNotOnParadeList} 
              showReason={true}
              list={notAttendedUsers.map((user, index) => ({
                ...user,
                reason: notAttendedReasons[index]?.reason
              }))}
            />
          )}

          {showAbsentUsers && (
            <AbsentParticipantTable 
              open={openAbsentUsersList} 
              handleClose={handleClickNotOpenAbsentList} 
              attendedList={absentAttendedUsers}
              notAttendedList={absentNotAttendedUsers.map((user, index) => ({
                ...user,
                reason: absentNotAttendedReasons[index]?.reason
              }))}
              showReason={true}
              />
          )}
    </div>
  )
}

export default DutyOfficer