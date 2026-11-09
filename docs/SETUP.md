# Быстрый чек-лист подключений

Перед передачей проекта заполните все поля `[ЗАПОЛНИТЬ]`, проверьте публичную страницу и сохраните скриншоты испытаний в соответствующие каталоги `screens/`.

## GA4

- [ ] Создать отдельный ресурс «ФЕЙД КЛАБ — сайт», часовой пояс `GMT+03:00 Москва`, валюта — российский рубль.
- [ ] Создать веб-поток для `https://fadeclub-demo.vercel.app`; включить Enhanced Measurement, включая взаимодействия с формами.
- [ ] Установить Google tag с идентификатором `G-…` в `<head>` всех страниц, включая `404.html`.
- [ ] Проверить 20 событий из [events.md](events.md). `generate_lead` отправлять только после ответа приёмника `ok: true`; имена, телефоны и e-mail в GA4 не отправлять.
- [ ] В Custom definitions зарегистрировать параметры уровня события `button_name`, `page_section`, `service_name`, `master_level`, `weekday`, `lead_service`, `messenger`.
- [ ] Отметить ключевыми событиями только `generate_lead`, `contact_click` и `messenger_click`.
- [ ] Проверить события и параметры в DebugView; сохранить снимки в `screens/ga4/`; перед сдачей выключить отладочный режим в опубликованном коде.
- [ ] Заполнить идентификатор и ссылку ресурса в README, выдать Заказчику Viewer-доступ и указать адрес и дату.

## Vercel

- [ ] Импортировать публичный GitHub-репозиторий проекта в Vercel; выбрать ветку `main` и публикацию статических файлов без сборки.
- [ ] Подтвердить адрес проекта `https://fadeclub-demo.vercel.app` либо обновить README и ссылки реестра, если фактический адрес отличается.
- [ ] Проверить главную, все страницы и `404.html` в опубликованной версии; убедиться, что push в `main` запускает новое развёртывание.
- [ ] Убедиться, что секреты не добавлены в репозиторий. Идентификатор измерения GA4 не является секретом, но персональные данные посетителей в URL и аналитические события не включать.

## Google Sheets и приёмник заявок

- [ ] Создать таблицу «FadeClub — Bookings» и лист `leads` с заголовками и порядком столбцов из раздела 6.1 ТЗ.
- [ ] Для `status` настроить список `new`, `confirmed`, `reminded`, `visited`, `no_show`; добавить проверки и подсветку повторных `request_id` и незаполненных обязательных полей.
- [ ] Развернуть приёмник как веб-приложение Apps Script. Проверить валидацию телефона, e-mail, списков, длины строк и повторного `request_id`; `created_at` и статус `new` задаёт сам приёмник.
- [ ] Указать URL веб-приложения в форме проекта, отправить тестовую заявку и проверить все UTM-поля в таблице.
- [ ] Проверить повторную отправку одного `request_id`: дубликат не должен появиться. После успешной записи форма должна перейти на `thanks.html`.
- [ ] Предоставить Заказчику доступ Viewer по адресу, указанному в ТЗ.

## ManyChat и Instagram

- [ ] Подключить профессиональный Instagram-аккаунт проекта к ManyChat и создать автоматизацию для конкретного Reel «Фейд за 40 минут: до и после».
- [ ] Для комментария `СТРИЖКА` включить три варианта публичного ответа и Direct-сообщение с кнопкой «Подобрать стрижку», ведущей на U-02.
- [ ] Для комментария `ПОДАРОК` добавить сообщение о сертификатах и кнопку «Сертификаты» со ссылкой U-03.
- [ ] Перевести автоматизацию в Live; проверить обе ветки со второго аккаунта и записать снимки шагов в `screens/instagram/`.
- [ ] Отправить тестовую заявку из каждой ветки; проверить UTM в листе `leads` и событие `generate_lead` в GA4.

## QR-код и афиша

Файлы [qr-u-12.png](qr-u-12.png) и [afisha.pdf](afisha.pdf) созданы из полной ссылки U-12. Для повторной генерации установите библиотеки:

```powershell
python -m pip install "qrcode[pil]" reportlab
```

Запустите из корня репозитория следующий Python-код (можно сохранить как временный `make_afisha.py`):

```python
from qrcode import make
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

url = "https://fadeclub-demo.vercel.app/contacts.html?utm_source=card_qr&utm_medium=qr&utm_campaign=repeat_visit_2026&utm_content=master_card"
png_path = "docs/qr-u-12.png"
pdf_path = "docs/afisha.pdf"

make(url, box_size=12, border=4).save(png_path)
page = canvas.Canvas(pdf_path, pagesize=A4)
width, height = A4
page.setTitle("Фейд Клаб — запись по QR-коду")
page.setFont("Helvetica-Bold", 24)
page.drawCentredString(width / 2, height - 100, "ФЕЙД КЛАБ")
page.setFont("Helvetica", 16)
page.drawCentredString(width / 2, height - 140, "Первая стрижка −20 %")
size = 260
page.drawImage(ImageReader(png_path), (width - size) / 2, height - 470, size, size)
page.setFont("Helvetica", 13)
page.drawCentredString(width / 2, height - 510, "Наведите камеру и выберите время")
page.save()
```

Проверьте, что QR-код открывает именно U-12 и после перехода в адресе сохраняются все пять UTM-значений. Не заменяйте ссылку короткой ссылкой в QR PNG.
