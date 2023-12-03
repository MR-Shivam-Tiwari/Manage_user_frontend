import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Teams from "./Components/Teams";
import Users from "./Components/Users";

const App = () => {
  const [teams, setTeams] = useState([]);

  // Fetch teams data
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/team");
        const data = await response.json();

        // Set teams as an array with a single team object
        setTeams([data]);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/teams">
          <Teams teams={teams} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
