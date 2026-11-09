# Приём заявок в Google Sheets

`Code.gs` принимает POST-запросы через Google Apps Script Web App и добавляет заявки в лист `leads`.

## Настройка таблицы

1. Создайте Google Spreadsheet. Лист `leads` можно не создавать заранее: скрипт создаст его и добавит заголовки при первом запросе.
2. Скопируйте ID таблицы из URL: часть между `/d/` и `/edit`.
3. Откройте Apps Script проект и добавьте содержимое `Code.gs`.
4. В Apps Script откройте **Project Settings → Script properties → Add script property**:
   - **Property:** `SPREADSHEET_ID`
   - **Value:** ID вашей таблицы

Не добавляйте ID таблицы или другие секреты в исходный код и репозиторий.

## Развёртывание Web App

1. В Apps Script нажмите **Deploy → New deployment**.
2. Выберите тип **Web app**.
3. Для **Execute as** выберите **Me**.
4. Настройте **Who has access** согласно способу вызова endpoint. Для публичной формы выберите доступ, позволяющий посетителям сайта отправлять запросы.
5. Нажмите **Deploy**, пройдите авторизацию и скопируйте URL Web App, оканчивающийся на `/exec`.
6. Отправляйте на URL POST-запросы с `Content-Type: application/json` или `application/x-www-form-urlencoded`. Form-urlencoded не требует CORS preflight.

После изменений кода создайте новую версию в **Deploy → Manage deployments → Edit → New version**.

## Формат запроса

Обязательные поля: `request_id`, `name`, `phone`, `service`, `master_level`, `slot`. `email` необязателен. Имя должно содержать 2–60 символов; остальные строковые поля ограничены 200 символами. Телефон должен иметь формат `+7` и 10 цифр; допускаются пробелы, скобки и дефисы, которые будут удалены при сохранении. `slot` принимается в формате `YYYY-MM-DD HH:MM` (время Europe/Moscow) или ISO 8601 с часовым поясом и должен быть в будущем.

`service`: `haircut`, `beard`, `combo`, `kids`, `father_son`, `gift_card`, `camouflage`.

`master_level`: `any`, `barber`, `top`, `brand`.

UTM-поля необязательны: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`. Значения по умолчанию: `direct`, `none`, `not_set`, `not_set` соответственно.

Пример JSON:

```json
{
  "request_id": "booking-123",
  "name": "Иван",
  "phone": "+79991234567",
  "email": "ivan@example.com",
  "service": "haircut",
  "master_level": "any",
  "slot": "2026-12-12T14:30:00+03:00",
  "utm_source": "direct",
  "utm_medium": "none",
  "utm_campaign": "not_set",
  "utm_content": "not_set"
}
```

Чтобы отправить данные из браузера без CORS preflight, можно передать их как form-urlencoded:

```js
fetch(endpoint, {
  method: 'POST',
  body: new URLSearchParams(data)
});
```

Точный порядок столбцов в `leads`: `request_id`, `created_at`, `name`, `phone`, `email`, `service`, `master_level`, `slot`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `status`.

При автоматическом создании листа скрипт настраивает часовой пояс Europe/Moscow, фильтры-списки для `service`, `master_level` и `status`, форматы дат, заморозку строки заголовков и подсветку дубликатов/статусов. Допустимые статусы: `new`, `confirmed`, `reminded`, `visited`, `no_show`.

Ответы имеют формат JSON: `{ "ok": true }` при успешной записи, `{ "ok": false, "error": "duplicate" }` при повторном `request_id`, либо `{ "ok": false, "error": "..." }` при ошибке. Клиентское поле `status` игнорируется; сервер всегда записывает `new`. `created_at` и `slot` сохраняются как настоящие значения даты в таблице.
