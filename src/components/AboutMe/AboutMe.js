import React from "react";
import "../AboutMe/AboutMe.css";
import avatar from "../../images/avatar.jpg";

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__line"></div>
      <div className="about-me__wrapper">
        <img className="about-me__avatar" src={avatar} alt="Аватар пользователя" />
        <div className="about-me__text-container">
          <h3 className="about-me__name">Николай</h3>
          <h4 className="about-me__about-me">Фронтенд-разработчик, 36 лет</h4>
          <p className="about-me__about-me-text">Работаю авиадиспетчером. Решил освоить новую професcию. Так я стал студентом "Яндекс-Практикума"
          </p>
          <a
            className="about-me__link"
            href="https://github.com/NikolayBugynin"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
