# Telegram store

## Посмотреть приложение можно по ссылке:
* [Telegram store bot](https://t.me/hegeltest_bot)

## Что представляет собой приложение?

Приложение служет для того, чтобы на его основе создавать интернет магазины с графическим интерфейсом внутри менеджера Telegram

## Сценарий покупки товаров при помощи Telegram бота

![Выбор товаров в магазине](https://github.com/HegelPro/tg-store/images/select-products.jpg "Выбор товаров в магазине")
![Проверка списка выбраных товаров](https://github.com/HegelPro/tg-store/images/check-product-list.jpg "Проверка списка выбраных товаров")
![Оплата товаров в мессенджере Telegram](https://github.com/HegelPro/tg-store/images/telegram-pay.jpg "Оплата товаров в мессенджере Telegram")


## Архитектура приложения

Исходный код распологается в монорепазитории, который содержен несколько приложений:
* [Клиентское приложения]() - Статическое react приложение работающее внутри Telegram bot реализующее Telegram webapp api. 
* [Серверное приложения]() - 

## Как запустить приложение?



Telegram bot where you can buy goods using web app telegram api(GUI).

You can try it by link --> [Telegram store bot](https://t.me/hegeltest_bot)

Board of the project --> [Telegram store project board](https://github.com/users/HegelPro/projects/4)

## Client

### Strong sides

* Typesavety
  * wrote on Typescript with strict mode
  * ganarate GraphQL typescript from server GraphQL schema - allow us to synchronice types between client and server
* Light
  * without big ui frameworks - Telegram web view store is a small don't need to bright big ui frameworks like `@mui`
  * without state managers - react context api + react hooks allow us to manage state for small application
* Modern - all using technologies is popular nowdays

### Structure

```
- packages\client\
- | - certs\ - private dir with SSL certs
- | - prisma\
- | - | - schema.prisma - schema of prisma
- | - src\
- | - | - bot\ -
- | - | - schema\ -
- | - | - server.ts - con
- | - schema.graphql -
```

### Stack

* React
* Typescript
* GraphQL(`@graphql-codegen` + `graphql-request`)
* Vite
* Pure.css
* Telegram bot api object(passed with telegram script)


## Server

### Strong sides

* Seciure - works with HTTPS
* Typesavety
  * wrote on Typescript with strict mode
  * generating GraphQL schema with typesafty library - allow us to synchronice types between server and client
  * Prisma - allow synchonice types between database and server
* Modern - all using technologies is popular nowdays

### Structure

```
- packages\server\
- | - certs\ - private dir with SSL certs
- | - prisma\
- | - | - schema.prisma - schema of prisma
- | - src\
- | - | - bot\ -
- | - | - schema\ -
- | - | - server.ts - con
- | - schema.graphql -
```

### Stack

* Node.js
* Typescript
* GraphQL(`@pothos` + `graphql-yoga`)
* Prisma
* fastify
* Telegram bot api(`grammy`)

## Entirament

Project has monorepository structure