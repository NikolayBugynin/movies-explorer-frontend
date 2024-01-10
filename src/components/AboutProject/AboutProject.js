import React from "react";
import "../AboutProject/AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__line"></div>
      <div className="about-project__wrapper">
        <div className="about-project__container">
          <h3 className="about-project__header-stages">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__container">
          <h3 className="about-project__header-deadlines">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__deadlines-map">
        <div className="about-project__first-week">
          <p className="about-project__first-week-text">1 неделя</p>
        </div>
        <div className="about-project__four-weeks">
          <p className="about-project__four-weeks-text">4 недели</p>
        </div>
        <p className="about-project__side">Back-end</p>
        <p className="about-project__side">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
