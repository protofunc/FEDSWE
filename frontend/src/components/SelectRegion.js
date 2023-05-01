import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectRegion(props) {
  const [region, setRegion] = React.useState('');

  const handleSelectArea = (event) => {
    setRegion(event.target.value)
    props.onSelectArea(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 130 }} size="small">
      <InputLabel id="Job Region"
        sx={{
          color: 'white',
          '&.Mui-focused': {
            color: 'white'
          }
        }}
      >Job Region</InputLabel>
      <Select value={region} label="Job Region" onChange={handleSelectArea}
        sx={{
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          }
        }}
      >
        <MenuItem value={""}><em>None</em></MenuItem>
        <MenuItem value={"Virginia"}>Virginia</MenuItem>
        <MenuItem value={"Washington, DC"}>Washington DC</MenuItem>
        <MenuItem value={"San Diego"}>San Diego</MenuItem>
      </Select>
    </FormControl>
  );
}