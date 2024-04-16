# Star Wars wiki

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## В общем и целом

Веб-приложение был создан с помощью фронтэнд-фреймковорка Angular. Выше базовый readme инструкция по локальному развертыванию. Данные были взяты из [SWAPI](https://swapi.dev/)

На сайте можно ознакомиться со вселенной Звездных войн и узнать информацию о фильмах, персонажах, планетах, расах, машин и звездолетов в Далекой далекой Галактике. Также можно найти интересующую информацию в разделе через поиск. 

Помимо локального развертывания, вы можете использовать [StackBlitz](https://stackblitz.com/~/github.com/primeK31/starwars_wiki). Также я разместил на хостинге Firebase сайт: https://starwarswiki-7cc62.web.app/home.

## Ход разработки

Макет сайта был собран на компонентах. Компонент является одной из единицей и базой построения фронтэнда на Angular фреймворке. Компоненты основаны на главной страницу 6 разделах, такие как: Фильмы, Персонажи, Планеты, Виды, Звездолеты, Машины, и еще 6 дополнительных компонентов для отображений деталей этих сущностей.

Навигация между страницами построена на RouterModule. Получение информаций из API благодаря Observable и HttpClient, с помощью которых и делаются get запросы. Observable - часть реактивного программирования для управления асихронными операциями и передачи данных. Поиск внутри разделов реализован с помощью get запросов на API с добавлением ?search=(текст полученный из input tage) [ссылка на документацию](https://swapi.dev/documentation). Для получения текста из input использован FormsModule. Для перехода по страницам внутри разделов, также был использованы get запросы для получения ссылки на раздел "next" или "previous" полученных из json файла API. И с нажатием кнопки осуществлялся get запрос, но уже на следующий/предыдущий(полученный из ссылки "next" или "previous") json. Также были использованы сервисы для сохранения функций запросов именно там.

## Доработка

В первую очередь, есть небольшие проблемы со стилистикой приложения. Я считаю ее недоработанной и нужно бы поработать над ней побольше. 
Во вторых, в планах у меня было создать сайт в стиле wiki fandoms, внедрив в сайт backend часть с помощью фреймворков Django или FastAPI с авторизацией пользователей, возможностью писать комментарий на страницы и форум, где пользователи могли бы создать дискуссии или обсуждения.
В планах эта доработка.

## Вывод

Думаю этот сайт будет интересен фанатам, любителям, блогерам по вселенной Звездных войн и они смогут узнать и подчеркнуть для себя интересную информацию для своих фанатский целей.  

Благодарю за задание! Мне понравилось и я смог углубить свои знания по фреймворку и интересно провести выходные! 

May the Force be with you
- Obi Wan Kenobi and others Jedies

Author: Ashirbekov Sanzhar
