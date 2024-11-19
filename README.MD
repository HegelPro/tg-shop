# Telegram store

## Посмотреть приложение можно по ссылке:
* [Telegram store bot](https://t.me/hegeltest_bot)

## Что представляет собой приложение?

Приложение представляет собой шаблон на основе которого можно реализовать Telegram бот для продажи товаров онлайн.

Магазин использует удобный графический интерфейс, который встраивается в Telegram бот при помощи Telegram Mini Apps api.


## Возможности бота

* Отображение списока товаров магазина
* Открытие подробного описание товаров
* Добавление товаров в карзину
* Указание данных для заказа
* Оплата заказа при помощи Telegram Payments API

## Клиентское приложение

Статическое react приложение работающее внутри Telegram bot внутри себя использующее Telegram Mini Apps api.

### Сильные стороны выбраных програмных решений

* Архитектурное решение feature slice design
  * Ясная бизнес логика
  * Адаптивность, благодаря которой можно гибко заменять и добавлять компонента в соответствии с новыми требованиями
  * Легкий рефакторинг, каждый модуль может быть легко заменен и переписан без сайд эффектов
  * Ясная переиспользуемость кода
* Полностью typesafety 
  * Приложение написано при помощи strict mode Typescript
  * Все внешнее api типизиравоно при помощи GraphQL схемы и проверок типов io-ts
* Выбор популярного и проверенного стека технологий
  * React - дикларотивный и отлично типизируемый frontend framework
  * GraphQL - гибкий язык запросов, предоставляющий возможность типизировать api
  * Mui - предаставляет все необходимые базовые UI решения для frontend приложений
  * Vite - удобный и самый быстрый в режиме разработки сборщик статических приложений

### Основные использование технологии

* React
* Typescript
* GraphQL(`@graphql-codegen` + `graphql-request`)
* Vite
* Material UI
* Telegram webapp api object

### Ссылка на клиентское приложение

[Посмотреть исходники можно по ссылке](https://github.com/HegelPro/tg-store/tree/main/packages/client)

## Серверное приложения

* Полностью typesafety
  * Приложение написано при помощи strict mode Typescript
  * Сохранение типизации между базой данных и серверным приложением
  * Сохраниние типизации между серверным приложением и генерируемой GraphQL схемой
* Выбор популярного и проверенного стека технологий
* Настройка секьюрного HTTPS протакола

### Основные использование технологии

* Node.js
* Typescript
* GraphQL(`@pothos` + `graphql-yoga`)
* Prisma
* Fastify
* Telegram bot api(`grammy`)
* Docker

### Ссылка на серверное приложение

[Посмотреть исходники можно по ссылке](https://github.com/HegelPro/tg-store/tree/main/packages/server)

## Как запустить приложение?

1. Создать в корне репазитория файл с название `.env.production` и заполнить его необходимыми переменными. Пример файла:
```
DATABASE_URL=""
POSTGRES_USER=""
POSTGRES_PASSWORD=""

GRAPHQL_ENDPOINT="/graphql"

TG_BOT_API_TOKEN=""

PROVIDER_TOKEN=""

SERVER_PORT="443"

CERTIFICATE_KEY_PATH='./certs/certificate.key'
CERTIFICATE_CERT_PATH='./certs/certificate.crt'

VITE_GRAPHQL_ENDPOINT=""
```
2. Добавить файл с SSL сертефекатом по пути `/packages/server/certs/certificate.crt` и файл с SSL ключем `/packages/server/certs/certificate.key`
3. Запустить следующую команду в корне монорепазитория:
```bash
docker-compose up -d --build -f /docker-compose-production.yml
```

## Доска задач для проекта

[Telegram store project board](https://github.com/users/HegelPro/projects/4)

## Скриншоты с демонстрацией работы Telegram bot приложения

![Выбор товаров в магазине](https://raw.githubusercontent.com/HegelPro/tg-store/refs/heads/main/images/select-products.jpg "Выбор товаров в магазине")
![Проверка списка выбраных товаров](https://raw.githubusercontent.com/HegelPro/tg-store/refs/heads/main/images/check-product-list.jpg "Проверка списка выбраных товаров")
![Оплата товаров в мессенджере Telegram](https://raw.githubusercontent.com/HegelPro/tg-store/refs/heads/main/images/telegram-pay.jpg "Оплата товаров в мессенджере Telegram")
