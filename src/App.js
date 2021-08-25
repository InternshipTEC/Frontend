import './App.css'
import {GlobalProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import NavbarWebsite from './components/TemplateComponents/Navbar/NavbarWebsite'
import {AllOpenRoutes, AllPrivateRoutes} from './routes/routes';
import GlobalFonts from './components/shared/Fonts'

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <GlobalFonts/>
        <Router>
        <NavbarWebsite/>
            {AllOpenRoutes.map(({path, component: Component})=>(
              <Route
              exact
              key={path}
              path={path}
              render={() => <Component />}
            />
            ))}
            {AllPrivateRoutes.map(({path, component: Component})=>(
              <PrivateRoute
              exact
              key={path}
              path={path}
              component={Component}
            />
            ))}
       </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;