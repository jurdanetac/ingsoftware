import "./App.css";
import { useState } from "react";
import Login from "./components/Login";
import axios from "redaxios";

const App = () => {
  const [session, setSession] = useState(null);

  // if user is not logged in, show login page
  if (!session) {
    return <Login setSession={setSession} />;
  }

  const logout = () => {
    // delete user from state
    setSession(null);
    // ask server to delete user session
    // axios.delete(`/api/logout/${session.id}`);
  };

  return (
    <div className="App">
      <h1>Welcome {session.user}</h1>
      <button onClick={() => setSession(null)}>Logout</button>
    </div>
  );
};

export default App;
