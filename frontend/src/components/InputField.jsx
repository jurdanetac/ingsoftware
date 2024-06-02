import React from "react";
import TextField from "@mui/material/TextField";

const InputField = ({ id, label, value, onChange }) => (
  <TextField
    id={id}
    placeholder={label}
    name={id}
    label={label}
    variant="outlined"
    autoComplete={id}
    value={value}
    onChange={(event) => onChange(event.target.value)}
  />
);

export default InputField;
