import React, { useEffect, useState } from "react";
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
  OutlinedInput,
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
import AddIcons from "./add_circle_outline.svg";
import CancelIcon from "@mui/icons-material/Cancel";
import "bootstrap/dist/css/bootstrap.min.css";
import { LocalSeeOutlined, PanoramaPhotosphereSelect } from "@mui/icons-material";
function App() {
  const [rule, setRule] = React.useState([]);
  const [field, setField] = React.useState([]);
  const [operator, setOperator] = React.useState([]);
  const [parameter, setParameter] = React.useState([]);
  const [groupName, setGroupName] = React.useState("");
  const [revenue, setRevenue] = useState("");
  const [groupDescription, setGroupDescription] = React.useState("");
  const [inputFields, setInputFields] = useState([{ fields: "", operators: "" }]);
  const [parameterField, setParamaterField] = useState([{ parameters: "" }]);
  const [addNewRevenue, setAddNewRevenue] = useState([]);
  const [show, setShow] = useState(false);
  const [checkSpecialGroup, setCheckSpecialGroup] = useState(false);
  const [remove,setRemove] = useState(false);
  const [items,setItems] = useState([]);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };
  const handleGroupDescriptionChange = (e) => {
    setGroupDescription(e.target.value);
  };
  const handleField = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setField(data[index]["fields"]);
    let index1 = index + 1;
    setRule(index1);
  };
  const handleOperator = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setOperator(data[index]["operators"]);
  };
  const handleParameter = (index,event) => {
    let data = [...parameterField];
    setParameter(event.target.value);
  };
  const handleCheckbox = () => {
    setCheckSpecialGroup(true);
  };
  const addRules = (e) => {
    e.preventDefault();
    let newfield = { fields: "", operators: "" };
    setInputFields([...inputFields, newfield]);
  };
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };
  const addParameter = (e) => {
    e.preventDefault();
    let newfield = {parameters: ""};
    setParamaterField([...parameterField, newfield]);
    setRemove(true);
  };
  const removeParameterFields =(index) => {
    let data = [...parameterField];
    data.splice(index, 1);
    setParamaterField(data);
  }
  const handleRevenue = (e)=>{
    setRevenue(e.target.value);
  }
  const removeGroup = (e)=>{
    setShow(false);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    setAddNewRevenue([
      ...addNewRevenue,
      {
        rule: rule,
        operator: operator,
        field: field,
        specialGroup: checkSpecialGroup,
        parameters1: parameter,
        revenue : revenue
      },
    ]);
    localStorage.setItem("addNewRevenue", JSON.stringify(addNewRevenue));
    localStorage.setItem("name",JSON.stringify(groupName));
    localStorage.setItem("description",JSON.stringify(groupDescription));
    setShow(true);
    localStorage.setItem("parameters1",JSON.stringify(parameter));
  };
  const reset = (e) =>{
    setGroupName("");
    setGroupDescription("");
    setField("");
    setOperator("");
    setCheckSpecialGroup("");
    setParameter("");
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
                    <FormLabel> Group Name</FormLabel>
                      <OutlinedInput
                        class="groupName-input"
                        value={groupName}
                        onChange={handleGroupNameChange}
                        id="groupName-input"
                        style={{border: '1px solid #000000', boxShadow: '0'}}
                      />
                    </FormControl>
                    <br />
                    <FormControl fullWidth variant="standard">
                     <FormLabel>Group description</FormLabel>
                      <OutlinedInput
                        value={groupDescription}
                        onChange={handleGroupDescriptionChange}
                        id="textfield-input"
                        style={{border: '1px solid #000000', boxShadow: '0'}}
                      />
                    </FormControl>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onClick={handleCheckbox} />}
                        label="Special Group"
                      />
                    </FormGroup>
                    <br />
                  </FormGroup>
                </Grid>
                <Grid item xs={11} minWidth="30px" marginBottom="2rem">
                  <FormGroup>
                    <FormLabel> Rules</FormLabel>
                    <Button
                      variant="outlined"
                      type="primary"
                      onClick={addRules}
                    >
                      <img src={AddIcon} alt="Add Rules Icon" />
                      Add Rules
                    </Button>
                    {inputFields.map((input, index) => (
                      <Card
                        style={{ border: "dashed", marginBottom: "30px" }}
                        id="rule"
                        key={index}
                      >
                        <CardHeader
                          title="Rule"
                          action={
                            index >= 1 ? (
                              <CancelIcon
                                onClick={() => removeFields(index)}
                              ></CancelIcon>
                            ) : null
                          }
                        />

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
                              onChange={(event) => handleField(index, event)}
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
                              id={index}
                              value={input.operator}
                              onChange={(event) => handleOperator(index, event)}
                            >
                              <MenuItem value={"Operator 1"}>
                                Operator 1
                              </MenuItem>
                              <MenuItem value={"Operator 2"}>
                                Operator 2
                              </MenuItem>
                              <MenuItem value={"Operator 3"}>
                                Operator 3
                              </MenuItem>
                              <MenuItem value={"Operator 4"}>
                                Operator 4
                              </MenuItem>
                              <MenuItem value={"Operator 5"}>
                                Operator 5
                              </MenuItem>
                            </Select>
                            <br />
                          </FormControl>
                          {parameterField.map((field, index) => (
                            <FormControl key={index} fullWidth variant="standard">
                              <FormLabel>Parameter
                                <img src={AddIcons} alt="Add Parameter Icon" onClick={addParameter}/>
                               {remove == true?
                                <img src ={RemoveIcon} onClick={removeParameterFields}></img>
                              :null }
                              </FormLabel>
                              <OutlinedInput
                                id={index}
                                value={field.parameter}
                                onChange={(event)=>handleParameter(index,event)}
                                style={{border: '1px solid black'}}
                              />
                            </FormControl>
                          ))}
                          <FormControl>
                            <br/>
                              <p>then revenue is  
                              <OutlinedInput style={{border:'1px solid black', maxWidth: '50%', marginLeft: '10px'}} placeholder="% Enter amount" onChange={handleRevenue}></OutlinedInput>
                              </p>
                          </FormControl>
                        </CardContent>
                      </Card>
                    ))}
                  </FormGroup>
                </Grid>
              </Grid>
              <Box
                textAlign="right"
                marginTop="1.5rem"
                marginBottom="1.5rem"
                paddingRight="25px!important"
              >
                <Button color="secondary" variant="outlined" onClick={reset}>
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
          <br />
        </Grid>
        {show === true ? (
          
          <Grid item xs={12} md={6} lg={5.5} height="100%" boxShadow="1">
            <Card>
              <CardHeader
                title = {JSON.parse(localStorage.getItem('name'))}
                action={
                  <div>
                    {checkSpecialGroup === true ? (
                      <Button type="primary" variant="outlined">
                        Special group
                      </Button>
                    ) : null}

                    <Button>
                      <img src={RemoveIcon} onClick={removeGroup}></img>
                    </Button>
                  </div>
                }
              />
              <CardContent>
              {JSON.parse(localStorage.getItem('description'))}
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
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.rule}
                        </TableCell>
                        <TableCell align="right">{row.field}</TableCell>
                        <TableCell align="right">{row.operator}</TableCell>
                        <TableCell align="right"> {row.parameters1} </TableCell>
                        <TableCell align="right">{row.revenue}</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        ): null }
      </Grid>
    </Container>
  );
}

export default App;
