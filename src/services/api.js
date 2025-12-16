const API_URL = "http://localhost:5001";

export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API error");
  }

  return res.json();
};
