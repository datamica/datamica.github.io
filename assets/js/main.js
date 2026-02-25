const includes = {
    header: 'components/header.html',
    hero: 'components/sections/hero.html',
    'company-description': 'components/sections/company-description.html',
    'product-service': 'components/sections/product-service.html',
    footer: 'components/footer.html'
};

async function includeHTML() {
    for (const [id, path] of Object.entries(includes)) {
        const el = document.getElementById(id);
        if (!el) continue;
        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
            el.innerHTML = await res.text();
        } catch (err) {
            console.error(`Failed to load ${path}:`, err);
        }
    }
}

document.addEventListener('DOMContentLoaded', includeHTML);

// mobile nav toggle + footer year + active nav highlighting
document.addEventListener('DOMContentLoaded', function(){
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // footer year
  var y = new Date().getFullYear();
  var el = document.getElementById('year');
  if(el) el.textContent = y;

  // active nav highlighting
  try {
    var last = location.pathname.split('/').pop().toLowerCase();
    if (!last) last = 'index.html';
    var links = document.querySelectorAll('.site-nav a');
    links.forEach(function(a){
      var href = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
      if (!href) href = 'index.html';
      if (href === last || (last === 'index.html' && (href === 'index.html' || a.getAttribute('href') === '/'))) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  } catch(e){ /* noop */ }

  // show success message when redirected with ?sent=1
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get('sent') === '1') {
      var msg = document.getElementById('form-message');
      if (msg) {
        msg.style.display = 'block';
        // optional: scroll into view
        msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      // remove query string from address bar (optional)
      if (history && history.replaceState) {
        var url = window.location.origin + window.location.pathname;
        history.replaceState({}, document.title, url);
      }
    }
  } catch(e){ /* noop */ }
});