/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { Box, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import Button from "./Button";
import { useAddress } from "../context/web3Context";
import { useWeb3Context } from "../context/web3Context";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import "./menu.css";
import logo from "../images/logo.png";
import ethlogo from "../icons/eth.png";
import bnblogo from "../icons/binance.png";
// import logowithtext from "../images/logowithtext.png";
import linkedinlogo from "../icons/linkedin.png";
import discordlogo from "../icons/discord.png";
import youtubelogo from "../icons/youtube.png";
import redditlogo from "../icons/reddit.png";
import telegramlogo from "../icons/telegram.png";
import facebooklogo from "../icons/facebook.png";
import instagramlogo from "../icons/instagram.png";
import twitterlogo from "../icons/twitter.png";
import gitbooklogo from "../icons/gitbook.png";
import githublogo from "../icons/github.png";

const Hamburger = ({ setNotification, curpage, setCurPage }) => {
  const socials = [
    // {
    //     url: linkedinlogo,
    //     link: "https://www.linkedin.com/company/grovetoken",
    // },
    // {
    //     url: discordlogo,
    //     link: "https://discord.com/invite/dAmeCKDEpD",
    // },
    // {
    //     url: youtubelogo,
    //     link: "https://www.youtube.com/watch?v=skA32dgjlIM",
    // },
    // {
    //     url: redditlogo,
    //     link: "https://www.reddit.com/user/GroveTokenOfficial",
    // },
    {
      url: telegramlogo,
      link: "https://t.me/LiquidLayerETH",
    },


    {
      url: twitterlogo,
      link: "https://twitter.com/LiquidLayerETH",
    },
    {
      url: gitbooklogo,
      link: "https://docs.liquidlayer.finance/",
    },
    {
      url: githublogo,
      link: "https://github.com/LiquidLayer",
    },
  ];

  const chains = [
    {
      url: ethlogo,
      text: "Ethereum",
    }
  ];

  const menuRef = useRef(null);
  const dialog = useRef(null);
  const address = useAddress();

  const [dropdownopen, setDropDownOpen] = useState(false);
  const [chainID, setChainID] = useState(0);

  useEffect(() => {
    document.addEventListener("mouseup", function (event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        let form = document.getElementById("check");
        if (form) form.checked = false;
      }
    });
    document.addEventListener("mouseup", function (event) {
      if (dialog && dialog.current && !dialog.current.contains(event.target)) {
        setDropDownOpen(false);
      }
    });
  }, []);

  const sm = useMediaQuery("(max-width : 800px)");
  const xs = useMediaQuery("(max-width : 450px)");

  let ellipsis = address
    ? sm
      ? "Connected"
      : (
        address.slice(0, 4) +
        "..." +
        address.substring(address.length - 5, address.length - 1)
      ).toUpperCase()
    : sm
      ? "Connect"
      : "Connect";

  const { connected, connect, disconnect } = useWeb3Context();

  function onConnect() {
    connect().then((msg) => {
      if (msg.type === "error") {
        setNotification(msg);
      }
    });
  }

  return (
    <nav role="navigation">
      <div id="menuToggle" ref={menuRef}>
        {/* A fake / hidden checkbox is used as click reciever,
    so you can use the :checked selector on it. */}

        <input type="checkbox" id="check" />

        {/* Some spans to act as a hamburger.

    They are acting like a real hamburger,
    not that McDonalds stuff. */}

        <span style={{ display: sm ? "none" : "block" }}></span>
        <span></span>
        <span></span>

        {/* Too bad the menu has to be inside of the button but hey, it's pure CSS magic. */}

        <Menu id="menu">
          <Vector />

          <Box
            display={"flex"}
            alignItems={"center"}
            borderBottom={"1px solid #242E45"}
            padding={xs ? 0 : "8px 49px 8px 9px"}
            justifyContent={"center"}
          >
            <Box>
              <a
                href={"https://www.liquidlayer.finance/"}
                target={"_blank"}
                rel="noreferrer"
              >
                <Box
                  display={"flex"}
                  maxWidth={"210px"}
                  maxHeight={"73px"}
                  minWidth={"72px"}
                >
                  <img src={'../images/logowithtext.png'} width={"110%"} height={"100%"} />
                </Box>
              </a>
            </Box>
          </Box>
          <Menus active={curpage ? curpage : undefined}>
            <Link
              to={"/"}
              onClick={() => {
                setCurPage(1);
                let form = document.getElementById("check");
                if (form) form.checked = false;
              }}
            >
              <Box>DashBoard</Box>
            </Link>
            <Link

              to={"/lp-yield"}
              onClick={() => {
                setCurPage(2);
                let form = document.getElementById("check");
                if (form) form.checked = false;
              }}
            >
              <Box>LP Yield</Box>
            </Link>
            <Link

              to={"/tier-yield"}
              onClick={() => {
                setCurPage(3);
                let form = document.getElementById("check");
                if (form) form.checked = false;
              }}
            >
              <Box>Tier Yield</Box>
            </Link>

            <Link

              to={"/ai-yield"}
              onClick={() => {
                setCurPage(4);
                let form = document.getElementById("check");
                if (form) form.checked = false;
              }}
            >
              <Box>Restake</Box>
            </Link>
            <Link
              style={{ pointerEvents: 'none', color: '#613f3f' }}
              to={"/liquid-yield"}
              onClick={() => {
                setCurPage(5);
                let form = document.getElementById("check");
                if (form) form.checked = false;
              }}
            >
              <Box>Liquid Yield</Box>
            </Link>
            {/* <Link
              to={"#"}
              onClick={() => {
                setCurPage(4);
                window.location.href = 'https://bridge.groveswap.io/bridge';
                let form = document.getElementById("check");
                if (form) form.checked = false;
              }}
            >
              <Box>Bridge</Box>
            </Link> */}
            {/*
            <Link
                to={"/transition"}
                onClick={() => {
                  setCurPage(5);
                  let form = document.getElementById("check");
                  if (form) form.checked = false;
                }}
            >
              <Box>Transition</Box>
            </Link>
            */}
            {/* <Link to={"#"} onClick={() => {setCurPage(6); window.location.href = 'https://groveswap.io/';}}>
              <Box>Swap</Box>
            </Link> */}
            <a
              href={"https://app.uniswap.org/#/swap?outputCurrency=0x8FBf408B85b60188AfcfBc8F1438c0cF106fB57D&chain=ethereum"}
              target={"_blank"}
              rel="noreferrer"
              style={{ display: sm ? "none" : "block" }}
            >
              <Button type={"buy"} width={"100%"} height={"50px"}>
                <Box
                  display={"flex"}
                  minWidth={"33px"}
                  minHeight={"33px"}
                  maxWidth={"33px"}
                  maxHeight={"33px"}
                  borderRadius={"50%"}
                  border={"1px solid white"}
                >
                  <img src={logo} width={"100%"} height={"100%"} />
                </Box>
                <Box
                  fontWeight={600}
                  ml={"13px"}
                  fontSize={sm ? "14px" : "16px"}
                >
                  Buy LDR
                </Box>
              </Button>
            </a>
            <Box
              borderBottom={"1px solid #242E45"}
              display={sm ? "flex" : "none"}
              justifyContent={"center"}
              padding={"10px 0!important"}
            >
              <DropDown
                onClick={() => setDropDownOpen(!dropdownopen)}
                active={dropdownopen ? dropdownopen : undefined}
                ref={dialog}
                mx={"40px"}
              >
                <img
                  src={chains[chainID].url}
                  style={{
                    borderRadius: "50%",
                    minWidth: "22px",
                    maxWidth: "22px",
                    minHeight: "22px",
                    maxHeight: "22px",
                  }}
                />
                <Box>{chains[chainID].text}</Box>
                {dropdownopen ? <AiFillCaretUp /> : <AiFillCaretDown />}
                <DropDownBody active={dropdownopen ? dropdownopen : undefined}>
                  {chains.map((data, i) => {
                    return (
                      <Box key={i}
                        onClick={() => {
                          setChainID(i);
                        }}
                      >
                        <img
                          src={data.url}
                          style={{
                            borderRadius: "50%",
                            minWidth: "22px",
                            maxWidth: "22px",
                            minHeight: "22px",
                            maxHeight: "22px",
                          }}
                        />
                        <Box>{data.text}</Box>
                      </Box>
                    );
                  })}
                </DropDownBody>
              </DropDown>
            </Box>
            <Box>
              <Button
                type={"primary"}
                width={"100%"}
                height={xs ? "42px" : "50px"}
                fontSize={xs ? "14px" : "16px"}
                onClick={() => (connected ? disconnect() : onConnect())}
              >
                {ellipsis}
              </Button>
            </Box>
          </Menus>
          <Socials>
            {socials.map((data, i) => {
              return (
                <Social key={i} href={data.link} target={"_blank"}>
                  <img src={data.url} />
                </Social>
              );
            })}
          </Socials>
        </Menu>
      </div>
    </nav>
  );
};
const DropDownBody = styled.div`
  position: absolute;
  left: 0px;
  top: 44px;
  width: 170px;
  font-size: 14px;
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
  margin: 0 auto;
  background-image: linear-gradient(to top, #64789a, #2a3340);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
  height: ${({ active }) => (active ? "47px" : "0")};
  z-index: 100;
`;

