import { Box, Button, FormControl, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

function SignUp() {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    svcNo: '',
    name: '',
    intake: '',
    platoon: 'Alpha'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement| HTMLTextAreaElement> | SelectChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        window.location.replace('http://localhost:3000/sign-in')
      } else {
        console.error('Failed to sign up:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred during sign-up:', error);
    }
  };

  const handleSignIn = () => {
    window.location.replace('http://localhost:3000/sign-in')
  };

  return (
    <div>
      <Box>
      <Grid container>
      <Grid  item lg={6} md={6} xs={12} container sx={{pl:10, pt:5, display:"flex", flexDirection:"column", }}>
          <div style={{display:"flex",alignItems:"center", }}>
            <img src="assets/images/logo.png" alt="" />
            <Typography variant="h5" component="div">
              Military Connect
            </Typography>
          </div>

          <div>
            <h2>Sign Up</h2>
            <p>Let’s create your account ! Please enter your details.</p>
          </div>

          <div style={{display:"flex", flexDirection:"column"}}>
            <label style={{marginBottom:"15px"}}>User Name</label>
            <TextField fullWidth label="Enter your user name" id="fullWidth" sx={{maxWidth:350 ,marginBottom:"20px"}} name="userName" onChange={handleChange}  />

            <label style={{marginBottom:"15px"}}>Password</label>
            <TextField fullWidth label="Enter your Password" id="fullWidth" sx={{maxWidth:350, marginBottom:"20px"}} name="password" onChange={handleChange}  />

            <label style={{marginBottom:"15px"}}>Name</label>
            <TextField fullWidth label="Enter your name here" id="fullWidth" sx={{maxWidth:350 ,marginBottom:"20px"}} name="name" onChange={handleChange}  />

            <label style={{marginBottom:"15px"}}>SVC</label>
            <TextField fullWidth label="Enter your svc no here" id="fullWidth" sx={{maxWidth:350, marginBottom:"20px"}} name="svcNo" onChange={handleChange}   />

            <label style={{marginBottom:"15px"}}>Intake</label>
            <TextField fullWidth label="Enter your intake here" id="fullWidth" sx={{maxWidth:350, marginBottom:"20px"}} name="intake" onChange={handleChange}   />

            <label style={{marginBottom:"15px"}}>Rank</label>
            <FormControl sx={{ maxWidth:350, marginBottom:"20px" }}>
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

            <Button variant="contained" sx={{maxWidth:350, backgroundColor:"#C68D4D"}} onClick={handleSubmit}>
              Sign up
            </Button>

            <p style={{textAlign:"center", maxWidth:350,}}>Already have an account? <span style={{color:"#C68D4D", fontWeight:"500px"}} onClick={handleSignIn}>Sign in</span></p>
          </div>
      </Grid>

      <Grid  item lg={6} md={6} xs={12} container sx={{backgroundColor:"#C68D4D", pl:20, pt:20, backgroundImage: "url('assets/images/pattern.png')"}}>
          <div style={{color:"#FFD9AF", display:"flex", flexDirection:"column"}}>
            <img src="assets/images/largeLogo.png" alt="" width="200px"/>
            <h2 style={{fontSize:"46px",margin: "0"  }}>Military Connect</h2>
            <p style={{margin: "0", fontSize:"20px" }}>Attendance System for Military Users</p>
          </div>
        </Grid>
      </Grid>
      </Box>
    </div>
  );
}

export default SignUp;
