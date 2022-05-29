import React, { Suspense } from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import "./styles.css";

const Search = React.lazy(() => import("./Search/Search"));
const Profile = React.lazy(() => import("./Profile"));

const Loading = () => {
  return <>Loading...</>;
};

export default function App() {
  return (
    <div className="App">
      <h1>Github</h1>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Search />
              </Suspense>
            }
          />

          <Route
            path="/profile/:profile/*"
            element={
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
