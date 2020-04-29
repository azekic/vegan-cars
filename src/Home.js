import React from 'react';
import { Jumbotron, Button, Container } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling, faCheck } from '@fortawesome/free-solid-svg-icons'

import CarViewer from "./CarViewer";
const Home = (props) => {
  return (
    <div>
        <div className = "text-center">
        <Jumbotron>
            <h1 className="display-3">vegan vehicle</h1>
            <p className="lead">Find your next car, without the leather.</p>
            <p className="lead">
            <Router>
            <Button href="/cars" color="info">View Cars</Button>
            <Switch>
                <Route path="/cars">
                    <CarViewer />
                </Route>
            </Switch>
            </Router>
            </p>
        </Jumbotron>
        </div>
        <Container >
            <div className = "col-lg-8 offset-lg-2 pb-5">
            <h2>About the Project</h2>
            <hr />
            <p>The extensive use of leather in car interiors makes car shopping frustrating for buyers who want to minimize their use of animal products.</p>
            <p>This project is an in-progress directory of cars that <b>to our knowledge</b>, do not contain leather, wool, or other animal-based upholsteries.</p>
            <h2>What we look out for</h2>
            <hr />
            <p>Although more and more eco-concious car companies are beginning to market their car interiors as vegan, unfortunately most companies don't explicitly state whether their interiors are vegan.</p>
            <p>In these cases, we rely on brochures which specify the materials used in a car interior. Car brochures will generally list the materials used for the seats, steering wheel, and shift knob.</p>
            <p>Cars that <b>do not list any animal-based upholsteries</b> in their brochures have a <FontAwesomeIcon icon={faSeedling} className = "text-success"/> icon</p>
            <p>Cars interiors that have been <b>confirmed by the manufacturer to be vegan</b> have a <FontAwesomeIcon icon={faCheck} className = "text-success"/> icon</p>
            <h2>Disclaimer</h2>
            <hr />
            <p>No car in this directory has been confirmed to be completely vegan. Animal-based adhesives can be used to glue different components together. Tires can be made with stearic acid - an additive used in tires that may be animal derived. The manufacturing process may use animal-based lubricants.</p>
            <p>According to the <a href="https://www.vegansociety.com/go-vegan/definition-veganism">Vegan Society</a>, <i>"Veganism is a way of living which seeks to exclude, <b>as far as is possible and practicable</b>, all forms of exploitation of, and cruelty to, animals for food, clothing or any other purpose."</i></p>
            <p>Although there are many alternative forms of transportation available like cycling and public transit, many people do not have these options available to them.</p>
            <p>This directory helps those who rely on cars to get around minimize their use of animal products and make informed decisions on what car to buy.</p>
            </div>

        </Container>
    </div>
  );
};

export default Home;
