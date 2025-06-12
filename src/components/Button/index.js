import React from "react";
import styled from "styled-components";


const Button = ({
  width,
  height,
  type,
  fontSize = "16px",
  children,
  disabled,
  onClick,
  style,
}) => {
  return (
    <>
      {type === "plus" ? (
        <PlusButton
          width={width}
          height={height}
          type={type}
          fontSize={fontSize}
          disabled={disabled}
          onClick={onClick}
          style={style}
        >
          {children}
        </PlusButton>
      ) : (
        ""
      )}
      {type === "minus" ? (
        <MinusButton
          width={width}
          height={height}
          type={type}
          fontSize={fontSize}
          disabled={disabled}
          onClick={onClick}
          style={style}
        >
          {children}
        </MinusButton>
      ) : (
        ""
      )}
      {type === "primary" ? (
        <PrimaryButton
          width={width}
          height={height}
          type={type}
          fontSize={fontSize}
          disabled={disabled}
          onClick={onClick}
          style={style}
        >
          {children}
        </PrimaryButton>
      ) : (
        ""
      )}
      {type === "secondary" ? (
        <SecondaryButton
          width={width}
          height={height}
          type={type}
          fontSize={fontSize}
          disabled={disabled}
          onClick={onClick}
          style={style}
        >
          {children}
        </SecondaryButton>
      ) : (
        ""
      )}
      {type === "swap" ? (
        <SwapButton
          width={width}
          height={height}
          type={type}
          fontSize={fontSize}
          disabled={disabled}
          onClick={onClick}
          style={style}
        >
          {children}
        </SwapButton>
      ) : (
        ""
      )}
      {type === "confirm" ? (
        <ConfirmButton
          width={width}
          height={height}
          type={type}
          fontSize={fontSize}
          disabled={disabled}
          onClick={onClick}
          style={style}
        >
          {children}
        </ConfirmButton>
      ) : (
        ""
      )}
      {type === "buy" ? (
        <BuyButton
          width={width}
          height={height}
          type={type}
          fontSize={fontSize}
          disabled={disabled}
          onClick={onClick}
          style={style}
        >
          {children}
        </BuyButton>
      ) : (
        ""
      )}
    </>
  );
};

const BaseButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "BerkeleyMono";
  font-size: ${({ fontSize }) => fontSize};
  font-weight: bold;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.16);
  cursor: pointer;
  transition: all 0.3s;
  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PlusButton = styled(BaseButton)`
  background: #ebebeb;
  color: #010215;
  border: 1px solid #ebebeb;
  border-radius: 50%;
  line-height: 0px;
  :hover:not([disabled]) {
    background: #ff626e;
    color: white;
    border: #ff626e;
  }
`;

const MinusButton = styled(BaseButton)`
  background: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 50%;
  :hover:not([disabled]) {
    background: #ff626e;
    color: white;
    border: #ff626e;
  }
`;
const PrimaryButton = styled(BaseButton)`
  background: linear-gradient(129deg, #C1FF72 0%, #38B6FF 50%, #38B6FF 82%, #38B6FF 108%);
  color: white;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 15px rgba(98, 255, 0, 0.66);
  :hover:not([disabled]) {
    border: none;
    box-shadow: 0px 0px 15px #00f2ff;
    transform: scale(1.05);
  }
`;
const SecondaryButton = styled(BaseButton)`
  filter: drop-shadow(0px 0px 10px #355A37);
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px #355A37;
  padding: 12px;
  :hover:not([disabled]) {
    transform: scale(0.95);
    box-shadow: none;
  }
`;

const SwapButton = styled(BaseButton)`
  margin: 130px 30px;
  align-self: end;
  width: 70px;
  padding: 12px;
  background: #02061C;
  border: 1px solid #262E43;
  box-shadow: 0px 0px 10px #355A37;
  border-radius: 8px;
  justify-content: space-between;
  :hover:not([disabled]) {
    transform: scale(0.95);
    box-shadow: none;
  }
  @media screen and (max-width: 680px){
    margin: 30px auto;
  }
`;

const ConfirmButton = styled(BaseButton)`
  background: linear-gradient(
    to right,
    #43bad1,
    #43bad1,
    #43bad1,
    #043cb4,
    #0251b3
  );
  color: white;
  transition: all 0.3s ease-in-out;
  font-weight: 700;
  background-size: 300% 100%;
  border: none;
  :hover:not([disabled]) {
    background-position: 100% 0;
    color: white;
    border: none;
  }
  @media screen and (max-width: 550px) {
    font-weight: 500;
  }
`;

const BuyButton = styled(BaseButton)`
  color: white;
  background: transparent;
  z-index: 1;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid #49c4e6;
  transition: 0.3s ease-in-out;
  display: flex;
  align-items: center;
  :hover:not([disabled]) {
    color: hsl(51deg,65%,62%);
  }
`;
export default Button;
