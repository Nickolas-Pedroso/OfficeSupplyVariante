// Simple client-side include for header.html
(function(){
  function loadHeader(){
    var placeholder = document.getElementById('header-placeholder');
    if(!placeholder) return;
    fetch('header.html').then(function(res){
      if(!res.ok) throw new Error('Failed to fetch header');
      return res.text();
    }).then(function(html){
      placeholder.innerHTML = html;
      // minor accessibility touches
      var nav = placeholder.querySelector('nav'); if(nav) nav.setAttribute('role','navigation');
    }).catch(function(err){
      console.warn('Could not load header:', err);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadHeader); else loadHeader();
})();
