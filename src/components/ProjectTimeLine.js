import * as React from "react";
import {Menu, Typography} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DateCalendar from './DateCalendar';
import parseDate from "../utils/Parse"; // Assuming this is the path to your custom DateCalendar component

export default  function ProjectTimeLine(props){

    const [menu,setMenu] = React.useState(null)
    const [menu2,setMenu2] = React.useState(null)

    const row = props.rows.find((row) => row.id === props.rowId)
    const lines = props.timeLine.split('>')

    const firstLine = lines[0]
    const secondLine = lines[1]



    const openMenu = (event) => {
        setMenu(event.currentTarget)
    }

    const openMenu2 = (event) => {
        setMenu2(event.currentTarget)
    }
    const handleFirstDate = (rawDate) => {
        console.log(row.projectTimeLine.split('>'))

        const rawRes = row.projectTimeLine.split('>')[1]
        const date = parseDate(rawDate)

        row.projectTimeLine = `${date}>${rawRes}`

        setMenu(null)
    }

    const handleSecondDate = (rawDate) =>{
        const rawRes = row.projectTimeLine.split('>')[0]
        const date = parseDate(rawDate)

        row.projectTimeLine = `${rawRes}>${date}`

        setMenu2(null)
    }

    if (row) {
        return (
            <div style={{display:"flex",direction:"column",alignItems:'center',gap:'5px'}}>
                <div  style={{
                    display: "flex",
                    width: '120px',
                    height: '30px',
                    gap: "10px",
                    borderRadius: "6px",
                    alignItems: "center",
                    background: "#E9EDF5",
                    justifyContent: "center"
                }}>
                <span onClick={openMenu}>{firstLine}</span>
                    <Menu open={Boolean(menu)}  anchorEl={menu}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar onChange={handleFirstDate} />
                        </LocalizationProvider>
                    </Menu>
                </div>
                <div> > </div>
                <div  style={{
                    display: "flex",
                    width: '120px',
                    height: '30px',
                    gap: "10px",
                    borderRadius: "6px",
                    alignItems: "center",
                    background: "#E9EDF5",
                    justifyContent: "center"
                }}>
                    <span onClick={openMenu2}>{secondLine}</span>
                    <Menu open={Boolean(menu2)}  anchorEl={menu2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar onChange={handleSecondDate} />
                        </LocalizationProvider>
                    </Menu>
                </div>
            </div>
        )
    }
    return null
}