import {
    Button,
    FormControlLabel,
    Grid,
    Input,
    Menu,
    MenuItem,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import parseDate from "../utils/Parse";

export default function AddProject(props){

    const [menuResources,setMenuResources] = React.useState(null)
    const [selectedValue, setSelectedValue] = React.useState('');
    const [selectedGroups, setSelectedGroups] = React.useState([]);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [selectedDate2, setSelectedDate2] = React.useState(null);

    const isGroupSelected = (group) => {
        return selectedGroups.includes(group);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleGroupClick = (group) => {
        setSelectedGroups((prevSelectedGroups) => {
            if (prevSelectedGroups.includes(group)) {
                return prevSelectedGroups.filter((selectedGroup) => selectedGroup !== group);
            } else {
                return [...prevSelectedGroups, group];
            }
        });
    };

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const handleOpenMenuResources = (event, id) => {
        setMenuResources(event.currentTarget)
    }

    const handleDateChange2 = (date) =>{
        setSelectedDate2(date)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        const formData = new FormData(event.target);

        const rows = props.initialRows


        const date1 = parseDate(selectedDate)
        const date2 = parseDate(selectedDate2)

        const dayRes = date1 + ">" + date2

        const project = {
            id:rows.length + 1,
            projectName: formData.get("project-name"),
            pm:"picture",
            status:"On Track",
            resources:selectedGroups.length,
            estimation:formData.get("project-estimation") + "k",
            projectTimeLine: dayRes,
            lastUpdate: "15 Mar 2021, 12:47 PM",
        }
        console.log(project)
        props.initialRows.push(project)


    }

    const closeMenuResources = (event) => {
        setMenuResources(null)
    }

    return(
        <Grid>
            <Button onClick={handleOpenMenuResources}
                    style={{
                        backgroundColor:"#5E5ADB",
                        color:"#FFFFFF",
                    }}

            >Add New Project</Button>
            <Menu anchorEl={menuResources} open={Boolean(menuResources)}  PaperProps={{
                sx: {
                    background: "#F7F9FC",
                    width:"440px",
                    padding: 0,
                    margin: 0,
                    paddingBottom: 0,
                    display:"flex",
                    flexDirection:"column"
                }
            }}>
                <form onSubmit={handleSubmit}>
                <MenuItem  PaperProps={{
                    sx: {
                        background: "#EBEEFA",
                        width: "440px"
                    }
                }}>
                    <span style={{fontWeight:"bold"}}>Add new project</span>

                </MenuItem>


                    <MenuItem>
                        <Typography>Project Name</Typography>
                    </MenuItem>

                    <MenuItem>

                    <TextField required name="project-name" id="outlined-basic" type="text"
                               variant="outlined" fullWidth={true}  inputProps={{
                        style: {
                            height: "32px",
                            padding:"2px",
                        },
                    }}/>

                </MenuItem>
                    <MenuItem>
                        <Typography>Project manager PM</Typography>
                    </MenuItem>
                    <MenuItem>

                        <RadioGroup value={selectedValue} onChange={handleRadioChange} style={{
                            flexDirection:"row",
                        }}>
                            <FormControlLabel
                                name="project-pm"
                                value="Leo Gouse"
                                control={<Radio />}
                                label={
                                    <Typography style={{ fontSize: '15px' }}>Leo Gouse</Typography>
                                }
                            />
                            <FormControlLabel
                                name="project-pm"
                                value="Tatiana Dias"
                                control={<Radio />}
                                label={
                                    <Typography style={{ fontSize: '15px' }}>Tatiana Dias</Typography>
                                }
                            />
                            <FormControlLabel name="project-pm"
                                value="Roger Vaccaro"
                                control={<Radio />}
                                label={
                                    <Typography style={{ fontSize: '15px' }}>Roger Vaccaro</Typography>
                                }
                            />
                        </RadioGroup>
                    </MenuItem>

                    <MenuItem>
                        <Typography>Resources</Typography>
                    </MenuItem>

                    <MenuItem>
                        <Grid container spacing={2}>
                            {
                                props.initialResources.map((element) => (
                                    <Grid container item xs={3} direction="column">
                                        <Button
                                            name="resources-data"
                                            style={{
                                                width:"100px",
                                                fontSize:"10px"
                                            }}
                                            variant={isGroupSelected(element) ? 'contained' : 'outlined'}
                                            onClick={() => handleGroupClick(element)}>{element}
                                        </Button>
                                    </Grid>
                                ))}
                        </Grid>
                    </MenuItem>

                    <MenuItem>
                        <Typography>Project Timeline</Typography>
                    </MenuItem>

                    <MenuItem>
                        <Grid container spacing={2} alignItems="center">

                            <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker  onChange={handleDateChange} sx={{
                                        width:"180px",
                                    }} slotProps={{ textField: { size: 'small' } }}
                                    />
                            </LocalizationProvider>
                            </Grid>
                            <Grid item>
                                >
                            </Grid>
                            <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker onChange={handleDateChange2} slotProps={{ textField: { size: 'small' } }} sx={{
                                        width:"180px",
                                    }} />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </MenuItem>

                    <MenuItem>
                        <Typography>Estimation USD $</Typography>
                    </MenuItem>
                    <MenuItem>
                        <TextField name="project-estimation" id="outlined-basic" type="text"
                                   variant="outlined"  required  label="Required"
                                   fullWidth={true}   defaultValue="US$ 00.00"
                                   inputProps={{
                            style: {
                                height: "32px",
                                padding:"2px",
                            },
                        }}/>
                    </MenuItem>


                    <MenuItem>
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: 10 }}>
                        Submit
                    </Button>
                    </MenuItem>
                    <MenuItem>
                        <Button  onClick={closeMenuResources}>
                            Cancel
                        </Button>
                    </MenuItem>
                </form>
            </Menu>
        </Grid>
    )
}