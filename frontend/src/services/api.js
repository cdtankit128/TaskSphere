const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const getHello = async () => {
  const res = await fetch(`${BASE_URL}/api/hello`);
  return res.text();
};
