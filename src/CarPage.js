import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { useParams } from "react-router-dom";
import {Container, Button } from 'reactstrap';


const CarPage = () => {
    let { id } = useParams();
    const GET_CAR= gql`
      query GET_CAR {
        car(id: ${id}) {
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
            description
            eco
          }
          veganFriendly
          notes
          imgSrc
        }
      }
    `;
    
return (
    <Container>          
  <Query query={GET_CAR}>
  {({ loading, data }) => !loading && (
      <Container>
          <h2>{data.car.year + " " + data.car.make + " " + data.car.model + " " + (data.car.trim !== null ? data.car.trim : "")}</h2>
          <img width="100%" src={data.car.imgSrc} alt={data.car.model} />
          <h4>{data.car.fuelType.fuelType}</h4>
          <p>{data.car.fuelType.description}</p>
          <h4>Notes</h4>
          <p>{data.car.notes}</p>
      </Container>

  )}
  </Query>
  </Container>

);
    }
export default CarPage;
