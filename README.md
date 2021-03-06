# STELLAR BURGERS
SPA приложение, позволяющее вам собрать и заказать свой межгалактический бургер.

### Технологии: 
TypeScript, React.js (Сборка CRA), JS (ES6), Git (+Conventional Commits lite); HTML5, CSS3 (CSS Modules), Jest, Cypress.

Управление стором: Redux (Redux Toolkit).
Тестирование: Jest (Unit), Cypress (E2E).
Вёртка: семантическая, pixel perfect, с использованием UI библиотеки Яндекс.Практикума.
Отладка: React Developer Tools, Redux DevTools.
Дополнительно: использование localStorage и Cookie; код ревью через ротацию профессиональных разработчиков; работа с дизайном через Figma.

### Функционал
* Регистрация\авторизация пользователя; 
* восстановление и сброс пароля; 
* добавление ингредиентов бургера в конструктор с помощью DND; 
* сортировка\удаление ингредиентов из конструктора; 
* отправка на сервер информации о собранном бургере и получение данных о заказе; 
* получение и обновление пользовательской информации через сервер; 
* навигация по страницам через react router dom.

### О проекте
Приложение разрабатывалось в рамках интенсива ["React Developer"](https://praktikum.yandex.ru/react/) от Яндекс.Практикума (бета-когорта). 
Обучение было разбито на 4 спринта (2-3 недели каждый), в результате которых готовился проект. В каждом спринте было своё техническое задание, защита которого осуществлялась через код-ревью, где обозначались моменты для исправления\улучшения кода. В каждом этапе предусматривалось по 2-3 попытки на защиту, через ротацию ревьюеров из опытных разработчиков. 
Кодовая база и структура проекта аутентичны. 

### Запуск проекта [npm]
1. Клонируйте данный репозиторий к себе;
2. Установите пакеты через команду `npm i`;
3. Запустите проект в режиме: development `npm start` или production `npm run build`.
---
* JEST-тесты запускаются через `npm run test`.
* Cypress-тесты через `npm run cypress:open`.
* Проект запускается в браузере по адресу: `http://localhost:3000`.
