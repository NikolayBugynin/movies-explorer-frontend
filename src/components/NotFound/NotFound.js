import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <article className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button className="not-found__link" onClick={() => navigate(-1)}>
        Назад
      </button>
    </article>
  );
}

export default NotFound;
