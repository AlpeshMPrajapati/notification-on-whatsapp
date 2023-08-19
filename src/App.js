import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker';

function App() {
  const [reminderMsg, setReminderMsg] = useState("")
  const [remindAt, setRemindAt] = useState();
  const [reminderList,setReminderList] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:8000/getAllReminder').then(res =>setReminderList(res.data))
  },[])

  const addReminder = () => {
    axios.post('http://localhost:8000/addReminder',{reminderMsg,remindAt}).then(res => setReminderList(res.data))
  }

  const deleteReminder = (id)=>{
    axios.post('http://localhost:8000/deleteReminder',{id}).then(res => setReminderList(res.data))
  }


  return (
    <div className='App'>
      <div className="homepage">
        <div className="header">
          <h1>Remind Me 🙋‍♂️</h1>
          <input type="text" name="" placeholder='Reminder notes here...' value={reminderMsg} onChange={(e) => setReminderMsg(e.target.value)} id="" />
          <DateTimePicker
            value={remindAt}
            onChange={setRemindAt}
            minDate={new Date()}
            hourPlaceholder="hh"
            minutePlaceholder='mm'
            dayPlaceholder='DD'
            monthPlaceholder='MM'
            yearPlaceholder='YYYY'
          />
          <div className="button" onClick={addReminder}>Add Reminder</div>
        </div>

        <div className="msgCards">
          {
            reminderList.map( reminder => {
              return (<div key={reminder._id} className="msgCard">
                <h2>{reminder.reminderMsg}</h2>
                {/* {console.log(reminder)} */}
                <h3>Reminde Me : </h3>
                {reminder.remindAt ? (
                  <p>{new Date(reminder.remindAt).toLocaleString(undefined, { timezone: 'Asia/Kolkata' })}</p>
                ) : null}
                <div className="button" onClick={()=>deleteReminder(reminder._id)}>Delete</div>
            </div>)
            })
          }

        </div>
      </div>
    </div>
  )
}

export default App
