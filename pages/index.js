import React, { useEffect, useState } from "react";
import SweetCard from "../components/SweetCard";
import { authFetch, getToken } from "../utils/auth";

export default function Home() {
  const [sweets, setSweets] = useState([]);
  const [q, setQ] = useState("");

  async function load() {
    const res = await fetch("/api/sweets");
    const data = await res.json();
    setSweets(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function onPurchase(id) {
    const token = getToken();
    if (!token) return alert("Please login to purchase");
    const res = await authFetch(`/api/sweets/${id}/purchase`, {
      method: "POST",
    });
    if (!res.ok) {
      const err = await res
        .json()
        .catch(() => ({ message: "Purchase failed" }));
      return alert(err.message || "Purchase failed");
    }
    const updated = await res.json();
    setSweets((prev) => prev.map((s) => (s._id === updated._id ? updated : s)));
    alert("Purchase successful");
  }

  async function doSearch(e) {
    e.preventDefault();
    const res = await fetch(`/api/sweets/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setSweets(data);
  }

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{ color: "#1e3a8a", marginBottom: "20px", textAlign: "center" }}
      >
        Sweet Shop
      </h1>

      <form
        onSubmit={doSearch}
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search sweets"
          style={{
            flex: 1,
            maxWidth: "400px",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#0d9488",
            color: "#fff",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#00796b")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#009688")
          }
        >
          Search
        </button>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {sweets.map((s) => (
          <SweetCard key={s._id} sweet={s} onPurchase={onPurchase} />
        ))}
      </div>
    </div>
  );
}
