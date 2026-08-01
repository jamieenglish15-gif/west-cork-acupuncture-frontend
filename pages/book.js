import { useState } from "react";

export default function Book() {
  const [paymentMethod, setPaymentMethod] = useState("");

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto", background: "white", padding: "40px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        
        <h1 style={{ fontSize: "36px", color: "#085041", marginBottom: "8px" }}>Book Appointment</h1>
        <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "32px" }}>Acupuncture · Cupping · Cosmetic Acupuncture</p>

        <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041" }}>Service</label>
        <select style={{ width: "100%", padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", marginBottom: "16px", marginTop: "4px", background: "#E1F5EE" }}>
          <option>Select service</option>
          <option>Acupuncture</option>
          <option>Cupping Therapy</option>
          <option>Cosmetic Acupuncture</option>
        </select>

        <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041" }}>Practitioner</label>
        <select style={{ width: "100%", padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", marginBottom: "16px", marginTop: "4px", background: "#E1F5EE" }}>
          <option>Select practitioner</option>
        </select>

        <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041" }}>Date</label>
        <input type="date" style={{ width: "100%", padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", marginBottom: "24px", marginTop: "4px", background: "#E1F5EE" }} />

        <h3 style={{ fontSize: "20px", color: "#085041", marginBottom: "16px" }}>Payment Method</h3>

        {["stripe", "cash", "voucher"].map(method => (
          <label key={method} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "white", border: "1px solid #9FE1CB", borderRadius: "6px", marginBottom: "8px", cursor: "pointer", fontFamily: "sans-serif", color: "#085041" }}>
            <input type="radio" name="payment" value={method} onChange={() => setPaymentMethod(method)} />
            {method === "stripe" && "Pay Now (Card)"}
            {method === "cash" && "Pay Cash on the Day"}
            {method === "voucher" && "Redeem Gift Voucher"}
          </label>
        ))}

        {paymentMethod === "voucher" && (
          <input placeholder="Enter voucher code" style={{ width: "100%", padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", marginTop: "8px", background: "#E1F5EE", fontFamily: "sans-serif" }} />
        )}

        <button style={{ width: "100%", background: "#1D9E75", color: "white", padding: "14px", borderRadius: "6px", border: "none", fontSize: "18px", marginTop: "24px", cursor: "pointer", fontFamily: "sans-serif" }}>
          Confirm Booking
        </button>

        <a href="https://wa.me/353000000000?text=Hi,%20I'd%20like%20to%20book%20an%20appointment." style={{ display: "block", textAlign: "center", marginTop: "16px", fontFamily: "sans-serif", color: "#085041", textDecoration: "underline" }}>
          Prefer WhatsApp? Message to book.
        </a>

      </div>
    </div>
  );
}
