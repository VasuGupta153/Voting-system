import React from "react";

function Election({ title, status, results }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Status: {status}</p>
      {results && <p>Results: {results}</p>}
    </div>
  );
}

export default Election;
