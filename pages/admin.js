import { useState, useEffect } from "react";

const ALL_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "13:00", "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00"
];

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [archived, setArchived] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("bookings");
  const [blockDate, setBlockDate] = useState("");
  const [blockedSlots, setBlockedSlots] = useState([]);

  const login = () => {
    if (password === "wca2024") {
      setAuthenticated(true);
    } else {
      setError("Incorrect password");
    }
  };

  const fetchBookings = () => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/bookings")
      .then(r => r.json())
      .then(data => {
        setBookings(data.filter(b => b.status !== "archived"));
        setArchived(data.filter(b => b.status === "archived"));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchBlockedSlots = (date) => {
    if (!date) return;
    fetch(process.env.NEXT_PUBLIC_API_URL + "/blocked?date=" + date)
      .then(r => r.json())
      .then(data => setBlockedSlots(data.map(r => r.time_slot)))
      .catch(() => setBlockedSlots([]));
  };

  useEffect(() => {
    if (!authenticated) return;
    fetchBookings();
  }, [authenticated]);

  useEffect(() => {
    fetchBlockedSlots(blockDate);
  }, [blockDate]);

  const updateStatus = async (id, status, booking) => {
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/bookings/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (status === "accepted") {
      const msg = encodeURIComponent(
        "Hi " + booking.name + ", your " + booking.service + " appointment on " + String(booking.date).slice(0,10) + " at " + booking.time_slot + " is confirmed. See you soon! — West Cork Acupuncture"
      );
      window.open("https://wa.me/" + booking.phone.replace(/\D/g, "") + "?text=" + msg, "_blank");
    }
    fetchBookings();
  };

  const deleteBooking = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this record?")) return;
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/bookings/" + id, {
      method: "DELETE"
    });
    fetchBookings();
  };

  const toggleBlock = async (slot) => {
    const isBlocked = blockedSlots.includes(slot);
    if (isBlocked) {
      await fetch(process.env.NEXT_PUBLIC_API_URL + "/blocked", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: blockDate, time_slot: slot })
      });
    } else {
      await fetch(process.env.NEXT_PUBLIC_API_URL + "/blocked", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: blockDate, time_slot: slot })
      });
    }
    fetchBlockedSlots(blockDate);
  };

  const blockAll = async () => {
    for (const slot of ALL_SLOTS) {
      if (!blockedSlots.includes(slot)) {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/blocked", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: blockDate, time_slot: slot })
        });
      }
    }
    fetchBlockedSlots(blockDate);
  };

  const unblockAll = async () => {
    for (const slot of ALL_SLOTS) {
      if (blockedSlots.includes(slot)) {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/blocked", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: blockDate, time_slot: slot })
        });
      }
    }
    fetchBlockedSlots(blockDate);
  };

  const statusColor = (status) => {
    if (status === "accepted") return "#1D9E75";
    if (status === "rejected") return "#c00";
    if (status === "archived") return "#888";
    return "#999";
  };

  const tabStyle = (t) => ({
    padding: "10px 24px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontFamily: "sans-serif",
    fontSize: "14px",
    background: tab === t ? "#1D9E75" : "white",
    color: tab === t ? "white" : "#085041",
    marginRight: "8px",
    marginBottom: "8px"
  });

  const btnStyle = (color) => ({
    background: color,
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontFamily: "sans-serif",
    fontSize: "12px"
  });

  const uniqueClients = () => {
    const all = [...bookings, ...archived];
    const seen = new Set();
    return all.filter(b => {
      if (seen.has(b.email)) return false;
      seen.add(b.email);
      return true;
    });
  };

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

  const tableHead = (cols) => (
    <tr style={{ borderBottom: "2px solid #E1F5EE" }}>
      {cols.map(h => <th key={h} style={{ padding: "10px", textAlign: "left", color: "#085041", fontFamily: "sans-serif", fontSize: "14px" }}>{h}</th>)}
    </tr>
  );

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#085041", minHeight: "100vh", padding: "40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "36px", color: "white", marginBottom: "8px" }}>Admin Dashboard</h1>
        <p style={{ fontFamily: "sans-serif", color: "#9FE1CB", marginBottom: "24px" }}>West Cork Acupuncture</p>

        <div style={{ marginBottom: "24px" }}>
          <button style={tabStyle("bookings")} onClick={() => setTab("bookings")}>Bookings</button>
          <button style={tabStyle("contacts")} onClick={() => setTab("contacts")}>Contacts</button>
          <button style={tabStyle("archive")} onClick={() => setTab("archive")}>Archive</button>
          <button style={tabStyle("slots")} onClick={() => setTab("slots")}>Manage Slots</button>
        </div>

        {/* BOOKINGS */}
        {tab === "bookings" && (
          <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
            <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>
              Active Bookings {bookings.length > 0 && "(" + bookings.length + ")"}
            </h2>
            {loading ? (
              <p style={{ fontFamily: "sans-serif", color: "#666" }}>Loading...</p>
            ) : bookings.length === 0 ? (
              <p style={{ fontFamily: "sans-serif", color: "#666" }}>No active bookings.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif", fontSize: "14px" }}>
                  <thead>{tableHead(["Name", "Phone", "Service", "Date", "Time", "Payment", "Status", "Actions"])}</thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} style={{ borderBottom: "1px solid #E1F5EE" }}>
                        <td style={{ padding: "10px" }}>{b.name}</td>
                        <td style={{ padding: "10px" }}>{b.phone}</td>
                        <td style={{ padding: "10px" }}>{b.service}</td>
                        <td style={{ padding: "10px" }}>{String(b.date).slice(0,10)}</td>
                        <td style={{ padding: "10px" }}>{b.time_slot}</td>
                        <td style={{ padding: "10px", textTransform: "capitalize" }}>{b.payment_method}</td>
                        <td style={{ padding: "10px", fontWeight: "bold", color: statusColor(b.status), textTransform: "capitalize" }}>{b.status}</td>
                        <td style={{ padding: "10px" }}>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            {b.status === "pending" && (
                              <>
                                <button onClick={() => updateStatus(b.id, "accepted", b)} style={btnStyle("#1D9E75")}>Accept</button>
                                <button onClick={() => updateStatus(b.id, "rejected", b)} style={btnStyle("#c00")}>Reject</button>
                              </>
                            )}
                            {b.status === "accepted" && (
                              <button onClick={() => updateStatus(b.id, "rejected", b)} style={btnStyle("#c00")}>Cancel</button>
                            )}
                            {b.status === "rejected" && (
                              <button onClick={() => updateStatus(b.id, "accepted", b)} style={btnStyle("#1D9E75")}>Restore</button>
                            )}
                            <button onClick={() => updateStatus(b.id, "archived", b)} style={btnStyle("#888")}>Archive</button>
                            <button onClick={() => deleteBooking(b.id)} style={btnStyle("#333")}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* CONTACTS */}
        {tab === "contacts" && (
          <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
            <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>
              Client Contacts {uniqueClients().length > 0 && "(" + uniqueClients().length + ")"}
            </h2>
            {uniqueClients().length === 0 ? (
              <p style={{ fontFamily: "sans-serif", color: "#666" }}>No contacts yet.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif", fontSize: "14px" }}>
                  <thead>{tableHead(["Name", "Email", "Phone", "WhatsApp", "Delete"])}</thead>
                  <tbody>
                    {uniqueClients().map(b => (
                      <tr key={b.id} style={{ borderBottom: "1px solid #E1F5EE" }}>
                        <td style={{ padding: "10px" }}>{b.name}</td>
                        <td style={{ padding: "10px" }}>{b.email}</td>
                        <td style={{ padding: "10px" }}>{b.phone}</td>
                        <td style={{ padding: "10px" }}>
                          <a href={"https://wa.me/" + b.phone.replace(/\D/g, "")} target="_blank" style={{ background: "#1D9E75", color: "white", padding: "6px 12px", borderRadius: "4px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "12px" }}>
                            Message
                          </a>
                        </td>
                        <td style={{ padding: "10px" }}>
                          <button onClick={() => deleteBooking(b.id)} style={btnStyle("#333")}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ARCHIVE */}
        {tab === "archive" && (
          <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
            <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>
              Archived Bookings {archived.length > 0 && "(" + archived.length + ")"}
            </h2>
            {archived.length === 0 ? (
              <p style={{ fontFamily: "sans-serif", color: "#666" }}>No archived bookings.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif", fontSize: "14px" }}>
                  <thead>{tableHead(["Name", "Phone", "Service", "Date", "Time", "Payment", "Actions"])}</thead>
                  <tbody>
                    {archived.map(b => (
                      <tr key={b.id} style={{ borderBottom: "1px solid #E1F5EE", opacity: 0.7 }}>
                        <td style={{ padding: "10px" }}>{b.name}</td>
                        <td style={{ padding: "10px" }}>{b.phone}</td>
                        <td style={{ padding: "10px" }}>{b.service}</td>
                        <td style={{ padding: "10px" }}>{String(b.date).slice(0,10)}</td>
                        <td style={{ padding: "10px" }}>{b.time_slot}</td>
                        <td style={{ padding: "10px", textTransform: "capitalize" }}>{b.payment_method}</td>
                        <td style={{ padding: "10px" }}>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button onClick={() => updateStatus(b.id, "pending", b)} style={btnStyle("#085041")}>Restore</button>
                            <button onClick={() => deleteBooking(b.id)} style={btnStyle("#333")}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* SLOTS */}
        {tab === "slots" && (
          <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
            <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>Manage Available Slots</h2>
            <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "24px" }}>Select a date then click slots to block or unblock them.</p>
            <input
              type="date"
              onChange={e => setBlockDate(e.target.value)}
              style={{ padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", marginBottom: "24px", fontFamily: "sans-serif", fontSize: "14px" }}
            />
            {blockDate && (
              <div>
                <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
                  <button onClick={blockAll} style={{ background: "#c00", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontFamily: "sans-serif" }}>
                    Block All
                  </button>
                  <button onClick={unblockAll} style={{ background: "#1D9E75", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontFamily: "sans-serif" }}>
                    Unblock All
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                  {ALL_SLOTS.map(slot => {
                    const isBlocked = blockedSlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        onClick={() => toggleBlock(slot)}
                        style={{
                          padding: "12px",
                          border: "1px solid #9FE1CB",
                          borderRadius: "6px",
                          background: isBlocked ? "#e0e0e0" : "#E1F5EE",
                          color: isBlocked ? "#aaa" : "#085041",
                          cursor: "pointer",
                          fontFamily: "sans-serif",
                          fontSize: "14px",
                          textDecoration: isBlocked ? "line-through" : "none"
                        }}
                      >
                        {slot} {isBlocked ? "🔒" : ""}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
