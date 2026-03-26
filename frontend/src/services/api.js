const BASE_URL = "http://backend:8080";

export const getHello = async () => {
  const res = await fetch(`${BASE_URL}/api/hello`);
  return res.text();
};
