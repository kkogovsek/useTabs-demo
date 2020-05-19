import React from "react";
import "./styles.css";
import { Route } from "react-router-dom";
import useTabs from "./useTabs";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { ReactComponent as BArrow } from "./icons/back.svg";
import routes from "./routes";

const BackArrow = styled(BArrow)`
  height: 24px;
  width: 24px;
  margin: 2px 16px;
`;

const Fab = styled(motion.button)`
  --size: 40px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  margin: 2px;
  padding: 0;
  box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
  background: black;
  color: white;
  border: 2px solid black;
  font-size: 18px;
  ${({ selected }) =>
    selected &&
    css`
      box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
      background: white;
      color: black;
    `}
  position: relative;
  & > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-42%, -50%);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Body = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  text-align: center;
`;

const ButtonRow = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  height: 90px;
  align-items: center;
  border-top: 2px solid black;
`;

const NavBar = styled(motion.div)`
  color: white;
  display: flex;
  align-items: center;
  & > h1 {
    font-size: 24px;
    margin-left: 16px;
  }
  background-image: linear-gradient(
    to right,
    #29323c,
    #485563,
    #2b5876,
    #4e4376
  );
`;

const tabs = ["☮️", "💚", "👩‍🚀", "👁"];

export default function App() {
  const { pop, setTab, activeTab, lastInTab } = useTabs();

  return (
    <Container>
      {routes.map(({ path, name, Component = () => null }) => (
        <Route
          key={path}
          exact
          path={path}
          render={({ match, ...restProps }) => {
            return (
              <>
                <NavBar initial={{ opacity: 0.8 }} animate={{ opacity: 1 }}>
                  {lastInTab && <BackArrow onClick={() => pop()} />}
                  <h1>{name}</h1>
                </NavBar>
                <Body key={`body-${path}`}>
                  <Component />
                </Body>
              </>
            );
          }}
        />
      ))}
      <ButtonRow>
        {tabs.map((name, nr) => (
          <Fab
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1, rotate: "-5deg" }}
            key={name}
            onClick={() => setTab(nr)}
            selected={nr === activeTab}
          >
            <span>{name}</span>
          </Fab>
        ))}
      </ButtonRow>
    </Container>
  );
}
