import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../interfaces/User';
import { UUO, DutyOfficer, UDC, NoUser } from '../data/User';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData[]>([]);
  const [selectedRank, setSelectedRank] = useState<string>('Soldier');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: UserData[] = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = (users: any, redirectPath: string) => {
    const user = users.find((user: any) => user.userName === username && user.password === password);
    if (user) {
      dispatch(login(user));
      navigate(redirectPath);
      console.log('Logged in');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleRankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRank(event.target.value);
  };

  const handleSignIn = () => {
    switch (selectedRank) {
      case 'Soldier':
        handleLogin(userData, '/soldiar');
        break;
      case 'UUO':
        handleLogin(UUO, '/uuo');
        break;
      case 'Duty Officer':
        handleLogin(DutyOfficer, '/duty-officer');
        break;
      case 'UDC':
        handleLogin(UDC, '/udc');
        break;
      default:
        break;
    }
  };

  const handleSignUp = () => {
    dispatch(login(NoUser));
    navigate('./sign-up')
  };

  return (
    <div>
      <h2>Sign In</h2>
      <br />

      <label>Rank</label>
      <select name="rank" id="rank" value={selectedRank} onChange={handleRankChange}>
        <option value="Soldier">Soldier</option>
        <option value="UUO">UUO</option>
        <option value="Duty Officer">Duty Officer</option>
        <option value="UDC">UDC</option>
      </select>
      <br />

      <label>UserName</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />

      <label>Password</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />

      <button onClick={handleSignIn}>Sign In</button>

      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignIn;
