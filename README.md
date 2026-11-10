# Фейд Клаб — сайт, запись и аналитика

| Раздел | Ссылка / статус |
|---|---|
| Сайт на Vercel | [https://tz-09-barbershop-feyd-klab-seven.vercel.app](https://tz-09-barbershop-feyd-klab-seven.vercel.app) |
| Репозиторий GitHub | [loveunites/TZ_09_Barbershop_Feyd_Klab](https://github.com/loveunites/TZ_09_Barbershop_Feyd_Klab) |
| Google Analytics 4 | [Свойство «Барбершоп»](https://analytics.google.com/analytics/web/#/a415574579p563379106/admin/streams/table) |
| Идентификатор GA4 | `G-7T85X5N107` |
| Google Таблица «FadeClub — Bookings» | [Открыть таблицу](https://docs.google.com/spreadsheets/d/1zAMjs9zjb7GpBHpVJ_uyuLsqdZ-bkKUroYzeXUXVwTU/edit) — владелец аккаунт проекта; доступ по ссылке не открыт |
| Apps Script Web App | [Endpoint](https://script.google.com/macros/s/AKfycbzED0mvjHOSKE0tvbrLGGK5-yGKZACJvBrxaLMEeM7kQaFJykcRHxEUk0Q6VusW-7x9/exec) · [проект](https://script.google.com/home/projects/1z0f7uMDjXomMy8mwBoOfUY7Z2HZ3nam43RLaIp-_GPhpLoD3DuIsZgzu/edit) |
| Автоматизация ManyChat | Пользователь подтвердил, что настроенная автоматизация работает; снимки настроек в репозиторий не переданы |
| Instagram | Reel для автоматизации: [ссылка](https://www.instagram.com/reel/DfiLxaxvdfg/) |
| ВКонтакте | Тестовое сообщество не предоставлено |
| Telegram | Тестовый канал не предоставлен |
| YouTube | Тестовый канал не предоставлен |
| Публикации блогеров | Ссылки на тестовые публикации не предоставлены |
| QR-код U-12 | [docs/qr-u-12.png](docs/qr-u-12.png) |
| Афиша с QR-кодом | [docs/afisha.pdf](docs/afisha.pdf) |
| Реестр UTM-ссылок | [docs/utm.csv](docs/utm.csv) |
| События GA4 | [docs/events.md](docs/events.md) |
| Аналитическая записка | [docs/report.md](docs/report.md) — заполнить после накопления данных за период |

Yandex DataLens исключён из проекта по решению пользователя.

## Подключение и приёмка

Пошаговый список подключений: [docs/SETUP.md](docs/SETUP.md). Источники изображений: [docs/images.md](docs/images.md). Журнал работы с нейросетью: [docs/prompts.md](docs/prompts.md).

Проверка Google-входа показала свойство «Барбершоп» и поток с ID `G-7T85X5N107`. Для него включена Enhanced Measurement, зарегистрированы семь параметров событий и ключевые события `generate_lead`, `contact_click`, `messenger_click`. Посещение опубликованного сайта появилось в Realtime; полный набор событий в DebugView не фиксировался. Отдельный Viewer-доступ не выдавался: предоставленный Google-аккаунт уже используется для настройки, а адрес тестового Заказчика в ТЗ вымышленный.

Основная инфраструктура сайта, GA4 и приёма заявок подготовлена; пользователь подтвердил, что ManyChat работает. Для формальной сдачи остаются снимки доказательств и заполнение аналитической записки после накопления данных. Проверки отправки заявки и DebugView не выполнялись по просьбе пользователя не запускать тесты. Тестовые страницы VK, Telegram, YouTube и ссылки публикаций блогеров не предоставлены.

Нейросеть использовалась для: подготовки статического сайта, файлов обработки заявок и материалов проекта; полный журнал — [docs/prompts.md](docs/prompts.md).
