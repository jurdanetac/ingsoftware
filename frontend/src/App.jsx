import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// import react router
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";

import { useState, useEffect } from "react";
import apiService from "./services/api.js";

const App = () => {
  // wether user is logged in or not
  const [session, setSession] = useState(null);

  /*
   * sesssion = {
   *  token: token,
   *  username: "user",
   *  name: "name",
   * }
   * */

  // wait for the server to wake up
  useEffect(() => {
    apiService.ping().then((res) => {
      console.log(res);
    });
  }, []);

  // react router, url handling
  const routes = (
    <Router>
      <Routes>
        <Route
          path="/"
          element={session ? <Dashboard /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/login"
          element={
            session ? (
              <Navigate replace to="/" />
            ) : (
              <SignIn setSession={setSession} />
            )
          }
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );

  return <div className="App">{routes}</div>;
};

export default App;
