import home from "./pages/home";
import peace from "./pages/peace";
import love from "./pages/love";
import unity from "./pages/unity";
import respect from "./pages/respect";

export default [
  {
    path: "/",
    name: "☮️✌️ Peace",
    Component: home
  },
  {
    path: "/peace",
    name: "☮️ Peace",
    Component: peace
  },
  {
    path: "/love",
    name: "💚 Love",
    Component: love
  },
  {
    path: "/unity",
    name: "👩‍🚀 Unity",
    Component: unity
  },
  {
    path: "/respect",
    name: "👁 Respect",
    Component: respect
  }
];
