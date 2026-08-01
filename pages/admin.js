import { useState, useEffect } from "react";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const login = () => {
    if (password === "wca2024") {
      setAuthenticated(true);
    } else {
      setError("Incorrect password");
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`)
      .then(r => r.json())
      .then(data => { setBookings(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div style={{ fontFamily: "Georgia, serif", background: "#085041", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "8px", maxWidth: "360px", width: "100%", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", color: "#085041", marginBottom: "24px" }}>Admin Login</h1>
          <input
            type="password"
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            style={{ width: "100%", padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", marginBottom: "16px", fontFamily: "sans-serif", boxSizing: "border-box" }}
          />
          {error && <p style={{ color: "red", fontFamily: "sans-serif", marginBottom: "12px" }}>{error}</p>}
          <button onClick={login} style={{ width: "100%", background: "#1D9E75", color: "white", padding: "12px", borderRadius: "6px", border: "none", fontSize: "16px", cursor: "pointer", fontFamily: "sans-serif" }}>
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#085041", minHeight: "100vh", padding: "40px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "36px", color: "white", marginBottom: "8px" }}>Admin Dashboard</h1>
        <p style={{ fontFamily: "sans-serif", color: "#9FE1CB", marginBottom: "32px" }}>West Cork Acupuncture — All Bookings</p>

        <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
          <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>
            Bookings {bookings.length > 0 && `(${bookings.length})`}
          </h2>

          {loading ? (
            <p style={{ fontFamily: "sans-serif", color: "#666" }}>Loading...</p>
          ) : bookings.length === 0 ? (
            <p style={{ fontFamily: "sans-serif", color: "#666" }}>No bookings yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #E1F5EE" }}>
                    {["Name", "Email", "Phone", "Service", "Date", "Time", "Payment", "Booked At"].map(h => (
                      <th key={h} style={{ padding: "10px", textAlign: "left", color: "#085041" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id} style={{ borderBottom: "1px solid #E1F5EE" }}>
                      <td style={{ padding: "10px" }}>{b.name}</td>
                      <td style={{ padding: "10px" }}>{b.email}</td>
                      <td style={{ padding: "10px" }}>{b.phone}</td>
                      <td style={{ padding: "10px" }}>{b.service}</td>
                      <td style={{ padding: "10px" }}>{b.date}</td>
                      <td style={{ padding: "10px" }}>{b.time_slot}</td>
                      <td style={{ padding: "10px", textTransform: "capitalize" }}>{b.payment_method}</td>
                      <td style={{ padding: "10px" }}>{new Date(b.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
