import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Head from "next/head";

const stripePromise = loadStripe("pk_test_51U0JAWJzahbtGOvyNjgkOaSoSNAD7X3Dr7HHkhFmbjbRZm3KQnIxNnw1FJC3rfh6yYAswd3zPlKgpe1D5jKXo7YG009OTBKEDZ");
const API = "https://west-cork-acupuncture-backend-production-366a.up.railway.app";

function CheckoutForm({ amount, name, service, tip, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError("");
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "https://westcorkacupuncture.ie/book-confirmed" },
      redirect: "if_required"
    });
    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p style={{ color: "#c00", fontFamily: "sans-serif", fontSize: "14px", marginTop: "12px" }}>{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{ width: "100%", background: loading ? "#999" : "#1D9E75", color: "white", padding: "14px", borderRadius: "6px", border: "none", fontFamily: "sans-serif", fontSize: "16px", cursor: loading ? "not-allowed" : "pointer", marginTop: "20px" }}
      >
        {loading ? "Processing..." : "Pay " + "\u20ac" + amount + (tip > 0 ? " (incl. \u20ac" + tip + " tip)" : "")}
      </button>
    </form>
  );
}

export default function Pay() {
  const [amount, setAmount] = useState(80);
  const [baseAmount, setBaseAmount] = useState(80);
  const [tip, setTip] = useState(0);
  const [name, setName] = useState("");
  const [service, setService] = useState("Acupuncture");
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    if (!name) { alert("Please enter your name."); return; }
    setLoading(true);
    try {
      const res = await fetch(API + "/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, name, service })
      });
      const data = await res.json();
      if (data.error) {
        alert("Payment error: " + data.error);
        setLoading(false);
        return;
      }
      setClientSecret(data.clientSecret);
      setLoading(false);
    } catch (err) {
      alert("Connection error: " + err.message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "40px" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "8px", textAlign: "center", maxWidth: "480px" }}>
          <p style={{ fontSize: "48px", marginBottom: "16px" }}>✓</p>
          <h1 style={{ fontSize: "28px", color: "#085041", marginBottom: "16px" }}>Payment Successful</h1>
          <p style={{ fontFamily: "sans-serif", color: "#555", marginBottom: "24px" }}>Thank you {name}. Your payment has been received. Kate will be in touch to confirm your appointment.</p>
          <a href="/" style={{ background: "#1D9E75", color: "white", padding: "12px 32px", borderRadius: "6px", textDecoration: "none", fontFamily: "sans-serif" }}>Return Home</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <Head>
        <title>Pay Online | West Cork Acupuncture</title>
        <link rel="canonical" href="https://westcorkacupuncture.ie/pay" />
      </Head>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", color: "#085041", marginBottom: "8px" }}>Pay Online</h1>
        <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "32px" }}>Secure payment powered by Stripe.</p>

        {!clientSecret ? (
          <div style={{ background: "white", padding: "32px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041", fontWeight: "bold" }}>Your Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" style={{ width: "100%", padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", marginTop: "6px", fontFamily: "sans-serif", fontSize: "14px", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041", fontWeight: "bold" }}>Service</label>
              <select value={service} onChange={e => { const base = e.target.value === "Cosmetic Acupuncture" ? 125 : 80; setService(e.target.value); setBaseAmount(base); setTip(0); setAmount(base); }} style={{ width: "100%", padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", marginTop: "6px", fontFamily: "sans-serif", fontSize: "14px", boxSizing: "border-box" }}>
                <option value="Acupuncture">Acupuncture — {"\u20ac"}80</option>
                <option value="Cosmetic Acupuncture">Cosmetic Acupuncture — {"\u20ac"}125</option>
              </select>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041", fontWeight: "bold" }}>Add a Tip (optional)</label>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                {[0, 10, 15, 20].map(pct => {
                  const t = Math.round(baseAmount * pct / 100);
                  return (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => { setTip(t); setAmount(baseAmount + t); }}
                      style={{ padding: "8px 16px", borderRadius: "6px", border: "2px solid", borderColor: tip === t ? "#085041" : "#9FE1CB", background: tip === t ? "#085041" : "white", color: tip === t ? "white" : "#085041", fontFamily: "sans-serif", fontSize: "13px", cursor: "pointer" }}
                    >
                      {pct === 0 ? "No tip" : pct + "% (" + "\u20ac" + t + ")"}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ background: "#E1F5EE", padding: "16px", borderRadius: "6px", marginBottom: "24px", textAlign: "center" }}>
              <p style={{ fontFamily: "sans-serif", fontSize: "32px", fontWeight: "bold", color: "#085041", margin: 0 }}>{"\u20ac"}{amount}</p>
              <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#666", margin: 0 }}>{service}{tip > 0 ? " + \u20ac" + tip + " tip" : ""}</p>
            </div>

            <button onClick={startPayment} disabled={loading} style={{ width: "100%", background: loading ? "#999" : "#1D9E75", color: "white", padding: "14px", borderRadius: "6px", border: "none", fontFamily: "sans-serif", fontSize: "16px", cursor: "pointer" }}>
              {loading ? "Loading..." : "Continue to Payment"}
            </button>
          </div>
        ) : (
          <div style={{ background: "white", padding: "32px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ background: "#E1F5EE", padding: "16px", borderRadius: "6px", marginBottom: "24px", textAlign: "center" }}>
              <p style={{ fontFamily: "sans-serif", fontSize: "28px", fontWeight: "bold", color: "#085041", margin: 0 }}>{"\u20ac"}{amount}</p>
              <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#666", margin: 0 }}>{service}{tip > 0 ? " + \u20ac" + tip + " tip" : ""} — {name}</p>
            </div>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm amount={amount} name={name} service={service} tip={tip} onSuccess={() => setSuccess(true)} />
            </Elements>
          </div>
        )}

        <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#888", textAlign: "center", marginTop: "24px" }}>
          Payments are processed securely by Stripe. West Cork Acupuncture never stores your card details.
        </p>
      </div>
    </div>
  );
}
