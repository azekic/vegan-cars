import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link, useLocation } from "react-router-dom";
import {
  Card, CardImg, CardTitle, CardDeck,
  CardSubtitle, CardBody, Container
} from 'reactstrap';
import {Icons} from "./Icons";

export const GET_CARS = gql`
  query GetCars {
    cars {
      id
      year
      make
      model
      trim
      bodyType {
        id
        bodyType
      }
      fuelType {
        id
        fuelType
        eco
      }
      veganFriendly
      imgSrc
    }
  }
`;

const CarViewer = () => {
  let location = useLocation();
  return (
  <Container>
  <main className="pt-md-5 pt-4">
    <Query query={GET_CARS}>
      {({ loading, data }) => !loading && (
        <CardDeck>
          {data.cars.map(car => (


            <Card className="shadow-sm">
                <Icons className="icons" isEco={car.fuelType.eco} isVegan={car.veganFriendly}/>

            
              <Link key={car.id}
                    to={{
                      pathname: `/cars/${car.id}`,
                      state: { background: location }
                    }}
              >
                <CardImg className="pt-2" top width="100%" src={car.imgSrc} alt={car.make} />
              </Link>
            <CardTitle className="float-right">
            </CardTitle>
          <CardBody>
            <CardTitle>
            <Link 
              key={car.id}
              to={{
                pathname: `/cars/${car.id}`,
                state: { background: location }
              }}
              className="link"
              >
              <h3>{car.year + " " + car.make + " " + car.model + " " + (car.trim !== null ? car.trim : "")}</h3>
              </Link>

            </CardTitle>
            <CardSubtitle>{car.bodyType.bodyType + " | " + car.fuelType.fuelType}
            </CardSubtitle>
          </CardBody>
            </Card>
          ))}

        </CardDeck>
      )}
    </Query>
  </main>
  </Container>
);
}
export default CarViewer;