import React from "react";
import "./styles.css";
import { Route } from "react-router-dom";
import useTabs from "./useTabs";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { ReactComponent as BArrow } from "./icons/back.svg";

const BackArrow = styled(BArrow)`
  height: 24px;
  width: 24px;
  margin: 2px 16px;
`;

// Style from https://codepen.io/JavaScriptJunkie/pen/pPRooV
const Button = styled(motion.button)`
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

const Input = styled.input`
  width: 100%;
  padding: 2px 4px 1px 4px;
  border: none;
  border-bottom: 2px solid black;
  font-size: 18px;
`;

const tabs = ["☮️", "💚", "👩‍🚀", "👁"];
let routes = [
  {
    path: "/",
    name: "☮️✌️ Peace",
    Component: function() {
      const { push } = useTabs();
      return (
        <>
          <p>Push new view on top of this one</p>
          <Button onClick={() => push("/love")}>
            open 'love' view in this tab
          </Button>
        </>
      );
    }
  },
  {
    path: "/peace",
    name: "☮️ Peace",
    Component: function() {
      const { push } = useTabs();
      return (
        <>
          <p>..... this seems like a time trap</p>
          <Button onClick={() => push("/love")}>
            open 'love' view in this tab
          </Button>
        </>
      );
    }
  },
  {
    path: "/love",
    name: "💚 Love",
    Component: function() {
      const { push } = useTabs();
      return (
        <>
          <p>Hmmmm.....</p>
          <Button onClick={() => push("/peace")}>
            open 'peace' view in this tab
          </Button>
        </>
      );
    }
  },
  {
    path: "/unity",
    name: "👩‍🚀 Unity",
    Component: function() {
      const { navigationState, setNavigationState, push } = useTabs();
      const [input, setInput] = React.useState(navigationState.input ?? "");
      React.useEffect(() => {
        setNavigationState({ input });
      }, [input, setNavigationState]);
      return (
        <>
          <p>
            There's a myth that retaining form state is hard on reload, but
            let's break it once and forever
          </p>
          <Input
            placeholder="Your state is safe with me"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <p>You can open new pages on top of this and still retain me.</p>
          <Button onClick={() => push("/peace")}>
            open 'peace' view in this tab
          </Button>
        </>
      );
    }
  },
  {
    path: "/respect",
    name: "👁 Respect",
    Component: function() {
      const { push, setTab } = useTabs();
      return (
        <>
          <p>
            You can also call multiple actions after each other and achieve
            those two effects.
          </p>
          <Button
            onClick={() => {
              setTab(1);
              push("/peace");
            }}
          >
            Push /peace on L
          </Button>
          <Button
            onClick={() => {
              setTab(2);
              push("/peace");
              setTab(3);
            }}
          >
            Silent push /peace on U
          </Button>
          <p>
            Then go checkout{" "}
            <a href="" onClick={e => (e.preventDefault(), setTab(2))}>
              U
            </a>
          </p>
        </>
      );
    }
  }
];

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
