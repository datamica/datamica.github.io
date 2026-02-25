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

// mobile nav toggle + footer year + active nav highlighting + contact mailto fallback
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

  // contact form mailto fallback: prevent "bad gateway" by opening user's mail client with filled values
  try {
    var form = document.getElementById('contact-form');
    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault(); // stop normal submit (server fallback still present if JS removed)
        var frm = e.target;
        var name = (frm.querySelector('input[name="name"]') || {}).value || '';
        var from = (frm.querySelector('input[name="email"]') || {}).value || '';
        var msg = (frm.querySelector('textarea[name="message"]') || {}).value || '';

        // build subject and body
        var subject = encodeURIComponent('Contact form — ' + (name || from));
        var body = encodeURIComponent(
          'Name: ' + name + '\n' +
          'Email: ' + from + '\n\n' +
          'Message:\n' + msg
        );

        // open user's mail client addressed to datamica.sg@gmail.com
        var mailto = 'mailto:datamica.sg@gmail.com' + '?subject=' + subject + '&body=' + body;
        window.location.href = mailto;

        // optional: as a fallback, attempt to submit to external endpoint if JS-enabled users want that
        // (uncomment to attempt background POST; may be blocked by CORS)
        // fetch(form.action, { method: 'POST', body: new FormData(form) }).catch(()=>{});
      });
    }
  } catch(e){ /* noop */ }
});