/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Skeleton, useMediaQuery, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import CountUp from "react-countup";
import styled from "styled-components";

import { fetchTokenDetails } from "../lib/bridge/token";
import { tokens } from "../config/networks";
import getEllipsis from "../utils/getEllipsis";

import { useAddress, useWeb3Context } from "../context/web3Context";
import useTokenInfo from "../hooks/useTokenInfo";
import { getTokenContract } from "../utils/contracts";
import {
    numberWithCommas,
    priceFormat,
    BigNumberFormat,
    figureError,
} from "../utils/functions";
import Button from "../components/Button";
import { Panel } from "../components/Box";
import { GROVE_ADDR, GROVE_PAIR_ADDR } from "../abis/address";
import grovepricelogo from "../images/logo.png";
import tokeninfologo from "../images/logo.png";
import marketcaplogo from "../images/marketcap (2).png";
import holderslogo from "../images/apple-icon.png";
import dailyvolumelogo from "../images/marketcap (2).png";
import rewardsinfologo from "../images/apple-icon.png";
import burninfologo from "../images/burn.png";
import ethersan from "../images/etherscan.png";
import { plPL } from "@mui/x-data-grid";

// analyzing chart 
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Info } from "@mui/icons-material";
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const exampleDataset = [
    {
        "TokenHolderAddress": "0x000000000000000000084e91743124a982076",
        "TokenHolderQuantity": "10000000"
    },
    {
        "TokenHolderAddress": "0x000000000000084e91743124a982076c59f10084",
        "TokenHolderQuantity": "5000000"
    },
    {
        "TokenHolderAddress": "0x0000000000000d9054f605ca65a2647c2b521422",
        "TokenHolderQuantity": "11000000"
    },
    {
        "TokenHolderAddress": "0x0000000000002d534ff79e9c69e7fcc742f0be83",
        "TokenHolderQuantity": "40407000"
    },
    {
        "TokenHolderAddress": "0x0000000000003f5e74c1ba8a66b48e6f3d71ae82",
        "TokenHolderQuantity": "10003000"
    },
    {
        "TokenHolderAddress": "0x0000000000000000000084e91743124a982076c59f",
        "TokenHolderQuantity": "3000000"
    },
    {
        "TokenHolderAddress": "0x000000000000084e91743124a982076c59f10084",
        "TokenHolderQuantity": "8000000"
    },
    {
        "TokenHolderAddress": "0x0000000000000d9054f605ca65a2647c2b521422",
        "TokenHolderQuantity": "200000"
    },
    {
        "TokenHolderAddress": "0x0000000000002d534ff79e9c69e7fcc742f0be83",
        "TokenHolderQuantity": "10000000"
    },
    {
        "TokenHolderAddress": "0x0000000000003f5e74c1ba8a66b48e6f3d71ae82",
        "TokenHolderQuantity": "17000000"
    },
    {
        "TokenHolderAddress": "0x0000000000000000003f5e74c1ba8a66b48e6f3",
        "TokenHolderQuantity": "3800000"
    },
    {
        "TokenHolderAddress": "0x000000000000084e91743124a982076c59f10084",
        "TokenHolderQuantity": "2300000"
    },
    {
        "TokenHolderAddress": "0x0000000000000d9054f605ca65a2647c2b521422",
        "TokenHolderQuantity": "12000000"
    },
    {
        "TokenHolderAddress": "0x0000000000002d534ff79e9c69e7fcc742f0be83",
        "TokenHolderQuantity": "6500000"
    },
    {
        "TokenHolderAddress": "0x0000000000003f5e74c1ba8a66b48e6f3d71ae82",
        "TokenHolderQuantity": "3000000"
    }
];

// Function to determine color based on quantity
const getColor = (quantity) => {
    if (quantity < 3000000) {
        return "rgba(75, 192, 192, 0.5)"; // Low: Green
    } else if (quantity < 10000000) {
        return "rgba(255, 206, 86, 0.5)"; // Medium: Yellow
    } else {
        return "rgba(255, 99, 132, 0.5)"; // High: Red
    }
};

