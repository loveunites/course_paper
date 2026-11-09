const LEADS_SHEET_NAME = 'leads';
const SPREADSHEET_ID_PROPERTY = 'SPREADSHEET_ID';
const LEAD_HEADERS = [
  'request_id',
  'created_at',
  'name',
  'phone',
  'email',
  'service',
  'master_level',
  'slot',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'status',
];

// The booking UI also exposes camouflage, so accept it as a first-class service.
const ALLOWED_SERVICES = ['haircut', 'beard', 'combo', 'kids', 'father_son', 'gift_card', 'camouflage'];
const ALLOWED_MASTER_LEVELS = ['any', 'barber', 'top', 'brand'];
const ALLOWED_STATUSES = ['new', 'confirmed', 'reminded', 'visited', 'no_show'];
const SHEET_TIME_ZONE = 'Europe/Moscow';
const CLIENT_ORIGIN = 'https://tz-09-barbershop-feyd-klab-seven.vercel.app';
const UTM_DEFAULTS = {
  utm_source: 'direct',
  utm_medium: 'none',
  utm_campaign: 'not_set',
  utm_content: 'not_set',
};

const SUPPORTING_SHEETS = [
  {
    name: 'utm',
    headers: ['номер', 'канал', 'размещение', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'страница', 'полная_ссылка', 'короткая_ссылка', 'адрес_публикации', 'дата_публикации'],
  },
  {
    name: 'ga4_traffic',
    headers: ['date', 'source', 'medium', 'campaign', 'landing_page', 'sessions', 'engaged_sessions', 'key_events'],
  },
  {
    name: 'ga4_leads',
    headers: ['date', 'lead_service', 'lead_master_level', 'lead_source', 'event_count', 'user_count'],
  },
];
const UTM_ROWS = [
  ['U-01', 'Instagram', 'ссылка в шапке профиля', 'instagram', 'social', 'first_visit_nov_2026', 'bio', 'index.html', 'https://tz-09-barbershop-feyd-klab-seven.vercel.app/?utm_source=instagram&utm_medium=social&utm_campaign=first_visit_nov_2026&utm_content=bio', '', '', ''],
  ['U-02', 'Instagram', 'автоответ ManyChat под Reel', 'instagram', 'social', 'first_visit_nov_2026', 'reel_fade_01', 'style-quiz.html', 'https://tz-09-barbershop-feyd-klab-seven.vercel.app/style-quiz.html?utm_source=instagram&utm_medium=social&utm_campaign=first_visit_nov_2026&utm_content=reel_fade_01', '', '', ''],
  ['U-03', 'Instagram', 'автоответ ManyChat ветка ПОДАРОК', 'instagram', 'social', 'gift_dec_2026', 'reel_fade_01_gift', 'services.html#gift', 'https://tz-09-barbershop-feyd-klab-seven.vercel.app/services.html?utm_source=instagram&utm_medium=social&utm_campaign=gift_dec_2026&utm_content=reel_fade_01_gift#gift', '', '', ''],
  ['U-04', 'Instagram', 'ссылка-стикер в Stories', 'instagram', 'social', 'first_visit_nov_2026', 'stories_01', 'contacts.html', 'https://tz-09-barbershop-feyd-klab-seven.vercel.app/contacts.html?utm_source=instagram&utm_medium=social&utm_campaign=first_visit_nov_2026&utm_content=stories_01', '', '', ''],
  ['U-05', 'ВКонтакте', 'пост в сообществе', 'vk', 'social', 'first_visit_nov_2026', 'post_01', 'works.html', 'https://tz-09-barbershop-feyd-klab-seven.vercel.app/works.html?utm_source=vk&utm_medium=social&utm_campaign=first_visit_nov_2026&utm_content=post_01', '', '', ''],
  ['U-06', 'ВКонтакте', 'кнопка действия Записаться', 'vk', 'social', 'first_visit_nov_2026', 'group_button', 'contacts.html', 'https://tz-09-barbershop-feyd-klab-seven.vercel.app/contacts.html?utm_source=vk&utm_medium=social&utm_campaign=first_visit_nov_2026&utm_content=group_button', '', '', ''],
  ['U-07', 'Telegram', 'пост в канале', 'telegram', 'social', 'first_visit_nov_2026', 'post_01', 'index.html', 'https://tz-09-barbershop-feyd-klab-seven.vercel.app/?utm_source=telegram&utm_medium=social&utm_campaign=first_visit_nov_2026&utm_content=post_01', '', '', ''],
  ['U-08', 'Telegram', 'пост о сертификатах', 'telegram', 'social', 'gift_dec_2026', 'post_02', 'services.html#gift', 'https://tz-09-barbershop-feyd-klab-seven.vercel.app/services.html?utm_source=telegram&utm_medium=social&utm_campaign=gift_dec_2026&utm_content=post_02#gift', '', '', ''],
  ['U-09', 'YouTube', 'описание Shorts Фейд за 40 минут', 'youtube', 'social', 'first_visit_nov_2026', 'shorts_fade_01', 'masters.html', 'https://tz-09-barbershop-feyd-klab-seven.vercel.app/masters.html?utm_source=youtube&utm_medium=social&utm_campaign=first_visit_nov_2026&utm_content=shorts_fade_01', '', '', ''],
  ['U-10', 'Блогер 1', 'ссылка у партнёра', 'barber_partner_01', 'affiliate', 'first_visit_nov_2026', 'story_01', 'index.html', 'https://tz-09-barbershop-feyd-klab-seven.vercel.app/?utm_source=barber_partner_01&utm_medium=affiliate&utm_campaign=first_visit_nov_2026&utm_content=story_01', '', '', ''],
  ['U-11', 'Блогер 2', 'ссылка у партнёра', 'barber_partner_02', 'affiliate', 'first_visit_nov_2026', 'post_01', 'style-quiz.html', 'https://tz-09-barbershop-feyd-klab-seven.vercel.app/style-quiz.html?utm_source=barber_partner_02&utm_medium=affiliate&utm_campaign=first_visit_nov_2026&utm_content=post_01', '', '', ''],
  ['U-12', 'Визитки', 'QR-код на визитке мастера', 'card_qr', 'qr', 'repeat_visit_2026', 'master_card', 'contacts.html', 'https://tz-09-barbershop-feyd-klab-seven.vercel.app/contacts.html?utm_source=card_qr&utm_medium=qr&utm_campaign=repeat_visit_2026&utm_content=master_card', '', '', ''],
];

