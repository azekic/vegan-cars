import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling, faLeaf, faCheck, faCross } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'reactstrap';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const GET_ICONS = gql`
  query GetIcons {
    icons {
      id
      name
      description
      color
    }
  }
`;
  const IconBuilder = props => {

      let tooltipIcon = faCross;

      switch (props.name) {
        case "eco":
            tooltipIcon = faLeaf;
            break;
        case "vegan":
            tooltipIcon = faSeedling;
            break;
        case "verified":
            tooltipIcon = faCheck;
            break;
        default:
            tooltipIcon = faCross;
      }

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <div className="float-right">
          <FontAwesomeIcon id={props.name + "-icon"} icon={tooltipIcon} className = {props.color}/>
          <Tooltip placement="top" isOpen={tooltipOpen} target={props.name + "-icon"} toggle={toggle}>{props.description}</Tooltip>
        </div>
    );
  }

  export const Icons = (isEco, isVegan) => {

    return (
        <Query query={GET_ICONS}>
      {({ loading, data }) => !loading && (
          <div className="p-2">
              {isEco && <IconBuilder name={data.icons[1].name} description={data.icons[1].description} color={data.icons[1].color}/>}
              {isVegan && <IconBuilder name={data.icons[2].name} description={data.icons[2].description} color={data.icons[2].color}/>}
          </div>
    )}
    </Query>);
  }
