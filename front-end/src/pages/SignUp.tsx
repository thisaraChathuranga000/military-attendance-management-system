import React from 'react'

function SignUp() {
  return (
    <div>
        <h2>Sign Up</h2>
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

        <label>Confirm Password</label>
        <input type='password'/>
        <br/>

        <label>Name</label>
        <input type="text" />
        <br />

        <label>SVC</label>
        <input type="text" />
        <br />

        <label>Intake</label>
        <input type="text" />
        <br />

        <label>Platoon</label>
        <select name="Platoon" id="Platoon">
            <option value="Alpha">Alpha</option>
            <option value="Beta">Beta</option>
            <option value="Cobra">Cobra</option>
            <option value="Delta">Delta</option>
        </select>

        <button>Sign Up</button>

    </div>
  )
}

export default SignUp