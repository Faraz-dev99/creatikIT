import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
    options: any[];
    label: string;
    onChange?: (selected: string) => void; // now single value
}

function getStyles(name: string, selected: string, theme: Theme) {
    return {
        fontWeight:
            selected === name
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
    };
}

export default function SingleSelect({ options, label, onChange }: OptionProps) {
    const theme = useTheme();
    const [selectedOption, setSelectedOption] = React.useState<string>("");

    const handleChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        setSelectedOption(value);

        if (onChange) onChange(value);
    };

    return (
        <FormControl sx={{
             width: {
                xs: '100%',   // mobile
                sm: '100%',      // small screens
                md: '100%',      // medium screens
            },
            minWidth:{
                md:200,
                lg:300
            },
        }}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={selectedOption}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                MenuProps={MenuProps}
            >
                {options.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, selectedOption, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
