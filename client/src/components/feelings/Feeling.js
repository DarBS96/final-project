import React from "react";

function Feeling({ feeling }) {
  return <div style={{ cursor: "pointer" }}>{feeling.feeling}</div>;
}

export default Feeling;
