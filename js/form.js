(function () {
  var endpoint = window.FADECLUB_ENDPOINT || '';
  var responseFrame;

  function uuid() {
    return 'REQ-' + crypto.randomUUID().toUpperCase();
  }

  function utm() {
    var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
    var values = {};
    keys.forEach(function (key) { values[key] = sessionStorage.getItem(key) || 'not_set'; });
    if (values.utm_source === 'not_set') values.utm_source = 'direct';
    return values;
  }

  function showError(input, message) {
    var error = input.closest('.field')?.querySelector('.form-error') || document.querySelector('[data-consent-error]');
    if (error) error.textContent = message;
    input.setAttribute('aria-invalid', 'true');
  }

  function clearErrors(form) {
    form.querySelectorAll('.form-error').forEach(function (error) { error.textContent = ''; });
    form.querySelectorAll('[aria-invalid]').forEach(function (input) { input.removeAttribute('aria-invalid'); });
  }

  function getResponseFrame() {
    if (responseFrame) return responseFrame;
    responseFrame = document.createElement('iframe');
    responseFrame.name = 'fadeclub-booking-response';
    responseFrame.title = 'Ответ сервера записи';
    responseFrame.hidden = true;
    document.body.appendChild(responseFrame);
    return responseFrame;
  }

  function sendToReceiver(data) {
    return new Promise(function (resolve, reject) {
      if (!endpoint) return reject(new Error('endpoint_missing'));

      var frame = getResponseFrame();
      var postForm = document.createElement('form');
      postForm.method = 'POST';
      postForm.action = endpoint + (endpoint.indexOf('?') === -1 ? '?' : '&') + 'iframe_response=1';
      postForm.target = frame.name;
      postForm.hidden = true;
      Object.keys(data).forEach(function (key) {
        var field = document.createElement('input');
        field.type = 'hidden';
        field.name = key;
        field.value = data[key];
        postForm.appendChild(field);
      });

      var timeout = window.setTimeout(function () {
        window.removeEventListener('message', receive);
        postForm.remove();
        reject(new Error('receiver_timeout'));
      }, 15000);

      function receive(event) {
        var allowedOrigin = false;
        try {
          var host = new URL(event.origin).hostname;
          allowedOrigin = event.origin === 'https://script.google.com'
            || host === 'script.googleusercontent.com'
            || host.endsWith('.script.googleusercontent.com');
        } catch (error) { /* Ignore non-URL origins. */ }
        if (event.source !== frame.contentWindow || !allowedOrigin
          || !event.data || event.data.type !== 'fadeclub_booking_response') return;
        var payload = event.data.payload;
        if (!payload || payload.request_id !== data.request_id || typeof payload.ok !== 'boolean') return;
        window.clearTimeout(timeout);
        window.removeEventListener('message', receive);
        postForm.remove();
        resolve(payload);
      }

      window.addEventListener('message', receive);
      document.body.appendChild(postForm);
      postForm.submit();
    });
  }

  function initForm(form) {
    var requestId = form.querySelector('[name=request_id]');
    if (requestId) requestId.value = uuid();
    Object.assign(form.dataset, utm());

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      clearErrors(form);
      var valid = true;
      var name = form.querySelector('[name=name]');
      var phone = form.querySelector('[name=phone]');
      var consent = form.querySelector('[name=consent]');

      if (name && !/^.{2,60}$/.test(name.value.trim())) {
        showError(name, 'Укажите имя от 2 до 60 символов');
        valid = false;
      }
      if (phone && !/^\+7\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(phone.value.trim())) {
        showError(phone, 'Введите номер в формате +7 900 909-09-90');
        valid = false;
      }
      if (consent && !consent.checked) {
        showError(consent, 'Нужно согласие на обработку данных');
        valid = false;
      }
      if (!valid) {
        window.FadeClubAnalytics?.event('form_error', { field_name: 'form', error_type: 'validation' });
        return;
      }

      var button = form.querySelector('[type=submit]');
      if (button) button.disabled = true;
      var data = Object.fromEntries(new FormData(form).entries());
      Object.assign(data, utm());

      try {
        var result = await sendToReceiver(data);
        if (!result || result.ok !== true) throw new Error((result && result.error) || 'server');

        window.FadeClubAnalytics?.event('generate_lead', {
          lead_service: data.service || 'unknown',
          lead_master_level: data.master_level || 'any',
          lead_source: data.utm_source || 'direct',
        });
        sessionStorage.setItem('fadeclub_booking', JSON.stringify({
          request_id: data.request_id,
          date: data.slot_date || data.slot?.split('T')[0] || '',
          time: data.slot_time || '',
          slot: data.slot || '',
          name: data.name || '',
        }));
        location.href = 'thanks.html?request_id=' + encodeURIComponent(data.request_id)
          + '&slot=' + encodeURIComponent(data.slot || '');
      } catch (error) {
        if (button) button.disabled = false;
        window.FadeClubAnalytics?.event('form_error', { field_name: 'form', error_type: 'server' });
        var status = form.querySelector('.form-status');
        if (status) status.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз.';
      }
    });
  }

  document.querySelectorAll('form[data-booking-form]').forEach(initForm);
})();
