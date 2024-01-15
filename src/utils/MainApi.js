import { LOCAL_STORAGE_KEY, MOVIES_API_URL } from "./constants";

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  updateUserInfo({ email, name }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name }),
    }).then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  createMovie(movie) {
    const { id, created_at, updated_at, ...data } = movie;
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        image: `${MOVIES_API_URL}${movie.image.url}`,
        thumbnail: `${MOVIES_API_URL}${movie.image.formats.thumbnail.url}`,
        movieId: id,
      }),
    }).then(this._checkResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    }).then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
    }
  }
}

const api = new MainApi({
  baseUrl: "http://localhost:3000",
});

export default api;
