import data from "../data.json";
import info from "../images/info.png";
import help from "../images/help.png";
import userPicture from "../images/userPicture.png";
import {Avatar, Badge, Box, Typography} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';


export default function Header(props) {

    return (
        <Box>
            <Box backgroundColor="#F7F9FC" height="56px" display="flex" alignItems="center">
                <Box display="flex" width="100%" marginLeft="20px" marginRight="20px" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap="10px">

                        <Box>
                            <Typography style={{fontSize: '20px', fontWeight: "bold"}}>Projects</Typography>
                        </Box>
                        <Box display="flex" direction="row" justifyContent="center" alignItems="center"
                             padding="2px 6px" marginTop="5px" width="27px" height="27px" borderRadius="13px"
                             backgroundColor="#EDEDFC">
                            <Typography style={{
                                fontStyle: "normal",
                                fontWeight: "500",
                                fontSize: "15px",
                                lineHeight: "18px",
                                color: "#5E5ADB"
                            }}>{props.count}</Typography>
                        </Box>

                    </Box>
                    <Box display="flex" gap="24px" alignItems="center">
                        <Box>
                            <NotificationsIcon></NotificationsIcon>

                        </Box>
                        <Box>
                            <Avatar alt="Remy Sharp" src={userPicture}/>

                        </Box>
                    </Box>


                </Box>

            </Box>
        </Box>
    )
}