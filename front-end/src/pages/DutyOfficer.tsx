import React, { useEffect, useState } from 'react'
import { RootState } from '../redux/store';
import { setSelectedDate } from '../redux/slice/dateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';

function DutyOfficer() {
  const [attendanceStats, setAttendanceStats] = useState({
    onPerad: 0,
    notOnPerad: 0,
    absent: 0,
    total: 0
});
    const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
    const dispatch = useDispatch();

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
  
  useEffect(() => {
    fetchData(selectedDate);
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
              <Grid item lg={3} xs={6} md={4} sx={{backgroundColor:"#EADBC8"}}>
                <div style={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
                  <p style={{paddingLeft:"25px", fontWeight:"500"}}>On Parade <br/>Participants</p>  
                  <h1 style={{paddingLeft:"35px", color:"#C68D4D", fontSize:"46px"}}>{attendanceStats.onPerad}</h1>               
                </div>
              </Grid>
              <Grid item lg={3} xs={6} md={4} sx={{backgroundColor:"#DAC0A3"}}>
                <div style={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
                  <p style={{paddingLeft:"25px", fontWeight:"500"}}>Not on Parade<br/>Participants</p>  
                  <h1 style={{paddingLeft:"35px", color:"#C68D4D", fontSize:"46px"}}>{attendanceStats.notOnPerad}</h1>               
                </div>
              </Grid>
              <Grid item lg={3} xs={6} md={8} sx={{backgroundColor:"#EADBC8"}}>
                <div style={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
                  <p style={{paddingLeft:"25px", fontWeight:"500"}}>Non Responded <br/>Participants</p>  
                  <h1 style={{paddingLeft:"35px", color:"#C68D4D", fontSize:"46px"}}>{attendanceStats.absent}</h1>               
                </div>
              </Grid>
            </Grid>
          </Box>
    </div>
  )
}

export default DutyOfficer