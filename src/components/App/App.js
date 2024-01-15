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
import MainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_MOVIE } from "../../utils/constants";
import { useUser } from "../../context/CurrentUserContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { setUser, setToken } = useUser();
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState(
    () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_MOVIE)) || []
  );

  const handleRegister = (data) => {
    console.log("register");

    MainApi.register(data.email, data.password, data.name).then((res) => {
      handleLogin(data);
    });
  };

  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log("login");

    MainApi.login(data.email, data.password)
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem(LOCAL_STORAGE_KEY, res.token);
        navigate("/movies");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  useEffect(() => {
    const jwt = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (jwt) {
      MainApi.getUserInfo()
        .then(({ name, email }) => {
          setIsLoggedIn(true);
          setUser({ email, name });
          navigate(location.pathname);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
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
              isLoggedIn={isLoggedIn}
              savedMovies={savedMovies}
              component={SavedMovies}
              setSavedMovies={setSavedMovies}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              logOut={handleLogout}
              component={Profile}
            />
          }
        />
        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
