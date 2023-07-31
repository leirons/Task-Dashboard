import * as React from 'react';
import person from "../images/person.png"
import initialRows from '../data.json'
import Paper from '@mui/material/Paper';

import {
    Checkbox,
    styled,
    Table,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Menu,
    MenuItem,
    Button, TextareaAutosize, TablePagination, TableFooter,
    Grid, ButtonGroup, Typography, Select, FormControl, InputLabel
} from "@mui/material";
import AddProject from "./AddProject";
import ProjectTimeLine from "./ProjectTimeLine";


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#F7F9FC",
        color: "#687182",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        color: "#171C26"

    },
}));
const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function DataTable(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState(initialRows)
    const [selectedRowId, setSelectedRowId] = React.useState(null);
    const [selectedGroups, setSelectedGroups] = React.useState([]);
    const [selectedResourcesId, setSelectedResourcesId] = React.useState(null)
    const [menuResources, setMenuResources] = React.useState(null)
    const [resources, setResources] = React.useState(props.initialResources)
    const [selectedButton, setSelectedButton] = React.useState(1);
    const [filter, setFilter] = React.useState('All')
    const [action, setAction] = React.useState('');
    const [menuStatus, setMenuStatus] = React.useState(null)

    const [selectAll, setSelectAll] = React.useState(false); // State for header checkbox
    const [selectedRows, setSelectedRows] = React.useState({});
    const [numberOfSelectedRows, setNumberOfSelectedRows] = React.useState(0)

    const handleChangeCheckBox = (event) => {

        const {checked} = event.target;

        setSelectAll(checked);

        const updatedSelectedRows = rowsSlice.reduce((acc, row) => {
            acc[row.id] = checked;
            return acc;
        }, {});

        const selectedRowCount = Object.values(updatedSelectedRows).filter(value => value === true).length;
        setNumberOfSelectedRows(selectedRowCount)
        setSelectedRows(updatedSelectedRows);
    };

    const handleRowCheckBoxChange = (event, rowId) => {
        const {checked} = event.target;
        if (checked) {
            setNumberOfSelectedRows(numberOfSelectedRows + 1)
        } else {
            setNumberOfSelectedRows(numberOfSelectedRows - 1)
        }
        // Update the state of the selected row checkbox
        setSelectedRows((prevSelectedRows) => ({
            ...prevSelectedRows,
            [rowId]: checked,
        }));

    };


    const countElements = () => {
        console.log(rows)

        return rows.length
    }
    const handleGroupClick = (group) => {
        setSelectedGroups((prevSelectedGroups) => {
            if (prevSelectedGroups.includes(group)) {
                return prevSelectedGroups.filter((selectedGroup) => selectedGroup !== group);
            } else {
                return [...prevSelectedGroups, group];
            }
        });
    };
    const isGroupSelected = (group) => {
        return selectedGroups.includes(group);
    };
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const handleOpenMenuResources = (event, id) => {
        setMenuResources(event.currentTarget)
        setSelectedResourcesId(id)
    }

    const handleOpenMenuStatus= (event, id) => {
        setMenuResources(event.currentTarget)
    }

    const closeMenuStatus = () => {
        setAnchorEl(null)
    }
    const closeMenuResources = (event) => {
        setMenuResources(null)
    }

    function handleChangePage(event, number) {
        setCurrentPage(number)
    }

    const handleMenuOpen = (event, rowId) => {
        setSelectedRowId(rowId);
        setAnchorEl(event.currentTarget);
    };

    const changeNumberOfResources = (event) => {
        setRows((prevRows) => {
            const updatedRows = prevRows.map((row) => {
                if (row.id === selectedResourcesId) {
                    return {...row, resources: selectedGroups.length}
                }
                return row
            })
            return updatedRows;
        })
        setMenuResources(null);
    }
    const handleMenuClose = (newStatus) => {
        setRows((prevRows) => {
            const updatedRows = prevRows.map((row) => {
                if (row.id === selectedRowId) {
                    return {...row, status: newStatus};
                }
                return row;
            });
            return updatedRows;
        });
        setAnchorEl(null);
    };

    const renderStatus = (rowId, status) => {
        const row = rows.find((row) => row.id === rowId);
        if (row) {
            return (
                <div
                    style={{
                        width: "108px",
                        height: "20px",
                        background: statusStyles[status].background,
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                    }}
                >
                    <div
                        style={{
                            width: "8px",
                            height: "8px",
                            background: statusStyles[status].buttonBackground,
                            borderRadius: "2px",
                            marginLeft: "8px",
                            marginBottom: "3px",
                        }}
                    ></div>
                    <span
                        onClick={(event) => handleMenuOpen(event, row.id)}
                        style={{
                            width: statusStyles.width,
                            height: statusStyles.height,
                            color: statusStyles[status].color,
                        }}
                    >
                    {statusStyles[status].value}
                </span>
                </div>
            );
        }
        return null;
    };


    const status = [
        {
            color: "#38A06C",
            value: "On Track",
            background: "#E1FCEF"
        },
        {
            color: "#C97A20",
            value: "Potential Risk",
            background: "#FCF2E6",
        },
        {
            color: "#687182",
            value: "On Hold",
            background: "#E9EDF5;"

        },
        {
            color: "#EF5466",
            value: "At Risk",
        }
    ]
    const statusStyles = {
        width: 108,
        height: 20,
        "On Track": {
            color: "#38A06C",
            value: "On Track",
            background: "#E1FCEF",
            buttonBackground: "#38A06C",
        },
        "Potential Risk": {
            color: "#AA5B00",
            value: "Potential Risk",
            background: "#FCF2E6",
            buttonBackground: "#C97A20",
        },
        "On Hold": {
            color: "#5A6376",
            value: "On Hold",
            background: "#E9EDF5",
            buttonBackground: "#687182",
        },
        "At Risk": {
            color: "#D1293D",
            value: "At Risk",
            background: "#FFEDEF",
            buttonBackground: "#EF5466",
        },
    };


    const handleButtonClick = (buttonIndex) => {
        setSelectedButton(buttonIndex);
        setFilter(buttonIndex)
    };


    let filteredRows = rows;

    if (filter !== "All") {
        filteredRows = rows.filter((element) => element.status === filter);
    }

    const handleChangeAction = (data) => {
        setAction(data.target.value)
    }

    const handleAction = () => {
        console.log(action)
        if (action) {

            if (action === "Delete") {
                console.log(selectedRows)
                const ids = Object.keys(selectedRows)
                for (let _id of ids) {
                    setRows((prevRows) => {
                        const updatedRows = prevRows.filter((row) => row.id !== Number(_id));
                        return updatedRows;
                    });
                }
            }
            setAction("")
        }
    }


    const rowsSlice = filteredRows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);
    return (
        <Grid container>

            <Grid display="flex" direction="row" alignItems="center" gap="10px" paddingTop="5px">
                <Grid marginLeft="20px">
                    <Typography>{numberOfSelectedRows} selected</Typography>
                </Grid>
                <Grid>
                    <FormControl fullWidth>
                        <InputLabel id="select-label">Actions</InputLabel>
                        <Select sx={{width: "150px"}}
                                labelId="select-label"
                                id="select-label"
                                value={action}
                                label="Action"
                                onChange={handleChangeAction}
                        >
                            <MenuItem value={'Delete'}>Delete</MenuItem>
                            <MenuItem value={"Send an email"}>Send an email</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid>
                    <Button onClick={handleAction}>Confirm</Button>
                </Grid>
            </Grid>
            <Grid item xs={13}>
                <ButtonGroup variant="text">
                    <Button
                        style={{
                            width: "100px",
                            fontSize: "10px",
                            color: "#464F60",
                            textTransform: "none"
                        }}
                        onClick={() => handleButtonClick("All")}
                        variant={selectedButton === 1 ? 'contained' : 'text'}
                    >
                        All<span style={{marginLeft: '4px'}}>({countElements()})</span>
                    </Button>
                    <Button style={{
                        width: "100px",
                        fontSize: "10px",
                        color: "#464F60",
                        textTransform: "none"
                    }}
                            onClick={() => handleButtonClick("At Risk")}
                            variant={selectedButton === 2 ? 'contained' : 'text'}
                    >
                        Risk<span style={{marginLeft: '4px'}}>{
                        rows.filter((element) => element.status === "Risk").length
                    }</span>
                    </Button>
                    <Button style={{
                        width: "100px",
                        fontSize: "10px",
                        color: "#464F60",
                        textTransform: "none"
                    }}
                            onClick={() => handleButtonClick("On Hold")}
                            variant={selectedButton === 3 ? 'contained' : 'text'}
                    >
                        On Hold<span style={{marginLeft: '4px'}}>{
                        rows.filter((element) => element.status === "On Hold").length
                    }
                </span>
                    </Button>
                    <Button style={{
                        width: "100px",
                        fontSize: "10px",
                        color: "#464F60",
                        textTransform: "none"
                    }}
                            onClick={() => handleButtonClick("Potential Risk")}
                            variant={selectedButton === 4 ? 'contained' : 'text'}
                    >
                        Potential Risk<span style={{marginLeft: '4px'}}>{
                        rows.filter((element) => element.status === "Potential Risk").length
                    }</span>
                    </Button>
                    <Button style={{
                        width: "100px",
                        fontSize: "10px",
                        color: "#464F60",
                        textTransform: "none"
                    }}
                            onClick={() => handleButtonClick("On Track")}
                            variant={selectedButton === 5 ? 'contained' : 'text'}
                    >
                        On Track<span style={{marginLeft: '4px'}}>{
                        rows.filter((element) => element.status === "On Track").length
                    }</span>
                    </Button>
                    <AddProject initialResources={props.initialResources} initialRows={rows}/>

                </ButtonGroup>

            </Grid>


            <Grid item xs={13}>
                <TableContainer component={Paper}>
                    <div style={{overflowX: "auto"}}>

                        <Table sx={{minWidth: 650}}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell><Checkbox
                                        onChange={handleChangeCheckBox}
                                        checked={selectAll}
                                    /></StyledTableCell>
                                    <StyledTableCell>#</StyledTableCell>
                                    <StyledTableCell>Project Name</StyledTableCell>
                                    <StyledTableCell>PM</StyledTableCell>
                                    <StyledTableCell>Last Update</StyledTableCell>
                                    <StyledTableCell>Resources</StyledTableCell>
                                    <StyledTableCell>Project Timeline</StyledTableCell>
                                    <StyledTableCell>Estimation</StyledTableCell>
                                    <StyledTableCell>Status</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsSlice.map((row) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell> <Checkbox
                                            onChange={(event) => handleRowCheckBoxChange(event, row.id)}
                                            checked={selectedRows[row.id] || false}
                                        /></StyledTableCell>
                                        <StyledTableCell>{row.id}</StyledTableCell>
                                        <StyledTableCell>{row.projectName}</StyledTableCell>
                                        <StyledTableCell><img src={person} alt="Изображение"/></StyledTableCell>
                                        <StyledTableCell>{row.lastUpdate}</StyledTableCell>
                                        <StyledTableCell>
                                            <div style={{
                                                display: "flex",
                                                width: '24px',
                                                height: '24px',
                                                gap: "10px",
                                                borderRadius: "6px",
                                                alignItems: "center",
                                                background: "#E9EDF5",
                                                justifyContent: "center"
                                            }}>

                                                <div
                                                    onClick={(event) => handleOpenMenuResources(event, row.id)}>{row.resources}</div>
                                            </div>
                                            <Menu anchorEl={menuResources}
                                                  open={Boolean(menuResources)}>
                                                <MenuItem>
                                                    Resources
                                                </MenuItem>
                                                <MenuItem PaperProps={{
                                                    sx: {
                                                        background: "#F7F9FC", width: "300px"
                                                    }
                                                }}>
                                                    <Grid container spacing={2}>
                                                        {resources.map((element) => (
                                                            <Grid container item xs={3} direction="column">
                                                                <Button
                                                                    variant={isGroupSelected(element) ? 'contained' : 'outlined'}
                                                                    onClick={() => handleGroupClick(element)}>{element}
                                                                </Button>
                                                            </Grid>))}
                                                    </Grid>

                                                </MenuItem>
                                                <MenuItem
                                                    sx={{
                                                        justifyContent: 'flex-end',
                                                        background: "#FFFFFF",
                                                        height: "100%"
                                                    }}>
                                                    <Button sx={{backgroundColor: 'none', color: "#464F60"}}
                                                            onClick={closeMenuResources}>
                                                        Cancel
                                                    </Button>
                                                    <Button sx={{backgroundColor: 'none', color: '#9E9BF5'}}
                                                            onClick={changeNumberOfResources}>Apply</Button>

                                                </MenuItem>
                                            </Menu>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <ProjectTimeLine setRow={setRows} rows={rows} rowId={row.id}
                                                             timeLine={row.projectTimeLine}/>
                                        </StyledTableCell>
                                        <StyledTableCell>US$ {row.estimation}</StyledTableCell>
                                        <StyledTableCell>
                                            {renderStatus(row.id, row.status)}
                                            <Menu
                                                id="menu"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                PaperProps={{
                                                    sx: {
                                                        background: "#F7F9FC",
                                                        justifyContent: 'flex-end',
                                                        alignItems: 'flex-end',
                                                        padding: 0,
                                                        margin: 0,
                                                        paddingBottom: 0,
                                                    }
                                                }}
                                            >

                                                <MenuItem>
                                            <span styles={{
                                                fontWeight: 500, fontSize: 14, lineHeight: 20, color: "#464F60",
                                            }}>Change Status</span>
                                                </MenuItem>
                                                {status.map((rows) => (
                                                    <MenuItem anchorEl={menuStatus}
                                                              open={Boolean(menuStatus)} onClick={() => handleMenuClose(rows.value)}>

                                                        <span
                                                            style={{
                                                                width: 16,
                                                                height: 16,
                                                                background: rows.color,
                                                                borderRadius: 2,
                                                                marginRight: 11,
                                                            }}
                                                        ></span>
                                                        <span>{rows.value}</span>
                                                    </MenuItem>))}

                                                <MenuItem>
                                                    <span>Notes</span>
                                                </MenuItem>
                                                <MenuItem>
                                                    <TextareaAutosize minRows={3} maxRows={6}
                                                                      style={{width: "300px", height: "60px"}}>
                                                    </TextareaAutosize>
                                                </MenuItem>
                                                <MenuItem
                                                    sx={{
                                                        justifyContent: 'flex-end',
                                                        background: "#FFFFFF",
                                                        height: "100%"
                                                    }}>
                                                    <Button onClick={closeMenuStatus} sx={{backgroundColor: 'none', color: "#464F60"}}>
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        sx={{backgroundColor: 'none', color: '#9E9BF5'}}>Apply</Button>
                                                </MenuItem>
                                            </Menu>
                                        </StyledTableCell>
                                    </StyledTableRow>))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={currentPage}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleRowsPerPageChange}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </TableContainer>
            </Grid>
        </Grid>)
}