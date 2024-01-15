const emailRegex = "[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\\.[a-z]{2,}";
const nameRegex = "^[а-яА-ЯёЁa-zA-Z]+$";

const LOCAL_STORAGE_KEY = "jwt";

const LOCAL_STORAGE_QUERY = "query";

const LOCAL_STORAGE_SHORT = "isShort";

const LOCAL_STORAGE_FILTRED = "filtred";

const LOCAL_STORAGE_MOVIE = "movies";

const LOCAL_STORAGE_VISIBLE = "visible";

const MOVIES_API_URL = "https://api.nomoreparties.co";

export {
  emailRegex,
  nameRegex,
  LOCAL_STORAGE_KEY,
  MOVIES_API_URL,
  LOCAL_STORAGE_QUERY,
  LOCAL_STORAGE_SHORT,
  LOCAL_STORAGE_FILTRED,
  LOCAL_STORAGE_MOVIE,
  LOCAL_STORAGE_VISIBLE,
};
