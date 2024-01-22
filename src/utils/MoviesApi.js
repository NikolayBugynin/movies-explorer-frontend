import { MOVIES_API_URL } from "./constants";

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: "GET",
      headers: this._headers,
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

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
