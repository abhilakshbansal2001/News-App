import React from "react";
import dateFormat from "dateformat";

export default function TimeToDate(props) {
  const time = dateFormat(props.date, "dddd, mmmm dS");
  return <>{time}</>;
}
