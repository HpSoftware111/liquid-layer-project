import React from "react";
import styled from "styled-components";
import { Box, useMediaQuery } from "@mui/material";
import Button from "./Button";
import { Link } from "react-router-dom";
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

const Footer = ({ hamburger, curpage, setCurPage }) => {
  const sm = useMediaQuery("(max-width : 680px)");
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
  return (
    <Wrapper>
      <StyledContainer sm={sm ? sm : undefined}>
        <Menus active={curpage ? curpage : undefined}>
          <Link to={"/"} onClick={() => setCurPage(1)}>
            DashBoard
          </Link>
          <Link to={"/lp-yield"} onClick={() => setCurPage(2)} >
            Lp Yield
          </Link>
          <Link to={"/tier-yield"} onClick={() => setCurPage(3)}>
            Staking
          </Link>

          <Link to={"/ai-yield"} onClick={() => setCurPage(4)} >
            Restake
          </Link>
          <Link to={"/liquid-yield"} onClick={() => setCurPage(5)} style={{ pointerEvents: 'none', color: '#613f3f' }}>
            Liquid Yield
          </Link>

        </Menus>
        <Socials mt={"28px"}>
          {socials.map((data, i) => {
            return (
              <Social key={i} href={data.link} target={"_blank"}>
                <img src={data.url} alt={""} />
              </Social>
            );
          })}
        </Socials>
      </StyledContainer>

    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  padding: 0px 25px 25px 25px;
  border-top: 1px solid #262E43;
  max-width: calc(100% - 308px);
  margin: 0 auto;
  @media screen and (max-width: 600px) {
    _display: none;
    max-width: 100%;    
  }
`

const Socials = styled(Box)`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-self: end;
  z-index: 10;
  @media screen and (max-width: 600px) {
    width: 100%;
    align-self: center;
    margin-bottom: 15px;
  }
`;

const Social = styled.a`
  margin-bottom: 15px;
  margin-right: 10px;
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
  transition: all 0.3s;
  > img {
    transform: scale(0.8);
  }
  :hover {
    transform: scale(1.2);
  }
  @media screen and (min-width: 600px) {
    width: 38px;
    height: 38px;
    transform: scale(1);
  }
`;

const StyledContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 680px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Menus = styled(Box)`
  display: flex;
  margin-top: 45px;
  margin-bottom: 15px;
  > a {
    cursor: pointer;
    padding: 7px 16px;
    font-size: 18px;
    font-weight: 700;
    _line-height: 122%;
    border-radius: 5px;
    margin-right: 15px;
    color: white;
    transition: all 0.3s;
    text-decoration: none;
  }
  >a:hover {
    color: hsl(51deg,65%,62%);
  }
  > a:nth-child(${({ active }) => active}) {
    background-color: hsl(231deg,87%,6%);
    outline: 1px solid hsl(194deg,49%,37%);
    border-radius: 8px;
  }
  @media screen and (max-width: 680px) {
    display: none;
    flex-direction: column;
    > a {
      margin-bottom: 15px;
    }
  }
`;

const Contact = styled(Box)`
  text-align: right;
  margin-right:15px;
  > a {
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
  }
  span {
    font-weight: 700;
  }
`

export default Footer;
