# Информационный киоск

Клиент-серверное приложение для отображения сообщений на информационном мониторе

## Стек

- **Backend:** Java 25, Spring Boot 4, PostgreSQL, Liquibase, MapStruct
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, openapi-fetch
- **Инфраструктура:** Docker, Docker Compose, nginx

## Требуется создать .env в корне проекта

Пример .env:

```env
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=kiosk
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
ADMIN_FRONTEND_URL=http://localhost:5173
MONITOR_FRONTEND_URL=http://localhost:5174
VITE_API_URL=http://localhost:8080/api/v1
```

### Запуск

```bash
docker compose up -d
```

### Сервисы после запуска

| Сервис            | URL                                   |
|-------------------|---------------------------------------|
| Backend API       | http://localhost:8080                 |
| Панель управления | http://localhost:5173                 |
| Монитор           | http://localhost:5174                 |


### API

Спецификация: [`api-contract/openapi.yml`](api-contract/openapi.yml)

| Метод  | Путь                       | Описание                   |
|--------|----------------------------|----------------------------|
| `POST` | `/api/v1/messages`         | Установить новое сообщение |
| `GET`  | `/api/v1/messages/current` | Получить текущее сообщение |