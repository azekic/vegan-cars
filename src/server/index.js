const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const FUELTYPE = {
    1: { id: 1, fuelType: "Combustion", description: "Generally gas or diesel powered, this fuel type is derived from fossil fuels", eco: false},
    2: { id: 2, fuelType: "Battery Electric", description: "Driven by an elecric motor which is powered by batteries", eco: true},
    3: { id: 3, fuelType: "Hybrid", description: "Uses both a gasoline engine and electric drivetrain", eco: true},
    4: { id: 4, fuelType: "Plug-in Hybrid", description: "Uses both a gasoline engine and electric drivetrain. Typically has a larger battery than traditional hybrids and the battery can be charged independently", eco: true},
    5: { id: 5, fuelType: "Hydrogen Fuel Cell", description: "Converts the chemical energy of hydrogen into electricity which drives an electric motor", eco: true}
};

const BODYTYPE = {
    1: { id: 1, bodyType: "Coupe"},
    2: { id: 2, bodyType: "Hatchback"},
    3: { id: 3, bodyType: "Minivan"},
    4: { id: 4, bodyType: "Sedan"},
    5: { id: 5, bodyType: "SUV"},
    6: { id: 5, bodyType: "Station Wagon"},
    7: { id: 5, bodyType: "Truck"}
};

const MATERIAL = {
    1: { id: 1, material: "Synthetic Leather"},
    2: { id: 2, material: "Cloth"},
    3: { id: 3, material: "Leather"},
    4: { id: 4, material: "Wool"},
    5: { id: 5, material: "Alcantara"}
};

const ICONS = [
  {name: "verified", description: "This car has a manufacturer verified vegan interior", color: "text-success"},
  {name: "eco", description: "This car is eco friendly", color: "text-info"},
  {name: "vegan", description: "This car has a leather-free interior", color: "text-success"}
];

const CARS = [
  { year: 2018,
    make: "Toyota", 
    model: "Prius Prime", 
    trim: "Plus", 
    bodyType: 2, 
    fuelType: 4, 
    seatingMaterial: 2, 
    steeringWheelMaterial: 1, 
    veganFriendly: true,
    notes: "The Toyota Prius uses a synthetic leather material called SofTex in its interior.",
    imgSrc: "/img/toyota-prius-prime.jpg"
},
  { year: 2020, 
    make: "Tesla", 
    model: "Model 3", 
    trim: "Performance", 
    bodyType: 4, 
    fuelType: 2, 
    seatingMaterial: 1, 
    steeringWheelMaterial: 1, 
    veganFriendly: true,
    notes: "As of late 2019 all Tesla Model 3s have a vegan interior.",
    imgSrc: "/img/tesla-model-3.jpg"
  },
  { year: 2020, 
    make: "Polestar", 
    model: "2", 
    bodyType: 2, 
    fuelType: 2, 
    seatingMaterial: 1, 
    steeringWheelMaterial: 1, 
    veganFriendly: true,
    notes: "The Polestar 2 has been marketed as having a completely vegan interior",
    imgSrc: "/img/polestar-2.jpg"
  }
];


const schema = buildASTSchema(gql`
  type Query {
    cars: [Car]
    car(id: ID!): Car
    icons: [Icon]
    icon(id: ID!): Icon
  }

  type FuelType {
    id: ID
    fuelType: String
    description: String
    eco: Boolean
}

  type BodyType {
    id: ID
    bodyType: String
}

  type Material {
      id: ID
      material: String
  }

  type Icon {
      id: ID
      name: String
      description: String
      color: String
  }

  type Car {
    id: ID
    year: Int
    make: String
    model: String
    trim: String
    bodyType: BodyType
    fuelType: FuelType
    msrp: Int
    veganFriendly: Boolean
    seatingMaterial: Material
    steeringWheelMaterial: Material
    shiftKnobMaterial: Material
    notes: String
    imgSrc: String
  }
`);

const mapCar = (car, id) => car && ({
    ...car,
    id,
    fuelType: FUELTYPE[car.fuelType],
    bodyType: BODYTYPE[car.bodyType],
    seatingMaterial: MATERIAL[car.seatingMaterial],
    steeringWheelMaterial: MATERIAL[car.steeringWheelMaterial],
    shiftKnobMaterial: MATERIAL[car.shiftKnobMaterial]

});

const mapIcon = (icon, id) => icon && ({
    ...icon,
    id
});

const root = {
  cars: () => CARS.map(mapCar),
  car: ({ id }) => mapCar(CARS[id], id),
  icons: () => ICONS.map(mapIcon),
  icon: ({ id }) => mapIcon(ICONS[id], id)
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);