import { useState , useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { requestOtp, confirmOtp, loading, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState("phone"); // phone | otp
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  async function submitPhone(e) {
    e.preventDefault();
    try {
      await requestOtp(phone);
      setStep("otp");
    } catch (err) {
      setError(err.message);
    }
  }

    async function submitOtp(e) {
      e.preventDefault();
      try {
        await confirmOtp(otp);
      } catch (err) {
        setError(err.message);
      }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm border-0" style={{ width: 380 }}>
        <div className="card-body p-4">

          <div className="text-center mb-4">
            <h3 className="fw-bold mb-1">Admin Dashboard</h3>
            <p className="text-muted">Secure access</p>
          </div>

          {error && (
            <div className="alert alert-danger py-2">{error}</div>
          )}

          {step === "phone" && (
            <form onSubmit={submitPhone}>
              <div className="mb-3">
                <label className="form-label">Phone number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+90..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Sending OTP..." : "Continue"}
              </button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={submitOtp}>
              <div className="mb-3">
                <label className="form-label">OTP Code</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary w-100" disabled={loading}>
                Verify
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
