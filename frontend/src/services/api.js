import axios from "redaxios";

// Render Backend
const baseUrl = "https://backend-ingsoftware.onrender.com";
// Local Backend
// const baseUrl = "http://localhost:3000";

const ping = async () => {
  // used to wake up the backend since it's on render's free tier
  const response = await axios.get(`${baseUrl}/api/ping`);

  return response.data;
};

const login = async (username, password) => {
  const response = await axios.post(`${baseUrl}/api/login`, {
    username,
    password,
  });

  return response.data;
};

export default {
  ping,
  login,
};
