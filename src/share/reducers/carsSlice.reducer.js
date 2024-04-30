import { createSlice } from "@reduxjs/toolkit";
import { carList } from "../carList";

const savedCars = JSON.parse(localStorage.getItem("cars")) || carList;

const initialState = {
  cars: savedCars,
  filteredCars: savedCars,
  searchQuery: "",
  filters: {
    manufacturer: "",
    year: "",
    color: "",
    engine: "",
    priceRange: { min: "", max: "" },
  },
};

const applyFilters = (cars, filters, searchQuery) => {
  return cars.filter((car) => {
    return (
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.manufacturer
        ? car.manufacturer === filters.manufacturer
        : true) &&
      (filters.year ? car.year === filters.year : true) &&
      (filters.color ? car.color === filters.color : true) &&
      (filters.engine || filters.engine === 0
        ? Number(car.engine) === Number(filters.engine)
        : true) &&
      (!filters.priceRange.min ||
        car.price >= Number(filters.priceRange.min)) &&
      (!filters.priceRange.max || car.price <= Number(filters.priceRange.max))
    );
  });
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredCars = applyFilters(
        [...state.cars],
        { ...state.filters },
        state.searchQuery
      );
    },
    setFilter: (state, action) => {
      const { filterName, value } = action.payload;
      state.filters[filterName] = value;
      state.filteredCars = applyFilters(
        [...state.cars],
        { ...state.filters },
        state.searchQuery
      );
    },
    setPriceRange: (state, action) => {
      const { min, max } = action.payload;
      state.filters.priceRange = { min, max };
      state.filteredCars = applyFilters(
        [...state.cars],
        { ...state.filters },
        state.searchQuery
      );
    },
    resetFilters: (state) => {
      state.filters = {
        manufacturer: "",
        year: "",
        color: "",
        engine: "",
        priceRange: { min: "", max: "" },
      };
      state.filteredCars = applyFilters(
        [...state.cars],
        { ...state.filters },
        state.searchQuery
      );
    },
    addCar: (state, action) => {
      const arr = [...state.cars, action.payload];
      state.cars = [...arr];
      localStorage.setItem("cars", JSON.stringify(state.cars));
      state.filteredCars = applyFilters(
        [...arr],
        { ...state.filters },
        state.searchQuery
      );
    },
    editCar: (state, action) => {
      const { id, ...updatedCarInfo } = action.payload;
      const carIndex = state.cars.findIndex((car) => car.id === id);

      if (carIndex >= 0) {
        state.cars[carIndex] = { ...state.cars[carIndex], ...updatedCarInfo };

        localStorage.setItem("cars", JSON.stringify(state.cars));

        state.filteredCars = applyFilters(
          [...state.cars],
          { ...state.filters },
          state.searchQuery
        );
      }
    },
    removeCar: (state, action) => {
      const arr = state.cars.filter((car) => car.id !== action.payload);
      state.cars = [...arr];
      localStorage.setItem("cars", JSON.stringify(state.cars));
      state.filteredCars = applyFilters(
        [...arr],
        { ...state.filters },
        state.searchQuery
      );
    },
  },
});

export const {
  setSearchQuery,
  setFilter,
  setPriceRange,
  resetFilters,
  addCar,
  editCar,
  removeCar,
} = carsSlice.actions;

export default carsSlice.reducer;
