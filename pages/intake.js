import { useState } from "react";

export default function Intake() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    booking_id: "",
    name: "",
    date_of_birth: "",
    address: "",
    emergency_contact: "",
    emergency_phone: "",
    gp_name: "",
    reason_for_visit: "",
    medical_conditions: "",
    medications: "",
    allergies: "",
    previous_acupuncture: "",
    pregnant: "",
    additional_info: ""
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.reason_for_visit) {
      setError("Please fill in your name and reason for visit.");
      return;
    }
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.success) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #9FE1CB",
    borderRadius: "6px",
    marginBottom: "16px",
    marginTop: "4px",
    background: "#E1F5EE",
    fontFamily: "sans-serif",
    fontSize: "14px",
    boxSizing: "border-box"
  };

  const labelStyle = {
    fontFamily: "sans-serif",
    fontSize: "14px",
    color: "#085041",
    fontWeight: "bold"
  };

  const textareaStyle = {
    ...inputStyle,
    height: "80px",
    resize: "vertical"
  };

  if (submitted) {
    return (
      <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "40px" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", maxWidth: "500px", textAlign: "center" }}>
          <h1 style={{ fontSize: "32px", color: "#085041", marginBottom: "16px" }}>Thank You</h1>
          <p style={{ fontFamily: "sans-serif", color: "#555", lineHeight: "1.8" }}>
            Your health questionnaire has been submitted. Kate will review it before your appointment.
          </p>
          <p style={{ fontFamily: "sans-serif", color: "#555", marginTop: "16px" }}>
            See you soon at West Cork Acupuncture.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", background: "white", padding: "40px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>

        <h1 style={{ fontSize: "36px", color: "#085041", marginBottom: "8px" }}>Health Questionnaire</h1>
        <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "32px", lineHeight: "1.7" }}>
          Please complete this form before your first appointment at West Cork Acupuncture. All information is confidential.
        </p>

        <h3 style={{ fontSize: "18px", color: "#085041", marginBottom: "16px", borderBottom: "2px solid #E1F5EE", paddingBottom: "8px" }}>Personal Details</h3>

        <label style={labelStyle}>Full Name</label>
        <input placeholder="Jane Smith" onChange={update("name")} style={inputStyle} />

        <label style={labelStyle}>Date of Birth</label>
        <input type="date" onChange={update("date_of_birth")} style={inputStyle} />

        <label style={labelStyle}>Address</label>
        <textarea placeholder="Your address" onChange={update("address")} style={textareaStyle} />

        <h3 style={{ fontSize: "18px", color: "#085041", marginBottom: "16px", borderBottom: "2px solid #E1F5EE", paddingBottom: "8px", marginTop: "8px" }}>Emergency Contact</h3>

        <label style={labelStyle}>Emergency Contact Name</label>
        <input placeholder="Contact name" onChange={update("emergency_contact")} style={inputStyle} />

        <label style={labelStyle}>Emergency Contact Phone</label>
        <input type="tel" placeholder="+353 87 000 0000" onChange={update("emergency_phone")} style={inputStyle} />

        <label style={labelStyle}>GP Name</label>
        <input placeholder="Dr. Smith" onChange={update("gp_name")} style={inputStyle} />

        <h3 style={{ fontSize: "18px", color: "#085041", marginBottom: "16px", borderBottom: "2px solid #E1F5EE", paddingBottom: "8px", marginTop: "8px" }}>Health Information</h3>

        <label style={labelStyle}>Reason for Visit</label>
        <textarea placeholder="What brings you to acupuncture?" onChange={update("reason_for_visit")} style={textareaStyle} />

        <label style={labelStyle}>Current Medical Conditions</label>
        <textarea placeholder="List any medical conditions, or write None" onChange={update("medical_conditions")} style={textareaStyle} />

        <label style={labelStyle}>Current Medications</label>
        <textarea placeholder="List any medications, or write None" onChange={update("medications")} style={textareaStyle} />

        <label style={labelStyle}>Allergies</label>
        <input placeholder="List any allergies, or write None" onChange={update("allergies")} style={inputStyle} />

        <label style={labelStyle}>Have you had acupuncture before?</label>
        <select onChange={update("previous_acupuncture")} style={inputStyle}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label style={labelStyle}>Are you pregnant or trying to conceive?</label>
        <select onChange={update("pregnant")} style={inputStyle}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="trying">Trying to conceive</option>
        </select>

        <label style={labelStyle}>Anything else Kate should know?</label>
        <textarea placeholder="Any additional information" onChange={update("additional_info")} style={textareaStyle} />

        {error && (
          <div style={{ background: "#ffe0e0", padding: "12px", borderRadius: "6px", marginBottom: "16px", fontFamily: "sans-serif", color: "#c00" }}>
            {error}
          </div>
        )}

        <button onClick={handleSubmit} style={{ width: "100%", background: "#1D9E75", color: "white", padding: "14px", borderRadius: "6px", border: "none", fontSize: "18px", cursor: "pointer", fontFamily: "sans-serif" }}>
          Submit Questionnaire
        </button>

        <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#888", marginTop: "16px", textAlign: "center" }}>
          All information is kept strictly confidential and used only for treatment purposes.
        </p>

      </div>
    </div>
  );
}
