import axios from "redaxios";

const baseUrl = "https://backend-ingsoftware.onrender.com";

const ping = async () => {
  // used to wake up the backend since it's on render's free tier
  const response = await axios.get(`${baseUrl}/api/ping`);

  return response.data;
};

export default {
  ping,
};
