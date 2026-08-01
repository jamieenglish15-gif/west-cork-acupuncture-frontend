import { useRouter } from "next/router";

export default function Receipt() {
  const router = useRouter();
  const { name, service, date, time, payment, amount, ref } = router.query;

  const today = new Date().toLocaleDateString("en-IE", { day: "2-digit", month: "2-digit", year: "2-digit" });

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "white", minHeight: "100vh", padding: "60px", maxWidth: "700px", margin: "0 auto" }}>

      <div style={{ marginBottom: "40px" }}>
        <img src="/logo.jpg" alt="West Cork Acupuncture" style={{ height: "70px", marginBottom: "16px" }} />
        <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#333", lineHeight: "1.8" }}>
          West Cork Acupuncture<br />
          13 North Street<br />
          Skibbereen<br />
          Co. Cork
        </p>
      </div>

      <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#333", marginBottom: "32px" }}>{today}</p>

      {ref && (
        <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#666", marginBottom: "8px" }}>Receipt No: {ref}</p>
      )}

      <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#333", marginBottom: "32px" }}>
        Dear {name || "Client"},
      </p>

      <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#333", marginBottom: "32px", lineHeight: "1.8" }}>
        Please find your receipt for your treatment with me, Kate English at West Cork Acupuncture.
      </p>

      <div style={{ borderTop: "1px solid #ddd", borderBottom: "1px solid #ddd", padding: "24px 0", marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "sans-serif", fontSize: "14px", marginBottom: "8px" }}>
          <span>{service || "Treatment"} ~ {date || "-"} ~ {time || "-"}</span>
          <span style={{ fontWeight: "bold" }}>{"\u20ac"}{amount || "0"}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "sans-serif", fontSize: "14px", color: "#666" }}>
          <span>Payment method: {payment || "-"}</span>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "sans-serif", fontSize: "16px", fontWeight: "bold", marginBottom: "48px" }}>
        <span>Total</span>
        <span>{"\u20ac"}{amount || "0"}</span>
      </div>

      <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#333", marginBottom: "48px", lineHeight: "1.8" }}>
        Received with thanks,
      </p>

      <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#333", lineHeight: "1.8" }}>
        Kate English.<br />
        Owner and Acupuncturist at West Cork Acupuncture.<br />
        083-1156950
      </p>

      <div style={{ marginTop: "48px", display: "flex", gap: "16px" }}>
        <button
          onClick={() => window.print()}
          style={{ background: "#1D9E75", color: "white", padding: "14px 32px", borderRadius: "6px", border: "none", fontFamily: "sans-serif", fontSize: "16px", cursor: "pointer" }}
        >
          Print Receipt
        </button>
        <button
          onClick={() => window.close()}
          style={{ background: "#888", color: "white", padding: "14px 32px", borderRadius: "6px", border: "none", fontFamily: "sans-serif", fontSize: "16px", cursor: "pointer" }}
        >
          Close
        </button>
      </div>

      <style>{`
        @media print {
          button { display: none !important; }
          body { padding: 0; margin: 0; }
        }
      `}</style>

    </div>
  );
}
