import { useState } from "react";
import Router from "next/router";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const e1 = await res.json().catch(() => ({ message: "Failed" }));
      return alert(e1.message || "Registration failed");
    }
    alert("Registered successfully. Please login.");
    Router.push("/login");
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 24,
        backgroundColor: "#f5f7fa",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#1a3d7c", marginBottom: 20 }}>
        Register
      </h2>
      <form
        onSubmit={submit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 16px",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#009688",
            color: "#fff",
            fontSize: 16,
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00796b")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#009688")}
        >
          Register
        </button>
      </form>
    </div>
  );
}
