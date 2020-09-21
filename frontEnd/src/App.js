import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  useRoutes,
  Switch
} from 'react-router-dom';
import { withRouter } from 'react-router';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import SignUpLoginForm from 'src/views/auth/SignupLoginForm';
import PortfolioView from './views/PortfolioView';

const App = () => {
  const userId = localStorage.getItem('id') || false;
  const routing = useRoutes(routes);
  const [loggedIn, setLoggedIn] = useState(userId ? true : false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {!loggedIn && <SignUpLoginForm onLogIn={setLoggedIn} />}
      <Route exact path="/user/:userID" component={<PortfolioView user="" />} />

      {loggedIn && routing}
    </ThemeProvider>
  );
};

export default App;
