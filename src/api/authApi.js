const BASE_URL = "http://localhost:3000/api/v1/auth";

async function handle(res) {
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Auth error");
  return json.data;
}

export function sendOtp(phoneNumber) {
  return fetch("http://localhost:3000/api/v1/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber }), // 🔴 EXACT KEY
  }).then(handle);
}


export function verifyOtp(phoneNumber, code) {
  return fetch(`${BASE_URL}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber, code }),
  }).then(handle);
}

export function logoutRequest(token) {
  return fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}
