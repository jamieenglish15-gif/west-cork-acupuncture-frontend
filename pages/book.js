import { useState, useEffect } from "react";

export default function Book() {
  const [services, setServices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [date, setDate] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`)
      .then(r => r.json())
      .then(data => setServices(data))
      .catch(() => setServices([]));
  }, []);

  const handleBooking = async () => {
    if (!selectedService || !date || !selectedSlot || !paymentMethod) {
      setMessage("Please fill in all fields.");
      return;
    }
    setMessage(`Booking confirmed for ${date} at ${selectedSlot}. We will be in touch shortly.`);
  };

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto", background: "white", padding: "40px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>

        <h1 style={{ fontSize: "36px", color: "#085041", marginBottom: "8px" }}>Book Appointment</h1>
        <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "32px" }}>Acupuncture · Cupping · Cosmetic Acupuncture</p>

        <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041" }}>Service</label>
        <select onChange={e => setSelectedService(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", marginBottom: "16px", marginTop: "4px", background: "#E1F5EE" }}>
          <option value="">Select service</option>
          {services.length > 0 ? services.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          )) : (
            <>
              <option value="1">Acupuncture</option>
              <option value="2">Cupping Therapy</option>
              <option value="3">Cosmetic Acupuncture</option>
            </>
          )}
        </select>

        <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041" }}>Date</label>
        <input type="date" onChange={e => setDate(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", marginBottom: "24px", marginTop: "4px", background: "#E1F5EE" }} />

        <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041" }}>Available Time Slots</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "24px", marginTop: "8px" }}>
          {[
            "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
            "12:00", "13:00", "13:30", "14:00", "14:30", "15:00",
            "15:30", "16:00", "16:30", "17:00"
          ].map(slot => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              style={{
                padding: "10px",
                border: "1px solid #9FE1CB",
                borderRadius: "6px",
                background: selectedSlot === slot ? "#085041" : "white",
                color: selectedSlot === slot ? "white" : "#085041",
                cursor: "pointer",
                fontFamily: "sans-serif",
                fontSize: "14px"
              }}
            >
              {slot}
            </button>
          ))}
        </div>

        <h3 style={{ fontSize: "20px", color: "#085041", marginBottom: "16px" }}>Payment Method</h3>

        {[
          { value: "stripe", label: "Pay Now (Card)" },
          { value: "cash", label: "Pay Cash on the Day" },
          { value: "voucher", label: "Redeem Gift Voucher" }
        ].map(m => (
          <label key={m.value} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", marginBottom: "8px", cursor: "pointer", fontFamily: "sans-serif", color: "#085041" }}>
            <input type="radio" name="payment" value={m.value} onChange={() => setPaymentMethod(m.value)} />
            {m.label}
          </label>
        ))}

        {paymentMethod === "voucher" && (
          <input placeholder="Enter voucher code" onChange={e => setVoucherCode(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", marginTop: "8px", background: "#E1F5EE", fontFamily: "sans-serif" }} />
        )}

        {message && (
          <div style={{ background: "#E1F5EE", padding: "12px", borderRadius: "6px", marginTop: "16px", fontFamily: "sans-serif", color: "#085041" }}>
            {message}
          </div>
        )}

        <button onClick={handleBooking} style={{ width: "100%", background: "#1D9E75", color: "white", padding: "14px", borderRadius: "6px", border: "none", fontSize: "18px", marginTop: "24px", cursor: "pointer", fontFamily: "sans-serif" }}>
          Confirm Booking
        </button>

        <a href="https://wa.me/353000000000?text=Hi,%20I'd%20like%20to%20book%20an%20appointment." style={{ display: "block", textAlign: "center", marginTop: "16px", fontFamily: "sans-serif", color: "#085041", textDecoration: "underline" }}>
          Prefer WhatsApp? Message to book.
        </a>

      </div>
    </div>
  );
}
