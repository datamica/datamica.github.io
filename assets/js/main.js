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

// mobile nav toggle + footer year
document.addEventListener('DOMContentLoaded', function(){
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  var y = new Date().getFullYear();
  var el = document.getElementById('year');
  if(el) el.textContent = y;
});