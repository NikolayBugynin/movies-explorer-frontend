import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import api from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  LOCAL_STORAGE_FILTRED,
  LOCAL_STORAGE_MOVIE,
  LOCAL_STORAGE_QUERY,
  LOCAL_STORAGE_SHORT,
  LOCAL_STORAGE_VISIBLE,
} from "../../utils/constants";
import { useUser } from "../../context/CurrentUserContext";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, setUser, setToken } = useUser();

  const { token } = user;

  const [movies, setMovies] = useState(
    () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_MOVIE)) || []
  );
  const [savedMovies, setSavedMovies] = useState([]);

  const [error, setError] = useState(false);

  const handleRegister = async (data) => {
    setError(false);
    try {
      await api(user).register(data);
      await handleLogin(data);
    } catch (e) {
      setError(e.message || e);
      console.log(e);
    }
  };

  const handleLogin = async ({ email, password }) => {
    setError(false);
    try {
      const { token } = await api(user).login({ email, password });
      setToken(token);
      navigate("/movies");
    } catch (e) {
      setError(e.message || e);
      console.log(e);
    }
  };

  const handleLogout = () => {
    [
      LOCAL_STORAGE_MOVIE,
      LOCAL_STORAGE_FILTRED,
      LOCAL_STORAGE_QUERY,
      LOCAL_STORAGE_SHORT,
      LOCAL_STORAGE_VISIBLE,
    ].map((key) => localStorage.removeItem(key));
    setToken("");
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { name, email } = await api(user).getUserInfo();
        setUser({ ...user, name, email });
        navigate(location.pathname);
      } catch (e) {
        console.log(e);
      }
    };

    if (token) {
      checkUser();
    }
  }, [token]);

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              component={Movies}
              movies={movies}
              setMovies={setMovies}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute
              savedMovies={savedMovies}
              component={SavedMovies}
              setSavedMovies={setSavedMovies}
            />
          }
        />
        <Route
          path="/profile"
          element={<ProtectedRoute logOut={handleLogout} component={Profile} />}
        />
        <Route
          path="/signup"
          element={
            <Register
              onRegister={handleRegister}
              error={error}
              setError={setError}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Login onLogin={handleLogin} error={error} setError={setError} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
