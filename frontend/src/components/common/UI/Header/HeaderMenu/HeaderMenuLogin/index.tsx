import React from "react";
import { OAUTH } from "config/config.json";
import { AiFillGithub } from "react-icons/ai";
import styled from "styled-components";

const HeaderMenuLogin = () => {
  return (
    <HeaderMenuLoginWrapper href={OAUTH}>
      <AiFillGithub />
      <HeaderMenuLoginText>GitHub로 로그인</HeaderMenuLoginText>
    </HeaderMenuLoginWrapper>
  );
};

const HeaderMenuLoginWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 2.8rem;
  margin-left: 0.3rem;
  background-color: ${({ theme }) => theme.color.ftColor};
  border-radius: 0.2rem;
  box-shadow: none;
  transition: all ease-in-out 0.2s;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.color.ftColor2};
  }

  &:active {
    box-shadow: 0 0 0.7rem 0 rgba(0, 0, 0, 0.2);
  }

  & > svg {
    font-size: 1.7rem;
    color: ${({ theme }) => theme.color.bgColor};
    margin-right: 0.6rem;
  }
`;

const HeaderMenuLoginText = styled.p`
  font-size: 1.025rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.bgColor};
`;

export default HeaderMenuLogin;
