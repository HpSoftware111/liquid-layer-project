/* eslint-disable jsx-a11y/alt-text */
import { Box, useMediaQuery } from "@mui/material";
import ConnectMenu from "./connectMenu/ConnectMenu";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { AiFillCaretDown, AiFillCaretUp, AiOutlineArrowRight } from "react-icons/ai";
import Hamburger from "./Hamburger";
import { useWeb3Context } from "../context/web3Context";
import { switchNetwork } from "../utils/functions";
// import logowithtext from "../images/logowithtext.png";
import ethlogo from "../icons/ethGas.png";
import bnblogo from "../icons/binance.png";
import wrongnetworklogo from "../icons/wrongnetwork.png"
import { getGasPrices } from "../services/gasTracker";
import { useQuery } from 'react-query';

function NavBar({ setNotification, curpage, setCurPage }) {
  const [dropdownopen, setDropDownOpen] = useState(false);
  const { chainID } = useWeb3Context();
  const [gasObj, setGasObj] = useState();
  const dialog = useRef();


  useEffect(() => {
    document.addEventListener("mouseup", function (event) {
      if (dialog && dialog.current && !dialog.current.contains(event.target)) {
        setDropDownOpen(false);
      }
    });
  }, []);

  //   useEffect(()=>{
  //     const promise1 = Promise.resolve(getGasPrices())
  //     promise1.then((rep) => {
  //       setGasObj(rep?.data.result)
  //     });
  //   }
  // ,[getGasPrices()])

  const gasPriceData = useQuery(['getGasPrices'], () => getGasPrices(), { refetchInterval: 15000 });

  const chains = {
    1: {
      url: ethlogo,
      text: "Ethereum",
      id: 1,
    }
  };

  const md = useMediaQuery("(max-width : 1650px)");
  const sm = useMediaQuery("(max-width : 450px)");

  return (
    <StyledContainer>
      <Box display={md ? "block" : "none"}>
        <Hamburger
          setNotification={setNotification}
          curpage={curpage}
          setCurPage={setCurPage}
        />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        // maxWidth={"calc(100% - 100px)"}
        margin={"0 auto"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Box ml={sm ? "6px" : "54px"}>
            <Box
              display={"flex"}
              mt={sm ? "4px" : "0px"}
              mb={sm ? "4px" : "0px"}
              minWidth={"172px"}
              minHeight={"44px"}
            >
              <img src={'../images/logowithtext.png'} />
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Menus active={curpage ? curpage : undefined}>
            <Link aria-disabled to={"/"} onClick={() => setCurPage(1)}>
              DashBoard
            </Link>
            <Link to={"/lp-yield"} onClick={() => setCurPage(2)} >
              Farm
            </Link>
            <Link to={"/tier-yield"} onClick={() => setCurPage(3)}>
              Staking
            </Link>
            {/* <Link to={"/ai-yield"} onClick={() => setCurPage(4)} style={{ pointerEvents: 'none', color: '#613f3f' }}> */}
            <Link to={"/ai-yield"} onClick={() => setCurPage(4)} >
              Restake
            </Link>
            <Link to={"/liquid-yield"} onClick={() => setCurPage(5)} style={{ pointerEvents: 'none', color: '#613f3f' }}>
              Liquid Yield
            </Link>
            {/* <Link to={"#"} onClick={() => {setCurPage(4); window.location.href = 'https://bridge.groveswap.io/bridge';}}>
              Bridge
            </Link> */}
            {/*
            <Link to={"/transition"} onClick={() => setCurPage(5)}>
              Transition
            </Link>
            */}
            {/* <Link to={"#"} onClick={() => {setCurPage(5); window.location.href = 'https://groveswap.io/';}}>
              Swap
            </Link> */}
          </Menus>
          <Buttons ml={"11px"}>
            <a
              href={"https://app.uniswap.org/#/swap?outputCurrency=0x8FBf408B85b60188AfcfBc8F1438c0cF106fB57D&chain=ethereum"}
              target={"_blank"}
              rel="noreferrer"
              style={{ display: md ? "none" : "block" }}
            >
              <Button type={"buy"} width={"170px"} height={"50px"}>
                <Box fontWeight={600} mr={"13px"}>
                  Buy LDR
                </Box>
                <AiOutlineArrowRight />
              </Button>
            </a>
            {chainID === 1 ? (
              <DropDown
                onClick={() => setDropDownOpen(!dropdownopen)}
                active={dropdownopen ? dropdownopen : undefined}
                ref={dialog}
                mx={"20px"}
              >
                <img
                  src={chains[chainID].url}
                  style={{

                    minWidth: "27px",
                    maxWidth: "27px",
                    minHeight: "27px",
                    maxHeight: "27px",
                  }}
                />
                <Box>
                  {/*   {chains[chainID].text} */}

                  {Number(gasPriceData?.data?.data?.result?.SafeGasPrice).toFixed(2)} Gwei
                </Box>
                {/* {dropdownopen ? <AiFillCaretUp /> : <AiFillCaretDown />} */}
                {/* <DropDownBody active={dropdownopen ? dropdownopen : undefined}>
                  {Object.values(chains).map((data, i) => {
                    return (
                      <Box
                        key={i}
                        onClick={() => {
                          switchNetwork(data.id, setNotification);
                        }}
                      >
                        <img
                          src={data.url}
                          style={{
                            borderRadius: "50%",
                            minWidth: "27px",
                            maxWidth: "27px",
                            minHeight: "27px",
                            maxHeight: "27px",
                          }}
                        />
                        <Box>{data.text}</Box>
                      </Box>
                    );
                  })}
                </DropDownBody> */}
              </DropDown>
            ) : (
              <WrongNetwork mx={"40px"}>
                <Box display={"flex"} alignItems={"center"}>
                  <Box
                    mr={"10px"}
                    minWidth={"25px"}
                    minHeight={"25px"}
                    maxWidth={"25px"}
                    maxHeight={"25px"}
                    display={"flex"}
                  >
                    <img
                      src={wrongnetworklogo}
                      width={"100%"}
                      height={"100%"}
                    />
                  </Box>
                  <Box>Wrong Network</Box>
                </Box>
              </WrongNetwork>
            )}
            <ConnectMenu setNotification={setNotification} />
          </Buttons>
        </Box>
      </Box>
    </StyledContainer>
  );
}

const WrongNetwork = styled(Box)`
  z-index: 100;
  background: #c43547a6;
  border-radius: 5px;
  width: 186px;
  height: 50px;
  padding: 12px 10px 11px 10px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  position: relative;
`;

const DropDownBody = styled.div`
  position: absolute;
  left: 0px;
  top: 50px;
  width: 186px;
  > div {
    display: flex;
    align-items: center;
    padding: 12px 19px 11px 18px;
    > div {
      margin-left: 9px;
      margin-right: 6px;
    }
    :hover {
      background: #64789a;
    }
  }
  border: ${({ active }) => (active ? "1px solid #262E43" : "")};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
  height: ${({ active }) => (active ? "102px" : "0")};
  z-index: 100;
`;

const DropDown = styled(Box)`
  z-index: 100;
  border: 1px solid #262E43;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: ${({ active }) => (active ? "0" : "5px")};
  border-bottom-right-radius: ${({ active }) => (active ? "0" : "5px")};
  // width: 186px;
  height: 50px;
  padding: 12px 19px 11px 18px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: white;
  > div:nth-child(2) {
    margin-left: 9px;
    margin-right: 6px;
  }
  cursor: pointer;
  position: relative;
`;
const Menus = styled(Box)`
  > a {
    cursor: pointer;
    padding: 14px 16px;
    font-size: 18px;
    font-weight: 700;
    line-height: 122%;
    border-radius: 5px;
    margin-right: 9px;
    color: white;
    transition: all 0.3s;
    text-decoration: none;
  }
  >a:hover {
    color: hsl(51deg,65%,62%);
  }
  display: flex;
  > a:nth-child(${({ active }) => active}) {
    background-color: hsl(231deg,87%,6%);
    outline: 1px solid hsl(194deg,49%,37%);
    border-radius: 8px;
  }
  @media screen and (max-width: 1650px) {
    display: none;
  }
`;

const Buttons = styled(Box)`
  display: flex;
  align-items: center;
  @media screen and (max-width: 1650px) {
    margin-right: 50px;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const StyledContainer = styled(Box)`
  padding: 9px 49px;
  border-bottom: 1px solid #242e45;
  z-index: 100;
  position: relative;
  @media screen and (max-width: 450px) {
    padding: 0;
  }
`;

export default NavBar;
