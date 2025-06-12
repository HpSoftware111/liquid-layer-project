import styled from "styled-components";
import { Box } from "@mui/material";




export const PrimaryBox = styled(Box)`
  background: linear-gradient(180deg, #183648 0%, rgba(24, 54, 72, 0) 100%);
  border: 1px solid #333751;
  border-radius: 16px;
  position: relative;
  padding: 30px;
`;

export const SecondaryBox = styled(Box)`
  border: 1px solid #30768C;
  border-radius: 16px;
  position: relative;
`

export const Pool = styled(Box)`
  width: calc(100% - 100px);
  padding: 20px 26px 37px 30px;
  border: 1px solid #30768C;
  border-radius: 10px;
  margin: 24px 21px;
  line-height: 166%;
  height: fit-content;
  @media screen and (max-width: 1500px) {
    width: 100%;
    margin: 18px 0;
  }
  @media screen and (max-width: 550px) {
    line-height: unset;
    padding: 13px 23px 17px 17px;
  }
`;

export const Panel = styled(Box)`
  background: ${({ type }) =>
    type === "primary"
      ? ""
      : "linear-gradient(99.8deg, #38B6FF 5.77%, #C1FF72 97.13%);"};
  border: ${({ type }) =>
    type === "primary" ? "1px solid rgb(0, 120, 143)" : "1px solid rgb(50,54,83)"};
  border-radius: 16px;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: ${({ xx }) => xx ? "center" : "start"};
  padding: 25px;
  @media screen and (max-width: 680px) {
    padding: 0 calc(100vw / 412 * 11) 0 calc(100vw / 412 * 17);
    margin-bottom: calc(100vw / 412 * 30);
  }
`;

export const HarvestBox = styled(Box)`
  background: #3a3a3e;
  border-radius: 8px;
  padding: 16px;
`
