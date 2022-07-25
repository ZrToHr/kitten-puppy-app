import React, { useLayoutEffect, useState } from 'react';
import { Action, BrowserHistory, Location } from 'history';
import { Router } from 'react-router-dom';

interface BrowserRouterProps {
  basename?: string;
  children?: React.ReactNode;
  history: BrowserHistory;
}

interface BrowserRouterState {
  action: Action;
  location: Location;
}

export const BrowserRouterWithHistory: React.FC<BrowserRouterProps> = ({
  history,
  basename,
  children,
}: BrowserRouterProps) => {
  const [state, setState] = useState<BrowserRouterState>({
    action: history.action,
    location: history.location,
  });
  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router basename={basename} location={state.location} navigationType={state.action} navigator={history}>
      {children}
    </Router>
  );
};
