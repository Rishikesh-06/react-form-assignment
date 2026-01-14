import { useLocation, useNavigate } from "react-router-dom";

export default function SummaryPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div
  style={{
    position: "fixed",
    inset: 0,
    background: "#2b2b2b",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 24
  }}
>

      <div
        style={{
          width: "100%",
          maxWidth: 500,
          background: "#3a3a3a",
          padding: 32,
          borderRadius: 12,
          color: "#fff"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Registration Successful
        </h2>

        {Object.entries(state || {}).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
              borderBottom: "1px solid #555",
              paddingBottom: 6
            }}
          >
            <strong>
              {key.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase())}:
            </strong>

            <span>{value}</span>
          </div>
        ))}

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 20,
            width: "100%",
            padding: 12,
            borderRadius: 8,
            border: "none",
            background: "#4caf50",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Back to Form
        </button>
      </div>
    </div>
  );
}
