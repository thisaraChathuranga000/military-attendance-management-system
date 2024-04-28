import React from 'react'
import { RootState } from '../redux/store';
import { setSelectedDate } from '../redux/slice/dateSlice';
import { useDispatch, useSelector } from 'react-redux';

function DutyOfficer() {
    const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
    const dispatch = useDispatch();

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedDate(event.target.value));
    };
  return (
    <div>
        <h3>Rank : Duty Officer</h3>
        <button>Logout</button><br />

        <input type="date" id="datePicker" value={selectedDate} onChange={handleDateChange}/>
        <br />

        <p>Total count</p>
        <p>on perad count</p>
        <p>Not on perad count</p>
        <p>absent count</p>
    </div>
  )
}

export default DutyOfficer