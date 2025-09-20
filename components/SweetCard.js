export default function SweetCard({
  sweet,
  onPurchase,
  isAdmin,
  onEdit,
  onDelete,
  onRestock,
}) {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)";
      }}
    >
      <h3 style={{ color: "#1a3d7c", marginBottom: "8px" }}>{sweet.name}</h3>
      <p style={{ color: "#374151", marginBottom: "4px" }}>
        Category: {sweet.category}
      </p>
      <p style={{ color: "#009688", fontWeight: 500, marginBottom: "4px" }}>
        Price: ₹{sweet.price}
      </p>
      <p style={{ color: "#6b7280", marginBottom: "12px" }}>
        Quantity: {sweet.quantity}
      </p>

      {/* Purchase button */}
      {onPurchase && (
        <button
          onClick={() => onPurchase(sweet._id)}
          disabled={sweet.quantity <= 0}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: sweet.quantity > 0 ? "#009688" : "#94a3b8",
            color: "#fff",
            fontWeight: 500,
            cursor: sweet.quantity > 0 ? "pointer" : "not-allowed",
            marginBottom: "8px",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            if (sweet.quantity > 0)
              e.currentTarget.style.backgroundColor = "#00796b";
          }}
          onMouseLeave={(e) => {
            if (sweet.quantity > 0)
              e.currentTarget.style.backgroundColor = "#009688";
          }}
        >
          Purchase
        </button>
      )}

      {/* Admin actions */}
      {isAdmin && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginTop: "8px",
          }}
        >
          {onEdit && (
            <button
              onClick={() => onEdit(sweet)}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#1a3d7c",
                color: "#fff",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#162e5c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1a3d7c")
              }
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(sweet._id)}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#ef4444",
                color: "#fff",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#dc2626")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#ef4444")
              }
            >
              Delete
            </button>
          )}
          {onRestock && (
            <button
              onClick={() => onRestock(sweet._id)}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#f59e0b",
                color: "#fff",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#d97706")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f59e0b")
              }
            >
              Restock
            </button>
          )}
        </div>
      )}
    </div>
  );
}
