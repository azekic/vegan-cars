import React, { Component } from 'react';
import CarViewer from './CarViewer';
import Home from './Home';
import CarModal from './CarModal';
import CarPage from './CarPage';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

function NavbarSwitch() {
  let location = useLocation();
  let background = location.state && location.state.background;
  return (
    <div>
          <Switch location = {background || location}>
            <Route exact path="/cars">
              <CarViewer />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/cars/:id">
              <CarPage/>
              </Route>
          </Switch>
          {background && <Route path="/cars/:id" children={<CarModal />} />}
    </div>
  );

}
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar color="light" light expand="md">
            <Container>
            <NavbarBrand href="/">vegan vehicle</NavbarBrand>
            <Collapse navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/cars">Cars</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            </Container>
          </Navbar>
          <NavbarSwitch/>
        </Router>
      </div>

    );
  }
}

export default App;