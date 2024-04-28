import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';

interface UserData {
  id: number;
  userName: string;
  password: string;
  svcNo: string;
  name: string;
  intake: string;
  platoon: string;
}

function SignIn() {
  const [postData, setPostData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: UserData[] = await response.json();
        setPostData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // You might want to set an empty array or handle the error differently
      }
    };

    fetchData();
  }, []);
  return (
    <div>
        <h2>Sign In</h2>
        <br />

        <label>Rank</label>
        <select name="rank" id="rank">
            <option value="Soldier">Soldier</option>
            <option value="UUO">UUO</option>
            <option value="Duty Office">Duty Office</option>
            <option value="UDC">UDC</option>
        </select>
        <br/>

        <label>UserName</label>
        <input type="text" />
        <br />

        <label>Password</label>
        <input type='password'/>
        <br/>

        <button>Sign In</button>

        

         

    </div>
  )
}

export default SignIn