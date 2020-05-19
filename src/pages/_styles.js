import styled, { css } from "styled-components";
import { motion } from "framer-motion";
// Style from https://codepen.io/JavaScriptJunkie/pen/pPRooV
export const Button = styled(motion.button)`
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 20px;
  height: 55px;
  text-align: center;
  border: none;
  background-size: 300% 100%;

  border-radius: 50px;
  transition: all 0.4s ease-in-out;
  &:hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
  }
  background-image: linear-gradient(
    to right,
    #25aae1,
    #40e495,
    #30dd8a,
    #2bb673
  );
  box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
  ${({ c2 }) =>
    c2 &&
    css`
      background-image: linear-gradient(
        to right,
        #29323c,
        #485563,
        #2b5876,
        #4e4376
      );
      box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
    `}
`;
