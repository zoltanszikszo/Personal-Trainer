import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

const CalendarList = () => {
    
  const [calendar, setCalendar] = useState([
    {
        date: "",
        duration: "",
        activity: "",
        customer: "",
    },
  ]);

  useEffect(() => {
    calendarFetch();
  }, []);

  const calendarFetch = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then((res) => res.json())
      .then((data) =>
        setCalendar(
          data.map((data) => ({
            date: data.date,
            duration: data.duration,
            activity: data.activity,
            customer: data.customer.firstname + " " + data.customer.lastname,
          }))
        )
      )
      .catch((error) => console.error(error));
  };
  return (
    <div
      style={{
        marginTop: '80px',
        margin: "auto",
        height: 'auto',
        width: '100%',
      }}
    >
      <FullCalendar
        eventColor="#2196f3"
        eventDisplay="block"
        events={calendar.map((training) => ({
          date: training.date,
          title:
            `${training.customer} ${training.activity} ${training.duration} minutes`,
        }))}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        editable={true}
        weekNumbers={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
      />
    </div>
  );
}

export default CalendarList