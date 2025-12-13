// src/api/authApi.js



export async function loginRequest(email, password) {
  const res = await fetch("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  const json = await res.json();
  return json.data; 
}




export async function logoutRequest(token) {
  const res = await fetch("http://localhost:3000/api/v1/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.warn("Server logout failed, but user will be logged out locally.");
  }

  return true;
}

