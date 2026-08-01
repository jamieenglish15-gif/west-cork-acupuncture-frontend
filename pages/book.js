import { useState, useEffect } from "react";

const ALL_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "13:00", "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00"
];

function getBlockedSlot(slot) {
  if (!slot) return null;
  const idx = ALL_SLOTS.indexOf(slot);
  return idx !== -1 && idx + 1 < ALL_SLOTS.length ? ALL_SLOTS[idx + 1] : null;
}

export default function Book() {
  const [services, setServices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [date, setDate] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptedSlots, setAcceptedSlots] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/services")
      .then(r => r.json())
      .then(data => setServices(data))
      .catch(() => setServices([]));
  }, []);

  useEffect(() => {
    if (!date) return;
    fetch(process.env.NEXT_PUBLIC_API_URL + "/bookings/accepted?date=" + date)
      .then(r => r.json())
      .then(data => setAcceptedSlots(data))
      .catch(() => setAcceptedSlots([]));
    setSelectedSlot("");
  }, [date]);

  const blockedSlot = getBlockedSlot(selectedSlot);

  const isUnavailable = (slot) => {
    return acceptedSlots.includes(slot) || blockedSlot === slot;
  };

  const handleBooking = async () => {
    setError("");
    setMessage("");
    if (!name || !email || !phone || !selectedService || !date || !selectedSlot || !paymentMethod) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const serviceName = services.find(s => String(s.id) === String(selectedService))?.name || selectedService;
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone,
          service: serviceName,
          date, time_slot: selectedSlot,
          payment_method: paymentMethod,
          voucher_code: voucherCode || null
        })
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Booking request sent for " + name + " on " + date + " at " + selectedSlot + ". We will confirm shortly!");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Could not connect to server. Please try again.");
    }
    setLoading(false);
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
    color: "#085041"
  };

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto", background: "white", padding: "40px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>

        <h1 style={{ fontSize: "36px", color: "#085041", marginBottom: "8px" }}>Book Appointment</h1>
        <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "32px" }}>Acupuncture · Cupping · Cosmetic Acupuncture</p>

        <h3 style={{ fontSize: "20px", color: "#085041", marginBottom: "16px" }}>Your Details</h3>

        <label style={labelStyle}>Full Name</label>
        <input placeholder="Jane Smith" onChange={e => setName(e.target.value)} style={inputStyle} />

        <label style={labelStyle}>Email</label>
        <input type="email" placeholder="jane@email.com" onChange={e => setEmail(e.target.value)} style={inputStyle} />

        <label style={labelStyle}>Phone</label>
        <input type="tel" placeholder="+353 87 000 0000" onChange={e => setPhone(e.target.value)} style={inputStyle} />

        <label style={labelStyle}>Service</label>
        <select onChange={e => setSelectedService(e.target.value)} style={inputStyle}>
          <option value="">Select service</option>
          {services.length > 0 ? services.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          )) : (
            <span>
              <option value="1">Acupuncture</option>
              <option value="2">Cupping Therapy</option>
              <option value="3">Cosmetic Acupuncture</option>
            </span>
          )}
        </select>

        <label style={labelStyle}>Date</label>
        <input type="date" onChange={e => setDate(e.target.value)} style={inputStyle} />

        {date && (
          <div>
            <label style={labelStyle}>Available Time Slots</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "24px", marginTop: "8px" }}>
              {ALL_SLOTS.map(slot => {
                const isSelected = selectedSlot === slot;
                const unavailable = isUnavailable(slot);
                return (
                  <button
                    key={slot}
                    disabled={unavailable}
                    onClick={() => !unavailable && setSelectedSlot(slot)}
                    style={{
                      padding: "10px",
                      border: "1px solid #9FE1CB",
                      borderRadius: "6px",
                      background: isSelected ? "#085041" : unavailable ? "#e0e0e0" : "white",
                      color: isSelected ? "white" : unavailable ? "#aaa" : "#085041",
                      cursor: unavailable ? "not-allowed" : "pointer",
                      fontFamily: "sans-serif",
                      fontSize: "14px"
                    }}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <h3 style={{ fontSize: "20px", color: "#085041", marginBottom: "16px" }}>Payment Method</h3>

        <div>
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
        </div>

        {paymentMethod === "voucher" && (
          <input placeholder="Enter voucher code" onChange={e => setVoucherCode(e.target.value)} style={inputStyle} />
        )}

        {error && (
          <div style={{ background: "#ffe0e0", padding: "12px", borderRadius: "6px", marginTop: "16px", fontFamily: "sans-serif", color: "#c00" }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{ background: "#E1F5EE", padding: "12px", borderRadius: "6px", marginTop: "16px", fontFamily: "sans-serif", color: "#085041" }}>
            {message}
          </div>
        )}

        <button onClick={handleBooking} disabled={loading} style={{ width: "100%", background: loading ? "#aaa" : "#1D9E75", color: "white", padding: "14px", borderRadius: "6px", border: "none", fontSize: "18px", marginTop: "24px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "sans-serif" }}>
          {loading ? "Sending..." : "Request Booking"}
        </button>

        <a href="https://wa.me/353000000000" style={{ display: "block", textAlign: "center", marginTop: "16px", fontFamily: "sans-serif", color: "#085041", textDecoration: "underline" }}>
          Prefer WhatsApp? Message to book.
        </a>

      </div>
    </div>
  );
}