// Run once from the Apps Script editor to prepare the workbook tabs.
function setupSpreadsheet() {
  const spreadsheetId = PropertiesService.getScriptProperties()
    .getProperty(SPREADSHEET_ID_PROPERTY);
  if (!spreadsheetId) {
    throw new Error('Missing SPREADSHEET_ID script property.');
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  spreadsheet.setSpreadsheetTimeZone(SHEET_TIME_ZONE);
  getLeadsSheet_();
  if (!spreadsheet.getSheetByName('ga4_traffic')) {
    const unusedSheet = spreadsheet.getSheetByName('Лист3') || spreadsheet.getSheetByName('Sheet3');
    if (unusedSheet && unusedSheet.getLastRow() === 0) {
      unusedSheet.setName('ga4_traffic');
    }
  }
  SUPPORTING_SHEETS.forEach(function (definition) {
    const sheet = getSheetWithHeaders_(spreadsheet, definition.name, definition.headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, definition.headers.length).setFontWeight('bold');
    if (definition.name === 'utm' && sheet.getLastRow() === 1) {
      sheet.getRange(2, 1, UTM_ROWS.length, SUPPORTING_SHEETS[0].headers.length).setValues(UTM_ROWS);
    }
  });
  return 'FadeClub workbook is ready.';
}

function getSheetWithHeaders_(spreadsheet, name, headers) {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  return sheet;
}

function doPost(e) {
  let lock;

  try {
    const lead = parseLead_(e);
    lock = LockService.getScriptLock();
    lock.waitLock(10000);

    const sheet = getLeadsSheet_();
    if (hasRequestId_(sheet, lead.request_id)) {
      return responseOutput_({ ok: true, duplicate: true, request_id: lead.request_id }, e);
    }
    if (isRecentPhone_(lead.phone)) {
      return responseOutput_({ ok: false, error: 'rate_limited', request_id: lead.request_id }, e);
    }

    const values = [
      lead.request_id,
      new Date(),
      lead.name,
      lead.phone,
      lead.email,
      lead.service,
      lead.master_level,
      lead.slotDate,
      lead.utm_source,
      lead.utm_medium,
      lead.utm_campaign,
      lead.utm_content,
      'new',
    ];
    const row = sheet.getLastRow() + 1;
    const range = sheet.getRange(row, 1, 1, LEAD_HEADERS.length);
    formatLeadRow_(sheet, row);
    range.setValues([values]);
    rememberPhone_(lead.phone);

    return responseOutput_({ ok: true, request_id: lead.request_id }, e);
  } catch (error) {
    const message = error && error.isClientError
      ? error.message
      : 'Не удалось сохранить заявку.';
    return responseOutput_({ ok: false, error: message, request_id: e && e.parameter && e.parameter.request_id || '' }, e);
  } finally {
    if (lock && lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function parseLead_(e) {
  const payload = parsePayload_(e);
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw clientError_('Тело запроса должно быть JSON-объектом или form-urlencoded.');
  }
  validateStringLengths_(payload);
  if (typeof payload.fax_number === 'string' && payload.fax_number.trim()) {
    throw clientError_('Request rejected.');
  }

  const lead = {
    request_id: requiredString_(payload, 'request_id'),
    name: validateName_(requiredString_(payload, 'name')),
    phone: normalizePhone_(requiredString_(payload, 'phone')),
    email: optionalString_(payload, 'email'),
    service: requiredString_(payload, 'service'),
    master_level: requiredString_(payload, 'master_level'),
    slot: requiredString_(payload, 'slot'),
    utm_source: optionalString_(payload, 'utm_source') || UTM_DEFAULTS.utm_source,
    utm_medium: optionalString_(payload, 'utm_medium') || UTM_DEFAULTS.utm_medium,
    utm_campaign: optionalString_(payload, 'utm_campaign') || UTM_DEFAULTS.utm_campaign,
    utm_content: optionalString_(payload, 'utm_content') || UTM_DEFAULTS.utm_content,
  };

  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    throw clientError_('Некорректный email.');
  }
  if (ALLOWED_SERVICES.indexOf(lead.service) === -1) {
    throw clientError_('Недопустимое значение service.');
  }
  if (ALLOWED_MASTER_LEVELS.indexOf(lead.master_level) === -1) {
    throw clientError_('Недопустимое значение master_level.');
  }
  lead.slotDate = parseFutureDateTime_(lead.slot);
  if (!lead.slotDate) {
    throw clientError_('Поле slot должно содержать корректную дату и время в будущем.');
  }

  return lead;
}

function parsePayload_(e) {
  if (!e) {
    throw clientError_('Ожидается JSON или form-urlencoded тело запроса.');
  }

  const postData = e.postData || {};
  const contentType = String(postData.type || '').toLowerCase();
  const body = typeof postData.contents === 'string' ? postData.contents : '';

  if (contentType.indexOf('application/x-www-form-urlencoded') === 0) {
    if (e.parameter && Object.keys(e.parameter).length) {
      return e.parameter;
    }
    return parseFormBody_(body);
  }

  if (body) {
    try {
      return JSON.parse(body);
    } catch (error) {
      if (contentType.indexOf('application/x-www-form-urlencoded') !== -1) {
        return parseFormBody_(body);
      }
      throw clientError_('Некорректный JSON.');
    }
  }

  if (e.parameter && Object.keys(e.parameter).length) {
    return e.parameter;
  }
  throw clientError_('Ожидается JSON или form-urlencoded тело запроса.');
}

function parseFormBody_(body) {
  const payload = {};
  if (!body) {
    return payload;
  }

  body.split('&').forEach(function (pair) {
    const separator = pair.indexOf('=');
    const rawKey = separator < 0 ? pair : pair.substring(0, separator);
    const rawValue = separator < 0 ? '' : pair.substring(separator + 1);
    const key = decodeURIComponent(rawKey.replace(/\+/g, ' '));
    const value = decodeURIComponent(rawValue.replace(/\+/g, ' '));
    if (key && payload[key] === undefined) {
      payload[key] = value;
    }
  });
  return payload;
}

function validateStringLengths_(payload) {
  Object.keys(payload).forEach(function (key) {
    if (typeof payload[key] === 'string' && payload[key].length > 200) {
      throw clientError_('Поле ' + key + ' не должно превышать 200 символов.');
    }
  });
}

function requiredString_(payload, field) {
  const value = payload[field];
  if (typeof value !== 'string' || !value.trim()) {
    throw clientError_('Поле ' + field + ' обязательно.');
  }
  return value.trim();
}

function validateName_(name) {
  if (name.length < 2 || name.length > 60) {
    throw clientError_('Поле name должно содержать от 2 до 60 символов.');
  }
  return name;
}

function optionalString_(payload, field) {
  const value = payload[field];
  if (value === undefined || value === null || value === '') {
    return '';
  }
  if (typeof value !== 'string') {
    throw clientError_('Поле ' + field + ' должно быть строкой.');
  }
  return value.trim();
}

function normalizePhone_(phone) {
  const normalized = phone.replace(/[\s()-]/g, '');
  if (!/^\+7\d{10}$/.test(normalized)) {
    throw clientError_('Телефон должен содержать +7 и 10 цифр.');
  }
  return normalized;
}

function parseFutureDateTime_(value) {
  // The browser slot picker sends `YYYY-MM-DD HH:MM`; interpret that
  // timezone-less form as Europe/Moscow. ISO strings with an explicit
  // offset or Z are also accepted.
  const localMatch = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/.exec(value);
  if (localMatch) {
    const year = Number(localMatch[1]);
    const month = Number(localMatch[2]);
    const day = Number(localMatch[3]);
    const hour = Number(localMatch[4]);
    const minute = Number(localMatch[5]);
    const second = localMatch[6] ? Number(localMatch[6]) : 0;
    if (hour > 23 || minute > 59 || second > 59) {
      return null;
    }
    const validDay = new Date(Date.UTC(year, month - 1, day));
    if (validDay.getUTCFullYear() !== year || validDay.getUTCMonth() !== month - 1 || validDay.getUTCDate() !== day) {
      return null;
    }
    const date = new Date(validDay.getTime() + (hour - 3) * 60 * 60 * 1000 + minute * 60 * 1000 + second * 1000);
    return date.getTime() >= Date.now() ? date : null;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = match[6] ? Number(match[6]) : 0;
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  if (utcDate.getUTCFullYear() !== year || utcDate.getUTCMonth() !== month - 1 || utcDate.getUTCDate() !== day) {
    return null;
  }
  if (hour > 23 || minute > 59 || second > 59) {
    return null;
  }

  const offset = match[8];
  if (offset && offset !== 'Z') {
    const offsetHour = Number(offset.substring(1, 3));
    const offsetMinute = Number(offset.substring(4, 6));
    if (offsetHour > 23 || offsetMinute > 59) {
      return null;
    }
  }

  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) && timestamp >= Date.now() ? new Date(timestamp) : null;
}

function clientError_(message) {
  const error = new Error(message);
  error.isClientError = true;
  return error;
}

function getLeadsSheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties()
    .getProperty(SPREADSHEET_ID_PROPERTY);
  if (!spreadsheetId) {
    throw new Error('Missing SPREADSHEET_ID script property.');
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  spreadsheet.setSpreadsheetTimeZone(SHEET_TIME_ZONE);
  let sheet = spreadsheet.getSheetByName(LEADS_SHEET_NAME);
  let createdHeaders = false;
  if (!sheet) {
    sheet = spreadsheet.insertSheet(LEADS_SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, LEAD_HEADERS.length).setValues([LEAD_HEADERS]);
    createdHeaders = true;
  } else {
    const headers = sheet.getRange(1, 1, 1, LEAD_HEADERS.length).getDisplayValues()[0];
    if (LEAD_HEADERS.some(function (header, index) { return headers[index] !== header; })) {
      throw new Error('The leads sheet has an unexpected header row.');
    }
  }

  if (createdHeaders) {
    configureLeadsSheet_(spreadsheet, sheet);
  }

  return sheet;
}

function configureLeadsSheet_(spreadsheet, sheet) {
  spreadsheet.setSpreadsheetTimeZone(SHEET_TIME_ZONE);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, LEAD_HEADERS.length).setFontWeight('bold');

  const dataRowCount = Math.max(1, sheet.getMaxRows() - 1);
  const serviceValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(ALLOWED_SERVICES, true)
    .setAllowInvalid(false)
    .build();
  const masterValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(ALLOWED_MASTER_LEVELS, true)
    .setAllowInvalid(false)
    .build();
  const statusValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(ALLOWED_STATUSES, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, 6, dataRowCount, 1).setDataValidation(serviceValidation);
  sheet.getRange(2, 7, dataRowCount, 1).setDataValidation(masterValidation);
  sheet.getRange(2, 13, dataRowCount, 1).setDataValidation(statusValidation);
  sheet.getRange(2, 2, dataRowCount, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
  sheet.getRange(2, 8, dataRowCount, 1).setNumberFormat('yyyy-mm-dd hh:mm');
  setTextColumnFormats_(sheet, 2, dataRowCount);

  const duplicateRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($A2<>"",COUNTIF($A$2:$A,$A2)>1)')
    .setBackground('#fce8e6')
    .setRanges([sheet.getRange(2, 1, dataRowCount, LEAD_HEADERS.length)])
    .build();
  const statusRules = [
    ['new', '#fff2cc'],
    ['confirmed', '#d9ead3'],
    ['reminded', '#cfe2f3'],
    ['visited', '#d9d2e9'],
    ['no_show', '#f4cccc'],
  ].map(function (entry) {
    return SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$M2="' + entry[0] + '"')
      .setBackground(entry[1])
      .setRanges([sheet.getRange(2, 13, dataRowCount, 1)])
      .build();
  });
  sheet.setConditionalFormatRules([duplicateRule].concat(statusRules));
}

function setTextColumnFormats_(sheet, startRow, rowCount) {
  [[1, 1], [3, 5], [9, 4], [13, 1]].forEach(function (columnRange) {
    sheet.getRange(startRow, columnRange[0], rowCount, columnRange[1]).setNumberFormat('@');
  });
}

function formatLeadRow_(sheet, row) {
  setTextColumnFormats_(sheet, row, 1);
  sheet.getRange(row, 2).setNumberFormat('yyyy-mm-dd hh:mm:ss');
  sheet.getRange(row, 8).setNumberFormat('yyyy-mm-dd hh:mm');
}

function hasRequestId_(sheet, requestId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return false;
  }

  const requestIds = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
  return requestIds.some(function (row) { return row[0] === requestId; });
}

function phoneCacheKey_(phone) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, phone, Utilities.Charset.UTF_8);
  return 'recent_phone_' + Utilities.base64EncodeWebSafe(digest);
}

function isRecentPhone_(phone) {
  return Boolean(CacheService.getScriptCache().get(phoneCacheKey_(phone)));
}

function rememberPhone_(phone) {
  CacheService.getScriptCache().put(phoneCacheKey_(phone), '1', 30);
}

function jsonOutput_(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

function responseOutput_(body, e) {
  if (!e || !e.parameter || e.parameter.iframe_response !== '1') {
    return jsonOutput_(body);
  }

  const message = JSON.stringify({ type: 'fadeclub_booking_response', payload: body })
    .replace(/</g, '\\u003c');
  const html = '<!doctype html><html><head><meta charset="utf-8"></head><body><script>'
    + 'parent.postMessage(' + message + ', ' + JSON.stringify(CLIENT_ORIGIN) + ');'
    + '</script></body></html>';
  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
