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
<<<<<<< HEAD
      <h1>Frontend (React + Docker) ⚛️ jenkins 02</h1>
      <h2>{message}</h2>
=======
      <h1>Frontend (React)</h1>
      <h1>Frontend (React)</h1>
      <h1>Frontend (React)</h1>
      <h1>Frontend (React)</h1>
      <h1>Frontend (React)</h1>
      <h1>Frontend (React)</h1>
      <h1>Frontend (React)</h1>
      <h1>Frontend (React)</h1>
      <h1>Frontend (React)</h1>
      <h1>Frontend (React)</h1>
      <h1>Frontend (React)</h1>
      <p>Message from Backend 02: {message}</p>
>>>>>>> 902586c516cf0b5896211b2f257a71170acdeca3
    </div>
  );
}

export default App;
