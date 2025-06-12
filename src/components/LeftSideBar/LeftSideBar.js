import { Box, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import linkedinlogo from "../../icons/linkedin.png";
import discordlogo from "../../icons/discord.png";
import youtubelogo from "../../icons/youtube.png";
import redditlogo from "../../icons/reddit.png";
import telegramlogo from "../../icons/telegram.png";
import facebooklogo from "../../icons/facebook.png";
import instagramlogo from "../../icons/instagram.png";
import twitterlogo from "../../icons/twitter.png";
import gitbooklogo from "../../icons/gitbook.png";
import githublogo from "../../icons/github.png";

function LeftSideBar({ curpage, setCurPage }) {
    const sm = useMediaQuery("(max-width : 450px)");
    const pathname = window.location.pathname;

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
        <>
            <StyledContainer sm={sm ? sm : undefined}>
                <SocialPanel pathname={pathname} sm={sm ? sm : undefined}>
                    {socials.map((data, i) => {
                        return (
                            <Social key={i} href={data.link} target={"_blank"}>
                                <img src={data.url} alt={""} />
                            </Social>
                        );
                    })}
                </SocialPanel>
            </StyledContainer>
        </>
    );
}


const Social = styled.a`
  width: 38px;
  height: 38px;
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
  :hover {
    transform: scale(1.2);
  }
`;

const SocialPanel = styled(Box)`
  display: ${({ sm, pathname }) => (!sm || pathname === '/' ? "block" : "flex")};
  justify-content: space-between;
  margin-top: ${({ sm }) => (!sm ? "56px" : "10px")};
  padding-right: ${({ sm, pathname }) => (sm && pathname !== '/' ? 0 : "20px")};
  padding-bottom: ${({ sm, pathname }) => (sm && pathname !== '/' ? "20px" : 0)};
  border-right: ${({ sm, pathname }) => (sm && pathname !== '/' ? "" : "4px solid #30768C")};
  border-bottom: ${({ sm, pathname }) => (sm && pathname !== '/' ? "4px solid #30768C" : "")};
`;

const StyledContainer = styled(Box)`
  min-height: 100%;
  margin:${({ sm }) => sm ? "0 15px" : "0 25px"};
  position: relative;
  border-right: ${({ sm }) => (sm ? "" : "1px solid #262E43;")};
`;

export default LeftSideBar;
