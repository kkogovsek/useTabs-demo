import React from "react";
import { useHistory, useLocation } from "react-router-dom";

const TabsContext = React.createContext();

const actionTypes = {
  push: "push",
  pop: "pop",
  replace: "replace",
  changeNavigationState: "changeNavigationState",
  resetNavigationState: "resetNavigationState",
  changeTab: "changeTab"
};

const pushAction = (path, state = {}) => ({
  type: actionTypes.push,
  path,
  state
});
const popAction = () => ({ type: actionTypes.pop });
const changeNavigationState = state => ({
  type: actionTypes.changeNavigationState,
  state
});
const resetNavigationStateAction = () => ({
  type: actionTypes.resetNavigationState
});
const changeTabAction = tab => ({
  type: actionTypes.changeTab,
  tab
});

function tabsReducer(state, action) {
  switch (action.type) {
    case actionTypes.changeTab: {
      const { tab } = action;
      const { currentRoute, activeTab } = state;
      if (tab !== activeTab) {
        const [nextRoute, ...newNextStack] = state.stacks[tab];
        const oldStack = [currentRoute, ...state.stacks[activeTab]];
        return {
          ...state,
          currentRoute: nextRoute,
          stacks: state.stacks.map((stack, i) => {
            if (tab === i) {
              // New stack
              return newNextStack;
            } else if (activeTab === i) {
              // Old stack
              return oldStack;
            }
            return stack;
          }),
          activeTab: tab
        };
      } else {
        const newActive =
          state.stacks[tab].length > 0
            ? state.stacks[tab][state.stacks[tab].length - 1]
            : currentRoute;
        return {
          ...state,
          stacks: state.stacks.map((stack, i) => {
            if (i === activeTab) {
              return [];
            }
            return stack;
          }),
          currentRoute: { ...newActive, state: {} }
        };
      }
    }
    case actionTypes.push: {
      const { path, state: routeState } = action;
      const { currentRoute, activeTab, stacks } = state;
      return {
        ...state,
        stacks: stacks.map((stack, idx) => {
          if (idx === activeTab) {
            return [currentRoute, ...stack];
          }
          return stack;
        }),
        currentRoute: {
          path,
          state: routeState
        }
      };
    }
    case actionTypes.pop: {
      const { activeTab, stacks } = state;
      if (stacks[activeTab].length === 0) {
        console.warn(
          "Hey developer! You can't go back, since you are at the botom of the stack! Here is the router state.",
          state
        );
        return state;
      }
      const [prevRoute, ...prevStack] = stacks[activeTab];
      return {
        ...state,
        stacks: stacks.map((stack, idx) => {
          if (idx === activeTab) {
            return prevStack;
          }
          return stack;
        }),
        currentRoute: prevRoute
      };
    }
    case actionTypes.changeNavigationState: {
      const {
        currentRoute: { path, state: prevState }
      } = state;
      return {
        ...state,
        currentRoute: {
          path,
          state: {
            ...prevState,
            ...action.state
          }
        }
      };
    }
    case actionTypes.resetNavigationState: {
      return {
        ...state,
        currentRoute: {
          ...state.currentRoute,
          state: {}
        }
      };
    }
    default:
      return state;
  }
}

const getInitialState = (tabs, activeTab) => ({
  stacks: tabs ?? [
    [],
    [{ path: "/", state: {} }],
    [{ path: "/", state: {} }],
    [{ path: "/", state: {} }]
  ],
  activeTab: 0,
  initialized: true,
  currentRoute: activeTab ?? { path: "/", state: {} }
});

const _cross = " ├─";
const _corner = " └─";
// const _vertical = " │ ";
// const _space = "   ";

function getStackDescription(stack, i) {
  let message = `Routes in stack ${i} (${stack.length} routes)\n`;
  stack.forEach(({ path }, idx) => {
    message += idx + 1 === stack.length ? _corner : _cross;
    message += ` ${path}\n`;
  });
  return `${message}\n`;
}

function printDebugMessage(state, lastChange) {
  let message = "";
  message += state.stacks.map(getStackDescription).join("");
  message += `Current route: ${state.currentRoute.path}\n`;
  message += `Current state: ${JSON.stringify(
    state.currentRoute.state,
    null,
    2
  )}
${(lastChange && "Last change originated in:") || ""}
${lastChange || ""}\n`;
  console.log(message, state);
}

export default function useTabs() {
  return React.useContext(TabsContext);
}

function getLastChangeLocation() {
  const e = new Error();
  // Remove first three lines because they are irellevant
  const path = e.stack
    .split("\n")
    .slice(3, 4)
    .join("\n");
  return path;
}

export function TabsProvider({ children, tabs, activeTab }) {
  const history = useHistory();
  const location = useLocation();
  const state = location.state || getInitialState(tabs, activeTab);
  const locationState = React.useRef(state);
  const lastChange = React.useRef();

  React.useEffect(() => {
    if (!location.state || !location.state.initialized) {
      const newState = tabsReducer(
        getInitialState(tabs, activeTab),
        pushAction(window.location.pathname)
      );
      history.replace(newState.currentRoute.path, newState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const push = React.useCallback(
    (path, routeState = {}) => {
      // Go back on current stack
      const key = Math.random();
      const nextState = tabsReducer(
        locationState.current,
        pushAction(path, { ...routeState, _key: key })
      );
      locationState.current = nextState;
      lastChange.current = getLastChangeLocation();
      window.debug_tabs && printDebugMessage(nextState, lastChange.current);
      history.push(nextState.currentRoute.path, nextState);
    },
    [history]
  );

  const pop = React.useCallback(
    (times = 1) => {
      // Move in current stack
      let nextState = locationState.current;
      for (let i = 0; i < times; i++) {
        nextState = tabsReducer(nextState, popAction());
      }
      locationState.current = nextState;
      lastChange.current = getLastChangeLocation();
      window.debug_tabs && printDebugMessage(nextState, lastChange.current);
      history.push(nextState.currentRoute.path, nextState);
    },
    [history]
  );

  const setNavigationState = React.useCallback(
    (navState = {}) => {
      // Set additional state for route
      const nextState = tabsReducer(
        locationState.current,
        changeNavigationState(navState)
      );
      locationState.current = nextState;
      lastChange.current = getLastChangeLocation();
      window.debug_tabs && printDebugMessage(nextState, lastChange.current);
      history.replace(nextState.currentRoute.path, nextState);
    },
    [history]
  );

  const resetNavigationState = React.useCallback(() => {
    // Set additional state for route
    const nextState = tabsReducer(
      locationState.current,
      resetNavigationStateAction()
    );
    locationState.current = nextState;
    lastChange.current = getLastChangeLocation();
    window.debug_tabs && printDebugMessage(nextState, lastChange.current);
    history.replace(nextState.currentRoute.path, nextState);
  }, [history]);

  const setTab = React.useCallback(
    idx => {
      // Set tab you work with
      // dispatch(changeTab(idx))
      const nextState = tabsReducer(
        locationState.current,
        changeTabAction(idx)
      );
      locationState.current = nextState;
      lastChange.current = getLastChangeLocation();
      window.debug_tabs && printDebugMessage(nextState, lastChange.current);
      history.push(nextState.currentRoute.path, nextState);
    },
    [history]
  );

  return (
    <TabsContext.Provider
      value={{
        push,
        pop,
        setNavigationState,
        resetNavigationState,
        setTab,
        navigationState: state.currentRoute.state,
        activeTab: state.activeTab,
        lastInTab: state.stacks[state.activeTab].length > 0
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}

window.debug_tabs = false;
console.info("To debug tabs set 'window.debug_tabs' to true/false");