// Map exampleDataset to chart data
const chartData = exampleDataset.map((item, index) => {
    const quantity = parseFloat(item.TokenHolderQuantity);
    return {
        x: faker.number.int({ min: 0, max: 100 }),
        y: faker.number.int({ min: 0, max: 100 }), // Y value from the quantity
        r: Math.sqrt(quantity) / 150, // Example radius based on quantity
        wallet: item.TokenHolderAddress, // Store the wallet address for tooltip
        backgroundColor: getColor(quantity), // Assign color based on quantity
        amount: (quantity / 1000000000 * 100).toFixed(3)
    };
});
const tempData = chartData;
const filteredData1 = tempData.filter(item => item.backgroundColor === 'rgba(255, 99, 132, 0.5)');
const filteredData2 = tempData.filter(item => item.backgroundColor === 'rgba(75, 192, 192, 0.5)');
const filteredData3 = tempData.filter(item => item.backgroundColor === 'rgba(255, 206, 86, 0.5)');
export const data = {
    datasets: [
        {
            label: "Wallets Dataset1",
            data: filteredData1,
            borderColor: filteredData1.map((item) => item.backgroundColor.replace("0.5", "1")), // Border color same as fill
            borderWidth: 2,
            hoverBackgroundColor: filteredData1.map((item) => item.backgroundColor.replace("0.5", "0.8")),
            hoverBorderColor: filteredData1.map((item) => item.backgroundColor.replace("0.5", "1")),
            hoverBorderWidth: 3,
        },
        {
            label: "Wallets Dataset2",
            data: filteredData2,
            borderColor: filteredData2.map((item) => item.backgroundColor.replace("0.5", "1")), // Border color same as fill
            borderWidth: 2,
            hoverBackgroundColor: filteredData2.map((item) => item.backgroundColor.replace("0.5", "0.8")),
            hoverBorderColor: filteredData2.map((item) => item.backgroundColor.replace("0.5", "1")),
            hoverBorderWidth: 3,
            hoverRadius: 10,
        },
        {
            label: "Wallets Dataset3",
            data: filteredData3,
            borderColor: filteredData3.map((item) => item.backgroundColor.replace("0.5", "1")), // Border color same as fill
            borderWidth: 2,
            hoverBackgroundColor: filteredData3.map((item) => item.backgroundColor.replace("0.5", "0.8")),
            hoverBorderColor: filteredData3.map((item) => item.backgroundColor.replace("0.5", "1")),
            hoverBorderWidth: 3,
            hoverRadius: 10,
        },
    ],
};

export const options = {

    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                color: "white",
                font: { size: 14 },
            },
        },
        x: {
            beginAtZero: true,
            ticks: {
                color: "white",
                font: { size: 14 },
            },
        },
    },
    plugins: {
        tooltip: {
            callbacks: {
                title: () => `Wallet Address`,
                label: (tooltipItem) => {
                    const data = tooltipItem.raw;
                    return `Address: ${data.wallet}`;
                },
                footer: (tooltipItems) => {
                    const data = tooltipItems[0].raw;
                    return `Quantity: ${data.amount}`;
                },
            },
            backgroundColor: "rgba(0,0,0,0.8)",
            titleColor: "white",
            bodyColor: "white",
            footerColor: "gray",
        },
        legend: {
            labels: {
                padding: 10, // Space between labels
            },
        },
    },
    // layout: {
    //     padding: {
    //         top: 50, // Add padding between the legend and the chart area
    //     },
    // },
};

