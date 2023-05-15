import { useEffect } from "react";
import { fetchMovieData } from "./utils/api";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { getApiConfiguration } from "./features/movieSlice";
import Header from "./components/layout/Header/Header";
import { Home, Movies, Tv, Details } from "./pages/allPages";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    fetchMovieData("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url));
      
    });
  }


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tv" element={<Tv />} />
        <Route path="details" element={<Details />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

// const apiTest = () => {
//   fetchMovieData("/movie/popular")
//     .then((response) => {
//     console.log(response);
//   })
// }

// useEffect(() => {
//   apiTest();
// }, [])
