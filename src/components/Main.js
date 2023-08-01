import Header from "./Header";
import Content from "./Content";
import React from "react";
import {Box} from "@mui/material";

export default function Main() {
    const [projectsCount, setProjectsCount] = React.useState(0)


    return (
        <Box marginLeft="73px" minWidth="640px">
            <Header count={projectsCount}/>
            <Content projectsCount={setProjectsCount}/>
        </Box>
    )
}