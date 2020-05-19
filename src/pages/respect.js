import React from "react";
import useTabs from "../useTabs";
import { Button } from "./_styles";

export default function() {
  const { push, setTab } = useTabs();
  return (
    <>
      <p>
        You can also call multiple actions after each other and achieve those
        two effects.
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
        Then go checkout {null /* eslint-disable-next-line */}
        <a href="" onClick={e => (e.preventDefault(), setTab(2))}>
          U
        </a>
      </p>
    </>
  );
}
