import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

interface DateSelectorProps {
  label: string;
  onChange?: (selected: string) => void;
}

export default function DateSelector({ label, onChange }: DateSelectorProps) {
  const [value, setValue] = React.useState<any>(null);

  const handleChange = (newValue: any) => {
    setValue(newValue);
    if (onChange) onChange(newValue ? newValue.format("YYYY-MM-DD") : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl
        sx={{
            width: {
                xs: '100%',   // mobile
                sm: '100%',      // small screens
                md: '100%',      // medium screens 
            },
            minWidth:{
                md:200,
                lg:300
            },
        }}
      >
        <DatePicker
          label={label}
          value={value}
          onChange={handleChange}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
              sx: {
                "& .MuiInputBase-root": {
                  borderRadius: "8px",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                },
              },
            },
          }}
        />
      </FormControl>
    </LocalizationProvider>
  );
}
