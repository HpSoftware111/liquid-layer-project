import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Pool } from "../components/Box";
import SubRestaking from "./restaking/SubRestaking";
import Button from "../components/Button";
import wstETH from "../images/wstETH-BeNty4Eq.svg"
import WBTC from "../images/WBTC-Bd9t_EX0.svg"
import rETH from "../images/rETH-CAmIBB-2.svg"
import sfrxETH from "../images/sfrxETH-BvlehMbt.svg"


//restake data start
const rows = [
    {
        id: 1,
        collateral: "wstETH",
        description: "Wrapped Lido Staked Ether",
        tvl: "$1.599B",
        supply: "365.5K",
        limit: "420.7K",
        remaining: "13.12%",
        points: "Enabled",
        progress: 86.88,
        url: wstETH
    },
    {
        id: 2,
        collateral: "WBTC",
        description: "Wrapped Bitcoin",
        tvl: "$130.3M",
        supply: "1.355K",
        limit: "1.65K",
        remaining: "17.86%",
        points: "Enabled",
        progress: 82.14,
        url: WBTC
    },
    {
        id: 3,
        collateral: "rETH",
        description: "Rocket Pool Ether",
        tvl: "$133M",
        supply: "34.43K",
        limit: "34.67K",
        remaining: "0.6808%",
        points: "Enabled",
        progress: 99.32,
        url: rETH
    },
    {
        id: 4,
        collateral: "sfrxETH",
        description: "Staked Frax Ether",
        tvl: "$94.7M",
        supply: "23.82K",
        limit: "36.87K",
        remaining: "35.4%",
        points: "Enabled",
        progress: 64.6,
        url: sfrxETH
    },
    {
        id: 5,
        collateral: "ETHx",
        description: "Stader Staked Ether",
        tvl: "$78.38M",
        supply: "90M",
        limit: "90M",
        remaining: "<0.01%",
        points: "Enabled",
        progress: 99.99,
        url: "../images/ETHx.png"
    },
];
//restake data end
const ReStaking = ({ setNotification }) => {
    const md = useMediaQuery("(max-width: 1500px)");
    const sm = useMediaQuery("(max-width : 800px)");
    const xs = useMediaQuery("(max-width : 700px)");
    return (
        <StyledContainer >
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
            <Box
                display={"flex"}
                alignItems={"center"}
                margin={sm ? "18px 0 12px 0" : "24px 21px 12px  21px"}
            >
                <Box
                    fontSize={xs ? "20px" : "36px"}
                    fontWeight={"bold"}
                    mr={xs ? "8px" : "19px"}
                    sx={{
                        borderRight: "1px solid #ffffff59", // Set the border-left
                        paddingRight: "18px", // Optional: Add some padding                        
                    }}
                >RESTAKE
                </Box>
                <Typography sx={{ display: 'inline-block', padding: '8px', opacity: '0.5', fontSize: '18px' }}>SELECT TO VIEW DETAILS</Typography>
            </Box>
            <Grid container spacing={1} mt={'1px'} display={md ? 'none' : ''} fontSize={18} >
                <Grid item xs={5} textAlign={'center'} >COLLATERAL</Grid>
                <Grid item xs={1} textAlign={'right'}>ACTIONS</Grid>
                <Grid item xs={3} textAlign={'center'}>TVL</Grid>
                <Grid item xs={2} >&nbsp;&nbsp;SUPPLY | LIMIT</Grid>
                <Grid item xs={1} >POINTS</Grid>
            </Grid>
            <SubRestaking rows={rows} ></SubRestaking>
        </StyledContainer >
    );
};
const StyledContainer = styled(Box)`
  color: white;
  font-weight: 500;
  padding: 10px 10px;
  height: fit-content;
  width: 100%;
  @media screen and (max-width: 800px) {
    margin: 0 auto;
    padding: 10px 10px 10px 10px;
  }
  @media screen and (max-width: 550px) {
    margin: 0 0;
    padding:  5px;
  }
`;
export default ReStaking;
