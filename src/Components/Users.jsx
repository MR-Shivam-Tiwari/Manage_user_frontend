import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import {
  Container,
  Grid,
  Pagination,
  Checkbox,
  Button,
  Input,
} from "@mui/material";
import UserCard from "./UserCard"; // Assuming this component is implemented
import Filters from "./Filters"; // Assuming this component is implemented
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CenteredPagination = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "30px",
  marginBottom: "20px",
});

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    domain: "",
    gender: "",
    availability: false,
  });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const usersPerPage = 20;
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/users?page=${currentPage}&limit=${usersPerPage}&search=${searchTerm}&domain=${filters.domain}&gender=${filters.gender}&availability=${filters.availability}`
        );
        setUsers(response.data.users);
        setTotalPages(Math.ceil(response.data.totalUsers / usersPerPage));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, filters]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    const filterValue = type === "checkbox" ? checked : value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: filterValue,
    }));
  };

  const handleUserSelection = (user) => {
    const isUserSelected = selectedUsers.some(
      (selectedUser) => selectedUser._id === user._id
    );

    const isDomainSelected = selectedUsers.some(
      (selectedUser) => selectedUser.domain === user.domain
    );

    if (isUserSelected) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter(
          (selectedUser) => selectedUser._id !== user._id
        )
      );
    } else {
      if (isDomainSelected) {
        alert("User with the same domain cannot be selected.");
        return;
      }

      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    }
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      alert("Please provide a non-empty team name before creating a team.");
      return;
    }

    console.log("Selected Users:", selectedUsers);

    const validSelectedUsers = selectedUsers.filter((user) => user && user._id);

    console.log("Valid Selected Users:", validSelectedUsers);

    if (validSelectedUsers.length < 2) {
      alert("Please select at least two users before creating a team.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/team", {
        teamName,
        selectedUsers: validSelectedUsers.map((user) => user._id),
      });

      console.log("Team created:", response.data);

      setSelectedUsers([]);
      setTeamName("");

      history.push(`/teams?teamId=${response.data._id}`);
    } catch (error) {
      console.error("Error creating team:", error);
      alert("Error creating team. Please try again.");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container mt={5}>
      <div className="row mb-4 mt-4">
        <div className="col">
          <h4 className="fw-bold">Manage Users</h4>
        </div>
        <div className="col-lg-4 col-12 ">
          <div className="row">
            <input
              className="form-control me-2 col"
              type="search"
              placeholder="Search User"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="col">
              <Link to="/teams">
                <Button variant="contained" color="warning" fullWidth>
                  Teams &nbsp;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-people-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <Filters filters={filters} handleFilterChange={handleFilterChange} />
      </div>
      <div className="row mt-4 mb-3">
        <div className="col card p-3">
          <h4 className="fw-bold">Select Team Members For Create Team</h4>
          <ul>
            {selectedUsers.map((selectedUser) => (
              <li key={selectedUser._id}>
                {`${selectedUser.first_name} ${selectedUser.last_name}`}
              </li>
            ))}
          </ul>
          <label>
            Team Name: <br></br>
            <Input
              variant="outlined"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </label>{" "}
          &nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            color="warning"
            onClick={handleCreateTeam}
          >
            Create Team
          </Button>
        </div>
      </div>
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid key={user.id} item xs={12} sm={6} md={4}>
            <UserCard
              user={user}
              onSelect={() => handleUserSelection(user)}
              isSelected={selectedUsers.includes(user)}
            />
          </Grid>
        ))}
      </Grid>

      <CenteredPagination>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </CenteredPagination>
    </Container>
  );
};

export default Users;
