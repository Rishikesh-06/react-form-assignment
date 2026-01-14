import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    countryCode: "",
    phone: "",
    country: "",
    city: "",
    pan: "",
    aadhaar: ""
  });

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const validate = (name, value) => {
    let error = "";
    if (!value) error = "Required";
    else {
      if (name === "email" && !/\S+@\S+\.\S+/.test(value)) error = "Invalid email";
      if (name === "password" && value.length < 8) error = "Min 8 characters";
      if (name === "phone" && !/^\d{10}$/.test(value)) error = "Enter 10 digits";
      if (name === "pan" && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)) error = "Invalid PAN format";
      if (name === "aadhaar" && !/^\d{12}$/.test(value)) error = "Must be 12 digits";
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const isValid =
    Object.values(form).every(v => v) &&
    Object.values(errors).every(e => !e);

  const handleSubmit = e => {
    e.preventDefault();
    if (isValid) navigate("/summary", { state: form });
  };

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

      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#3a3a3a",
          padding: 28,
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          gap: 14
        }}
      >
        <h2 style={{ color: "#fff", textAlign: "center" }}>
          Registration Form
        </h2>

        {Object.keys(form).map(key => (
          <div key={key} style={{ position: "relative" }}>
            <input
              type={key === "password" && !showPass ? "password" : "text"}
              name={key}
              placeholder={key.replace(/([A-Z])/g, " $1")}
              value={form[key]}
              onChange={handleChange}
              style={{
  width: "100%",
  padding: "10px 70px 10px 10px",
  borderRadius: 6,
  border: errors[key] ? "2px solid #ff5252" : "1px solid #777",
  background: form[key] ? "#45505f" : "#4a4a4a",
  color: "#fff",
  outline: "none",
  boxSizing: "border-box"
}}

            />

            {key === "password" && (
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: "4px 10px",
                  fontSize: 11,
                  borderRadius: 6,
                  border: "none",
                  background: "#222",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            )}

            {errors[key] && (
              <small style={{ color: "#ff5252" }}>{errors[key]}</small>
            )}
          </div>
        ))}

        <button
          disabled={!isValid}
          style={{
            marginTop: 8,
            padding: 12,
            borderRadius: 8,
            border: "none",
            background: isValid ? "#4caf50" : "#666",
            color: "#fff",
            fontWeight: "bold",
            cursor: isValid ? "pointer" : "not-allowed"
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
