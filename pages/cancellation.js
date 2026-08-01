export default function Cancellation() {
  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "40px", color: "#085041", marginBottom: "24px" }}>Cancellation Policy</h1>

        <div style={{ background: "white", padding: "32px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", color: "#085041", marginBottom: "16px" }}>More than 24 hours notice</h2>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8" }}>
            No charge. You are welcome to cancel or reschedule with no penalty when you give more than 24 hours notice.
          </p>
        </div>

        <div style={{ background: "white", padding: "32px", borderRadius: "8px", borderLeft: "8px solid #e6a817", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", color: "#085041", marginBottom: "16px" }}>Less than 24 hours notice</h2>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8" }}>
            50% of the treatment fee may apply. We understand that life happens, and Kate will always do her best to accommodate genuine emergencies.
          </p>
        </div>

        <div style={{ background: "white", padding: "32px", borderRadius: "8px", borderLeft: "8px solid #c00", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", color: "#085041", marginBottom: "16px" }}>No-shows</h2>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8" }}>
            The full treatment fee may apply where no contact is made and the appointment is not attended.
          </p>
        </div>

        <div style={{ background: "#E1F5EE", padding: "24px", borderRadius: "8px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", color: "#085041", marginBottom: "16px" }}>How to cancel or reschedule</h2>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8", marginBottom: "12px" }}>
            Please contact Kate directly by phone or WhatsApp as early as possible.
          </p>
          <a href="https://wa.me/353831156950" style={{ display: "inline-block", background: "#1D9E75", color: "white", padding: "12px 24px", borderRadius: "6px", textDecoration: "none", fontFamily: "sans-serif" }}>
            WhatsApp Kate
          </a>
        </div>

        <div style={{ background: "white", padding: "24px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <p style={{ fontFamily: "sans-serif", color: "#555", lineHeight: "1.8", fontSize: "14px" }}>
            Kate reserves the right to waive fees at her discretion in exceptional circumstances. This policy exists to protect appointment availability for all clients.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a href="/book" style={{ background: "#1D9E75", color: "white", padding: "14px 40px", borderRadius: "8px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "16px" }}>
            Book Appointment
          </a>
        </div>

      </div>
    </div>
  );
}
