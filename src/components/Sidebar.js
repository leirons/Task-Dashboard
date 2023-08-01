import logo from "../images/logo.png";
import {Box} from "@mui/material";


export default function Sidebar(){

    return(
        <Box>
            <Box height="100%" left="0%" top="0%" right="0%" botton="0%" width="72px" backgroundColor="#151357" position="absolute">
                <Box position="absolute" left="22.22%" right="22.22" top="2%" bottom="93%">
                    <img src={logo}/>
                </Box>
                <Box position="absolute" left="35.46%" right="22.46%" top="11%" bottom="11.46%">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.414 2H18C19.103 2 20 2.897 20 4V16C20 17.103 19.103 18 18 18H2C0.897 18 0 17.103 0 16V2C0 0.897 0.897 0 2 0H8C8.265 0 8.52 0.105 8.707 0.293L10.414 2ZM4 12C3.44772 12 3 12.4477 3 13C3 13.5523 3.44772 14 4 14H14C14.5523 14 15 13.5523 15 13C15 12.4477 14.5523 12 14 12H4Z" fill="white"/>
                    </svg>
                </Box>
            </Box>
        </Box>
    )
}