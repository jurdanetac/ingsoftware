import axios from "redaxios";

let token = null;

// Set session token for all requests
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// Render Backend
// const baseUrl = "https://backend-ingsoftware.onrender.com";
// Local Backend
const baseUrl = "http://localhost:3000";

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

const getTransactions = async () => {
  const response = await axios.get(`${baseUrl}/api/transacciones`);

  return response.data;
};

const getUsers = async () => {
  const response = await axios.get(`${baseUrl}/api/usuarios`);

  return response.data;
};

const getClients = async () => {
  const response = await axios.get(`${baseUrl}/api/clientes`);

  return response.data;
};

const getSuppliers = async () => {
  const response = await axios.get(`${baseUrl}/api/proveedores`);

  return response.data;
};

const addClient = async (client) => {
  const response = await axios.post(`${baseUrl}/api/clientes`, client, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

export default {
  ping,
  login,
  setToken,
  getTransactions,
  getUsers,
  getClients,
  getSuppliers,
  addClient,
};
