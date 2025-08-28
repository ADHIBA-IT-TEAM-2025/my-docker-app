import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
<<<<<<< HEAD
      <h1>Frontend (React + Docker) ⚛️ + sanju api</h1>
      <h1>Frontend (React + Docker) ⚛️ + sanju api</h1>
=======
      <h1>Frontend (React + Docker) ⚛️ HARI api </h1>
>>>>>>> 2a6e84d47e4f84d2f4e54f3d2d25340bc5a4a17c
      <h2>{message}</h2>
    </div>
  );
}

export default App;
