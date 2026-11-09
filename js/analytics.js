(function () {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  var measurementId = 'G-7T85X5N107';
  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(tag);

  window.gtag('js', new Date());
  window.gtag('config', measurementId, { anonymize_ip: true });

  var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  var query = new URLSearchParams(window.location.search);
  utmKeys.forEach(function (key) {
    if (query.get(key)) window.sessionStorage.setItem(key, query.get(key));
  });

  function event(name, params) {
    try { window.gtag('event', name, params || {}); } catch (error) { /* Analytics must not block the site. */ }
  }
  window.FadeClubAnalytics = { event: event };

  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!target || !target.closest) return;

    var tracked = target.closest('[data-event]');
    if (tracked) {
      var params = {};
      Array.prototype.forEach.call(tracked.attributes, function (attribute) {
        if (attribute.name.indexOf('data-') === 0 && attribute.name !== 'data-event') {
          params[attribute.name.slice(5).replace(/-/g, '_')] = attribute.value;
        }
      });
      event(tracked.dataset.event, params);
    }

    var link = target.closest('a[href]');
    if (!link) return;
    var href = link.href || '';
    if (href.indexOf('tel:') === 0 || href.indexOf('mailto:') === 0) {
      event('contact_click', { contact_type: href.indexOf('tel:') === 0 ? 'phone' : 'email' });
    }
    if (link.dataset.social) {
      event('social_click', { network: link.dataset.social, page_section: link.dataset.section || 'footer' });
    }
    if (link.dataset.messenger) {
      event('messenger_click', { messenger: link.dataset.messenger });
    }
  });
})();
