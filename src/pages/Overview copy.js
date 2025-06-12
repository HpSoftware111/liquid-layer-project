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

const Overview = ({ setNotification }) => {
    const md = useMediaQuery("(max-width : 1500px)");
    const xs = useMediaQuery("(max-width : 680px)");
    const sm = useMediaQuery("(max-width : 1180px)");
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
                <Box fontWeight={500} fontSize={xs ? "calc(100vw / 412 * 16)" : "16px"}>
                    LDR{" "}
                    <span
                        style={{
                            fontSize: xs ? "calc(100vw / 412 * 16)" : "32px",
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
                    fontSize={xs ? "calc(100vw / 412 * 12)" : "24px"}
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
        temp[3].detail = (
            <Box>
                $
                <CountUp
                    start={temp[3].prevalue}
                    end={temp[3].value}
                    decimals={2}
                    formattingFn={(value) => {
                        return numberWithCommas(Number(value).toFixed(2));
                    }}
                />
                <br />
                <span style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                    <img style={{ height: 24, width: 24, marginRight: 10 }} src={marketcaplogo} />
                    <p style={{ fontSize: 20 }}> Daily Volume</p>
                </span>
                $
                <CountUp
                    start={temp[5].prevalue}
                    end={temp[5].value}
                    decimals={2}
                    formattingFn={(value) => {
                        return numberWithCommas(Number(value).toFixed(2));
                    }}
                />
            </Box>
        );
        temp[5].prevalue = temp[5].value;
        temp[5].value = dailyvolume;
        temp[5].detail = (
            // <Box>
            //     $
            //     <CountUp
            //         start={temp[5].prevalue}
            //         end={temp[5].value}
            //         decimals={2}
            //         formattingFn={(value) => {
            //             return numberWithCommas(Number(value).toFixed(2));
            //         }}   
            //     />
            // </Box>
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
            // <Box>
            //     Total Burned:{" "}
            //     <span style={{ fontWeight: 700 }}>
            //         {numberWithCommas(BigNumberFormat(Number(burnAmount)).num.toFixed(2))}
            //         {BigNumberFormat(Number(burnAmount)).text} LDR
            //         <br />
            //     </span>
            //     Total Value of Burn:{" "}
            //     <span style={{ fontWeight: 700 }}>
            //         $
            //         {numberWithCommas(
            //             Number(
            //                 isNaN(price[chainID] * burnAmount)
            //                     ? 0
            //                     : price[chainID] * burnAmount
            //             ).toFixed(2)
            //         )}{" "}
            //         LDR
            //         <br />
            //     </span>
            //     Most recent Burn:{" "}
            //     <span style={{ fontWeight: 700 }}>
            //         {numberWithCommas(
            //             BigNumberFormat(Number(recentburn).toFixed(2)).num.toFixed(2)
            //         )}
            //         {BigNumberFormat(Number(recentburn)).text} LDR
            //     </span>
            // </Box>
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
                <span style={{ fontWeight: 700 }}>
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
                        height={sm ? "28px" : "50px"}
                        fontSize={sm ? "12px" : "16px"} onClick={() => onClaim()}>
                        Claim stETH Reward
                    </Button>
                </div>
            </Box>
        );
        setItems(temp);
    }, [totalreward, price[chainID], burnAmount, recentburn, PendingReward]);

    useEffect(() => {
        // let temp = PendingReward;
        // temp.prevalue = temp.value;
        // temp.value = pendingReward * price[chainID];
        // console.log('aagre user state ===>', pendingReward)
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
            {/* <Box display={"flex"} alignItems={"center"}>
                <Box
                    fontSize={xs ? "30px" : "40px"}
                    fontWeight={500}
                    lineHeight={xs ? "40px" : "85px"}
                    mr={xs ? "8px" : "19px"}
                >
                    DashBoard
                </Box>
            </Box> */}
            <Box display={"flex"} alignItems={"center"} margin={sm ? "18px 0 12px 0" : "14px 14px 0px  0px"}>
                <Box fontSize={xs ? "20px" : "36px"} fontWeight={"bold"} mr={xs ? "8px" : "19px"}>
                    Dashboard
                </Box>
            </Box>
            <Field>
                <Box width={"100%"}>
                    <InfoPanel mt={"36px"}>
                        {items.map((data, i) => {
                            if (i === 6) return (
                                <React.Fragment key={i}></React.Fragment>);
                            return (
                                <Panel
                                    key={i}
                                    width={
                                        i === 6 || i === 7 || i === 8
                                            ? xs
                                                ? "100%"
                                                : "calc(50% - 28px)"
                                            : xs
                                                ? "100%"
                                                : "calc(33% - 28px)"
                                    }
                                    height={"250px"}
                                    xx={xx ? xx : undefined}
                                    type={i === 0 ? "secondary" : "primary"}
                                >
                                    <Box
                                        fontSize={
                                            xs
                                                ? i === 6 || i === 7
                                                    ? "calc(100vw / 412 * 14)"
                                                    : "calc(100vw / 412 * 12)"
                                                : "20px"
                                        }
                                        fontWeight={300}
                                        display={"flex"}
                                        alignItems={"center"}
                                        lineHeight={"24px"}

                                    >
                                        {i !== 0 && <img src={data.url} alt={""}
                                            style={{ marginRight: "10px", height: "24px", width: "24px" }} />}
                                        {data.title}
                                    </Box>
                                    <Box
                                        mt={
                                            xs
                                                ? i === 2
                                                    ? "calc(100vw / 412 * 6)"
                                                    : i === 0
                                                        ? "calc(100vw / 412 * 3)"
                                                        : "calc(100vw / 412 * 7)"
                                                : "18px"
                                        }
                                        fontWeight={i === 2 || i === 6 || i === 7 || i === 8 ? 300 : 700}
                                        fontSize={
                                            i === 6 || i === 7 || i === 2 || i === 8
                                                ? xs
                                                    ? "calc(100vw / 412 * 12)"
                                                    : "16px"
                                                : xs
                                                    ? "calc(100vw / 412 * 16)"
                                                    : "30px"
                                        }
                                    >
                                        {data.detail}
                                    </Box>
                                </Panel>
                            );
                        })}
                    </InfoPanel>

                    {/* <Box width={"100%"}>
                        <Box
                            fontSize={xs ? "calc(100vw / 412 * 20)" : "24px"}
                            fontWeight={700}
                        >
                            CONTRACT LINKS
                        </Box>
                        <ContractInfo>
                            <a
                                href={
                                    'https://etherscan.io/token/' + GROVE_ADDR[1]
                                }
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <Box>LiquidLayer Token : </Box>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Box style={md ? { overflowWrap: 'anywhere' } : {}}> {GROVE_ADDR[1]}</Box>
                                    <BiLinkExternal />
                                </Box>
                            </a>
                            <a
                                href={
                                    `https://etherscan.io/token/` + GROVE_PAIR_ADDR[1]
                                }
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <Box>LPToken : </Box>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Box style={md ? { overflowWrap: 'anywhere' } : {}}> {GROVE_PAIR_ADDR[1]}</Box>
                                    <BiLinkExternal />
                                </Box>
                            </a>
                            <a
                                href={
                                    "https://etherscan.io/address/" + '0x1ab217c5d5b4f3b1d9b18b514729f3eb6dd148a5'
                                }
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <Box>LP Yield : </Box>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Box style={md ? { overflowWrap: 'anywhere' } : {}}> {'0x1ab217c5d5b4f3b1d9b18b514729f3eb6dd148a5'}</Box>
                                    <BiLinkExternal />
                                </Box>
                            </a>
                            <a
                                href={
                                    "https://etherscan.io/address/" + '0x30db3d6bac6f5bdb048562ea2940c4ea8c85f74c'
                                }
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <Box>Tier Yield Pool : </Box>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Box style={md ? { overflowWrap: 'anywhere' } : {}}> {'0x30db3d6bac6f5bdb048562ea2940c4ea8c85f74c'}</Box>
                                    <BiLinkExternal />
                                </Box>
                            </a>
                            <a
                                href={
                                    "https://etherscan.io/address/"
                                }
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <Box>AI Yield Pool  :</Box>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Box style={md ? { overflowWrap: 'anywhere' } : {}}> </Box>
                                    <BiLinkExternal />
                                </Box>
                            </a>
                            <a
                                href={
                                    "https://etherscan.io/address/"
                                }
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <Box> Liquid Stake : </Box>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Box style={md ? { overflowWrap: 'anywhere' } : {}}> </Box>
                                    <BiLinkExternal />
                                </Box>
                            </a>
                        </ContractInfo>
                    </Box> */}
                </Box>
            </Field>
        </StyledContainer>

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
