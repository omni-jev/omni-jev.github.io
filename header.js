(function () {
  const mount = document.getElementById('siteHeader');
  if (!mount) return;

  const root = document.documentElement;
  const onTry = document.body.classList.contains('try-page');
  const scriptUrl = document.currentScript && document.currentScript.src;
  const siteBase = new URL('.', scriptUrl || window.location.href).pathname;
  const savedTheme = localStorage.getItem('omnijev_theme');
  const initialTheme = savedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const initialLanguage = localStorage.getItem('omnijev_lang') || localStorage.getItem('mso_lang') || 'zh';

  // Apply persisted UI state before inserting the header to avoid a visible
  // language or theme change during page navigation.
  root.dataset.theme = initialTheme === 'dark' ? 'dark' : 'light';
  root.lang = initialLanguage === 'en' ? 'en' : 'zh-CN';
  const navigation = [
    [`${siteBase}#capabilities`, '能力', 'Capabilities'],
    [`${siteBase}#demos`, '演示', 'Demos'],
    [`${siteBase}#benchmarks`, '基准测试', 'Benchmarks'],
    [`${siteBase}#numbers`, '性能', 'Performance'],
    [`${siteBase}#about`, '关于', 'About']
  ];
  const link = ([href, zh, en]) =>
    `<a href="${href}"><span class="zh">${zh}</span><span class="en">${en}</span></a>`;

  mount.innerHTML = `
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" href="${siteBase}" aria-label="OmniJev 首页">
          <span class="brand-mark" aria-hidden="true"><i></i><i></i></span>
          <span class="brand-copy"><strong>北京中关村学院 <em>x</em> 智进化</strong><small>Beijing Zhongguancun Academy <em>x</em> ZVEO</small></span>
        </a>
        <nav class="desktop-nav" aria-label="主导航">${navigation.map(link).join('')}
          <a class="external-link" href="https://github.com/tinnel123666888/OmniJev" target="_blank" rel="noopener noreferrer"><svg class="service-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.22c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.74-1.56-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.98 10.98 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"/></svg>GitHub <span aria-hidden="true">↗</span></a>
          <a class="external-link" href="https://huggingface.co/tinnel123/OmniJev" target="_blank" rel="noopener noreferrer"><svg class="service-logo hf-logo" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="11.5" r="7.5" fill="#FFD21E"/><circle cx="9.2" cy="9.7" r="1" fill="#5B4210"/><circle cx="14.8" cy="9.7" r="1" fill="#5B4210"/><path d="M8.4 13.2c1 1.2 2.2 1.8 3.6 1.8s2.7-.6 3.6-1.8" fill="none" stroke="#5B4210" stroke-linecap="round" stroke-width="1.35"/><path d="M6.7 14.5 3.4 12.8c-.8-.4-1.7-.1-2 .7-.4.8 0 1.7.8 2.1l4.6 2.3M17.3 14.5l3.3-1.7c.8-.4 1.7-.1 2 .7.4.8 0 1.7-.8 2.1l-4.6 2.3" fill="#FFD21E" stroke="#E5AA00" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1"/></svg>Hugging Face <span aria-hidden="true">↗</span></a>
        </nav>
        <div class="nav-actions">
          <button class="icon-btn" id="themeToggle" type="button" aria-label="切换深浅主题">
            <svg class="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>
            <svg class="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/></svg>
          </button>
          <button class="lang-btn" id="langToggle" type="button" aria-label="切换语言">EN</button>
          <a class="btn btn-primary btn-sm nav-cta" href="${siteBase}try" ${onTry ? 'aria-current="page"' : ''}><span class="zh">在线体验</span><span class="en">Try online</span></a>
          <button class="menu-btn" id="menuToggle" type="button" aria-label="打开菜单" aria-expanded="false" aria-controls="mobileNav"><span></span><span></span><span></span></button>
        </div>
      </div>
      <nav class="mobile-nav" id="mobileNav" aria-label="移动端导航" hidden>
        ${navigation.map(link).join('')}
        <a href="${siteBase}try" ${onTry ? 'aria-current="page"' : ''}><span class="zh">在线体验</span><span class="en">Try online</span></a>
        <a href="https://github.com/tinnel123666888/OmniJev" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a href="https://huggingface.co/tinnel123/OmniJev" target="_blank" rel="noopener noreferrer">Hugging Face ↗</a>
      </nav>
    </header>`;

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  function setTheme(theme) {
    const value = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = value;
    localStorage.setItem('omnijev_theme', value);
    if (themeMeta) themeMeta.content = value === 'dark' ? '#09111d' : '#f7f9fc';
  }
  function setLanguage(language) {
    const value = language === 'en' ? 'en' : 'zh';
    root.lang = value === 'en' ? 'en' : 'zh-CN';
    localStorage.setItem('omnijev_lang', value);
    localStorage.setItem('mso_lang', value);
    document.getElementById('langToggle').textContent = value === 'en' ? '中' : 'EN';
    window.dispatchEvent(new CustomEvent('site:language', { detail: value }));
  }

  setTheme(initialTheme);
  setLanguage(initialLanguage);

  document.getElementById('themeToggle').addEventListener('click', () =>
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  document.getElementById('langToggle').addEventListener('click', () =>
    setLanguage(root.lang === 'en' ? 'zh' : 'en'));
  const menuButton = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    mobileNav.hidden = open;
  });
  mobileNav.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  }));
  window.SiteHeader = { setLanguage, setTheme };
})();
