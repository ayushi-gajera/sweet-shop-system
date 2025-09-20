import { useEffect, useState } from "react";
import { getToken, authFetch } from "../utils/auth";
import SweetCard from "../components/SweetCard";
import Router from "next/router";

function decode(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export default function Admin() {
  const [sweets, setSweets] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    const t = getToken();
    if (!t) {
      Router.push("/login");
      return;
    }
    const payload = decode(t);
    if (!payload || !payload.isAdmin) {
      alert("Admin only");
      Router.push("/");
      return;
    }
    setIsAdmin(true);
    load();
  }, []);

  async function load() {
    const res = await fetch("/api/sweets");
    const data = await res.json();
    setSweets(data);
  }

  async function create(e) {
    e.preventDefault();
    const res = await authFetch("/api/sweets", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Error" }));
      return alert(err.message || "Create failed");
    }
    setForm({ name: "", category: "", price: "", quantity: "" });
    load();
  }

  async function onDelete(id) {
    if (!confirm("Delete?")) return;
    const res = await authFetch(`/api/sweets/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Delete failed");
      return;
    }
    load();
  }

  async function onRestock(id) {
    const amount = Number(prompt("Restock amount", "10"));
    if (!Number.isFinite(amount)) return alert("Invalid");
    const res = await authFetch(`/api/sweets/${id}/restock`, {
      method: "POST",
      body: JSON.stringify({ amount }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Failed" }));
      return alert(err.message || "Restock failed");
    }
    load();
  }

  async function onEdit(sweet) {
    const name = prompt("Name", sweet.name);
    if (name == null) return;
    const price = Number(prompt("Price", sweet.price));
    if (!Number.isFinite(price)) return alert("Invalid price");
    const res = await authFetch(`/api/sweets/${sweet._id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price }),
    });
    if (!res.ok) {
      alert("Update failed");
      return;
    }
    load();
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1a3d7c",
          marginBottom: "20px",
        }}
      >
        Admin Panel
      </h1>

      {isAdmin && (
        <div>
          <form
            onSubmit={create}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "30px",
              marginTop: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <input
              placeholder="Enter Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
            <input
              placeholder="Enter Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
            <input
              placeholder="Enter Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "120px",
                fontSize: "14px",
              }}
            />
            <input
              placeholder="Enter Quantity"
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              required
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "120px",
                fontSize: "14px",
              }}
            />
            <button
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
              Create Sweet
            </button>
          </form>

          {/* Sweet Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
              marginBottom: "30px",
              marginTop: "20px",
            }}
          >
            {sweets.map((s) => (
              <SweetCard
                key={s._id}
                sweet={s}
                isAdmin
                onDelete={onDelete}
                onEdit={onEdit}
                onRestock={onRestock}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
