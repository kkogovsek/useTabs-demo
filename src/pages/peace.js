import React from "react";
import useTabs from "../useTabs";
import { Button } from "./_styles";

export default function() {
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
