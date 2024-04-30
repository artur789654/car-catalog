import { useDispatch, useSelector } from "react-redux";
import { withLayout } from "../../components/app/App";
import { carList } from "../../share/carList";
import {
  setSearchQuery,
  setFilter,
  setPriceRange,
  resetFilters,
  removeCar,
} from "../../share/reducers/carsSlice.reducer";
import styles from "./CarList.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import Pag from "../../components/Pag/Pag";

function CarList() {
  const dispatch = useDispatch();
  const { filteredCars, filters } = useSelector((state) => state.cars);
  const [query, setQuery] = useState("");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => setShowFilters(!showFilters);

  const listPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let storedCars = localStorage.getItem("cars");
    if (!storedCars) {
      storedCars = carList;
      localStorage.setItem("cars", JSON.stringify(storedCars));
    } else {
      storedCars = JSON.parse(storedCars);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchQuery(query));
    dispatch(setPriceRange({ min: minPrice, max: maxPrice }));
  }, [query, minPrice, maxPrice, dispatch]);

  
  const manufacturers = [
    ...new Set(filteredCars.map((car) => car.manufacturer)),
  ];
  const years = [...new Set(filteredCars.map((car) => car.year))];
  const colors = [...new Set(filteredCars.map((car) => car.color))];
  const engines = [...new Set(filteredCars.map((car) => car.engine))];

  const handleFilterChange = (filterName) => (e) => {
    let value = e.target.value;
    if (filterName === "year") {
      value = value ? parseInt(value, 10) : "";
    }
    if (filterName === "engine") {
      value = value ? parseFloat(value, 10) : "";
    }
    dispatch(setFilter({ filterName, value }));
  };
  const handleResetFilters = () => {
    dispatch(resetFilters());
    setMaxPrice("");
  };
  const handleDelete = (id) => {
    dispatch(removeCar(id));
  };

  const indexOfLastCar = currentPage * listPerPage;
  const indexOfFirstCar = indexOfLastCar - listPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPageNumbers = Math.ceil(filteredCars.length / listPerPage);
  const pag = Array.from({ length: totalPageNumbers }, (_, i) => i + 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, dispatch]);

  return (
    <>
      <div className="container">
        <div className={`${styles.carListActions} d-flex align-items-center justify-content-between mt-2`}>
          <div className="d-flex align-items-center gap-3">
            <h1>Car-List</h1>
            <Link to="/AddCar">
              <button className={`${styles.addbtn}`}>
                <FiPlus /> Add
              </button>
            </Link>
          </div>
          <div className="d-flex align-items-center">
            <span className={`${styles.searchIcon}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-search`}
                viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>
            <input
              type="text"
              className={`form-control ${styles.searchForm} ${styles.customfocusstyle}`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for cars..."
            />
          </div>
          <div className="filter-toggle">
            <button className="btn btn-secondary" onClick={toggleFilters}>
              <FiFilter /> Filter
            </button>
          </div>
        </div>
        <div className="container my-3">
          <div
            className={`${styles.filters} ${showFilters ? styles.show : ""}`}>
            <div className="row">
              <div className="col-12 col-md-2">
                <select
                  className="form-select mb-2"
                  value={filters.manufacturer}
                  onChange={handleFilterChange("manufacturer")}>
                  <option value="">All Manufacturers</option>
                  {manufacturers.map((manufacturer, index) => (
                    <option
                      key={`${manufacturer}-${index}`}
                      value={manufacturer}>
                      {manufacturer}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <select
                  className="form-select mb-2"
                  value={filters.year}
                  onChange={handleFilterChange("year")}>
                  <option value="">All Years</option>
                  {years.map((year, index) => (
                    <option key={`${year}-${index}`} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <select
                  className="form-select mb-2"
                  value={filters.color}
                  onChange={handleFilterChange("color")}>
                  <option value="">All Colors</option>
                  {colors.map((color, index) => (
                    <option key={`${color}-${index}`} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <select
                  className="form-select mb-2"
                  value={filters.engine}
                  onChange={handleFilterChange("engine")}>
                  <option value="">All Engines</option>
                  {engines.map((engine, index) => (
                    <option key={`${engine}-${index}`} value={engine}>
                      {engine}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <input
                  type="number"
                  className="form-control mb-2"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min Price"
                />
              </div>
              <div className="col-12 col-md-2">
                <input
                  type="number"
                  className="form-control mb-2"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max Price"
                />
              </div>
              <div className="col-12">
                <button
                  className={`w-100 mb-3 ${styles.addbtn}`}
                  onClick={handleResetFilters}>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            {currentCars.map((car, index) => (
              <div
                key={`${car.id}-${index}`}
                className={`col-md-4 mb-3 ${styles.carwrap}`}>
                <div className={`card ${styles.card}`}>
                  <Link to={`/EditCar/${car.id}`} className={styles.editIcon}>
                    <FiEdit />
                  </Link>
                  <div
                    onClick={() => handleDelete(car.id)}
                    className={` ${styles.deleteIcon}`}
                    aria-label="Видалити автомобіль">
                    <MdDelete size="1.5em" />
                  </div>
                  <img
                    src={car.photo}
                    className="card-img-top"
                    alt={car.name}
                  />
                  <div className={`card-body d-grid gap-2`}>
                    <h5 className={`card-title ${styles.cardTitle}`}>
                      {car.name}
                    </h5>
                    <p className={`card-text ${styles.cardText}`}>
                      Year: {car.year}
                    </p>
                    <p className={`card-text ${styles.cardText}`}>
                      Engine: {car.engine}L
                    </p>
                    <p className={`card-text ${styles.cardText}`}>
                      Price: ${car.price}
                    </p>
                    <Link
                      to={`/car/${car.id}`}
                      className={styles.seeMoreButton}>
                      <button>See more...</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pag activePage={currentPage} changePage={setCurrentPage} pag={pag} />
        </div>
      </div>
    </>
  );
}

export default withLayout(CarList);
