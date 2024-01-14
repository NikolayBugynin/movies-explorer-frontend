import React from "react";
import "../Portfolio/Portfolio.css";
import arrowPicture from "../../images/arrow-picture.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__links-list">
        <a
          className="portfolio__link portfolio__link_underlined"
          href="https://nikolaybugynin.github.io/how-to-learn"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__text">Статичный сайт</p>
          <img
            className="portfolio__image"
            src={arrowPicture}
            alt="Изображение стрелки"
          />
        </a>
        <a
          className="portfolio__link portfolio__link_underlined"
          href="https://nikolaybugynin.github.io/russian-travel/index.html"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__text">Адаптивный сайт</p>
          <img
            className="portfolio__image"
            src={arrowPicture}
            alt="Изображение стрелки"
          />
        </a>
        <a
          className="portfolio__link"
          href=" https://hello.nomoredomainsmonster.ru"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__text">Одностраничное приложение</p>
          <img
            className="portfolio__image"
            src={arrowPicture}
            alt="Изображение стрелки"
          />
        </a>
      </nav>
    </section>
  );
}

export default Portfolio;
