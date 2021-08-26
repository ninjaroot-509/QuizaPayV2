import React from 'react';
import './css/vendor/bootstrap.min.css';
import './css/App.css';
import './css/vendor/simplebar.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import history from './history';
import Home from './Views/Home';
import TAC from './Views/TAC';
import PAC from './Views/PAC';
import About from './Views/About';
import Contact from './Views/Contact';
import Credits from './Views/Credits';
import Step1 from './Views/Step1';
import Step2 from './Views/Step2.js';
import StepC2 from './Challenge/StepC2.js';
import Navbar from './Components/Header/Navbar';
import { Route, Switch, HashRouter as Router } from 'react-router-dom'
import { getUser, getToken } from './Components/Common/Auth/Sessions'
// import { Router } from "react-router";

import NotFound from './Views/NotFound';
import LiveQuiz from './RealTime/LiveQuiz';
import Auth from './Views/Auth';
import CompleteI from './Views/CompleteI';
import PrivateRoute from './Components/Common/Auth/PrivateRoute';
import ResgisterRoute from './Components/Common/Auth/ResgisterRoute';
import PublicRoute from './Components/Common/Auth/PublicRoute'
import UserPage from './Views/UserPage';
import ProfileUpdate from './Views/ProfileUpdate';
import DepotWallet from './Views/DepotWallet';
import Convertir from './Views/Convertir';
import RetraitWallet from './Views/RetraitWallet';
import SpinHome from './Views/SpinHome';
import { ToastProvider } from 'react-toast-notifications';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes/theme';
import { GlobalStyles } from './themes/global';
import { useDarkMode } from './themes/useDarkMode';

function App() {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  
  return (
    <ThemeProvider theme={themeMode}>
      <ToastProvider>
        <Router>
          <GlobalStyles />
          {getToken() ? 
            getUser().is_complete === true?
              <Navbar toggleTheme={toggleTheme} theme={theme}/> 
              :
              ''
          : ''}
          
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/terms-conditions" component={TAC} />
            <Route exact path="/politique-de-confidentialite" component={PAC}/>
            {/* <Route exact path="/a-propos" component={About} /> */}
            {/* <Route exact path="/contact" component={Contact} /> */}
            <PrivateRoute exact path="/etape-1" component={Step1} />
            <PrivateRoute exact path="/etape-2" component={Step2} />
            <PrivateRoute exact path="/spin" component={SpinHome} />
            {/* <PrivateRoute exact path="/live/quiz" component={LiveQuiz} /> */}
            <PrivateRoute exact path="/challenge/etape-1" component={StepC2} />
            <PublicRoute path="/connexion" component={Auth} />
            <Route path="/complete-inscription" component={CompleteI} />
            <PrivateRoute path="/mon-profile" component={UserPage} />
            <PrivateRoute path="/profile-edite" component={ProfileUpdate} />
            <PrivateRoute path="/depot/moncash" component={DepotWallet} />
            <PrivateRoute path="/plus-coins" component={Convertir} />
            <PrivateRoute path="/retrait/moncash" component={RetraitWallet} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
