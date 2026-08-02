import { useRouter } from "next/router";

export default function SOAPPrint() {
  const router = useRouter();
  const { name, date, subjective, objective, assessment, plan, ref } = router.query;

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "white", minHeight: "100vh", padding: "60px", maxWidth: "700px", margin: "0 auto" }}>

      <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <img src="/logo.jpg" alt="West Cork Acupuncture" style={{ height: "60px", marginBottom: "12px" }} />
          <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#333", lineHeight: "1.8" }}>
            West Cork Acupuncture<br />
            13 North Street, Skibbereen<br />
            Co. Cork · 083 115 6950
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "sans-serif", fontSize: "20px", color: "#085041", fontWeight: "bold", marginBottom: "4px" }}>SOAP Note</p>
          {ref && <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#666" }}>Ref: {ref}</p>}
        </div>
      </div>

      <div style={{ borderTop: "2px solid #085041", paddingTop: "24px", marginBottom: "32px" }}>
        <div style={{ display: "flex", gap: "40px", fontFamily: "sans-serif", fontSize: "14px" }}>
          <div>
            <span style={{ color: "#666" }}>Client: </span>
            <span style={{ fontWeight: "bold", color: "#085041" }}>{name || "-"}</span>
          </div>
          <div>
            <span style={{ color: "#666" }}>Date: </span>
            <span style={{ fontWeight: "bold", color: "#085041" }}>{date || "-"}</span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <div style={{ background: "#085041", color: "white", padding: "8px 16px", borderRadius: "4px 4px 0 0", fontFamily: "sans-serif", fontSize: "13px", fontWeight: "bold", letterSpacing: "2px" }}>
          S — SUBJECTIVE
        </div>
        <div style={{ border: "1px solid #E1F5EE", borderTop: "none", padding: "16px", minHeight: "80px", borderRadius: "0 0 4px 4px" }}>
          <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#333", lineHeight: "1.8", margin: 0 }}>{subjective || "-"}</p>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <div style={{ background: "#085041", color: "white", padding: "8px 16px", borderRadius: "4px 4px 0 0", fontFamily: "sans-serif", fontSize: "13px", fontWeight: "bold", letterSpacing: "2px" }}>
          O — OBJECTIVE
        </div>
        <div style={{ border: "1px solid #E1F5EE", borderTop: "none", padding: "16px", minHeight: "80px", borderRadius: "0 0 4px 4px" }}>
          <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#333", lineHeight: "1.8", margin: 0 }}>{objective || "-"}</p>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <div style={{ background: "#085041", color: "white", padding: "8px 16px", borderRadius: "4px 4px 0 0", fontFamily: "sans-serif", fontSize: "13px", fontWeight: "bold", letterSpacing: "2px" }}>
          A — ASSESSMENT
        </div>
        <div style={{ border: "1px solid #E1F5EE", borderTop: "none", padding: "16px", minHeight: "80px", borderRadius: "0 0 4px 4px" }}>
          <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#333", lineHeight: "1.8", margin: 0 }}>{assessment || "-"}</p>
        </div>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <div style={{ background: "#085041", color: "white", padding: "8px 16px", borderRadius: "4px 4px 0 0", fontFamily: "sans-serif", fontSize: "13px", fontWeight: "bold", letterSpacing: "2px" }}>
          P — PLAN
        </div>
        <div style={{ border: "1px solid #E1F5EE", borderTop: "none", padding: "16px", minHeight: "80px", borderRadius: "0 0 4px 4px" }}>
          <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#333", lineHeight: "1.8", margin: 0 }}>{plan || "-"}</p>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #E1F5EE", paddingTop: "24px", marginBottom: "32px" }}>
        <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#666", lineHeight: "1.8" }}>
          Practitioner: Kate English<br />
          West Cork Acupuncture · 083 115 6950
        </p>
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        <button
          onClick={() => window.print()}
          style={{ background: "#1D9E75", color: "white", padding: "14px 32px", borderRadius: "6px", border: "none", fontFamily: "sans-serif", fontSize: "16px", cursor: "pointer" }}
        >
          Print Note
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
        }
      `}</style>

    </div>
  );
}
