import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const Stat = () => {
  const [values, setValues] = useState([
    {
      activity: "",
      duration: "",
    },
  ]);

  const library = require("lodash");

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(res => res.json())
      .then((data) =>
        setValues(
          data.map((data) => ({
            activity: data.activity,
            duration: data.duration,
          }))
        )
      )
      .catch((err) => console.error(err));
  };

  const calculate = library(values)
    .groupBy("activity")
    .map((obj, key) => ({
      activity: key,
      duration: library.sumBy(obj, "duration"),
    }))
    .value();

  return (
    <BarChart
      width={800}
      height={800}
      data={calculate}
      style={{ margin: "200px" }}
    >
      <XAxis dataKey="activity" />
      <YAxis
        datakey="duration"
        label={{ value: "Duration (Minutes)", angle: -90, position: "insideLeft" }}
      />
      <Tooltip cursor={false} />
      <Bar label={true} dataKey="duration" fill="#2196f3"></Bar>
    </BarChart>
  );
}

export default Stat