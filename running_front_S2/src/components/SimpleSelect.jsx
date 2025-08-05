import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SimpleSelect = ({ 
  label, 
  value, 
  onChange, 
  options,
  width = "6rem",
  loading = false
}) => {
  return (
    <FormControl style={{ width }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={onChange}
        disabled={loading}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SimpleSelect;