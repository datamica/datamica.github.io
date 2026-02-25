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

// mobile nav toggle + footer year + active nav highlighting (no redirects)
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

  // highlight active nav item
  try {
    // get the last path segment or fallback to index.html
    var last = location.pathname.split('/').pop().toLowerCase();
    if (!last) last = 'index.html';

    // also handle cases where the site is served under a repo name (e.g. /repo/)
    // if pathname equals the repo folder name (no file), treat as index.html
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
});