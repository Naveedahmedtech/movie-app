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
import { Home, Movies, Tv, Details, SearchResults } from "./pages/allPages";

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
      <Route path="/" element={<Header />} errorElement={<h1 className="color-danger center">Sorry! something went wrong</h1>}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tv" element={<Tv />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="search/:query" element={<SearchResults />} />
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

