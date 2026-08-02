import Head from "next/head";
import { useState, useEffect } from "react";

const ALL_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00"
];

function getBlockedSlots(slot) {
  if (!slot) return [];
  const idx = ALL_SLOTS.indexOf(slot);
  const blocked = [];
  if (idx + 1 < ALL_SLOTS.length) blocked.push(ALL_SLOTS[idx + 1]);
  return blocked;
}

function validatePhone(phone) {
  const cleaned = phone.replace(/\s/g, "").replace(/-/g, "");
  if (cleaned.length < 9) return false;
  const irish = /^(083|085|086|087|089|08[0-9])[0-9]{7}$/;
  const irishIntl = /^\+3538[0-9]{8}$/;
  const intl = /^\+[1-9][0-9]{7,14}$/;
  return irish.test(cleaned) || irishIntl.test(cleaned) || intl.test(cleaned);
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
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
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

  const blockedSlots2 = getBlockedSlots(selectedSlot);

  const isUnavailable = (slot) => {
    return acceptedSlots.includes(slot) || blockedSlots2.includes(slot);
  };

  const handleBooking = async () => {
    setError("");
    setMessage("");
    setPhoneError("");

    if (!name || !email || !phone || !selectedService || !date || !selectedSlot || !paymentMethod || !agreed) {
      setError("Please fill in all fields and agree to the cancellation policy.");
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError("Please enter a valid Irish mobile number (e.g. 083 115 6950) or international number with country code.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
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
        setMessage("Booking request sent! Redirecting you home...");
        setTimeout(() => { window.location.href = "/"; }, 2000);
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
      <Head>
        <title>Book Appointment | West Cork Acupuncture Skibbereen</title>
        <meta name="description" content="Book an acupuncture or cosmetic facial acupuncture appointment online with Kate at West Cork Acupuncture, Skibbereen." />
      </Head>
      <div style={{ maxWidth: "560px", margin: "0 auto", background: "white", padding: "40px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>

        <h1 style={{ fontSize: "36px", color: "#085041", marginBottom: "8px" }}>Book Appointment</h1>
        <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "32px" }}>Acupuncture · Cosmetic Acupuncture</p>

        <h3 style={{ fontSize: "20px", color: "#085041", marginBottom: "16px" }}>Your Details</h3>

        <label style={labelStyle}>Full Name</label>
        <input placeholder="Jane Smith" onChange={e => setName(e.target.value)} style={inputStyle} />

        <label style={labelStyle}>Email</label>
        <input type="email" placeholder="jane@email.com" onChange={e => setEmail(e.target.value)} style={inputStyle} />

        <label style={labelStyle}>Phone</label>
        <input
          type="tel"
          placeholder="083 115 6950 or +353831156950"
          onChange={e => { setPhone(e.target.value); setPhoneError(""); }}
          style={{ ...inputStyle, border: phoneError ? "1px solid #c00" : "1px solid #9FE1CB" }}
        />
        {phoneError && (
          <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#c00", marginTop: "-12px", marginBottom: "12px" }}>{phoneError}</p>
        )}

        <label style={labelStyle}>Service</label>
        <select onChange={e => setSelectedService(e.target.value)} style={inputStyle}>
          <option value="">Select service</option>
          {services.length > 0 ? services.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          )) : (
            <span>
              <option value="1">Acupuncture - EUR80</option>
              <option value="2">Cosmetic Acupuncture - EUR125</option>
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

        <div style={{ background: "#F5F0E8", padding: "16px", borderRadius: "6px", marginTop: "24px", marginBottom: "16px" }}>
          <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#085041", marginBottom: "12px", fontWeight: "bold" }}>Cancellation Policy</p>
          <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#555", lineHeight: "1.6", marginBottom: "12px" }}>
            We require at least 24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may be charged the full treatment fee.
          </p>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "sans-serif", fontSize: "13px", color: "#085041", cursor: "pointer" }}>
            <input type="checkbox" onChange={e => setAgreed(e.target.checked)} />
            I agree to the cancellation policy
          </label>
        </div>

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

        <a href="https://wa.me/353831156950" style={{ display: "block", textAlign: "center", marginTop: "16px", fontFamily: "sans-serif", color: "#085041", textDecoration: "underline" }}>
          Prefer WhatsApp? Message Kate to book.
        </a>

      </div>
    </div>
  );
}
