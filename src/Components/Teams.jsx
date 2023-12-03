import React, { useState, useEffect } from "react";

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/team");
        const data = await response.json();
        setTeams(data.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleDeleteTeam = async (teamId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/team/${teamId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTeams((prevTeams) =>
          prevTeams.filter((team) => team._id !== teamId)
        );
      } else {
        const data = await response.json();
        console.error("Error deleting team:", data.message);
      }
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Teams</h1>
      <div className="row">
        {teams.map((team) => (
          <div key={team._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-capitalize">{team.name}</h5>

                <ul className="list-unstyled mt-3">
                  {team.users.map((user) => (
                    <li className="card p-2 mb-2 row bg-light" key={user._id}>
                      <p>
                        <strong>Name:</strong> {user.first_name}{" "}
                        {user.last_name}
                      </p>
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteTeam(team._id)}
                >
                  Delete Team
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
