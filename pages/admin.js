import { useState, useEffect } from "react";

const ALL_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00"
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SERVICES = ["Acupuncture", "Cosmetic Acupuncture"];
const API = "https://west-cork-acupuncture-backend-production-366a.up.railway.app";
const PRICES = { "Acupuncture": "80", "Cosmetic Acupuncture": "125" };

function IntakeForms() {
  const [forms, setForms] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchForms = () => {
    fetch(API + "/intake/all")
      .then(r => r.json())
      .then(data => setForms(data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchForms(); }, []);

  const deleteForm = async (id) => {
    if (!confirm("Delete this intake form permanently?")) return;
    await fetch(API + "/intake/" + id, { method: "DELETE" });
    fetchForms();
  };

  const saveEdit = async (id) => {
    await fetch(API + "/intake/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData)
    });
    setEditing(null);
    fetchForms();
  };

  const fields = [
    ["date_of_birth", "Date of Birth"],
    ["sex", "Sex"],
    ["address", "Address"],
    ["emergency_contact", "Emergency Contact"],
    ["emergency_phone", "Emergency Phone"],
    ["gp_name", "GP Name"],
    ["reason_for_visit", "Reason for Visit"],
    ["medical_conditions", "Medical Conditions"],
    ["medications", "Medications"],
    ["allergies", "Allergies"],
    ["previous_acupuncture", "Previous Acupuncture"],
    ["pregnant", "Pregnant / Trying to Conceive"],
    ["additional_info", "Additional Info"]
  ];

  if (forms.length === 0) {
    return (
      <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
        <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>Intake Forms</h2>
        <p style={{ fontFamily: "sans-serif", color: "#666" }}>No intake forms submitted yet.</p>
      </div>
    );
  }

  return (
    <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
      <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>{"Intake Forms (" + forms.length + ")"}</h2>
      {forms.map(function(f) {
        return (
          <div key={f.id} style={{ border: "1px solid #E1F5EE", borderRadius: "8px", marginBottom: "16px", overflow: "hidden" }}>
            <div style={{ background: "#F5F0E8", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div onClick={() => setSelected(selected === f.id ? null : f.id)} style={{ cursor: "pointer", flex: 1 }}>
                <p style={{ fontFamily: "sans-serif", fontWeight: "bold", color: "#085041", margin: 0 }}>{f.name}</p>
                <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#666", margin: 0 }}>{"Submitted: " + new Date(f.created_at).toLocaleDateString()}</p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => { setEditing(f.id); setEditData(Object.assign({}, f)); setSelected(f.id); }} style={{ background: "#085041", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "12px" }}>Edit</button>
                <button onClick={() => deleteForm(f.id)} style={{ background: "#c00", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "12px" }}>Delete</button>
                <button onClick={() => setSelected(selected === f.id ? null : f.id)} style={{ background: "#888", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "12px" }}>{selected === f.id ? "Hide" : "View"}</button>
              </div>
            </div>
            {selected === f.id && (
              <div style={{ padding: "24px", fontFamily: "sans-serif", fontSize: "14px" }}>
                {editing === f.id ? (
                  <div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px", marginBottom: "16px" }}>
                      {fields.map(function(field) {
                        return (
                          <div key={field[0]}>
                            <p style={{ color: "#085041", fontWeight: "bold", marginBottom: "4px", fontSize: "12px" }}>{field[1]}</p>
                            <input
                              defaultValue={f[field[0]] || ""}
                              onChange={function(e) {
                                var newData = Object.assign({}, editData);
                                newData[field[0]] = e.target.value;
                                setEditData(newData);
                              }}
                              style={{ width: "100%", padding: "8px", border: "1px solid #9FE1CB", borderRadius: "4px", fontFamily: "sans-serif", fontSize: "13px", boxSizing: "border-box" }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => saveEdit(f.id)} style={{ background: "#1D9E75", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontFamily: "sans-serif" }}>Save</button>
                      <button onClick={() => setEditing(null)} style={{ background: "#888", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontFamily: "sans-serif" }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
                    {fields.map(function(field) {
                      return (
                        <div key={field[0]}>
                          <p style={{ color: "#085041", fontWeight: "bold", marginBottom: "4px" }}>{field[1]}</p>
                          <p style={{ color: "#333" }}>{f[field[0]] || "-"}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SOAPNotes() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ client_name: "", session_date: "", subjective: "", objective: "", assessment: "", plan: "" });
  const [msg, setMsg] = useState("");

  const fetchNotes = () => {
    fetch(API + "/soap")
      .then(r => r.json())
      .then(data => setNotes(data))
      .catch(() => setNotes([]));
  };

  useEffect(() => { fetchNotes(); }, []);

  const saveNote = async () => {
    if (!form.client_name || !form.session_date) {
      setMsg("Please enter client name and date.");
      return;
    }
    const res = await fetch(API + "/soap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.success) {
      setMsg("Note saved!");
      setForm({ client_name: "", session_date: "", subjective: "", objective: "", assessment: "", plan: "" });
      setShowForm(false);
      fetchNotes();
    }
  };

  const deleteNote = async (id) => {
    if (!confirm("Delete this SOAP note?")) return;
    await fetch(API + "/soap/" + id, { method: "DELETE" });
    fetchNotes();
  };

  const printNote = (n) => {
    const ref = "SOAP-" + String(n.id).padStart(4, "0");
    window.open("/soap?name=" + encodeURIComponent(n.client_name) + "&date=" + n.session_date + "&subjective=" + encodeURIComponent(n.subjective || "") + "&objective=" + encodeURIComponent(n.objective || "") + "&assessment=" + encodeURIComponent(n.assessment || "") + "&plan=" + encodeURIComponent(n.plan || "") + "&ref=" + ref);
  };

  const ta = { width: "100%", padding: "10px", border: "1px solid #9FE1CB", borderRadius: "6px", fontFamily: "sans-serif", fontSize: "13px", marginBottom: "16px", boxSizing: "border-box", background: "#E1F5EE", resize: "vertical" };
  const inp = { width: "100%", padding: "10px", border: "1px solid #9FE1CB", borderRadius: "6px", fontFamily: "sans-serif", fontSize: "13px", marginBottom: "16px", boxSizing: "border-box", background: "#E1F5EE" };

  return (
    <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", color: "#085041", margin: 0 }}>{"SOAP Notes" + (notes.length > 0 ? " (" + notes.length + ")" : "")}</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ background: "#1D9E75", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontFamily: "sans-serif" }}>
          {showForm ? "Cancel" : "New Note"}
        </button>
      </div>
      {showForm && (
        <div style={{ background: "#F5F0E8", padding: "24px", borderRadius: "8px", marginBottom: "24px" }}>
          <h3 style={{ fontSize: "18px", color: "#085041", marginBottom: "16px" }}>New SOAP Note</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#085041", fontWeight: "bold" }}>Client Name</label>
              <input value={form.client_name} onChange={e => setForm({ ...form, client_name: e.target.value })} style={inp} />
            </div>
            <div>
              <label style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#085041", fontWeight: "bold" }}>Session Date</label>
              <input type="date" value={form.session_date} onChange={e => setForm({ ...form, session_date: e.target.value })} style={inp} />
            </div>
          </div>
          <label style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#085041", fontWeight: "bold" }}>S - Subjective (what the client reports)</label>
          <textarea rows={3} value={form.subjective} onChange={e => setForm({ ...form, subjective: e.target.value })} style={ta} />
          <label style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#085041", fontWeight: "bold" }}>O - Objective (what you observe)</label>
          <textarea rows={3} value={form.objective} onChange={e => setForm({ ...form, objective: e.target.value })} style={ta} />
          <label style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#085041", fontWeight: "bold" }}>A - Assessment</label>
          <textarea rows={3} value={form.assessment} onChange={e => setForm({ ...form, assessment: e.target.value })} style={ta} />
          <label style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#085041", fontWeight: "bold" }}>P - Plan</label>
          <textarea rows={3} value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value })} style={ta} />
          {msg && <p style={{ fontFamily: "sans-serif", color: msg.includes("saved") ? "#1D9E75" : "#c00", marginBottom: "12px" }}>{msg}</p>}
          <button onClick={saveNote} style={{ background: "#1D9E75", color: "white", border: "none", padding: "12px 32px", borderRadius: "6px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "14px" }}>
            Save Note
          </button>
        </div>
      )}
      {notes.length === 0 ? (
        <p style={{ fontFamily: "sans-serif", color: "#666" }}>No SOAP notes yet. Click New Note to add one.</p>
      ) : (
        <div>
          {notes.map(n => (
            <div key={n.id} style={{ border: "1px solid #E1F5EE", borderRadius: "8px", marginBottom: "12px", overflow: "hidden" }}>
              <div style={{ background: "#F5F0E8", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontFamily: "sans-serif", fontWeight: "bold", color: "#085041", margin: 0 }}>{n.client_name}</p>
                  <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#666", margin: 0 }}>{String(n.session_date).slice(0,10)}</p>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => printNote(n)} style={{ background: "#085041", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "12px" }}>Print</button>
                  <button onClick={() => deleteNote(n.id)} style={{ background: "#c00", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "12px" }}>Delete</button>
                </div>
              </div>
              <div style={{ padding: "16px", fontFamily: "sans-serif", fontSize: "13px", color: "#333", lineHeight: "1.7" }}>
                {n.subjective && <p style={{ marginBottom: "8px" }}><strong style={{ color: "#085041" }}>S:</strong> {n.subjective}</p>}
                {n.objective && <p style={{ marginBottom: "8px" }}><strong style={{ color: "#085041" }}>O:</strong> {n.objective}</p>}
                {n.assessment && <p style={{ marginBottom: "8px" }}><strong style={{ color: "#085041" }}>A:</strong> {n.assessment}</p>}
                {n.plan && <p style={{ margin: 0 }}><strong style={{ color: "#085041" }}>P:</strong> {n.plan}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function Vouchers() {
  const [vouchers, setVouchers] = useState([]);
 const [amount, setAmount] = useState("80");
const [purchaser, setPurchaser] = useState("");
const [recipient, setRecipient] = useState("");
const [msg, setMsg] = useState("");

  const fetchVouchers = () => {
    fetch(API + "/vouchers")
      .then(r => r.json())
      .then(data => setVouchers(data))
      .catch(() => setVouchers([]));
  };

  useEffect(() => { fetchVouchers(); }, []);

  const createVoucher = async () => {
    const res = await fetch(API + "/vouchers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseInt(amount), purchaser, recipient })
    });
    const data = await res.json();
    if (data.success) {
      setMsg("Voucher created: " + data.voucher.code);
      fetchVouchers();
    }
  };

  const toggleUsed = async (v) => {
    await fetch(API + "/vouchers/" + v.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ used: !v.used })
    });
    fetchVouchers();
  };

  const deleteVoucher = async (id) => {
    if (!confirm("Delete this voucher?")) return;
    await fetch(API + "/vouchers/" + id, { method: "DELETE" });
    fetchVouchers();
  };

  const sendVoucher = (v) => {
    const msg = encodeURIComponent("Hi, here is your West Cork Acupuncture gift voucher code: " + v.code + ". Value: EUR" + v.amount + ". Valid for 12 months. To book: https://westcorkacupuncture.ie/book - Thank you, Kate");
    window.open("https://wa.me/?text=" + msg);
  };

  return (
    <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
      <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "24px" }}>Gift Vouchers</h2>

     <div style={{ background: "#F5F0E8", padding: "20px", borderRadius: "8px", marginBottom: "24px" }}>
  <h3 style={{ fontSize: "18px", color: "#085041", marginBottom: "16px" }}>Generate New Voucher</h3>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
    <div>
      <label style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#085041", fontWeight: "bold" }}>Purchased By</label>
      <input value={purchaser} onChange={e => setPurchaser(e.target.value)} placeholder="Name of buyer" style={{ width: "100%", padding: "10px", border: "1px solid #9FE1CB", borderRadius: "6px", fontFamily: "sans-serif", fontSize: "14px", background: "#E1F5EE", boxSizing: "border-box", marginTop: "4px" }} />
    </div>
    <div>
      <label style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#085041", fontWeight: "bold" }}>Recipient</label>
      <input value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Name of recipient" style={{ width: "100%", padding: "10px", border: "1px solid #9FE1CB", borderRadius: "6px", fontFamily: "sans-serif", fontSize: "14px", background: "#E1F5EE", boxSizing: "border-box", marginTop: "4px" }} />
    </div>
  </div>
  <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
    <select value={amount} onChange={e => setAmount(e.target.value)} style={{ padding: "10px", border: "1px solid #9FE1CB", borderRadius: "6px", fontFamily: "sans-serif", fontSize: "14px", background: "#E1F5EE" }}>
      <option value="80">EUR80 - Acupuncture</option>
      <option value="125">EUR125 - Cosmetic Acupuncture</option>
    </select>
    <button onClick={createVoucher} style={{ background: "#1D9E75", color: "white", border: "none", padding: "10px 24px", borderRadius: "6px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "14px" }}>
      Generate Code
    </button>
  </div>
  {msg && (
    <div style={{ background: "#E1F5EE", padding: "12px", borderRadius: "6px", marginTop: "16px", fontFamily: "sans-serif", fontSize: "14px", color: "#085041", fontWeight: "bold" }}>
      {msg}
    </div>
  )}
</div>

      {vouchers.length === 0 ? (
        <p style={{ fontFamily: "sans-serif", color: "#666" }}>No vouchers yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #E1F5EE" }}>
             <th style={{ padding: "10px", textAlign: "left", color: "#085041" }}>Code</th>
<th style={{ padding: "10px", textAlign: "left", color: "#085041" }}>Amount</th>
<th style={{ padding: "10px", textAlign: "left", color: "#085041" }}>From</th>
<th style={{ padding: "10px", textAlign: "left", color: "#085041" }}>To</th>
<th style={{ padding: "10px", textAlign: "left", color: "#085041" }}>Status</th>
<th style={{ padding: "10px", textAlign: "left", color: "#085041" }}>Created</th>
<th style={{ padding: "10px", textAlign: "left", color: "#085041" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map(v => (
                <tr key={v.id} style={{ borderBottom: "1px solid #E1F5EE", opacity: v.used ? 0.6 : 1 }}>
                <td style={{ padding: "10px", fontWeight: "bold", color: "#085041", fontFamily: "monospace", fontSize: "16px" }}>{v.code}</td>
                <td style={{ padding: "10px" }}>{"\u20ac"}{v.amount}</td>
                 <td style={{ padding: "10px" }}>{v.purchaser || "-"}</td>
                 <td style={{ padding: "10px" }}>{v.recipient || "-"}</td>
                  <td style={{ padding: "10px" }}>
                    <span style={{ background: v.used ? "#e0e0e0" : "#E1F5EE", color: v.used ? "#888" : "#1D9E75", padding: "4px 10px", borderRadius: "20px", fontFamily: "sans-serif", fontSize: "12px" }}>
                      {v.used ? "Used" : "Active"}
                    </span>
                  </td>
                  <td style={{ padding: "10px", color: "#666" }}>{new Date(v.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: "10px" }}>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <button onClick={() => window.open("/voucher-print?code=" + v.code + "&amount=" + v.amount + "&purchaser=" + encodeURIComponent(v.purchaser || "") + "&recipient=" + encodeURIComponent(v.recipient || "") + "&date=" + new Date(v.created_at).toLocaleDateString())} style={{ background: "#085041", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "12px" }}>Print</button>
                      <button onClick={() => sendVoucher(v)} style={{ background: "#25D366", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "12px" }}>Send</button>
                      <button onClick={() => toggleUsed(v)} style={{ background: v.used ? "#1D9E75" : "#888", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "12px" }}>
                        {v.used ? "Reactivate" : "Mark Used"}
                      </button>
                      <button onClick={() => deleteVoucher(v.id)} style={{ background: "#c00", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "12px" }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
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
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [manualName, setManualName] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualService, setManualService] = useState("");
  const [manualDate, setManualDate] = useState("");
  const [manualSlot, setManualSlot] = useState("");
  const [manualPayment, setManualPayment] = useState("cash");
  const [manualMsg, setManualMsg] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  const login = () => {
    if (password === "wca2024") {
      setAuthenticated(true);
    } else {
      setError("Incorrect password");
    }
  };

  const fetchBookings = () => {
    fetch(API + "/bookings")
      .then(r => r.json())
      .then(data => {
        setBookings(data.filter(b => b.status !== "archived" && b.status !== "contact"));
        setArchived(data.filter(b => b.status === "archived"));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchBlockedSlots = (date) => {
    if (!date) return;
    fetch(API + "/blocked?date=" + date)
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
    await fetch(API + "/bookings/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (status === "accepted") {
      const msg = encodeURIComponent("Hi " + booking.name + ", your " + booking.service + " appointment on " + String(booking.date).slice(0,10) + " at " + booking.time_slot + " is confirmed. See you soon! - West Cork Acupuncture");
      window.open("https://wa.me/" + booking.phone.replace(/\D/g, "") + "?text=" + msg, "_blank");
    }
    fetchBookings();
  };

  const saveNote = async (id) => {
    await fetch(API + "/bookings/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: noteText })
    });
    setEditingNote(null);
    setNoteText("");
    fetchBookings();
  };

  const deleteBooking = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this record?")) return;
    await fetch(API + "/bookings/" + id, { method: "DELETE" });
    fetchBookings();
  };

  const addContact = async () => {
    if (!newName || !newPhone) return;
    await fetch(API + "/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, email: newEmail, phone: newPhone })
    });
    setNewName(""); setNewEmail(""); setNewPhone("");
    fetchBookings();
  };

  const saveContact = async (id) => {
    const name = document.getElementById("edit-name-" + id).value;
    const email = document.getElementById("edit-email-" + id).value;
    const phone = document.getElementById("edit-phone-" + id).value;
    await fetch(API + "/contacts/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone })
    });
    setEditingNote(null);
    fetchBookings();
  };

  const addManualBooking = async () => {
    setManualMsg("");
    if (!manualName || !manualPhone || !manualService || !manualDate || !manualSlot) {
      setManualMsg("Please fill in all required fields.");
      return;
    }
    const check = await fetch(API + "/bookings/accepted?date=" + manualDate);
    const takenSlots = await check.json();
    if (takenSlots.includes(manualSlot)) {
      setManualMsg("That slot is already booked. Please choose another time.");
      alert("That slot is already booked. Please choose another time.");
      return;
    }
    const res = await fetch(API + "/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: manualName, email: manualEmail, phone: manualPhone,
        service: manualService, date: manualDate, time_slot: manualSlot,
        payment_method: manualPayment
      })
    });
    const data = await res.json();
    if (data.success) {
      await fetch(API + "/bookings/" + data.booking.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "accepted" })
      });
      setManualMsg("Booking added and accepted successfully!");
      setManualName(""); setManualEmail(""); setManualPhone("");
      setManualService(""); setManualDate(""); setManualSlot("");
      setManualPayment("cash");
      fetchBookings();
    } else {
      setManualMsg(data.error || "Something went wrong. Please try again.");
    }
  };

  const toggleBlock = async (slot) => {
    const isBlocked = blockedSlots.includes(slot);
    if (isBlocked) {
      await fetch(API + "/blocked", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: blockDate, time_slot: slot })
      });
    } else {
      await fetch(API + "/blocked", {
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
        await fetch(API + "/blocked", {
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
        await fetch(API + "/blocked", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: blockDate, time_slot: slot })
        });
      }
    }
    fetchBlockedSlots(blockDate);
  };

  const sendReminder = (b) => {
    const phone = b.phone.replace(/\D/g, "");
    const msg = encodeURIComponent("Reminder: " + b.service + " tomorrow at " + b.time_slot + " - West Cork Acupuncture");
    window.open("https://wa.me/" + phone + "?text=" + msg);
  };

  const sendIntake = (b) => {
    const phone = b.phone.replace(/\D/g, "");
    const msg = encodeURIComponent("Hi " + b.name + ", please fill in our health questionnaire before your appointment: https://westcorkacupuncture.ie/intake - Thanks, Kate");
    window.open("https://wa.me/" + phone + "?text=" + msg);
  };

  const sendReceipt = (b) => {
    const price = PRICES[b.service] || "80";
    const ref = "WCA-" + String(b.id).padStart(4, "0");
    const phone = b.phone.replace(/\D/g, "");
    const link = "https://westcorkacupuncture.ie/receipt?name=" + encodeURIComponent(b.name) + "&service=" + encodeURIComponent(b.service) + "&date=" + String(b.date).slice(0,10) + "&time=" + b.time_slot + "&payment=" + b.payment_method + "&amount=" + price + "&ref=" + ref;
    const msg = encodeURIComponent("Hi " + b.name + ", please find your receipt for your treatment at West Cork Acupuncture: " + link + " - Thank you, Kate");
    window.open("https://wa.me/" + phone + "?text=" + msg);
  };

  const printReceipt = (b) => {
    const price = PRICES[b.service] || "80";
    const ref = "WCA-" + String(b.id).padStart(4, "0");
    window.open("/receipt?name=" + encodeURIComponent(b.name) + "&service=" + encodeURIComponent(b.service) + "&date=" + String(b.date).slice(0,10) + "&time=" + b.time_slot + "&payment=" + b.payment_method + "&amount=" + price + "&ref=" + ref);
  };

  const statusColor = (status) => {
    if (status === "accepted") return "#1D9E75";
    if (status === "rejected") return "#c00";
    if (status === "archived") return "#888";
    return "#e6a817";
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

  const inputStyle = {
    padding: "10px",
    border: "1px solid #9FE1CB",
    borderRadius: "6px",
    fontFamily: "sans-serif",
    fontSize: "14px",
    flex: 1,
    minWidth: "150px"
  };

  const formInput = {
    width: "100%",
    padding: "12px",
    border: "1px solid #9FE1CB",
    borderRadius: "6px",
    marginBottom: "16px",
    fontFamily: "sans-serif",
    fontSize: "14px",
    boxSizing: "border-box",
    background: "#E1F5EE"
  };

  const uniqueClients = () => {
    const all = [...bookings, ...archived];
    const seen = new Set();
    return all.filter(b => {
      if (seen.has(b.email)) return false;
      seen.add(b.email);
      return true;
    });
  };

  const visitCount = (email) => {
    return [...bookings, ...archived].filter(x => x.email === email && x.status !== "contact").length;
  };

  const getCalendarDays = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const getBookingsForDay = (day) => {
    if (!day) return [];
    const year = calendarDate.getFullYear();
    const month = String(calendarDate.getMonth() + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    const dateStr = year + "-" + month + "-" + d;
    return bookings.filter(b => String(b.date).slice(0,10) === dateStr);
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
      {cols.map(h => <th key={h} style={{ padding: "10px", textAlign: "left", color: "#085041", fontFamily: "sans-serif", fontSize: "14px", whiteSpace: "nowrap" }}>{h}</th>)}
    </tr>
  );

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#085041", minHeight: "100vh", padding: "40px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "36px", color: "white", marginBottom: "8px" }}>Admin Dashboard</h1>
        <p style={{ fontFamily: "sans-serif", color: "#9FE1CB", marginBottom: "24px" }}>West Cork Acupuncture</p>

        <div style={{ marginBottom: "24px" }}>
          <button style={tabStyle("bookings")} onClick={() => setTab("bookings")}>Bookings</button>
          <button style={tabStyle("calendar")} onClick={() => setTab("calendar")}>Calendar</button>
          <button style={tabStyle("contacts")} onClick={() => setTab("contacts")}>Contacts</button>
          <button style={tabStyle("archive")} onClick={() => setTab("archive")}>Archive</button>
          <button style={tabStyle("slots")} onClick={() => setTab("slots")}>Manage Slots</button>
          <button style={tabStyle("add")} onClick={() => setTab("add")}>Add Booking</button>
          <button style={tabStyle("intake")} onClick={() => setTab("intake")}>Intake Forms</button>
          <button style={tabStyle("soap")} onClick={() => setTab("soap")}>SOAP Notes</button>
          <button style={tabStyle("revenue")} onClick={() => setTab("revenue")}>Revenue</button>
          <button style={tabStyle("qr")} onClick={() => setTab("qr")}>QR Code</button>
          <button style={tabStyle("vouchers")} onClick={() => setTab("vouchers")}>Vouchers</button>
        </div>

        {tab === "bookings" && (
          <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
            <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>
              {"Active Bookings" + (bookings.length > 0 ? " (" + bookings.length + ")" : "")}
            </h2>
            {loading ? (
              <p style={{ fontFamily: "sans-serif", color: "#666" }}>Loading...</p>
            ) : bookings.length === 0 ? (
              <p style={{ fontFamily: "sans-serif", color: "#666" }}>No active bookings.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif", fontSize: "13px" }}>
                  <thead>{tableHead(["Name", "Phone", "Service", "Date", "Time", "Status", "Actions", "More"])}</thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} style={{ borderBottom: "1px solid #E1F5EE" }}>
                        <td style={{ padding: "10px", whiteSpace: "nowrap" }}>{b.name}</td>
                        <td style={{ padding: "10px", whiteSpace: "nowrap" }}>{b.phone}</td>
                        <td style={{ padding: "10px", whiteSpace: "nowrap" }}>{b.service}</td>
                        <td style={{ padding: "10px", whiteSpace: "nowrap" }}>{String(b.date).slice(0,10)}</td>
                        <td style={{ padding: "10px", whiteSpace: "nowrap" }}>{b.time_slot}</td>
                        <td style={{ padding: "10px", fontWeight: "bold", color: statusColor(b.status), textTransform: "capitalize", whiteSpace: "nowrap" }}>{b.status}</td>
                        <td style={{ padding: "10px", whiteSpace: "nowrap" }}>
                          <div style={{ display: "flex", gap: "4px" }}>
                            {b.status === "pending" && (
                              <div style={{ display: "flex", gap: "4px" }}>
                                <button onClick={() => updateStatus(b.id, "accepted", b)} style={btnStyle("#1D9E75")}>Accept</button>
                                <button onClick={() => updateStatus(b.id, "rejected", b)} style={btnStyle("#c00")}>Reject</button>
                              </div>
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
                        <td style={{ padding: "10px" }}>
                          <button onClick={() => setExpandedRow(expandedRow === b.id ? null : b.id)} style={btnStyle("#085041")}>
                            {expandedRow === b.id ? "Hide" : "Details"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {bookings.map(b => {
                      if (expandedRow !== b.id) return null;
                      return (
                        <tr key={b.id + "-exp"} style={{ borderBottom: "1px solid #E1F5EE", background: "#F5F0E8" }}>
                          <td colSpan={8} style={{ padding: "16px" }}>
                            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                              <div>
                                <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#085041", fontWeight: "bold", marginBottom: "4px" }}>Payment</p>
                                <p style={{ fontFamily: "sans-serif", fontSize: "13px", textTransform: "capitalize" }}>{b.payment_method}</p>
                              </div>
                              <div style={{ flex: 1, minWidth: "200px" }}>
                                <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#085041", fontWeight: "bold", marginBottom: "4px" }}>Notes</p>
                                {editingNote === b.id ? (
                                  <div>
                                    <textarea
                                      defaultValue={b.notes || ""}
                                      onChange={e => setNoteText(e.target.value)}
                                      style={{ width: "100%", padding: "6px", fontFamily: "sans-serif", fontSize: "12px", borderRadius: "4px", border: "1px solid #9FE1CB", marginBottom: "4px" }}
                                      rows={3}
                                    />
                                    <div style={{ display: "flex", gap: "4px" }}>
                                      <button onClick={() => saveNote(b.id)} style={btnStyle("#1D9E75")}>Save</button>
                                      <button onClick={() => setEditingNote(null)} style={btnStyle("#888")}>Cancel</button>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <p style={{ fontSize: "12px", color: "#555", marginBottom: "4px" }}>{b.notes || "No notes"}</p>
                                    <button onClick={() => { setEditingNote(b.id); setNoteText(b.notes || ""); }} style={btnStyle("#085041")}>
                                      {b.notes ? "Edit Note" : "Add Note"}
                                    </button>
                                  </div>
                                )}
                              </div>
                              <div>
                                <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#085041", fontWeight: "bold", marginBottom: "8px" }}>Quick Actions</p>
                                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                  <button onClick={() => sendReminder(b)} style={{ background: "#25D366", color: "white", padding: "6px 10px", borderRadius: "4px", border: "none", cursor: "pointer", fontFamily: "sans-serif", fontSize: "12px" }}>Send Reminder</button>
                                  <button onClick={() => sendIntake(b)} style={btnStyle("#085041")}>Send Intake</button>
                                  <button onClick={() => sendReceipt(b)} style={btnStyle("#1D9E75")}>WhatsApp Receipt</button>
                                  <button onClick={() => printReceipt(b)} style={btnStyle("#085041")}>Print Receipt</button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === "calendar" && (
          <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))} style={btnStyle("#085041")}>Prev</button>
              <h2 style={{ fontSize: "24px", color: "#085041", margin: 0 }}>{MONTHS[calendarDate.getMonth()] + " " + calendarDate.getFullYear()}</h2>
              <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))} style={btnStyle("#085041")}>Next</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "8px" }}>
              {DAYS.map(d => (
                <div key={d} style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "12px", color: "#085041", fontWeight: "bold", padding: "8px" }}>{d}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
              {getCalendarDays().map((day, i) => {
                const dayBookings = getBookingsForDay(day);
                return (
                  <div key={i} style={{ minHeight: "80px", background: day ? "#F5F0E8" : "transparent", borderRadius: "4px", padding: "6px", border: day ? "1px solid #E1F5EE" : "none" }}>
                    {day && (
                      <div>
                        <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#085041", fontWeight: "bold", margin: "0 0 4px 0" }}>{day}</p>
                        {dayBookings.map(b => (
                          <div key={b.id} style={{ background: statusColor(b.status), color: "white", padding: "2px 4px", borderRadius: "3px", fontSize: "10px", fontFamily: "sans-serif", marginBottom: "2px" }}>
                            {b.time_slot + " " + b.name.split(" ")[0]}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "16px", display: "flex", gap: "16px", fontFamily: "sans-serif", fontSize: "12px" }}>
              <span style={{ color: "#e6a817" }}>Pending</span>
              <span style={{ color: "#1D9E75" }}>Accepted</span>
              <span style={{ color: "#c00" }}>Rejected</span>
            </div>
          </div>
        )}

        {tab === "contacts" && (
          <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
            <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>{"Client Contacts" + (uniqueClients().length > 0 ? " (" + uniqueClients().length + ")" : "")}</h2>
            <div style={{ background: "#F5F0E8", padding: "20px", borderRadius: "8px", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "18px", color: "#085041", marginBottom: "16px" }}>Add New Contact</h3>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input placeholder="Full Name" value={newName} onChange={e => setNewName(e.target.value)} style={inputStyle} />
                <input placeholder="Email" value={newEmail} onChange={e => setNewEmail(e.target.value)} style={inputStyle} />
                <input placeholder="Phone" value={newPhone} onChange={e => setNewPhone(e.target.value)} style={inputStyle} />
                <button onClick={addContact} style={{ background: "#1D9E75", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "14px" }}>Add Contact</button>
              </div>
            </div>
            {uniqueClients().length === 0 ? (
              <p style={{ fontFamily: "sans-serif", color: "#666" }}>No contacts yet.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif", fontSize: "14px" }}>
                  <thead>{tableHead(["Name", "Email", "Phone", "Visits", "Marketing", "WhatsApp", "Edit", "Delete"])}</thead>
                  <tbody>
                    {uniqueClients().map(b => (
                      <tr key={b.id} style={{ borderBottom: "1px solid #E1F5EE" }}>
                        <td style={{ padding: "10px" }}>{editingNote === "contact-" + b.id ? <input id={"edit-name-" + b.id} defaultValue={b.name} style={{ padding: "6px", border: "1px solid #9FE1CB", borderRadius: "4px", fontFamily: "sans-serif", fontSize: "13px", width: "100%" }} /> : b.name}</td>
                        <td style={{ padding: "10px" }}>{editingNote === "contact-" + b.id ? <input id={"edit-email-" + b.id} defaultValue={b.email} style={{ padding: "6px", border: "1px solid #9FE1CB", borderRadius: "4px", fontFamily: "sans-serif", fontSize: "13px", width: "100%" }} /> : b.email}</td>
                        <td style={{ padding: "10px" }}>{editingNote === "contact-" + b.id ? <input id={"edit-phone-" + b.id} defaultValue={b.phone} style={{ padding: "6px", border: "1px solid #9FE1CB", borderRadius: "4px", fontFamily: "sans-serif", fontSize: "13px", width: "100%" }} /> : b.phone}</td>
                        <td style={{ padding: "10px", textAlign: "center", fontWeight: "bold", color: "#085041" }}>{visitCount(b.email)}</td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
  {b.marketing_opt_in ? (
    <span style={{ background: "#E1F5EE", color: "#1D9E75", padding: "4px 10px", borderRadius: "20px", fontFamily: "sans-serif", fontSize: "12px", fontWeight: "bold" }}>Yes</span>
  ) : (
    <span style={{ background: "#f0f0f0", color: "#888", padding: "4px 10px", borderRadius: "20px", fontFamily: "sans-serif", fontSize: "12px" }}>No</span>
  )}
</td>                 
                        <td style={{ padding: "10px" }}>
                          <a href={"https://wa.me/" + b.phone.replace(/\D/g, "")} target="_blank" style={{ background: "#1D9E75", color: "white", padding: "6px 12px", borderRadius: "4px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "12px" }}>Message</a>
                        </td>
                        <td style={{ padding: "10px" }}>
                          {editingNote === "contact-" + b.id ? (
                            <div style={{ display: "flex", gap: "4px" }}>
                              <button onClick={() => saveContact(b.id)} style={btnStyle("#1D9E75")}>Save</button>
                              <button onClick={() => setEditingNote(null)} style={btnStyle("#888")}>Cancel</button>
                            </div>
                          ) : (
                            <button onClick={() => setEditingNote("contact-" + b.id)} style={btnStyle("#085041")}>Edit</button>
                          )}
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

        {tab === "archive" && (
          <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
            <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>{"Archived Bookings" + (archived.length > 0 ? " (" + archived.length + ")" : "")}</h2>
            {archived.length === 0 ? (
              <p style={{ fontFamily: "sans-serif", color: "#666" }}>No archived bookings.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif", fontSize: "14px" }}>
                  <thead>{tableHead(["Name", "Phone", "Service", "Date", "Time", "Payment", "Notes", "Actions"])}</thead>
                  <tbody>
                    {archived.map(b => (
                      <tr key={b.id} style={{ borderBottom: "1px solid #E1F5EE", opacity: 0.7 }}>
                        <td style={{ padding: "10px" }}>{b.name}</td>
                        <td style={{ padding: "10px" }}>{b.phone}</td>
                        <td style={{ padding: "10px" }}>{b.service}</td>
                        <td style={{ padding: "10px" }}>{String(b.date).slice(0,10)}</td>
                        <td style={{ padding: "10px" }}>{b.time_slot}</td>
                        <td style={{ padding: "10px", textTransform: "capitalize" }}>{b.payment_method}</td>
                        <td style={{ padding: "10px", fontSize: "12px", color: "#555" }}>{b.notes || "-"}</td>
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
                  <button onClick={blockAll} style={{ background: "#c00", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontFamily: "sans-serif" }}>Block All</button>
                  <button onClick={unblockAll} style={{ background: "#1D9E75", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontFamily: "sans-serif" }}>Unblock All</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                  {ALL_SLOTS.map(slot => {
                    const isBlocked = blockedSlots.includes(slot);
                    return (
                      <button key={slot} onClick={() => toggleBlock(slot)} style={{ padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", background: isBlocked ? "#e0e0e0" : "#E1F5EE", color: isBlocked ? "#aaa" : "#085041", cursor: "pointer", fontFamily: "sans-serif", fontSize: "14px", textDecoration: isBlocked ? "line-through" : "none" }}>
                        {slot + (isBlocked ? " X" : "")}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "add" && (
          <div style={{ background: "white", borderRadius: "8px", padding: "24px", maxWidth: "600px" }}>
            <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "8px" }}>Add Manual Booking</h2>
            <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "24px" }}>For bookings made over WhatsApp or phone.</p>
            <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041" }}>Full Name</label>
            <input value={manualName} onChange={e => setManualName(e.target.value)} placeholder="Jane Smith" style={formInput} />
            <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041" }}>Email</label>
            <input value={manualEmail} onChange={e => setManualEmail(e.target.value)} placeholder="jane@email.com" style={formInput} />
            <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041" }}>Phone</label>
            <input value={manualPhone} onChange={e => setManualPhone(e.target.value)} placeholder="+353 87 000 0000" style={formInput} />
            <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041" }}>Service</label>
            <select value={manualService} onChange={e => setManualService(e.target.value)} style={formInput}>
              <option value="">Select service</option>
              {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041" }}>Date</label>
            <input type="date" value={manualDate} onChange={e => setManualDate(e.target.value)} style={formInput} />
            <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041" }}>Time Slot</label>
            <select value={manualSlot} onChange={e => setManualSlot(e.target.value)} style={formInput}>
              <option value="">Select time</option>
              {ALL_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041" }}>Payment Method</label>
            <select value={manualPayment} onChange={e => setManualPayment(e.target.value)} style={formInput}>
              <option value="cash">Cash on the Day</option>
              <option value="card">Card</option>
              <option value="voucher">Voucher</option>
            </select>
            {manualMsg && (
              <div style={{ background: manualMsg.includes("success") ? "#E1F5EE" : "#ffe0e0", padding: "12px", borderRadius: "6px", marginBottom: "16px", fontFamily: "sans-serif", color: manualMsg.includes("success") ? "#085041" : "#c00" }}>
                {manualMsg}
              </div>
            )}
            <button onClick={addManualBooking} style={{ width: "100%", background: "#1D9E75", color: "white", padding: "14px", borderRadius: "6px", border: "none", fontSize: "16px", cursor: "pointer", fontFamily: "sans-serif" }}>
              Add Booking
            </button>
          </div>
        )}

        {tab === "intake" && <IntakeForms />}
        {tab === "vouchers" && <Vouchers />}
        {tab === "soap" && <SOAPNotes />}

        {tab === "revenue" && (
          <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
            <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "24px" }}>Revenue Tracker</h2>
            {(() => {
              const allBookings = [...bookings, ...archived].filter(b => b.status === "accepted" || b.status === "archived");
              const monthly = {};
              allBookings.forEach(b => {
                const month = String(b.date).slice(0, 7);
                const price = parseInt(PRICES[b.service] || "80");
                if (!monthly[month]) monthly[month] = { total: 0, count: 0 };
                monthly[month].total += price;
                monthly[month].count += 1;
              });
              const months = Object.keys(monthly).sort().reverse();
              const grandTotal = months.reduce((sum, m) => sum + monthly[m].total, 0);
              return (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
                    <div style={{ background: "#085041", padding: "24px", borderRadius: "8px", textAlign: "center" }}>
                      <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#9FE1CB", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "2px" }}>Total Revenue</p>
                      <p style={{ fontFamily: "sans-serif", fontSize: "36px", color: "white", fontWeight: "bold" }}>{"\u20ac"}{grandTotal}</p>
                    </div>
                    <div style={{ background: "#1D9E75", padding: "24px", borderRadius: "8px", textAlign: "center" }}>
                      <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "white", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "2px", opacity: 0.8 }}>Total Appointments</p>
                      <p style={{ fontFamily: "sans-serif", fontSize: "36px", color: "white", fontWeight: "bold" }}>{allBookings.length}</p>
                    </div>
                    {months[0] && (
                      <div style={{ background: "#E1F5EE", padding: "24px", borderRadius: "8px", textAlign: "center" }}>
                        <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#085041", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "2px" }}>This Month</p>
                        <p style={{ fontFamily: "sans-serif", fontSize: "36px", color: "#085041", fontWeight: "bold" }}>{"\u20ac"}{monthly[months[0]].total}</p>
                      </div>
                    )}
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif", fontSize: "14px" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #E1F5EE" }}>
                        <th style={{ padding: "10px", textAlign: "left", color: "#085041" }}>Month</th>
                        <th style={{ padding: "10px", textAlign: "left", color: "#085041" }}>Appointments</th>
                        <th style={{ padding: "10px", textAlign: "left", color: "#085041" }}>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {months.map(m => (
                        <tr key={m} style={{ borderBottom: "1px solid #E1F5EE" }}>
                          <td style={{ padding: "10px" }}>{new Date(m + "-01").toLocaleDateString("en-IE", { month: "long", year: "numeric" })}</td>
                          <td style={{ padding: "10px" }}>{monthly[m].count}</td>
                          <td style={{ padding: "10px", fontWeight: "bold", color: "#085041" }}>{"\u20ac"}{monthly[m].total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        )}

        {tab === "qr" && (
          <div style={{ background: "white", borderRadius: "8px", padding: "24px", maxWidth: "480px", textAlign: "center" }}>
            <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "8px" }}>Booking QR Code</h2>
            <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "24px" }}>Print and display in the clinic. Clients scan to book online.</p>
            <img
              src={"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent("https://westcorkacupuncture.ie/book")}
              alt="QR Code"
              style={{ width: "240px", height: "240px", marginBottom: "24px", border: "8px solid #E1F5EE", borderRadius: "8px" }}
            />
            <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#085041", marginBottom: "8px" }}>13 North Street, Skibbereen, P81 Y237</p>
            <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#085041", marginBottom: "24px" }}>083 115 6950</p>
            <button
              onClick={() => window.open("/qr")}
              style={{ width: "100%", background: "#1D9E75", color: "white", padding: "14px", borderRadius: "6px", border: "none", fontFamily: "sans-serif", fontSize: "16px", cursor: "pointer" }}
            >
              Open Full Print Page
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
