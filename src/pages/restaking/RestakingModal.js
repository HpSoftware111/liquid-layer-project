import React, { useEffect } from "react";
import { useState } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Typography } from '@mui/material';
import { Modal, Avatar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import {
    TextField,
    Tabs,
    Tab,
} from '@mui/material';
import Button from '../../components/Button'
import PropTypes from 'prop-types';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {

    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function RestakingModal(props) {
    const md = useMediaQuery("(max-width: 1500px)");
    const sm = useMediaQuery("(max-width : 880px)");
    const xs = useMediaQuery("(max-width : 700px)");
    const exs = useMediaQuery("(max-width : 550px)");
    useEffect(() => {
        setValue(props.tabValue);
        setOpen(props.open);
        return () => {
            // Optional cleanup code (runs on unmount or before the effect re-runs)
        };
    }, [props.open, props.tabValue]);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: sm ? '100%' : '60%',
        border: '1px solid #30768C',
        background: '#191b22fc',
        borderRadius: '10px',
        boxShadow: 2,
        p: 4,
    };
    const [open, setOpen] = useState(props.open);
    const [value, setValue] = useState(props.tabValue);
    const handleClose = () => props.close()
    // Handle modal close
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (<Modal open={open} onClose={handleClose} BackdropProps={{
        style: { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
    }} >
        <Box sx={modalStyle}>
            <Box my={2} sx={{ py: 2, borderRadius: 2, px: 2 }} border={'1px solid #30768c'} alignContent={'center'} justifyContent={'space-between'}>
                <Box sx={{ borderBottom: 1, borderBottomColor: 'white', borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
                        color: '#30768c',
                        '&.Mui-selected': {
                            fontWeight: 'bold',
                            borderBottom: '2px solid #30768c', // Custom underline
                        },
                        '&:focus': { boxShadow: 'none', outline: 'none' }, // Remove focus shadow
                        '&:active': { boxShadow: 'none', outline: 'none' },
                    }} >
                        <Tab label="DEPOSIT" {...a11yProps(0)} sx={{
                            color: '#30768c',
                            '&.Mui-selected': {
                                fontWeight: 'bold',
                                borderBottom: '2px solid #30768c', // Custom underline
                            },
                            '&:focus': { boxShadow: 'none', outline: 'none' }, // Remove focus shadow
                            '&:active': { boxShadow: 'none', outline: 'none' },
                        }} />
                        <Tab label="WITHDRAW" {...a11yProps(1)} sx={{
                            color: '#30768c',
                            '&.Mui-selected': {
                                fontWeight: 'bold',
                                borderBottom: '2px solid #30768c', // Custom underline
                            },
                            '&:focus': { boxShadow: 'none', outline: 'none' }, // Remove focus shadow
                            '&:active': { boxShadow: 'none', outline: 'none' },
                        }} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0} sx={{
                    '&.Mui-selected': {
                        fontWeight: 'bold',
                        borderBottom: '2px solid #30768c', // Custom underline
                    },
                    '&:focus': { outline: "none" }, // Remove focus shadow
                    '&:active': { outline: "none" },
                }} >
                    <Box my={2} sx={{ py: 2, borderRadius: 2, px: 2 }} border={'1px solid #30768c'} alignContent={'center'} justifyContent={'space-between'}>
                        <Box
                            mx={xs ? "2px" : "5px"}
                            fontSize={xs ? "15px" : "25px"}
                            fontWeight={"600"}
                            style={{ cursor: "pointer" }}
                            display={"flex"}
                            justifyContent={'space-around'}
                            flexWrap={'wrap'}
                        >
                            <Box display={"flex"} paddingTop={xs ? '8px' : '10px'} flexGrow={4} >
                                <Avatar
                                    src={'../../images/ETHx.png'}
                                    alt="Ehtereum Icon"
                                    sx={{
                                        width: md ? 30 : 40,   // Customize width
                                        height: md ? 30 : 40,  // Customize height
                                    }} />
                                <Box
                                    display={"inline"}
                                    lineHeight={"normal"}>
                                    <Box mx={xs ? "2px" : "5px"} px={'15px'} mt={'-10px'}> ETHx
                                        <Typography fontSize={xs ? "12px" : "14px"} sx={{ opacity: '0.5' }}>
                                            Stader Staked Ether
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box display={'flex'} flexGrow={6} justifyContent={'space-between'}>

                                <Box
                                    lineHeight={"normal"} display={'flex'} alignItems={"center"} >
                                    <CircularProgress variant="determinate" value={75} sx={{ color: '#18d43b' }} size={xs ? '15px' : '25px'} thickness={5} />
                                    <Box ml={'10px'} fontSize={xs ? "12px" : "20px"} alignItems={"center"} > SUPPLY
                                        <Typography fontSize={xs ? "12px" : "14px"} sx={{ opacity: '0.5' }} mt={'5px'} alignItems={"center"}>
                                            364.8K
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    lineHeight={"normal"} >
                                    <Box fontSize={xs ? "12px" : "20px"} alignItems={"center"} > LIMIT
                                        <Typography fontSize={xs ? "12px" : "14px"} sx={{ opacity: '0.5' }} mt={'5px'} alignItems={"center"}>
                                            420.7K
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    lineHeight={"normal"} >
                                    <Box fontSize={xs ? "12px" : "20px"} alignItems={"center"} > Value
                                        <Typography fontSize={xs ? "12px" : "14px"} sx={{ opacity: '0.5' }} mt={'5px'} alignItems={"center"}>
                                            $1.66B
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Grid container spacing={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Grid item xs={5} md={5} >
                            < Typography fontSize={xs ? "12px" : "15px"}>
                                AMOUNT
                                < Typography component="span" display={'inline'} color={'#68d605'} fontSize={xs ? "12px" : "15px"}>
                                    &nbsp;&nbsp;MAX
                                </Typography>
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold', opacity: 0.35 }} fontSize={xs ? "10px" : "15px"}>
                                0.00 wstETH
                            </Typography>
                        </Grid>
                        <Grid item xs={7} md={7}><TextField
                            variant="outlined"
                            sx={{
                                backgroundColor: '#333',
                                borderRadius: 2,
                                input: { color: '#fff' },
                                marginBottom: 2,
                                direction: "rtl",
                                width: '100%'
                            }}
                            // InputProps={{ endAdornment: <Typography sx={{ color: '#aaa' }}>MAX</Typography> }}
                            placeholder="0.000"
                        /></Grid>
                    </Grid>
                    <Button
                        type={"secondary"}
                        width={xs ? "100%" : "100%"}
                        height={xs ? "25px" : "40px"}
                        fontSize={xs ? "12px" : "15px"}
                        onClick={() => {
                        }}
                        sx={{
                            '&:focus': { outline: "none" }, // Remove focus shadow
                            '&:active': { outline: "none" },
                        }}
                    >
                        DEPOSIT
                    </Button>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1} sx={{
                    '&.Mui-selected': {
                        fontWeight: 'bold',
                        borderBottom: '2px solid #30768c', // Custom underline
                    },
                    '&:focus': { outline: "none" }, // Remove focus shadow
                    '&:active': { outline: "none" },
                }} >

                    <Grid container spacing={2} display={'flex'} alignItems={'center'} justifyContent={'center'} >
                        <Grid item xs={5} md={5} >
                            < Typography fontSize={xs ? "12px" : "15px"}>
                                AMOUNT
                                < Typography component="span" display={'inline'} color={'#68d605'} fontSize={xs ? "12px" : "15px"}>
                                    &nbsp;&nbsp;MAX
                                </Typography>
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold', opacity: 0.35 }} fontSize={xs ? "10px" : "15px"}>
                                0.00 wstETH
                            </Typography>
                        </Grid>
                        <Grid item xs={7} md={7}><TextField
                            variant="outlined"
                            sx={{
                                backgroundColor: '#333',
                                borderRadius: 2,
                                input: { color: '#fff' },
                                marginBottom: 2,
                                direction: "rtl",
                                width: '100%'
                            }}
                            placeholder="0.000"
                        /></Grid>
                    </Grid>
                    <Button
                        type={"secondary"}
                        width={xs ? "100%" : "100%"}
                        height={xs ? "25px" : "40px"}
                        fontSize={xs ? "12px" : "15px"}
                        onClick={() => {
                        }}
                        sx={{
                            '&:focus': { outline: "none" }, // Remove focus shadow
                            '&:active': { outline: "none" },
                        }}
                    >
                        WITHDRAW
                    </Button>
                </CustomTabPanel>
            </Box>
        </Box >
    </Modal >)
}