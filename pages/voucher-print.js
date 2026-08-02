import { useRouter } from "next/router";

export default function VoucherPrint() {
  const router = useRouter();
  const { code, amount, purchaser, recipient, date } = router.query;

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "white", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "40px" }}>
      <div style={{ maxWidth: "500px", width: "100%" }}>

        <div style={{ border: "3px solid #085041", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ background: "#085041", padding: "32px", textAlign: "center" }}>
            <img src="/logo.jpg" alt="West Cork Acupuncture" style={{ height: "70px", marginBottom: "16px" }} />
            <h1 style={{ fontSize: "28px", color: "white", fontWeight: "normal", margin: 0 }}>Gift Voucher</h1>
          </div>

          <div style={{ padding: "32px", textAlign: "center" }}>
            <p style={{ fontFamily: "sans-serif", fontSize: "48px", fontWeight: "bold", color: "#085041", margin: "0 0 8px 0" }}>{"\u20ac"}{amount || "0"}</p>
            <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#666", marginBottom: "32px" }}>West Cork Acupuncture Treatment</p>

            <div style={{ background: "#F5F0E8", padding: "16px", borderRadius: "8px", marginBottom: "24px" }}>
              <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#666", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "2px" }}>Voucher Code</p>
              <p style={{ fontFamily: "monospace", fontSize: "28px", fontWeight: "bold", color: "#085041", margin: 0 }}>{code || "-"}</p>
            </div>

            {recipient && (
              <p style={{ fontFamily: "sans-serif", fontSize: "16px", color: "#333", marginBottom: "8px" }}>
                <strong>To:</strong> {recipient}
              </p>
            )}
            {purchaser && (
              <p style={{ fontFamily: "sans-serif", fontSize: "16px", color: "#333", marginBottom: "16px" }}>
                <strong>From:</strong> {purchaser}
              </p>
            )}

            <div style={{ borderTop: "1px solid #E1F5EE", paddingTop: "16px", marginTop: "16px" }}>
              <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#666", marginBottom: "4px" }}>Valid for 12 months from {date || "date of issue"}</p>
              <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#666", marginBottom: "4px" }}>13 North Street, Skibbereen, Co. Cork</p>
              <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#666" }}>083 115 6950</p>
            </div>
          </div>

          <div style={{ background: "#1D9E75", padding: "16px", textAlign: "center" }}>
            <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "white", margin: 0 }}>
              Book online at westcorkacupuncture.ie/book and enter your voucher code
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
          <button
            onClick={() => window.print()}
            style={{ flex: 1, background: "#1D9E75", color: "white", padding: "14px", borderRadius: "6px", border: "none", fontFamily: "sans-serif", fontSize: "16px", cursor: "pointer" }}
          >
            Print Voucher
          </button>
          <button
            onClick={() => window.close()}
            style={{ flex: 1, background: "#888", color: "white", padding: "14px", borderRadius: "6px", border: "none", fontFamily: "sans-serif", fontSize: "16px", cursor: "pointer" }}
          >
            Close
          </button>
        </div>

        <style>{`
          @media print {
            button { display: none !important; }
            body { margin: 0; padding: 0; }
          }
        `}</style>

      </div>
    </div>
  );
}
