import './App.css'
import {GlobalProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";
import {
  Switch,
  Route
} from "react-router-dom";
import NavbarWebsite from './components/TemplateComponents/Navbar/NavbarWebsite'
import {AllOpenRoutes, AllPrivateRoutes} from './routes/routes';
import GlobalFonts from './components/shared/Fonts'
import UnderConstruction from './components/UnderConstruction/UnderConstruction';
import {AnimatePresence} from 'framer-motion'
import {useLocation} from 'react-router'
import styled from 'styled-components'

const AppWrapper = styled.div`
  background: ${props => props.white ? "linear-gradient(5.06deg,#CCE4FA 19.38%,#DEE7F4 83.76%)" : "#fcfbf1"};
  min-height: 100vh;
`

function App() {
  const location = useLocation()
  return (
    <AppWrapper white={!location.pathname.includes('faction')}>
      <GlobalProvider>
        <GlobalFonts/>
            <AnimatePresence initial={false} exitBeforeEnter>
            <NavbarWebsite/>
            <Switch location={location} key={location.key}>
            {/* <UnderConstruction/> */}
            {AllOpenRoutes.map(({path, component: Component})=>(
              <Route
              exact={path==="/"}
              key={path}
              path={path}
              render={() => <Component />}
            />
            ))}
            {AllPrivateRoutes.map(({path, component: Component})=>(
            <PrivateRoute
              key={path}
              path={path}
              component={Component}
            />
            ))}
            </Switch>
            </AnimatePresence>
      </GlobalProvider>
    </AppWrapper>
  );
}

export default App;
