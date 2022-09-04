import React, {useEffect, useState} from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {
  Box,
  Button,
  Grid,
  Container,
  Card,
  CardHeader,
  CardContent,
  Checkbox,
  MenuItem,
  InputLabel,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  OutlinedInput
} from "@mui/material";
import {
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
} from "@mui/material";
import "./App.css";
import AddIcon from "./add.svg";
import RemoveIcon from "./Iconsdelete.svg";
import CancelIcon from '@mui/icons-material/Cancel';
import "bootstrap/dist/css/bootstrap.min.css";
import { Cancel, SettingsPhoneTwoTone } from "@mui/icons-material";

function App() {
  const [rule,setRule] = React.useState([]);
  const [field, setField] = React.useState([]);
  const [operator, setOperator] = React.useState([]);
  const [groupName, setGroupName] = React.useState("");
  const [groupDescription, setGroupDescription] = React.useState("");
  const [inputFields,setInputFields] = useState([
    {fields: '', operators:''}
  ]);
  const [addInputFields,setAddInputFields] = useState([]);
  const [addNewRevenue,setAddNewRevenue] = useState([]);
  const [show,setShow] = useState(false);
  const [checkSpecialGroup, setCheckSpecialGroup]= useState(false);

  const handleGroupNameChange = (e) =>{
     setGroupName(e.target.value);
  }
  const handleGroupDescriptionChange = (e)=>{
    setGroupDescription(e.target.value);
  }
  const handleField = (index,event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setField(data[index]['fields']);
    console.log(field);
    let index1 = index + 1;
    setRule(index1);
  };
  const handleOperator = (index,event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setOperator(data[index]['operators']);
    console.log(operator);
  };
  const handleCheckbox = (event) => {
    let {checked} = event.target;
    setCheckSpecialGroup(checked);
  }
  const addRules = (e) => {
    e.preventDefault();
    let newfield = {fields: '', operators: ''}
    setInputFields([...inputFields, newfield])
  }
  const onSubmit =(e)=>{
    e.preventDefault();
    setAddNewRevenue([...addNewRevenue, {
      name: groupName,
      description: groupDescription,
      rule : rule,
      operator : operator,
      field : field
    }])
    localStorage.setItem('addNewRevenue', JSON.stringify(addNewRevenue));
    console.log('rev', addNewRevenue);
    setGroupName("");
    setGroupDescription("");
    setField("");
    setOperator("");
    setInputFields("");
    setShow(true);
  }
  const removeFields=(index)=>{
    let data = [...inputFields];
    data.splice(index,1);
    setInputFields(data)
  }
  return (
    <Container maxWidth={false} component={Box} marginTop="1.5rem">
      <Grid container>
        <Grid item xs={12} md={6} lg={6} mr="20px">
          <Card>
            <CardHeader title="Create Revenue Group" />
            <form onSubmit={onSubmit}>
              <Grid
                container
                component={Box}
                marginRight="15px!important"
                marginLeft="15px!important"
              >
                <Grid item xs={11} md={11} lg={11}>
                  <FormGroup>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink htmlFor="groupName-input">
                        Group Name
                      </InputLabel>
                      <OutlinedInput class="groupName-input" value={groupName} onChange={handleGroupNameChange} id="groupName-input" />
                    </FormControl>
                    <br />
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink htmlFor="textfield-input">
                        Group Description
                      </InputLabel>
                      <OutlinedInput value={groupDescription} onChange={handleGroupDescriptionChange} id="textfield-input" />
                    </FormControl>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox value={handleCheckbox}/>}
                        label="Special Group"
                      />
                    </FormGroup>
                    <br />
                  </FormGroup>
                </Grid>
                <Grid item xs={11} minWidth="30px" marginBottom="2rem">
                  <FormGroup>
                    <FormLabel> Rules</FormLabel>
                    <Button variant="outlined" type="primary" onClick={addRules}>
                      <img src={AddIcon} alt="Add Rules Icon"/>Add Rules
                    </Button>
                    {inputFields.map((input,index)=>
                    <Card style={{ border: "dashed", marginBottom: '30px' }} id="rule" key={index}>
                      <CardHeader title="Rule" 
                      action= {
                        index >= 1 ?
                        <CancelIcon onClick={()=> removeFields(index)}></CancelIcon>
                        : null
                      }/> 

                      <CardContent style={{ backgroundColor: "#ECEAEA" }}>
                        <p>If</p>
                        <FormControl fullWidth>
                          <InputLabel id="field-select-label">
                            Select Field
                          </InputLabel>
                          <Select
                            labelId="field-select-label"
                            label="Select Field"
                            name="fields"
                            id={index}
                            value={input.field}
                            onChange={event => handleField(index,event)}
                          >
                            <MenuItem value={"field1"}>Field1</MenuItem>
                            <MenuItem value={"field2"}>Field2</MenuItem>
                            <MenuItem value={"field3"}>Field3</MenuItem>
                            <MenuItem value={"field4"}>Field4</MenuItem>
                            <MenuItem value={"field5"}>Field5</MenuItem>
                          </Select>
                          <br />
                        </FormControl>
                        <FormControl fullWidth>
                          <InputLabel id="field-select-label">
                            Select Operator
                          </InputLabel>
                          <Select
                            labelId="operator-select-label"
                            label="Select Operator"
                            name="operators"
                            id = {index}
                            value={input.operator}
                            onChange={event => handleOperator(index,event)}
                          >
                            <MenuItem value={"Operator 1"}>Operator 1</MenuItem>
                            <MenuItem value={"Operator 2"}>Operator 2</MenuItem>
                            <MenuItem value={"Operator 3"}>Operator 3</MenuItem>
                            <MenuItem value={"Operator 4"}>Operator 4</MenuItem>
                            <MenuItem value={"Operator 5"}>Operator 5</MenuItem>
                          </Select>
                          <br />
                        </FormControl>

                        <FormControl fullWidth variant="standard">
                          <InputLabel shrink htmlFor="textfield-input">
                            Parameter
                          </InputLabel>
                          <OutlinedInput name="parameter" id="textfield-input" />
                        </FormControl>
                      </CardContent>
                    </Card>
                    )}
                  </FormGroup>
                </Grid>
              </Grid>
              <Box
                textAlign="right"
                marginTop="1.5rem"
                marginBottom="1.5rem"
                paddingRight="25px!important"
              >
                <Button color="secondary" variant="outlined">
                  Reset
                </Button>
                <Button
                  sx={{ ml: 1 }}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Card>
          <br/>
        </Grid>
   {show == true ?
      <Grid item xs={12} md={6} lg={5.5} boxShadow= '1'>
        <Card>
          <CardHeader title="Browse Revenue Group" 
          action={
            <Button>
            <img src={RemoveIcon}></img>
            </Button>
          }/>
          <CardContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </CardContent>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rule</TableCell>
            <TableCell align="right">Field</TableCell>
            <TableCell align="right">Operator</TableCell>
            <TableCell align="right">Parameter1</TableCell>
            <TableCell align="right">Parameter2</TableCell>
            <TableCell align="right">Parameter3</TableCell>
            <TableCell align="right">Revenue</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addNewRevenue.map((row) => (
            <TableRow
              key={row.rule}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.rule}
              </TableCell>
              <TableCell align="right">{row.field}</TableCell>
              <TableCell align="right">{row.operator}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
      
             
              <TableCell align="right">{row.revenue}</TableCell>
              <TableCell align="right"></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Card>
     </Grid>
    :null
          }
      </Grid>
      
    </Container>
  );
}

export default App;
