import React from 'react'

function SignIn() {
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