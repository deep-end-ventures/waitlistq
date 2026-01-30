(function() {
  'use strict';

  // Find our script tag
  var script = document.currentScript || (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  var waitlistId = script.getAttribute('data-waitlist-id');
  var slug = script.getAttribute('data-slug');
  var baseUrl = script.src.replace('/widget/embed.js', '');

  if (!waitlistId || !slug) {
    console.error('WaitlistQ: Missing data-waitlist-id or data-slug attribute');
    return;
  }

  // Get referral code from URL params
  var urlParams = new URLSearchParams(window.location.search);
  var refCode = urlParams.get('ref') || '';

  // Find or create container
  var container = document.getElementById('waitlistq-widget');
  if (!container) {
    container = script.parentElement;
  }

  // Inject styles
  var style = document.createElement('style');
  style.textContent = [
    '.wq-widget { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 400px; margin: 0 auto; }',
    '.wq-widget * { box-sizing: border-box; margin: 0; padding: 0; }',
    '.wq-card { background: white; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); border: 1px solid #f0f0f0; padding: 32px; }',
    '.wq-title { font-size: 24px; font-weight: 700; color: #111; text-align: center; margin-bottom: 8px; }',
    '.wq-desc { font-size: 14px; color: #666; text-align: center; margin-bottom: 4px; }',
    '.wq-count { font-size: 12px; color: #999; text-align: center; margin-bottom: 24px; }',
    '.wq-input { width: 100%; padding: 12px 16px; border: 1px solid #e5e5e5; border-radius: 12px; font-size: 14px; margin-bottom: 10px; outline: none; transition: border-color 0.2s; color: #111; }',
    '.wq-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }',
    '.wq-btn { width: 100%; padding: 12px; background: linear-gradient(135deg, #6366f1, #a855f7); color: white; border: none; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }',
    '.wq-btn:hover { opacity: 0.9; }',
    '.wq-btn:disabled { opacity: 0.5; cursor: not-allowed; }',
    '.wq-note { font-size: 11px; color: #999; text-align: center; margin-top: 12px; }',
    '.wq-error { font-size: 13px; color: #ef4444; text-align: center; margin-top: 8px; }',
    '.wq-success { text-align: center; }',
    '.wq-check { width: 48px; height: 48px; background: #ecfdf5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }',
    '.wq-pos { font-size: 14px; color: #666; margin-bottom: 4px; }',
    '.wq-pos strong { color: #6366f1; }',
    '.wq-share-box { background: linear-gradient(135deg, #eef2ff, #f5f3ff); border-radius: 12px; padding: 16px; margin-top: 20px; }',
    '.wq-share-title { font-size: 14px; font-weight: 600; color: #111; margin-bottom: 4px; }',
    '.wq-share-desc { font-size: 12px; color: #666; margin-bottom: 12px; }',
    '.wq-share-row { display: flex; gap: 8px; }',
    '.wq-share-input { flex: 1; padding: 8px 12px; border: 1px solid #e5e5e5; border-radius: 8px; font-size: 12px; background: white; color: #333; }',
    '.wq-copy-btn { padding: 8px 16px; background: #6366f1; color: white; border: none; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer; white-space: nowrap; }',
    '.wq-ref-badge { display: inline-block; background: #eef2ff; color: #6366f1; font-size: 12px; font-weight: 500; padding: 4px 12px; border-radius: 20px; margin-bottom: 16px; }',
    '.wq-powered { font-size: 11px; color: #999; text-align: center; margin-top: 16px; }',
    '.wq-powered a { color: #6366f1; text-decoration: none; font-weight: 500; }',
  ].join('\n');
  document.head.appendChild(style);

  // Build widget HTML
  function renderForm(info) {
    container.innerHTML = [
      '<div class="wq-widget"><div class="wq-card">',
      '<div class="wq-title">' + escapeHtml(info.name) + '</div>',
      info.description ? '<div class="wq-desc">' + escapeHtml(info.description) + '</div>' : '',
      info.subscriberCount > 0 ? '<div class="wq-count">' + info.subscriberCount.toLocaleString() + ' people already joined</div>' : '<div class="wq-count">&nbsp;</div>',
      refCode ? '<div style="text-align:center"><span class="wq-ref-badge">👋 You were referred by a friend!</span></div>' : '',
      '<form id="wq-form">',
      '<input class="wq-input" type="text" id="wq-name" placeholder="Your name (optional)">',
      '<input class="wq-input" type="email" id="wq-email" placeholder="your@email.com" required>',
      '<button class="wq-btn" type="submit">Join the Waitlist</button>',
      '</form>',
      '<div id="wq-error" class="wq-error" style="display:none"></div>',
      '<div class="wq-note">No spam. Unsubscribe anytime.</div>',
      '</div>',
      '<div class="wq-powered">Powered by <a href="' + baseUrl + '" target="_blank">WaitlistQ</a></div>',
      '</div>',
    ].join('');

    document.getElementById('wq-form').addEventListener('submit', function(e) {
      e.preventDefault();
      submitForm();
    });
  }

  function renderSuccess(data) {
    var referralUrl = data.subscriber ? (data.subscriber.referralUrl || data.subscriber.referral_url || '') : '';
    container.innerHTML = [
      '<div class="wq-widget"><div class="wq-card wq-success">',
      '<div class="wq-check"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg></div>',
      data.alreadyJoined
        ? '<div class="wq-title">You\'re already on the list!</div>'
        : '<div class="wq-title">You\'re on the list! 🎉</div>',
      data.subscriber && data.subscriber.position
        ? '<div class="wq-pos">You\'re <strong>#' + data.subscriber.position + '</strong> in line</div>'
        : '',
      data.totalCount ? '<div class="wq-count">' + data.totalCount + ' people on the waitlist</div>' : '',
      '<div class="wq-share-box">',
      '<div class="wq-share-title">🚀 Want to skip the line?</div>',
      '<div class="wq-share-desc">Each friend who joins moves you up</div>',
      '<div class="wq-share-row">',
      '<input class="wq-share-input" type="text" readonly value="' + escapeHtml(referralUrl) + '" id="wq-ref-url">',
      '<button class="wq-copy-btn" id="wq-copy">Copy</button>',
      '</div>',
      '</div>',
      '</div>',
      '<div class="wq-powered">Powered by <a href="' + baseUrl + '" target="_blank">WaitlistQ</a></div>',
      '</div>',
    ].join('');

    document.getElementById('wq-copy').addEventListener('click', function() {
      var input = document.getElementById('wq-ref-url');
      input.select();
      document.execCommand('copy');
      this.textContent = '✓ Copied!';
      setTimeout(function() {
        document.getElementById('wq-copy').textContent = 'Copy';
      }, 2000);
    });
  }

  function submitForm() {
    var email = document.getElementById('wq-email').value;
    var name = document.getElementById('wq-name').value;
    var btn = document.querySelector('.wq-btn');
    var errorEl = document.getElementById('wq-error');

    btn.disabled = true;
    btn.textContent = 'Joining...';
    errorEl.style.display = 'none';

    fetch(baseUrl + '/api/waitlist/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        name: name || undefined,
        waitlistId: waitlistId,
        referralCode: refCode || undefined,
      }),
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.error) {
        errorEl.textContent = data.error;
        errorEl.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Join the Waitlist';
      } else {
        renderSuccess(data);
      }
    })
    .catch(function() {
      errorEl.textContent = 'Something went wrong. Please try again.';
      errorEl.style.display = 'block';
      btn.disabled = false;
      btn.textContent = 'Join the Waitlist';
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Load waitlist info and render
  fetch(baseUrl + '/api/widget?id=' + waitlistId)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.waitlist) {
        renderForm(data.waitlist);
      } else {
        container.innerHTML = '<div class="wq-widget"><div class="wq-card"><p style="text-align:center;color:#999">Waitlist not found</p></div></div>';
      }
    })
    .catch(function() {
      container.innerHTML = '<div class="wq-widget"><div class="wq-card"><p style="text-align:center;color:#999">Failed to load waitlist</p></div></div>';
    });
})();
