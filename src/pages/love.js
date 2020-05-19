import React from "react";
import { Button } from "./_styles";
import useTabs from "../useTabs";

export default function() {
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
