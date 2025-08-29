import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

useEffect(() => {
 fetch("http://backend:5000/api/message")
    .then(res => res.json())
    .then(data => setMessage(data.message))
    .catch(err => console.error(err));
}, []);


  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Frontend (React)</h1>
      <p>Message from Backend 02: {message}</p>
    </div>
  );
}

export default App;
