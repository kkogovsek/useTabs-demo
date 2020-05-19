import React from "react";
import styled from "styled-components";
import useTabs from "../useTabs";
import { Button } from "./_styles";

const Input = styled.input`
  width: 100%;
  padding: 2px 4px 1px 4px;
  border: none;
  border-bottom: 2px solid black;
  font-size: 18px;
`;

export default function() {
  const { navigationState, setNavigationState, push } = useTabs();
  const [input, setInput] = React.useState(navigationState.input ?? "");
  React.useEffect(() => {
    setNavigationState({ input });
  }, [input, setNavigationState]);
  return (
    <>
      <p>
        There's a myth that retaining form state is hard on reload, but let's
        break it once and forever
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
