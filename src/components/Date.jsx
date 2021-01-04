import React from "react";
import dateFormat from "dateformat";

export default function TimeToDate(props) {
  console.log(dateFormat(props.date, "isoDateTime").split("T"));
  const time = dateFormat(props.date, "dddd, mmmm dS");
  return <>{time}</>;
}
