import { withLayout } from "../../components/app/App";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCar, editCar } from "../../share/reducers/carsSlice.reducer";
function AddOrEditCar() {
  const [car, setCar] = useState({
    name: "",
    manufacturer: "",
    year: "",
    color: "",
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  const cars = useSelector((state) => state.cars.cars); 

  useEffect(() => {
    if (id) {
      const existingCar = cars.find((c) => c.id === parseInt(id));
      if (existingCar) setCar(existingCar);
    }
  }, [id, cars]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

   
    if (name === "year") {
      updatedValue = value !== "" ? parseInt(value, 10) : "";
    }

    setCar((prevCar) => ({ ...prevCar, [name]: updatedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (car.id) {
      dispatch(editCar(car));
    } else {
      const newCar = { id: Date.now(), ...car }; 
      dispatch(addCar(newCar));
    }
  };
  console.log(car);
  return (
    <form onSubmit={handleSubmit} className="container mt-3">
      <h2 className="mb-4">{id ? "Edit Car" : "Add New Car"}</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Model:
        </label>
        <input
          name="name"
          value={car.name}
          onChange={handleChange}
          className="form-control"
          id="name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="manufacturer" className="form-label">
          Brand:
        </label>
        <input
          name="manufacturer"
          value={car.manufacturer}
          onChange={handleChange}
          className="form-control"
          id="manufacturer"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="year" className="form-label">
          Year:
        </label>
        <input
          name="year"
          value={car.year}
          onChange={handleChange}
          type="number"
          className="form-control"
          id="year"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="engine" className="form-label">
          Engine (L):
        </label>
        <input
          name="engine"
          value={car.engine || ""}
          onChange={handleChange}
          type="number"
          step="0.1"
          className="form-control"
          id="engine"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price ($):
        </label>
        <input
          name="price"
          value={car.price || ""}
          onChange={handleChange}
          type="number"
          className="form-control"
          id="price"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="color" className="form-label">
          Color:
        </label>
        <input
          name="color"
          value={car.color}
          onChange={handleChange}
          className="form-control"
          id="color"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          name="description"
          value={car.description || ""}
          onChange={handleChange}
          className="form-control"
          id="description"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="photo" className="form-label">
          Image URL:
        </label>
        <input
          name="photo"
          value={car.photo || ""}
          onChange={handleChange}
          className="form-control"
          id="photo"
        />
      </div>
      <div className="d-flex justify-content-center mb-3">
        <button type="submit" className="w-50">
          Save
        </button>
      </div>
    </form>
  );
}

export default withLayout(AddOrEditCar);
