import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { useHistory, useParams, Link } from "react-router-dom";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import {Icons} from "./Icons";

function CarModal() {
  let history = useHistory();
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
  
  const [modal, setModal] = useState(true);
  const toggle = () => {
    setModal(!modal);
    history.goBack();

  };
return (
  
  <div>
  <Query query={GET_CAR}>
  {({ loading, data }) => !loading && (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{data.car.year + " " + data.car.make + " " + data.car.model + " " + (data.car.trim !== null ? data.car.trim : "")}</ModalHeader>
      <Icons isEco={data.car.fuelType.eco} isVegan={data.car.veganFriendly}/>
      <img width="100%" src={data.car.imgSrc} alt={data.car.model} />
      <ModalBody>
        <h4>{data.car.fuelType.fuelType}</h4>
        <p>{data.car.fuelType.description}</p>
        <h4>Notes</h4>
        <p>{data.car.notes}</p>
      </ModalBody>
      <ModalFooter>
      <Link to={{
                pathname: `/cars/${id}`,
                state: { background: null }
              }}><Button color="info">View Details</Button> </Link>
        <Button color="secondary" onClick={toggle}>Close</Button>
        
      </ModalFooter>
  </Modal>
  )}
  </Query>
  </div>
);
    }
export default CarModal;
