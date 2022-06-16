import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import i18next from 'i18next';
import { useState } from 'react';

const SelectMenu: React.FC<{
    label: string;
    menuItems: string[];
    selectClick: (value: string) => void;
}> = (props) => {
    const [value, setValue] = useState('');
    const dir = i18next.dir(i18next.language);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
        props.selectClick(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ width: '160px', direction: dir }} size="small">
                <InputLabel dir={dir} id="demo-simple-select-helper-label">
                    {props.label}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={value}
                    label={props.label}
                    onChange={handleChange}
                    sx={{
                        height: '40px',
                    }}
                >
                    {props.menuItems.map((_, index) => {
                        return (
                            <MenuItem dir={dir} value={props.menuItems[index]}>
                                {props.menuItems[index]}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
};

export default SelectMenu;
