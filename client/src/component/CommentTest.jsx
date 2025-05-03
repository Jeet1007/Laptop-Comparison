import React, { useState } from "react";

function CommentTest() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, comment }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Comment submitted!");
        setName("");
        setComment("");
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
        console.error(err);
        setMessage("❌ Server Error");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Test Comment Submission</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          style={styles.input}
          placeholder="Your comment"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif"
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "12px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }
};

export default CommentTest;
