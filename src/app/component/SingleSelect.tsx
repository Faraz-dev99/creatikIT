import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface OptionProps {
  options: string[];
  label: string;
  value?: string;
  onChange?: (selected: string) => void;
  error?: string; // optional error prop
}

export default function SingleSelect({ options, label, value, onChange, error }: OptionProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <FormControl
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%" },
        minWidth: { md: 200, lg: 300 },
        mb: error ? 1 : 0, // add margin-bottom if error exists
      }}
      error={!!error} // MUI styling for error
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value ?? ""}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        {options.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
      {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
    </FormControl>
  );
}
