import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";

import Clients from "./components/Clients";

import apiService from "./services/api.js";

const App = () => {
  // whether user is logged in or not
  const [session, setSession] = useState(null);

  /*
   * sesssion = {
   *  token: token,
   *  username: "user",
   *  name: "name",
   *  rol: "rol",
   *  id: "id",
   * }
   * */

  const logout = () => {
    window.localStorage.removeItem("session");
    setSession(null);
  };

  // ping the server to wake up
  useEffect(() => {
    apiService
      .ping()
      .then(() => {
        console.log("server woke up");
      })
      .catch(() => {
        // TODO handle this better
        window.alert("Server is down, please try again later");
        window.location.reload();
      });
  }, []);

  const isTokenExpired = (token) =>
    Date.now() >= JSON.parse(atob(token.split(".")[1])).exp * 1000;

  // checks if user is logged in on page load
  useEffect(() => {
    const sessionJSON = window.localStorage.getItem("session");

    if (sessionJSON) {
      console.log(
        "session found in local storage, checking if token is expired...",
      );
      const expired = isTokenExpired(JSON.parse(sessionJSON).token);
      console.log(expired ? "token expired" : "token not expired");

      if (expired) {
        console.log("removing expired session from local storage");
        logout();
        console.log("session removed from local storage");
      } else {
        console.log("loading session from local storage");
        const parsedSession = JSON.parse(sessionJSON);
        setSession(parsedSession);
        apiService.setToken(parsedSession.token);
        console.log("session loaded from local storage");
      }
    }
  }, []);

  // react router, url handling
  const routes = (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            session ? (
              <Dashboard session={session} logout={logout} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
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
        <Route
          path="/clientes"
          element={session ? <Clients /> : <Navigate replace to="/login" />}
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );

  return <div className="App">{routes}</div>;
};

export default App;
