import "./index.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./share/store";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import CarList from "./pages/CarList/CarList";
import SingleCar from "./pages/SingleCar/SingleCar";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import AddOrEditCar from "./pages/AddOrEditCar/AddOrEditCar";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/CarList",
    element: <CarList />,
  },
  {
    path: "/AddCar",
    element: <AddOrEditCar />,
  },
  {
    path: "/EditCar/:id",
    element: <AddOrEditCar />,
  },
  {
    path: "/car/:id",
    element: <SingleCar />,
  },
  {
    path: "/404",
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <Navigate to={"/404"} />,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