const DropDown = styled(Box)`
  z-index: 100;
  background: #364153;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: ${({ active }) => (active ? "0" : "5px")};
  border-bottom-right-radius: ${({ active }) => (active ? "0" : "5px")};
  width: 170px;
  height: 44px;
  padding: 12px 19px 11px 18px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: white;
  > div:nth-child(2) {
    margin-left: 9px;
    margin-right: 6px;
  }
  cursor: pointer;
  position: relative;
`;

const Vector = styled(Box)`
  background-image: url("/public/images/logowithtext.png");
  background-size: 100% 100%;
  width: 244px;
  height: 244px;
  bottom: 0px;
  right: calc(50% - 122px);
  position: absolute;
  @media screen and (max-width: 800px) {
    @media screen and (max-height: 767px) {
      bottom: 20px;
    }
    @media screen and (max-height: 700px) {
      display: none;
    }
  }
  @media screen and (min-width: 800px) {
    @media screen and (max-height: 900px) {
      bottom: 20px;
    }
    @media screen and (max-height: 880px) {
      display: none;
    }
  }
`;

const Socials = styled(Box)`
  display: flex;
  width: 288px;
  margin: 0 auto;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  @media screen and (min-width: 450px) {
    width: 360px;
  }
`;

const Social = styled.a`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.06);
  cursor: pointer;
  text-decoration: none;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  margin-top: 7px;
  transition: all 0.3s !important;
  > img {
    transform: scale(0.8);
  }
  :hover {
    transform: scale(1.2);
  }
  @media screen and (min-width: 450px) {
    width: 38px;
    height: 38px;
    > img {
      transform: scale(1);
    }
  }
`;

const Menus = styled(Box)`
  display: flex;
  flex-direction: column;
  > a {
    border-bottom: 1px solid #242e45;
    padding: 14px 20px;
    text-align: center;
    transition: all 0.3s !important;
    font-size: 14px !important;
    :hover {
      > div {
        background-color: #36415362;
      }
    }
    > div {
      transition: all 0.3s;
      padding: 7px 44px;
      width: fit-content;
      margin: 0 auto;
      border-radius: 5px;
    }
  }
  > a:nth-child(${({ active }) => active}) > div {
    background-color: #364153;
  }
  > a:nth-child(5) {
    :hover {
      background: unset;
    }
  }
  > div {
    padding: 28px 20px;
  }
  position: relative;
  z-index: 10;
  @media screen and (min-width: 800px) {
    > a {
      font-size: 18px !important;
    }
  }
`;

const Menu = styled.ul`
  font-family: "BerkeleyMono";
  position: relative;
`;
export default Hamburger;
