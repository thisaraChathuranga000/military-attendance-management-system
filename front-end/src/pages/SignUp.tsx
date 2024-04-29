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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
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
      <h2>Sign Up</h2>
      <br />

      <label>UserName</label>
      <input type="text" name="userName" onChange={handleChange} />
      <br />

      <label>Password</label>
      <input type="password" name="password" onChange={handleChange} />
      <br />

      <label>Name</label>
      <input type="text" name="name" onChange={handleChange} />
      <br />

      <label>SVC</label>
      <input type="text" name="svcNo" onChange={handleChange} />
      <br />

      <label>Intake</label>
      <input type="text" name="intake" onChange={handleChange} />
      <br />

      <label>Platoon</label>
      <select name="platoon" id="platoon" onChange={handleChange}>
        <option value="Alpha">Alpha</option>
        <option value="Beta">Beta</option>
        <option value="Cobra">Cobra</option>
        <option value="Delta">Delta</option>
      </select>

      <button onClick={handleSubmit}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default SignUp;
