/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Box, useMediaQuery, Skeleton } from "@mui/material";
import { BigNumber, ethers } from "ethers";
import styled from "styled-components";
import {
    AiOutlineCalculator,
    AiFillCaretDown,
    AiFillCaretUp,
} from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";

import { GROVE_FARM, GROVE_PAIR_ADDR } from "../abis/address";
import Button from "../components/Button";
import StakingModal from "../components/StakingModal";
import ROIModal from "../components/ROIModal";
import { useAddress, useWeb3Context } from "../context/web3Context";
import useFarmInfo from "../hooks/useFarmInfo";
import useTokenInfo from "../hooks/useTokenInfo";
import { getFarmContract, getPairContract } from "../utils/contracts";
import { figureError } from "../utils/functions";
import { HarvestBox, Pool } from "../components/Box";
import axios from "axios";
import logo from "../images/logo.png";
import eth from "../images/Ethereum-ETH.png"


const compound = [8.678, 7.881, 7.1, 5.746];

const Farming = ({ setNotification }) => {
    const sm = useMediaQuery("(max-width : 800px)");
    const xs = useMediaQuery("(max-width : 550px)");
    const xxs = useMediaQuery("(max-width : 400px)");

    const [detailopen, setDetailOpen] = useState([]);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(1);
    const [pending, setPending] = useState(false);
    const [amount, setAmount] = useState(0);
    const [curindex, setCurIndex] = useState(0);
    const [maxpressed, setMaxPressed] = useState(false);
    const [roiopen, setROIOpen] = useState(false);

    const account = useAddress();

    const {
        allowance,
        farminfo,
        accountfarminfo,
        farmprice,
        liquidity,
        farmbalance,
        fetchFarmData,
        fetchAccountFarmData,
    } = useFarmInfo();

    const { price } = useTokenInfo();

    const { connect, provider, chainID } = useWeb3Context();

    const [canView, setCanView] = useState(true);


    useEffect(() => {

        try {
            axios.get('https://ipapi.co/json/')
                .then(data => {

                    let ip = data.data.ip;
                    if (
                        true
                        || ip == "193.34.172.116"
                        || ip == "192.166.247.44"
                        || ip == "192.168.68.66"
                        || ip == "116.90.74.142"
                        || ip == "193.106.59.15"
                    ) setCanView(true);

                })
                .catch(err => {
                    console.log(err);
                })
        } catch (r) {
            console.log(r);
        }

    }, [account]);


    function numberWithCommas(x) {
        if (!x) return 0;
        // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let _x = x.toString().split(".");
        if (_x[1])
            return _x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + _x[1];
        else
            return _x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function onConnect() {
        connect().then((msg) => {
            if (msg.type === "error") {
                setNotification(msg);
            }
        });
    }

    const onApproveContract = async () => {
        setPending(true);
        try {
            const lpTokenContract = getPairContract(chainID, provider.getSigner());
            const estimateGas = await lpTokenContract.estimateGas.approve(
                GROVE_FARM[chainID],
                "115792089237316195423570985008687907853269984665640564039457584007913129639935"
            );
            console.log(estimateGas);
            const tx = {
                gasLimit: estimateGas.toString(),
            };
            const ttx = await lpTokenContract.approve(
                GROVE_FARM[chainID],
                "115792089237316195423570985008687907853269984665640564039457584007913129639935",
                tx
            );
            await ttx.wait();
            fetchAccountFarmData();
        } catch (error) {
            console.log(error);
            figureError(error, setNotification);
        }
        setPending(false);
    };

    const onConfirm = async () => {
        try {
            setPending(true);
            const FarmContract = getFarmContract(chainID, provider.getSigner());
            let estimateGas, ttx;
            if (type === 1) {
                estimateGas = await FarmContract.estimateGas.deposit(
                    maxpressed ? farmbalance : ethers.utils.parseEther(amount),
                    curindex,
                );
            }
            if (type === 2) {
                console.log("withdraw", chainID);
                estimateGas = await FarmContract.estimateGas.withdraw(
                    maxpressed
                        ? accountfarminfo[curindex].unlockAmount
                        : ethers.utils.parseEther(amount),
                    curindex,
                );
            }
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
                gasLimit: Math.ceil(estimateGas * 1.2),
            };
            if (type === 1) {
                ttx = await FarmContract.deposit(
                    maxpressed ? farmbalance : ethers.utils.parseEther(amount),
                    curindex,
                    tx
                );
            }
            if (type === 2) {
                ttx = await FarmContract.withdraw(
                    maxpressed
                        ? accountfarminfo[curindex].unlockAmount
                        : ethers.utils.parseEther(amount),
                    curindex,
                    tx
                );
            }
            await ttx.wait();
            fetchAccountFarmData();
            setPending(false);
        } catch (error) {
            console.log(error);
            figureError(error, setNotification);
            setPending(false);
        }
    };

    async function onHarvestReward(i) {
        setPending(true);
        try {
            const FarmContract = getFarmContract(chainID, provider.getSigner());

            const estimateGas = await FarmContract.estimateGas["claimReward(uint8)"](i, {
                value: 0,
            });
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
                gasLimit: Math.ceil(estimateGas * 1.2),
                value: 0,
            };
            const ttx = await FarmContract["claimReward(uint8)"](i, tx);
            await ttx.wait();
            fetchAccountFarmData();
        } catch (error) {
            console.log(error);
            figureError(error, setNotification);
        }

        setPending(false);
    }

    return (
        <>
            {canView ? (

                <StyledContainer>
                    <StakingModal
                        open={open}
                        setOpen={setOpen}
                        balance={
                            type === 1
                                ? farmbalance / Math.pow(10, 18)
                                : accountfarminfo[curindex].unlockAmount / Math.pow(10, 18)
                        }
                        type={type}
                        amount={amount}
                        setAmount={setAmount}
                        maxpressed={maxpressed}
                        setMaxPressed={setMaxPressed}
                        onClick={() => onConfirm()}
                        pending={pending}
                        _price={1}
                        price={farmprice}
                    />
                    {/* <ROIModal
                        open={roiopen}
                        setOpen={setROIOpen}
                        price={farmprice}
                        balance={farmbalance / Math.pow(10, 18)}
                        rate={farminfo[curindex].rate}
                        compound={compound}
                    /> */}
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        margin={sm ? "18px 0 12px 0" : "24px 21px 12px  21px"}
                    >
                        <Box
                            fontSize={xs ? "20px" : "36px"}
                            fontWeight={"bold"}
                            mr={xs ? "8px" : "19px"}
                        >
                            Liquid Layer Farm
                        </Box>
                        <Box display={"flex"} minWidth={xs ? "23px" : "40px"} minHeight={xs ? "23px" : "40px"} maxWidth={xs ? "23px" : "40px"} maxHeight={xs ? "23px" : "40px"}>
                            <img src={"/icons/farming.png"}
                                width={"100%"}
                                height={"100%"}
                                alt={""}
                            />
                        </Box>
                    </Box>
                    <PoolPanel>
                        {farminfo.map((data, i) => {
                            return (<>

                                <Pool key={i}>
                                    <Box display={"flex"} justifyContent={"space-between"}>
                                        <Box mt={"10px"} fontSize={xs ? "12px" : "18px"}>
                                            <Box fontSize={xs ? "13px" : "16px"}>LP Yield: LDR-LP</Box>
                                            <Box
                                                mt={xs ? "9px" : "18px"}
                                                fontSize={xs ? "17px" : "32px"}
                                                fontWeight={"600"}
                                                display={"flex"}
                                                alignItems={"center"}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setROIOpen(true);
                                                    setCurIndex(i);
                                                }}
                                            >
                                                <Box
                                                    display={"flex"}
                                                    alignItems={"center"}
                                                    lineHeight={"normal"}
                                                >
                                                    {data.rate !== null ? (
                                                        <Box>{Number(data.rate).toFixed(2)}%</Box>
                                                    ) : (
                                                        <Skeleton
                                                            variant={"text"}
                                                            width={xs ? "60px" : "100px"}
                                                            style={{ transform: "unset" }}
                                                        />
                                                    )}
                                                    <Box mx={xs ? "5px" : "10px"}>APR</Box>
                                                    {/*
                      <Box>
                        <AiOutlineCalculator />
                      </Box>
                      */}
                                                </Box>
                                            </Box>
                                            <Box mt={xs ? "4px" : "16px"}>Earn: LDR Token</Box>
                                            <Box
                                                mt={xs ? "10px" : "16px"}
                                                display={"flex"}
                                                lineHeight={"normal"}
                                            >
                                                <Box mr={xs ? "5px" : "10px"}>Deposit Fee: </Box>
                                                {data.depositFee !== null ? (
                                                    <Box>{Number(data.depositFee).toFixed(2)}%</Box>
                                                ) : (
                                                    <Skeleton
                                                        variant={"text"}
                                                        width={xs ? "25px" : "50px"}
                                                        style={{ transform: "unset" }}
                                                    />
                                                )}
                                            </Box>
                                            <Box display={"flex"} lineHeight={"normal"}>
                                                <Box mr={xs ? "5px" : "10px"}>Withdraw Fee: </Box>
                                                {data.withdrawFee !== null ? (
                                                    <Box>{Number(data.withdrawFee).toFixed(2)}%</Box>
                                                ) : (
                                                    <Skeleton
                                                        variant={"text"}
                                                        width={xs ? "25px" : "50px"}
                                                        style={{ transform: "unset" }}
                                                    />
                                                )}
                                            </Box>
                                            {/*
                  <Box display={"flex"} lineHeight={"normal"}>
                    <Box mr={xs ? "5px" : "10px"}>LDR Reflected : </Box>
                    {accountfarminfo[i].pendingReflections !== undefined ? (
                      Number(accountfarminfo[i].pendingReflections).toFixed(3)
                    ) : (
                      <Skeleton
                        variant={"text"}
                        width={xs ? "25px" : "50px"}
                        style={{ transform: "unset" }}
                      />
                    )}
                  </Box>
                  */}
                                        </Box>
                                        <Box
                                            display={"flex"}
                                            flexDirection={"column"}
                                            alignItems={"flex-end"}
                                        >
                                            {/* <Box
                                                display={"flex"}
                                                minWidth={xs ? "24px" : "34px"}
                                                minHeight={xs ? "25px" : "34px"}
                                                maxWidth={xs ? "24px" : "34px"}
                                                maxHeight={xs ? "25px" : "34px"}
                                                bgcolor={"white"}
                                                borderRadius={"50%"}
                                                zIndex={1}
                                            >
                                                <img src={logo} />
                                            </Box> */}
                                            <Box
                                                display={"flex"}
                                                borderRadius={"50%"}
                                                // border={"1px solid white"}
                                                mt={"13px"}
                                                mr={"8px"}
                                                minWidth={xs ? "36px" : "51px"}
                                                minHeight={xs ? "36px" : "52px"}
                                                maxWidth={xs ? "36px" : "51px"}
                                                maxHeight={xs ? "36px" : "52px"}
                                            >
                                                <img src={logo} />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <HarvestBox
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                        mt={xs ? "18px" : "24px"}
                                    >
                                        <Box>
                                            <Box fontSize={xs ? "12px" : "18px"}>LDR Earned</Box>
                                            <Box
                                                fontSize={xs ? "17px" : "32px"}
                                                fontWeight={600}
                                                mt={xs ? "-2px" : "4px"}
                                                display={"flex"}
                                                lineHeight={"normal"}
                                            >
                                                {account ? (
                                                    accountfarminfo[i].pendingRewards !== undefined ? (
                                                        <Box>
                                                            {Number(accountfarminfo[i].pendingRewards).toFixed(3)}
                                                        </Box>
                                                    ) : (
                                                        <Skeleton
                                                            variant={"text"}
                                                            width={xs ? "70px" : "120px"}
                                                            style={{ transform: "unset" }}
                                                        />
                                                    )
                                                ) : (
                                                    "0.000"
                                                )}
                                            </Box>
                                            <Box
                                                mt={xs ? "-2px" : "4px"}
                                                lineHeight={"normal"}
                                                fontSize={xs ? "12px" : "18px"}
                                            >
                                                {account ? (
                                                    !isNaN(
                                                        accountfarminfo[i].pendingRewards * price[chainID]
                                                    ) ? (
                                                        <Box>
                                                            $
                                                            {Number(
                                                                accountfarminfo[i].pendingRewards * price[chainID]
                                                            ).toFixed(3)}
                                                        </Box>
                                                    ) : (
                                                        <Skeleton
                                                            variant={"text"}
                                                            width={xs ? "30px" : "60px"}
                                                            style={{ transform: "unset" }}
                                                        />
                                                    )
                                                ) : (
                                                    "$0.000"
                                                )}
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Button
                                                type={"secondary"}
                                                width={xs ? "101px" : "142px"}
                                                height={xs ? "28px" : "50px"}
                                                fontSize={xs ? "12px" : "16px"}
                                                disabled={
                                                    pending ||
                                                    !accountfarminfo[i].unlockRewards
                                                }
                                                onClick={() => onHarvestReward(i)}
                                            >
                                                Harvest
                                            </Button>
                                        </Box>
                                    </HarvestBox>

                                    <HarvestBox
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                        mt={xs ? "30px" : "42px"}
                                    >
                                        <Box>
                                            <Box fontSize={xs ? "12px" : "18px"}>LDR-LP Staked</Box>
                                            <Box
                                                fontSize={xs ? "17px" : "32px"}
                                                fontWeight={600}
                                                mt={xs ? "-2px" : "4px"}
                                                display={"flex"}
                                                lineHeight={"normal"}
                                            >
                                                {account ? (
                                                    accountfarminfo[i].stakedAmount !== undefined ? (
                                                        <Box>
                                                            {Number(
                                                                accountfarminfo[i].stakedAmount / Math.pow(10, 18)
                                                            ).toFixed(6)}
                                                        </Box>
                                                    ) : (
                                                        <Skeleton
                                                            variant={"text"}
                                                            width={xs ? "70px" : "120px"}
                                                            style={{ transform: "unset" }}
                                                        />
                                                    )
                                                ) : (
                                                    "0.000"
                                                )}
                                            </Box>
                                            <Box
                                                mt={xs ? "-2px" : "4px"}
                                                lineHeight={"normal"}
                                                fontSize={xs ? "12px" : "18px"}
                                            >
                                                {account ? (
                                                    !isNaN(
                                                        (accountfarminfo[i].stakedAmount / Math.pow(10, 18)) *
                                                        farmprice
                                                    ) ? (
                                                        <Box>
                                                            $
                                                            {Number(
                                                                (accountfarminfo[i].stakedAmount /
                                                                    Math.pow(10, 18)) *
                                                                farmprice
                                                            ).toFixed(3)}
                                                        </Box>
                                                    ) : (
                                                        <Skeleton
                                                            variant={"text"}
                                                            width={xs ? "30px" : "60px"}
                                                            style={{ transform: "unset" }}
                                                        />
                                                    )
                                                ) : (
                                                    "$0.000"
                                                )}
                                            </Box>
                                        </Box>
                                        {allowance ? (
                                            <Box
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                                width={xs ? "101px" : "142px"}
                                            >
                                                <Button
                                                    type={"plus"}
                                                    width={xs ? "40px" : "55px"}
                                                    height={xs ? "40px" : "55px"}
                                                    fontSize={"28px"}
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setType(1);
                                                        setCurIndex(i);
                                                        setAmount(0);
                                                    }}
                                                >
                                                    +
                                                </Button>
                                                <Button
                                                    disabled={
                                                        !(accountfarminfo[i].unlockAmount > 0)
                                                    }
                                                    type={"minus"}
                                                    width={xs ? "40px" : "55px"}
                                                    height={xs ? "40px" : "55px"}
                                                    fontSize={"28px"}
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setType(2);
                                                        setCurIndex(i);
                                                        setAmount(0);
                                                    }}
                                                >
                                                    -
                                                </Button>
                                            </Box>
                                        ) : (
                                            ""
                                        )}
                                    </HarvestBox>

                                    {!allowance ? (
                                        <Box mt={"32px"} width={"100%"}>
                                            <Button
                                                width={"100%"}
                                                height={xs ? "28px" : "50px"}
                                                type={"primary"}
                                                fontSize={xs ? "12px" : "16px"}
                                                disabled={pending}
                                                onClick={() => {
                                                    !account ? onConnect() : onApproveContract();
                                                }}
                                            >
                                                {!account ? "Connect Wallet" : "Enable Contract"}
                                            </Button>
                                        </Box>
                                    ) : (
                                        ""
                                    )}
                                    <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        fontSize={xs ? "12px" : "18px"}
                                        mt={"25px"}
                                        justifyContent={"center"}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            let temp = [...detailopen];
                                            temp[i] = !temp[i];
                                            setDetailOpen(temp);
                                        }}
                                    >
                                        <Box mr={"10px"}>Details</Box>
                                        <Box>
                                            {detailopen[i] ? <AiFillCaretUp /> : <AiFillCaretDown />}
                                        </Box>
                                    </Box>
                                    <Detail active={detailopen[i] ? detailopen[i] : undefined}>
                                        <Box mt={xs ? "17px" : "36px"}>
                                            <Box>Total Liquidity:</Box>
                                            <Box>${Number(farmprice * data.totalStaked).toFixed(2)}</Box>
                                        </Box>
                                        <Box
                                            width={xs ? "80px" : "142px"}
                                            fontWeight={400}
                                            mt={xs ? "17px" : "36px"}
                                        >
                                            <a
                                                href={`https://etherscan.io/address/${GROVE_PAIR_ADDR[1]}`}
                                                target={"_blank"}
                                                rel="noreferrer"
                                            >
                                                <Box display={"flex"} alignItems={"center"}>
                                                    <Box mr={"5px"}>View LP Token</Box>
                                                    <BiLinkExternal color="#00EBFF" fontSize={"18px"} />
                                                </Box>
                                            </a>

                                        </Box>
                                    </Detail>
                                </Pool>

                            </>
                            );
                        })}
                    </PoolPanel>
                </StyledContainer>
            )
                : (<>under reconstruction</>)
            }

        </>
    );
};

const Detail = styled(Box)`
  display: flex;
  justify-content: space-between;
  height: ${({ active }) => (active ? "90px" : "0px")};
  overflow: hidden;
  transition: all 0.3s;
  @media screen and (max-width: 450px) {
    font-size: 11px;
    height: ${({ active }) => (active ? "50px" : "0px")};
  }
`;


const PoolPanel = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  // justify-content :space-evenly;
`;

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

export default Farming;
