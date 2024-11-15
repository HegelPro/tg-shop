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

Статическое react приложение работающее внутри Telegram bot реализующее Telegram Mini Apps api.


### Основные использование технологии

* React
* Typescript
* GraphQL(`@graphql-codegen` + `graphql-request`)
* Vite
* Pure.css
* Telegram bot api object(passed with telegram script)

### Ссылка на клиентское приложение

[Посмотреть исходники можно по ссылке](https://github.com/HegelPro/tg-store/tree/main/packages/client)

## Серверное приложения

* Seciure - works with HTTPS
* Typesavety
  * wrote on Typescript with strict mode
  * generating GraphQL schema with typesafty library - allow us to synchronice types between server and client
  * Prisma - allow synchonice types between database and server
* Modern - all using technologies is popular nowdays

### Основные использование технологии

* Node.js
* Typescript
* GraphQL(`@pothos` + `graphql-yoga`)
* Prisma
* fastify
* Telegram bot api(`grammy`)

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

## Доска задач

[Telegram store project board](https://github.com/users/HegelPro/projects/4)

## Скриншоты с демонстрацией работы магазина в Telegram

![Выбор товаров в магазине](https://raw.githubusercontent.com/HegelPro/tg-store/refs/heads/main/images/select-products.jpg "Выбор товаров в магазине")
![Проверка списка выбраных товаров](https://raw.githubusercontent.com/HegelPro/tg-store/refs/heads/main/images/check-product-list.jpg "Проверка списка выбраных товаров")
![Оплата товаров в мессенджере Telegram](https://raw.githubusercontent.com/HegelPro/tg-store/refs/heads/main/images/telegram-pay.jpg "Оплата товаров в мессенджере Telegram")
