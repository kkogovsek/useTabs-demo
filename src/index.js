import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { TabsProvider } from "./useTabs.js";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TabsProvider
        tabs={[
          [],
          [{ path: "/love", state: {} }],
          [{ path: "/unity", state: {} }],
          [{ path: "/respect", state: {} }]
        ]}
        activeTab={{ path: "/", state: {} }}
      >
        <App />
      </TabsProvider>
    </Router>
  </React.StrictMode>,
  rootElement
);
