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

  // contact form mailto fallback
  try {
    var form = document.getElementById('contact-form');
    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var frm = e.target;
        var name = (frm.querySelector('input[name="name"]') || {}).value || '';
        var from = (frm.querySelector('input[name="email"]') || {}).value || '';
        var msg = (frm.querySelector('textarea[name="message"]') || {}).value || '';

        // basic validation
        if(!name || !from || !msg){
          alert('Please fill name, email and message.');
          return;
        }

        var subject = encodeURIComponent('Contact from ' + (name || from));
        var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + from + '\n\nMessage:\n' + msg);

        // open mail client addressed to datamica.sg@gmail.com
        var mailto = 'mailto:datamica.sg@gmail.com?subject=' + subject + '&body=' + body;
        window.location.href = mailto;
      });
    }
  } catch(e){ /* noop */ }
});