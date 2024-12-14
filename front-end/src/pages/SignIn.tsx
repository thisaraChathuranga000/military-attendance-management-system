import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, setUserType } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { UserData } from "../interfaces/User";
import { UUO, DutyOfficer, UDC, NoUser } from "../data/User";
import { setSelectedUserData } from "../redux/slice/userSlice";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import SignUp from "./SignUp";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData[]>([]);
  const [selectedRank, setSelectedRank] = useState<string>("Soldier");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: UserData[] = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = (users: any, redirectPath: string, userType:String) => {
    const user = users.find(
      (user: any) => user.userName === username && user.password === password
    );
    if (user) {
      dispatch(login(user));
      dispatch(setUserType(userType));
      navigate(redirectPath);
      console.log("Logged in");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleRankChange = (event: SelectChangeEvent) => {
    setSelectedRank(event.target.value);
  };

  const handleSignIn = () => {
    switch (selectedRank) {
      case "Soldier":
        const user: any = userData.find(
          (user) => user.userName === username && user.password === password
        );
        dispatch(setSelectedUserData(user));
        handleLogin(userData, "/soldier", "soldier");
        break;
      case "UUO":
        handleLogin(UUO, "/uuo", "uuo");
        break;
      case "Duty Officer":
        handleLogin(DutyOfficer, "/duty-officer", "duty-officer");
        break;
      case "UDC":
        handleLogin(UDC, "/udc", "udc");
        break;
      default:
        break;
    }
  };

  const handleSignUp = () => {
    dispatch(login(NoUser));
    navigate("./sign-up");
  };

  return (
    <div>
      {showSignUp ? (
        <SignUp />
      ) : (
        <Box>
          <Grid container style={{ height: "100vh" }}>
            <Grid
              item
              lg={6}
              md={6}
              xs={12}
              container
              sx={{ pl: 10, pt: 5, display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", alignItems: "center" }} id="image">
                <img src="assets/images/logo.png" alt="" />
                <Typography variant="h5" component="div">
                  Military Connect
                </Typography>
              </div>

              <div>
                <h2>Sign in</h2>
                <p>Welcome! Please enter your details.</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "15px" }}>Rank</label>
                <FormControl sx={{ maxWidth: 350, marginBottom: "20px" }}>
                  <Select
                    value={selectedRank}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={handleRankChange}
                  >
                    <MenuItem value={"Soldier"}>Soldier</MenuItem>
                    <MenuItem value={"UUO"}>UUO</MenuItem>
                    <MenuItem value={"Duty Officer"}>Duty Officer</MenuItem>
                    <MenuItem value={"UDC"}>UDC</MenuItem>
                  </Select>
                </FormControl>

                <label style={{ marginBottom: "15px" }}>User Name</label>
                <TextField
                  fullWidth
                  label="Enter your user name"
                  id="fullWidth"
                  sx={{ maxWidth: 350, marginBottom: "20px" }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label style={{ marginBottom: "15px" }}>Password</label>
                <TextField
                  type="password"
                  fullWidth
                  label="Enter your Password"
                  id="fullWidth"
                  sx={{ maxWidth: 350, marginBottom: "20px" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  variant="contained"
                  sx={{ maxWidth: 350, backgroundColor: "#C68D4D" }}
                  onClick={handleSignIn}
                >
                  Sign in
                </Button>

                {/* <p style={{textAlign:"center", maxWidth:350,}}>Don’t have an account? <span style={{color:"#C68D4D", fontWeight:"500px"}} onClick={handleSignUp}>Sign up</span></p> */}
                <p style={{ textAlign: "center", maxWidth: 350 }}>
                  Don’t have an account?{" "}
                  <span
                    style={{ color: "#C68D4D", fontWeight: "500px" }}
                    onClick={() => setShowSignUp(true)}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </Grid>

            <Grid
              item
              lg={6}
              md={6}
              xs={12}
              container
              sx={{
                backgroundColor: "#C68D4D",
                pl: 20,
                pt: 20,
                backgroundImage: "url('assets/images/pattern.png')",
              }}
            >
              <div
                style={{
                  color: "#FFD9AF",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img src="assets/images/largeLogo.png" alt="" width="200px" />
                <h2 style={{ fontSize: "46px", margin: "0" }}>
                  Military Connect
                </h2>
                <p style={{ margin: "0", fontSize: "20px" }}>
                  Attendance System for Military Users
                </p>
              </div>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default SignIn;