const Overview = ({ setNotification }) => {
    const md = useMediaQuery("(max-width : 1500px)");
    const xs = useMediaQuery("(max-width : 680px)");
    const sm = useMediaQuery("(max-width : 1250px)");
    const xx = useMediaQuery("(max-width : 600px)");
    const xxs = useMediaQuery("(max-width : 400px)");

    const {
        price,
        dailyvolume,
        circulatingSupply,
        totalreward,
        holders,
        pendingReward,
        balance,
        recentburn,
        burnAmount, ethPrice,
        totalstETHRewards,
        fetchAccountTokenInfo,
    } = useTokenInfo();

    const account = useAddress();
    const { chainID, provider } = useWeb3Context();

    const [token, setToken] = useState({ name: '--' });
    const [PendingReward, setPendingReward] = useState({ prevalue: 0, value: 0 });
    const [Balance, setBalance] = useState({ prevalue: 0, value: 0, detail: "" });
    const [pending, setPending] = useState(false);
    const [items, setItems] = useState([
        {
            title: "ACCOUNT BALANCE",
            value: 0,
            prevalue: 0,
            url: "",
            detail: "",
        },
        {
            title: "LDR PRICE",
            url: grovepricelogo,
            value: 0,
            prevalue: 0,
            detail: (
                <Box display={"flex"}>$&nbsp;
                    <Skeleton
                        variant={"text"}
                        width={xs ? "60px" : "100px"}
                        style={{ transform: "unset" }}
                    />
                </Box>
            ),
        },
        {
            title: "TOKEN INFO",
            url: tokeninfologo,
            value: 0,
            prevalue: 0,
            detail: (
                <>
                    <Box>
                        Name: <span style={{ fontWeight: 300 }}>
                            {/* {token.name} */}
                            Liquid Layer
                        </span>
                    </Box>
                    <Box>
                        Symbol: <span style={{ fontWeight: 300 }}>
                            {/* {token.symbol} */}
                            LDR
                        </span>
                    </Box>
                    <Box>
                        Decimal: <span style={{ fontWeight: 300 }}>
                            {/* {token.decimal} */}
                            LDR
                        </span>
                    </Box>
                </>
            ),
        },
        {
            title: `M. CAP ETH`,
            url: marketcaplogo,
            value: 0,
            prevalue: 0,
            detail: "",
        },
        {
            title: "TOTAL REWARDED",
            url: holderslogo,
            value: 0,
            prevalue: 0,
            detail: "",
        },
        {
            title: "BURN INFO",
            url: burninfologo,
            value: 0,
            prevalue: 0,
            detail: "",
        },
        {
            title: "REWARDS INFORMATION",
            url: rewardsinfologo,
            value: 0,
            value1: "",
            prevalue: 0,
            detail: "",
        },
        {
            title: "CONTACT LINKS",
            url: ethersan,
            value: 0,
            prevalue: 0,
            detail: "",
        },
        {
            title: "Claim your stETH Rewards",
            url: rewardsinfologo,
            value: 0,
            prevalue: 0,
            detail: "",
        }
    ]);
    useEffect(() => {
        let temp = [...items];
        temp[0].prevalue = temp[0].value;
        temp[0].value = balance / Math.pow(10, 9);
        temp[0].detail = (
            <>
                <Box fontWeight={500} fontSize={xs ? "15px" : "16px"}>
                    LDR{" "}
                    <span
                        style={{
                            fontSize: xs ? "20px" : "35px",
                            fontWeight: 600,
                        }}
                    >
                        <CountUp
                            start={
                                temp[0].prevalue /
                                Math.pow(10, BigNumberFormat(temp[0].value).decimals)
                            }
                            end={
                                temp[0].value /
                                Math.pow(10, BigNumberFormat(temp[0].value).decimals)
                            }
                            decimals={4}
                            formattingFn={(value) => {
                                return (
                                    BigNumberFormat(Number(value)).num.toFixed(4) +
                                    BigNumberFormat(Number(temp.value)).text.toUpperCase()
                                );
                            }}
                        />
                    </span>
                    {BigNumberFormat(temp[0].value).text}
                </Box>
                <Box
                    fontWeight={500}
                    fontSize={xs ? "15px" : "24px"}
                    mt={xs ? "calc(100vw / 412 * 2)" : 0}
                >
                    $
                    {BigNumberFormat(
                        chainID ? temp[0].value * price[chainID] : 0
                    ).num.toFixed(2)}
                    <span style={{ fontSize: xs ? "calc(100vw / 412 * 12)" : "16px" }}>
                        {BigNumberFormat(chainID ? temp[0].value * price[chainID] : 0).text}
                    </span>
                </Box>
            </>
        );
        setItems(temp);
        temp = Balance;
        temp.prevalue = temp.value;
        temp.value = balance / Math.pow(10, 8);
        temp.detail = (
            <CountUp
                start={
                    temp.prevalue /
                    Math.pow(10, BigNumberFormat(Number(temp.value)).decimals)
                }
                end={
                    temp.value /
                    Math.pow(10, BigNumberFormat(Number(temp.value)).decimals)
                }
                decimals={8}
                formattingFn={(value) => {
                    return (
                        BigNumberFormat(Number(value)).num.toFixed(8) +
                        BigNumberFormat(Number(temp.value)).text.toUpperCase()
                    );
                }}
            />
        );
        setBalance(temp);
    }, [balance]);
    useEffect(() => {
        let temp = [...items];
        temp[2].detail = (
            <>
                <Box>
                    Name: <span style={{ fontWeight: 700 }}>
                        {/* {token.name} */}
                        Liquid Layer
                    </span>
                </Box>
                <Box>
                    Symbol: <span style={{ fontWeight: 700 }}>
                        {/* {token.symbol} */}
                        LDR
                    </span>
                </Box>
                <Box>
                    Decimal: <span style={{ fontWeight: 700 }}>
                        {/* {token.decimals} */}
                        9
                    </span>
                </Box>
            </>
        )
        setItems(temp);
    }, [token]);
    useEffect(() => {
        if (chainID > 0) {
            fetchTokenDetails(tokens[chainID])
                .then(_token => {
                    setToken(_token);
                })
                .catch(e => {
                    console.log(e);
                })
        }
        let temp = [...items];
        if (price[chainID] > 0) {
            temp[1].prevalue = temp[1].value;
            temp[1].value = price[chainID];
            temp[1].detail = (
                <Box>
                    $
                    <CountUp
                        start={temp[1].prevalue}
                        end={temp[1].value}
                        decimals={4}
                        formattingFn={(value) => {
                            return value;
                        }}
                    />
                </Box>
            );
        }
        temp[3].title = `MARKET CAP `;
        temp[3].prevalue = temp[3].value;
        temp[3].value = circulatingSupply * price[chainID];
        temp[3].value1 = (
            <Box ml={"30px"} fontSize={xs ? "20px" : "35px"} >
                $
                < CountUp
                    start={temp[3].prevalue}
                    end={temp[3].value}
                    decimals={2}
                    formattingFn={(value) => {
                        return numberWithCommas(Number(value).toFixed(2));
                    }}
                />
            </Box>
        );
        temp[3].detail = (
            <Box>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <img style={{ height: 24, width: 24, marginRight: 10 }} src={marketcaplogo} />
                    <p style={{ fontSize: sm ? '15px' : '20px' }}> Daily Volume</p>
                </Box>
                <Box ml={'30px'} fontSize={xs ? "20px" : "35px"}    >
                    $
                    <CountUp
                        start={temp[5].prevalue}
                        end={temp[5].value}
                        decimals={2}
                        formattingFn={(value) => {
                            return numberWithCommas(Number(value).toFixed(2));
                        }}
                    /></Box>
            </Box>
        );
        temp[5].prevalue = temp[5].value;
        temp[5].value = dailyvolume;
        temp[5].detail = (
            <Box style={{ fontSize: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>
                    Total Burned:{" "}
                    {numberWithCommas(BigNumberFormat(Number(burnAmount)).num.toFixed(2))}
                    {BigNumberFormat(Number(burnAmount)).text} LDR
                    <br />
                </span>
                <span style={{ fontWeight: 700, fontSize: 16 }}>
                    Value of Burn:{" "}
                    $
                    {numberWithCommas(
                        Number(
                            isNaN(price[chainID] * burnAmount)
                                ? 0
                                : price[chainID] * burnAmount
                        ).toFixed(2)
                    )}{" "}
                    LDR
                    <br />
                </span>

                <span style={{ fontWeight: 700, fontSize: 16 }}>
                    Recent Burn:
                    {numberWithCommas(
                        BigNumberFormat(Number(recentburn).toFixed(2)).num.toFixed(2)
                    )}
                    {BigNumberFormat(Number(recentburn)).text} LDR
                </span>
            </Box>

        );
        setItems(temp);
    }, [price[chainID], dailyvolume, chainID]);

    useEffect(() => {
        let temp = [...items];
        temp[4].prevalue = temp[4].value;
        temp[4].value = holders;
        temp[4].detail = (
            <Box>
                <CountUp
                    start={temp[4].prevalue}
                    end={temp[4].value}
                    formattingFn={(value) => {
                        return numberWithCommas(Number(holders).toFixed(5));
                    }}
                />
                {' stETH'}
            </Box>
        );

        setItems(temp);
    }, [holders, account]);

    useEffect(() => {
        let temp = [...items];
        temp[6].detail = (
            <Box>
                Token: <span style={{ fontWeight: 700 }}>LiquidLayer Token</span>
                <br />
                Total Rewards:{" "}
                <span style={{ fontWeight: 700 }}>
                    {numberWithCommas(BigNumberFormat(totalreward).num.toFixed(2))}
                    {BigNumberFormat(Number(totalreward)).text} LDR
                </span>
                <br />
                Total Rewards Price:{" "}
                <span style={{ fontWeight: 700 }}>
                    ${numberWithCommas((price[chainID] * totalreward).toFixed(2))}
                </span>
            </Box>
        );
        temp[7].detail = (
            <Box width={"100%"}>
                <ContractInfo>
                    <Grid container>
                        <Grid item xs={12} md={6} flexDirection={'row'}>
                            <a
                                href={
                                    'https://etherscan.io/token/' + GROVE_ADDR[1]
                                }
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <Box display={"flex"} alignItems={"center"}>
                                    LDR Token <Box style={md ? { overflowWrap: 'anywhere' } : {}}> { }</Box>
                                    <BiLinkExternal />
                                </Box>
                            </a>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <a
                                href={
                                    `https://etherscan.io/token/` + GROVE_PAIR_ADDR[1]
                                }
                                target={"_blank"}
                                rel="noreferrer"
                            >

                                <Box display={"flex"} alignItems={"center"}>
                                    LPToken  <Box style={md ? { overflowWrap: 'anywhere' } : {}}> </Box>
                                    <BiLinkExternal />
                                </Box>
                            </a>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <a
                                href={
                                    "https://etherscan.io/address/" + '0xEA03d44F6858Af6C1cD1e068216f409E3C117425'
                                }
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <Box display={"flex"} alignItems={"center"}>
                                    LP Yield <Box style={md ? { overflowWrap: 'anywhere' } : {}}> </Box>
                                    <BiLinkExternal />
                                </Box>
                            </a>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <a
                                href={
                                    "https://etherscan.io/address/" + '0x31D02a8e547754111dD8F0b2B0879B44A3372328'
                                }
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <Box display={"flex"} alignItems={"center"}>
                                    Tier Yield  <Box style={md ? { overflowWrap: 'anywhere' } : {}}> { }</Box>
                                    <BiLinkExternal />
                                </Box>
                            </a>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <a
                                href={
                                    "https://etherscan.io/address/"
                                }
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <Box display={"flex"} alignItems={"center"}>
                                    Restake      <Box style={md ? { overflowWrap: 'anywhere' } : {}}> </Box>
                                    <BiLinkExternal />
                                </Box>
                            </a>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <a
                                href={
                                    "https://etherscan.io/address/"
                                }
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <Box display={"flex"} alignItems={"center"}>
                                    Liquid Yield   <Box style={md ? { overflowWrap: 'anywhere' } : {}}> </Box>
                                    <BiLinkExternal />
                                </Box>
                            </a>
                        </Grid>
                    </Grid>
                </ContractInfo>
            </Box>
        );
        temp[8].detail = (
            <Box>
                Your Pending stETH Reward:{" "}
                <span style={{ fontWeight: 700 }}>
                    {numberWithCommas(BigNumberFormat(Number(PendingReward)).num.toFixed(5))}

                    {BigNumberFormat(Number(PendingReward) * ethPrice).text} stETH ( $
                    {numberWithCommas(
                        Number(
                            isNaN(ethPrice * PendingReward)
                                ? 0
                                : ethPrice * PendingReward
                        ).toFixed(2)
                    )}{" "})
                    <br />
                </span>
                Total Pending stETH Reward:{" "}
                <span style={{ fontWeight: 700, fontSize: sm ? '15px' : '20px' }}>
                    {numberWithCommas(BigNumberFormat(Number(totalstETHRewards / 1e18)).num.toFixed(5))}

                    {BigNumberFormat(Number(totalstETHRewards / 1e18) * ethPrice).text} stETH ( $
                    {numberWithCommas(
                        Number(
                            isNaN(ethPrice * totalstETHRewards / 1e18)
                                ? 0
                                : ethPrice * totalstETHRewards / 1e18
                        ).toFixed(2)
                    )}{" "})
                    <br />
                    <br />
                </span>
                <div>
                    <Button type={"primary"}
                        width={"100%"}
                        height={sm ? "35px" : "45px"}
                        fontSize={sm ? "12px" : "16px"} onClick={() => onClaim()}>
                        Claim stETH Reward
                    </Button>
                </div>
            </Box>
        );
        setItems(temp);
    }, [totalreward, price[chainID], burnAmount, recentburn, PendingReward]);
    useEffect(() => {
        setPendingReward(pendingReward);
    }, [pendingReward, account, ethPrice, chainID]);

    const onClaim = async () => {
        setPending(true);
        const tokenContract = getTokenContract(chainID, provider.getSigner());
        try {
            const estimateGas = await tokenContract.estimateGas._claimstETH();
            console.log(estimateGas.toString());
            if (estimateGas / 1 === 0) {
                setNotification({
                    type: "error",
                    title: "Error",
                    detail: "Insufficient funds",
                });
                setPending(false);
                return;
            }
            const tx = {
                gasLimit: estimateGas.toString(),
            };
            const claimtx = await tokenContract._claimstETH(tx);
            await claimtx.wait();
            fetchAccountTokenInfo();
        } catch (error) {
            console.log(error);
            figureError(error, setNotification);
        }
        setPending(false);
    };
    return (
        <StyledContainer xs={xs ? xs : undefined}>
            <Box display={"flex"} alignItems={"center"} margin={sm ? "18px 0 12px 0" : "14px 14px 0px  0px"}>
                <Box fontSize={xs ? "20px" : "36px"} fontWeight={"bold"} mr={xs ? "8px" : "19px"}>
                    Dashboard
                </Box>
            </Box>
            <Field>
                <Box width={"100%"}>
                    <Grid container space={1} margin={'auto'} >
                        <Grid item xs={12} md={6} sm={12} p={2}>
                            <Panel
                                key={1}
                                width={"100%"}
                                height={"150px"}
                                xx={xx ? xx : undefined}
                                type={"secondary"}
                                display={'flex-container'}
                                justifyItems={'space-around'}
                                pt={sm ? '20px' : '30px'}
                            >
                                <Box >
                                    <Box
                                        fontSize={
                                            sm ? "15px" : "20px"
                                        }
                                        fontWeight={300}
                                        display={"flex"}
                                        alignItems={"center"}
                                        lineHeight={"15px"}
                                    >
                                        <img src={items[1].url} alt={""}
                                            style={{ marginRight: "10px", height: "24px", width: "24px" }} />
                                        {items[1].title}
                                    </Box>
                                    <Box
                                        mt={
                                            xs
                                                ? "10px"
                                                : "30px"
                                        }
                                        fontWeight={300}
                                        fontSize={
                                            xs ? "20px" : "30px"
                                        }
                                        pl={'35px'}
                                    >
                                        {items[1].detail}
                                    </Box>
                                </Box>
                                <Box ml={sm ? '10px' : '50px'} mt={'5px'}>
                                    <Box
                                        fontSize={
                                            sm ? "15px" : "20px"
                                        }
                                        fontWeight={300}
                                        display={"flex"}
                                        alignItems={"center"}
                                        lineHeight={"15px"}
                                    >
                                        {items[0].title}
                                    </Box>
                                    <Box
                                        mt={
                                            xs
                                                ? "calc(100vw / 412 * 2)"
                                                : "calc(100vw / 412 * 2)"
                                        }
                                        fontWeight={700}
                                        fontSize={
                                            xs
                                                ? "calc(100vw / 412 * 16)"
                                                : "30px"
                                        }
                                    >
                                        {items[0].detail}
                                    </Box>
                                </Box>
                            </Panel>
                        </Grid>
                        <Grid item xs={12} md={6} sm={12} p={2}>
                            <Panel
                                key={2}
                                width={"100%"}
                                height={"150px"}
                                xx={xx ? xx : undefined}
                                type={"secondary"}
                                display={'flex-container'}
                                justifyItems={'space-around'}
                                pt={sm ? '20px' : '30px'}
                            >
                                <Box fontSize={
                                    sm ? "20px" : "35px"
                                }
                                >
                                    <Box
                                        fontSize={
                                            sm ? "15px" : "20px"
                                        }
                                        fontWeight={300}
                                        display={"flex"}
                                        alignItems={"center"}
                                    // lineHeight={"15px"}
                                    // mt={md ? '0px' : '4px'}
                                    >
                                        <img src={items[3].url} alt={""}
                                            style={{ marginRight: "10px", height: "24px", width: "24px" }} />
                                        {items[3].title}
                                    </Box>
                                    {items[3].value1}
                                </Box>
                                <Box
                                    ml={'20px'}
                                    fontWeight={300}
                                    fontSize={
                                        xs ? "20px" : "35px"
                                    }
                                >
                                    {items[3].detail}
                                </Box>
                            </Panel>
                        </Grid>
                    </Grid>
                    <Grid px={sm ? 0 : 2} height={'auto'}  >
                        <Bubble options={options} data={data} style={{ width: '100%!important', height: 'auto' }} />
                    </Grid>
                    <Grid container space={0} height={'auto'}  >
                        <Grid item xs={12} sm={12} md={6} p={2} height={'inherit'}>
                            <Panel
                                width={"100%"}
                                type={"primary"}
                                p={xs ? 2 : 3}
                                mb={'0'}
                                height={'100%'}
                            >
                                <Box
                                    fontSize={xs ? "20px" : "30px"
                                    }
                                    fontWeight={300}
                                    display={"flex"}
                                    alignItems={"center"}
                                    lineHeight={"24px"}

                                >
                                    <img src={items[7].url} alt={""}
                                        style={{ marginRight: "10px", height: "24px", width: "24px" }} />
                                    {items[7].title}
                                </Box>
                                <Box
                                    mt={
                                        xs
                                            ? "calc(100vw / 412 * 7)"
                                            : "18px"
                                    }
                                    fontWeight={300}
                                    fontSize={
                                        xs
                                            ? "calc(100vw / 412 * 12)"
                                            : "16px"
                                    }
                                >
                                    {items[7].detail}
                                </Box>
                            </Panel>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} p={2} >
                            <Panel
                                width={"100%"}
                                type={"primary"}
                                display={'flex'}
                                flexDirection={'column'}
                                justifyContent={'space-around'}
                                height={'100%'}
                                mb={'0'}
                            >
                                <Box
                                    fontSize={sm ? "20px" : "30px"
                                    }
                                    fontWeight={300}
                                    display={"flex"}
                                    alignItems={"center"}
                                    lineHeight={"24px"}
                                // p={xs ? 2 : 1}
                                >
                                    <img src={items[8].url} alt={""}
                                        style={{ marginRight: "20px", height: "24px", width: "24px" }} />
                                    {items[8].title}
                                </Box>
                                <Box
                                    mt={
                                        sm
                                            ? "15px"
                                            : "18px"
                                    }
                                    fontWeight={300}
                                    fontSize={
                                        xs
                                            ? "12px"
                                            : "16px"
                                    }
                                >
                                    {items[8].detail}
                                </Box>
                            </Panel>
                        </Grid>
                    </Grid>
                </Box >
            </Field >
        </StyledContainer >

    );
};

const ContractInfo = styled(Box)`
//   margin-top: 33px;
  border-radius: 10px;
  text-decoration: underline;
  color: #49c4e6;
  border: 1px solid rgb(0, 120, 143);
  padding: 24px;
  width: 100%;
  > a {
    display: flex;
    align-items: center;
    font-size: 15px;
    cursor: pointer;
    margin-bottom: 20px;
    > div > div {
      margin-right: 8px;
    }
    > div > svg {
      color: #00ebff;
    }
    flex-wrap: wrap;
  }
  > a:last-child {
    margin: 0;
  }
  @media screen and (max-width: 680px) {
    padding: calc(100vw / 412 * 12);
    margin-top: calc(100vw / 412 * 20);
    > a {
      font-size: calc(100vw / 412 * 12);
    }
  }
`;

const Vector = styled(Box)`
  position: absolute;
  right: 10px;
  top: 10px;
  @media screen and (max-width: 680px) {
    transform: scale(0.57);
    right: calc(-100vw / 412 * 3);
    top: calc(-100vw / 412 * 2);
  }
`;

const InfoPanel = styled(Box)`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Field = styled(Box)`
  display: flex;
  @media screen and (max-width: 1180px) {
    flex-direction: column;
  }
`;

const StyledContainer = styled(Box)`
  color: white;
  font-weight: 500;
  padding: ${({ xs }) => xs ? '80px 46px 100px 46px' : '41px 46px 100px 46px'};
  height: fit-content;
  width: 100%;
  position:relative;
  :after {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    height: 50%;
    border-right: ${({ xs }) => xs ? 'none' : '1px solid #262E43'};
    z-index: -1;
  }
  @media screen and (max-width: 800px) {
    //width: fit-content;
    margin: 0 auto;
    padding: 56px 30px 100px 30px;
  }
  @media screen and (max-width: 680px) {
    width: 100%;
    padding: 15px;
  }
`;
export default Overview;
// // Real wallet addresses and amounts
