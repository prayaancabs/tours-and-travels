
(function(){
  const navbar = document.getElementById('siteNavbar');
  const onScroll = () => navbar && navbar.classList.toggle('scrolled', window.scrollY > 18);
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  document.querySelectorAll('form[data-prevent-submit="true"]').forEach(form => {
    form.addEventListener('submit', event => event.preventDefault());
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:.14});
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('show'));
  }
})();
