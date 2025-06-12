import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { Typography } from '@mui/material';
import { Pool } from "../../components/Box";
import { Avatar } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import RestakingModal from "./RestakingModal";
// Handle modal open
const SubRestaking = ({ rows }) => {
    const [open, setOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    // const [modalType, setModalType] = useState(''); // Track which icon was clicked
    const md = useMediaQuery("(max-width: 1500px)");
    const sm = useMediaQuery("(max-width : 800px)");
    const xs = useMediaQuery("(max-width : 700px)");
    const exs = useMediaQuery("(max-width : 550px)");
    const navigate = useNavigate();
    const handleOpen = (value) => {
        setTabValue(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const openDetail = () => {
        navigate("/ai-yield/detail");
    }
    // Handle modal close
    return (
        <>
            {rows.map((row) => (
                <Pool display={"flex"} key={row.id} justifyContent={"space-between"} sx={{ width: '100%', backgroundColor: 'transparent', '&:hover': { backgroundColor: '#1a1a1a90' } }} py={'8px'} paddingRight={exs ? '8px' : ''}  >
                    <Grid container spacing={1} mt={'1px'} border={md ? '1px solid #30768c' : ''} borderRadius={'10px'}>
                        <Grid item xs={!md ? 6 : 12} >
                            <Box fontSize={xs ? "12px" : "18px"} onClick={openDetail} >
                                <Box
                                    mx={xs ? "5px" : "10px"}
                                    fontSize={xs ? "17px" : "32px"}
                                    fontWeight={"600"}
                                    style={{ cursor: "pointer" }}
                                    display={"flex"}
                                    onClick={() => {
                                    }}
                                    justifyContent={'space-between'}>
                                    <Box display={"flex"} paddingTop={xs ? '8px' : '10px'} >
                                        <Avatar
                                            src={row.url}
                                            alt="#{row.collateral} Icon"
                                            sx={{
                                                width: 40,   // Customize width
                                                height: 40,  // Customize height
                                            }} />
                                        <Box
                                            display={"inline"}
                                            lineHeight={"normal"}>
                                            <Box mx={xs ? "10px" : "10px"} px={'15px'} mt={'-10px'} sx={{ '&:hover': { color: '#1ac7b1c7' } }}> {row.collateral}
                                                <Typography fontSize={xs ? "12px" : "14px"} sx={{ opacity: '0.5' }}>
                                                    {row.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box
                                        lineHeight={"normal"}
                                        display={"inline-block"} >
                                        <Box mx={xs ? "5px" : "5px"} fontSize={xs ? "18px" : "28px"} display={"flex"} alignItems={"center"} >
                                            <Typography fontSize={xs ? "12px" : "14px"} sx={{ padding: '3px' }} display={md ? 'block' : 'none'}>
                                                TVL
                                            </Typography>
                                            <Typography mx={xs ? "5px" : "5px"} fontSize={xs ? "18px" : "28px"} >
                                                {row.tvl}
                                            </Typography>
                                        </Box>
                                        <Typography fontSize={xs ? "12px" : "14px"} sx={{ opacity: '0.5' }} mt={'5px'} display={'block'} textAlign={'right'}>
                                            {row.supply}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={!md ? 3 : 8} border={md ? '1px solid #ffffff40' : ''}  >
                            <Typography fontSize={md ? "12px" : "14px"} sx={{ padding: '3px', opacity: '0.6' }} display={md ? 'block' : 'none'}>
                                Supply | Limit
                            </Typography>
                            <Box
                                display={"flex"}
                                lineHeight={"normal"} >
                                <Box mx={xs ? "8px" : "15px"} fontSize={xs ? "12px" : "28px"} alignItems={"center"} mt={'10px'}>
                                    <CircularProgress variant="determinate" value={row.progress} sx={{ color: '#18d43b' }} size={xs ? '25px' : '35px'} thickness={5} />
                                </Box>
                                <Box mx={xs ? "8px" : "15px"} fontSize={xs ? "12px" : "28px"} alignItems={"center"} > {row.supply}
                                    <Typography fontSize={xs ? "18px" : "26px"} sx={{ opacity: '0.5', display: 'inline' }} mt={'5px'} alignItems={"center"}>
                                        &nbsp;| {row.limit}
                                    </Typography>
                                    <Typography fontSize={xs ? "12px" : "14px"} sx={{ opacity: '0.5' }} mt={'5px'} alignItems={"center"}>
                                        {row.remaining} remaining...
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={!md ? 2 : 4} border={md ? '1px solid #ffffff40' : ''}  >
                            <Typography fontSize={md ? "12px" : "14px"} sx={{ padding: '3px', opacity: '0.6' }} display={md ? 'block' : 'none'}>
                                Points
                            </Typography>
                            <Box fontSize={sm ? "15px" : "26px"} mx={sm ? "8px" : "15px"} >
                                <svg width="20" height="20" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline' }}><rect width="33" height="33" rx="16.5" fill="#18d43b"></rect><path d="M9 9H23.8718V10.6387H10.6667V13.4118H24V24H9.12821V22.3613H22.3333V19.5882H9V9ZM22.3333 17.9496V15.0504H10.6667V17.9496H22.3333Z" fill="black"></path></svg>
                                &nbsp;{row.points}</Box>
                        </Grid>
                        <Grid item xs={8} display={md ? 'block' : 'none'} border={md ? '1px solid #ffffff40' : ''} borderRadius={'0 0 0 10px'} pl={'20px'} >
                            <Typography fontSize={md ? "12px" : "14px"} sx={{ padding: '3px', opacity: '0.6' }} display={md ? 'block' : 'none'}>
                                Position
                            </Typography>
                            <Box
                                display={"flex"}
                                lineHeight={"normal"}
                                mx={md ? "8px" : "15px"} >
                                <Box fontSize={md ? "18px" : "28px"} alignItems={"center"} > 365.5K
                                    <Typography fontSize={md ? "18px" : "26px"} sx={{ opacity: '0.5', display: 'inline' }} mt={'5px'} alignItems={"center"}>
                                        &nbsp;| 420.7K
                                    </Typography>
                                    <Typography fontSize={md ? "12px" : "14px"} sx={{ opacity: '0.5' }} mt={'5px'} alignItems={"center"}>
                                        15% remaining...
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={!md ? 1 : 4} border={md ? '1px solid #ffffff40' : ''} pl={'20px'} borderRadius={'0 0 10px 0'}>
                            <Typography fontSize={md ? "12px" : "14px"} sx={{ padding: '3px', opacity: '0.6' }} display={md ? 'block' : 'none'} >
                                Actions
                            </Typography>
                            <Box mx={md ? "18px" : "5px"}>
                                <DownloadIcon pl={md ? '5px' : '10px'} sx={{
                                    color: '#18d43b',
                                    border: '1px solid #18d43b',
                                    background: '#ffffff1f',
                                    borderRadius: '15%',
                                    cursor: "pointer"
                                }} onClick={() => handleOpen(0)} />&nbsp;
                                <UploadIcon sx={{
                                    background: '#18d43b66',
                                    border: '1px solid #18d43b',
                                    borderRadius: '15%',
                                    cursor: "pointer"
                                }} onClick={() => handleOpen(1)} />
                            </Box>
                        </Grid>
                    </Grid>
                </Pool >
            ))}
            <RestakingModal open={open} close={handleClose} tabValue={tabValue} ></RestakingModal>
        </>
    );
}
export default SubRestaking;

