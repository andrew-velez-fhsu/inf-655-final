import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Details from "./pages/details/Details";
import Profile from "./pages/profile/Profile";
import CreateAccount from "./pages/profile/create/CreateAccount";
import { AuthContextProvider } from "./context/AuthContext";

import ProtectedRoute from "./utils/ProtectedRoute";
import { StorageContextProvider } from "./context/StorageContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <StorageContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/details" element={<Details />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile/create" element={<CreateAccount />} />
            </Routes>
          </BrowserRouter>
        </StorageContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
