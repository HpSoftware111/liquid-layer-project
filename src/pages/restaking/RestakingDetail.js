import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getAccountString } from "../../utils/helper";
import {
    Box,
    Typography,
    Grid,
    // Button,
    TextField,
    Tabs,
    Tab,
    Tooltip,
    Avatar,
    Link,
    useMediaQuery
} from '@mui/material';
import { Pool } from "../../components/Box";
import Button from "../../components/Button";
import { CopyAll as CopyIcon } from '@mui/icons-material';
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
export default function RestakingDetail() {

    const address = "0x971e5b5d4baa5607863f3748febf287c7bf82618";
    let ellipsis = address ? getAccountString(address).toUpperCase() : 'Connect';
    const connectAddress = ellipsis;

    const md = useMediaQuery("(max-width: 1500px)");
    const sm = useMediaQuery("(max-width : 800px)");
    const xs = useMediaQuery("(max-width : 700px)");
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <StyledContainer sx={{ borderRadius: 2 }} border={'1px solid #30768c'} mt={5}>
            <Pool display={"flex"} justifyContent={"space-between"} alignItems={'center'} sx={{ width: '100%', backgroundColor: 'transparent', '&:hover': { backgroundColor: '#1a1a1a90' } }} py={'8px'} >
                <Box fontSize={sm ? '16px' : '25px'}>
                    <Typography color={'#ffffff73'} fontSize={sm ? '15px' : '20px'} >GET STARTED</Typography>
                    Connect your wallet to start staking.
                </Box>
                <Box>
                    <Button
                        type={"primary"}
                        width={xs ? "101px" : "142px"}
                        height={xs ? "25px" : "40px"}
                        fontSize={xs ? "12px" : "15px"}
                        // disabled={ }
                        onClick={() => {
                        }}
                    >
                        {"Connect Wallet"}
                    </Button>
                </Box>
            </Pool>
            {/* Header */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1, }} pt={3}>
                <Link href="/ai-yield" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: '#1ac7b1c7' } }}>
                    ↩ RESTAKE
                </Link>
            </Typography>
            {/* Main Section */}
            <Grid container space={0} margin={'auto'}>
                {/* Left Column */}
                <Grid item xs={12} md={6} p={2}>
                    {/* WBTC Info */}
                    <Box my={2} sx={{ py: 2, borderRadius: 2, px: 2 }} border={'1px solid #30768c'} >
                        <Grid item xs={12} md={12} >
                            <Box display={"flex"} py={xs ? '8px' : '15px'} alignItems={'center'} >
                                <Avatar
                                    src={"Https://app.symbiotic.fi/assets/WBTC-Bd9t_EX0.svg"}
                                    alt="Wrapped Bitcoin"
                                    sx={{
                                        width: md ? 40 : 60,   // Customize width
                                        height: md ? 40 : 60,  // Customize height
                                    }} />
                                <Box
                                    display={"inline"}
                                    lineHeight={"normal"}>
                                    <Box mx={xs ? "10px" : "10px"} px={'18px'} fontSize={xs ? "16px" : "26px"}> {"WBTC"}
                                        <Typography fontSize={xs ? "10px" : "12px"} sx={{ opacity: '0.5' }}>
                                            {"Wrapped Bitcoin"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12} borderTop={'3px solid #30768c'}>
                            {/* Address Section */}
                            <Box display="flex" alignItems="center" py={md ? 1 : 2} >
                                <Typography sx={{ marginRight: 1 }}>
                                    Address
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#4caf50',
                                        backgroundColor: '#333',
                                        padding: '4px 8px',
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {sm ? connectAddress : address}
                                </Typography>
                                <Tooltip title="Copy">
                                    <CopyIcon sx={{ marginLeft: 2, cursor: 'pointer', color: '#aaa' }} />
                                </Tooltip>
                            </Box>
                        </Grid>
                    </Box>
                    {/* Details info */}
                    <Box sx={{ py: 2, borderRadius: 2, px: 2 }} border={'1px solid #30768c'}>
                        {/* Details Section */}
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={12} borderBottom={'2px solid #30768c'} ml={2} mb={2}>
                                <Box mx={xs ? "5px" : "10px"} py={2} fontSize={xs ? "12px" : "26px"} >
                                    Details
                                </Box>
                            </Grid>
                            <Grid container paddingLeft={2} >
                                <Grid item xs={6} border={'1px solid #30768c'} borderRadius={'5px'} p={2}>
                                    <Typography sx={{ color: '#aaa' }}>
                                        Value Locked
                                    </Typography>
                                    <Typography variant="h6" py={2}>$130.9M</Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#aaa' }}>
                                        1.354K WBTC
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} border={'1px solid #30768c'} borderRadius={'5px'} p={2}>
                                    <Typography sx={{ color: '#aaa' }}>
                                        Current Limit
                                    </Typography>
                                    <Typography variant="h6" py={2}>$159.5M</Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#aaa' }}>
                                        1.65K WBTC
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    {/* Description */}
                    <Box my={2} sx={{ py: 2, borderRadius: 2, px: 2 }} border={'1px solid #30768c'}>
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={12} >
                                <Box mx={xs ? "5px" : "10px"} py={2} fontSize={xs ? "12px" : "26px"} >
                                    Description
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={12} paddingLeft={2}   >
                                <Typography sx={{ color: '#aaa' }} py={2} borderTop={'3px solid #30768c'}>
                                    WBTC brings greater liquidity to the Ethereum ecosystem including decentralized
                                    exchanges (DEXs) and financial applications. Today, the majority of trading volume
                                    takes place on centralized exchanges with Bitcoin. WBTC changes that, bringing
                                    Bitcoin’s liquidity to DEXs and making it possible to use Bitcoin for token trades.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                {/* Right Column */}
                <Grid item xs={12} md={6} p={2}>
                    {/* Points and Tabs */}
                    <Box my={2} sx={{ py: 2, borderRadius: 2, px: 2 }} border={'1px solid #30768c'} display={'flex'} alignContent={'center'} justifyContent={'space-between'}>
                        <Box display={'flex'} alignItems={'center'}>
                            <Box >
                                <Avatar
                                    src={"Https://app.symbiotic.fi/assets/WBTC-Bd9t_EX0.svg"}
                                    alt="Wrapped Bitcoin"
                                    sx={{
                                        width: md ? 40 : 60,   // Customize width
                                        height: md ? 40 : 60,  // Customize height
                                    }} />
                            </Box>
                            <Box display={'inline'} marginLeft={'15px'}>
                                < Typography fontSize={xs ? "14px" : "18px"} >
                                    POINTS
                                </Typography>
                                <Typography sx={{ fontWeight: 'bold' }} fontSize={xs ? "14px" : "18px"}>
                                    Enabled
                                </Typography>
                            </Box>
                        </Box>
                        <Box marginRight={'15px'}>
                            < Typography fontSize={xs ? "14px" : "18px"}>
                                TOTAL POINTS
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }} fontSize={xs ? "14px" : "18px"}>
                                0.0
                            </Typography>
                        </Box>
                    </Box>
                    {/* Tabs */}
                    <Box my={2} sx={{ py: 2, borderRadius: 2, px: 2 }} border={'1px solid #30768c'} alignContent={'center'} justifyContent={'space-between'}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                            <Grid container spacing={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <Grid item xs={5} md={5} >
                                    < Typography fontSize={xs ? "14px" : "15px"}>
                                        AMOUNT
                                        < Typography component="span" display={'inline'} color={'#68d605'} fontSize={xs ? "14px" : "15px"}>
                                            &nbsp;&nbsp;MAX
                                        </Typography>
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', opacity: 0.35 }} fontSize={xs ? "14px" : "15px"}>
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
                        }}>
                            <Grid container spacing={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <Grid item xs={5} md={5} >
                                    < Typography fontSize={xs ? "14px" : "15px"}>
                                        AMOUNT
                                        < Typography component="span" display={'inline'} color={'#68d605'} fontSize={xs ? "14px" : "15px"}>
                                            &nbsp;&nbsp;MAX
                                        </Typography>
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', opacity: 0.35 }} fontSize={xs ? "14px" : "15px"}>
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
                                WITHDRAW
                            </Button>
                        </CustomTabPanel>
                    </Box>

                    {/* Input and Button */}

                </Grid>
            </Grid>
        </StyledContainer >
    );
}
const StyledContainer = styled(Box)`
  color: white;
  font-weight: 500;
  padding: 32px 25px 100px 25px;
  height: fit-content;
  width: 100%;
  @media screen and (max-width: 800px) {
    margin: 0 auto;
    padding: 32px 25px 50px 25px;
  }
  @media screen and (max-width: 550px) {
    margin: 0 auto;
    padding: 16px 20px 38px 20px;
  }
`;

