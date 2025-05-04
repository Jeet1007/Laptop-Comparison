import React, { useState } from "react";

function CommentTest() {
  const [user, setUser] = useState("");
  const [laptop, setLaptop] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, laptop, comment }),
      });

      const data = await res.json();
      setMessage(res.ok ? "✅ Comment added!" : "❌ " + data.message);
    } catch (err) {
      setMessage("❌ Server error");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h3>Test Comment Submission</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="User ID" value={user} onChange={(e) => setUser(e.target.value)} required style={styles.input} />
        <input type="text" placeholder="Laptop ID" value={laptop} onChange={(e) => setLaptop(e.target.value)} required style={styles.input} />
        <textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} required rows="3" style={styles.input}></textarea>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  input: { width: "100%", marginBottom: 10, padding: 10 },
  button: { padding: 10, background: "#007bff", color: "#fff", border: "none", cursor: "pointer" },
};

export default CommentTest;
