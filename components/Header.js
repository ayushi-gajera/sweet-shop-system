import Link from "next/link";
import { removeToken } from "../utils/auth";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Header() {
  const { logged, setLogged, isAdmin } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  function logout() {
    removeToken();
    setLogged(false);
  }

  const buttonStyle = {
    padding: "6px 12px",
    borderRadius: 6,
    color: "#FFFFFF",
    fontWeight: 500,
    textDecoration: "none",
    transition: "background-color 0.2s",
    cursor: "pointer",
  };

  const linkStyle = { textDecoration: "none", color: "#FFFFFF", fontWeight: 500 };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: "#24504aff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderRadius: "0 0 10px 10px",
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <span style={{ fontWeight: "bold", fontSize: 22, color: "#FFFFFF", marginRight: 24 }}>
          Sweet Shop
        </span>
      </Link>

      <nav style={{ display: "flex", gap: 20 }}>
        <Link href="/" style={linkStyle}>Home</Link>
        {isAdmin && <Link href="/admin" style={linkStyle}>Admin</Link>}
      </nav>

      <div style={{ marginLeft: "auto", display: "flex", gap: 12, fontSize: 15 }}>
        {!logged && (
          <>
            <Link
              href="/login"
              style={{ ...buttonStyle, backgroundColor: "#009688" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00796b")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#009688")}
            >
              Login
            </Link>
            <Link
              href="/register"
              style={{ ...buttonStyle, backgroundColor: "#009688" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00796b")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#009688")}
            >
              Register
            </Link>
          </>
        )}
        {logged && (
          <button
            onClick={logout}
            style={{ ...buttonStyle, backgroundColor: "#DC2626", border: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B91C1C")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#DC2626")}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
