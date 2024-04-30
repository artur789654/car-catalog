import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { withLayout } from "../../components/app/App";
import styles from "./SingleCar.module.css";
import Badge from 'react-bootstrap/Badge';

function SingleCar() {
  const { id } = useParams();
  
  const car = useSelector(state => 
    state.cars.cars.find(car => car.id.toString() === id)
  );

  if (!car) {
    return <div className="container mt-5"><h2>Car not found</h2></div>;
  }

  return (
    <div className={`container mt-5 `}>
      <div className={styles.rotatingBackground}></div>
      <div className="row gap-4">
        <div className="col-md-6">
          <img src={car.photo} alt={car.name} className="img-fluid" />
        </div>
        <div className="col-md-5 d-grid gap-1">
          <h1>{car.name}</h1>
          <p><strong>Manufacturer:</strong>  <Badge bg="secondary">{car.manufacturer}</Badge></p>
          <p><strong>Year:</strong>  <Badge  bg="secondary">{car.year}</Badge></p>
          <p><strong>Color:</strong>  <Badge  bg="secondary">{car.color}</Badge></p>
          <p><strong>Engine:</strong>  <Badge  bg="secondary">{car.engine}L</Badge></p>
          <p><strong>Price:</strong>  <Badge  bg="secondary">${car.price}</Badge></p>
          <p><strong>Description:</strong> {car.description}</p>
        </div>
        
      </div>
      
    </div>
  );
}

export default withLayout(SingleCar);
