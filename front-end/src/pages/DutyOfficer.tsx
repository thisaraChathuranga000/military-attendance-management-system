import React, { useEffect, useState } from 'react'
import { RootState } from '../redux/store';
import { setSelectedDate } from '../redux/slice/dateSlice';
import { useDispatch, useSelector } from 'react-redux';

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
  return (
    <div>
        <h3>Rank : Duty Officer</h3>
        <button>Logout</button><br />

        <input type="date" id="datePicker" value={selectedDate} onChange={handleDateChange}/>
        <br />

        <p>Total count: {attendanceStats.total}</p>
            <p>on perad count: {attendanceStats.onPerad}</p>
            <p>Not on perad count: {attendanceStats.notOnPerad}</p>
            <p>Absent count: {attendanceStats.absent}</p>
    </div>
  )
}

export default DutyOfficer