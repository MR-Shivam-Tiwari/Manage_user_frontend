import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

const Filters = ({ filters, handleFilterChange }) => {
  return (
    <>
      <h4 className="fw-bold">Users Filter</h4>
      <div className="col-lg-4 col-12">
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="domain-filter">Domain</InputLabel>
          <OutlinedInput
            id="domain-filter"
            type="text"
            name="domain"
            value={filters.domain}
            onChange={handleFilterChange}
            label="Domain"
          />
        </FormControl>
      </div>
      <div className="col-lg-4 col-12">
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="gender-filter">Gender</InputLabel>
          <OutlinedInput
            id="gender-filter"
            type="text"
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            label="Gender"
          />
        </FormControl>
      </div>
      <div className="col-lg-4 col-12">
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.availability}
                onChange={handleFilterChange}
                name="availability"
              />
            }
            label="Available"
          />
        </FormGroup>
      </div>
    </>
  );
};

export default Filters;
