import React from "react";
import { Card, CardContent, Typography, Avatar, Checkbox } from "@mui/material";

const UserCard = ({ user, onSelect, isSelected }) => {
  return (
    <Card
      className={`d-flex align-items-center border rounded-3 ${
        isSelected ? "selected" : ""
      }`}
      style={{ backgroundColor: "#cfd7d9" }}
    >
      <div className="p-2">
        <Checkbox
          className=""
          style={{ marginTop: "-35px", marginLeft: "-15px" }}
          checked={isSelected}
          onChange={onSelect}
        />
        <Avatar
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          style={{
            width: "100%",
            height: "80px",
            objectFit: "cover",
            backgroundColor: "#e8e8e8",
          }}
        />
      </div>
      <div>
        <CardContent>
          <Typography className="fw-bold">
            <h6 className="fw-bold">{`${user.first_name} ${user.last_name}`}</h6>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <div className="d-flex align-items-center mt-2">
              <div className="fw-bold">Email:</div> &nbsp;
              <div className="" style={{ fontSize: "13px" }}>
                {user.email}
              </div>
            </div>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <div className="d-flex mt-1">
              <div className="fw-bold">Gender:</div> &nbsp;
              {user.gender}
            </div>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <div className="d-flex mt-1 align-items-center">
              <div className="fw-bold">Domain:</div> &nbsp;
              {user.domain}
            </div>
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default UserCard;
