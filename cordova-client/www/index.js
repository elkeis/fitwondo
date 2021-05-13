(function() {

  var ASSETS_URL = 'https://fitnation.planningpoker.by/cordova/assets.json';

  document.addEventListener('deviceready', function() {
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open('GET', ASSETS_URL);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if (xmlhttp.status == 200) {
          var assets = JSON.parse(xmlhttp.responseText);
          var script = document.createElement("script");
          script.src = assets.app.js;
          document.body.appendChild(script);
        } else {
          alert('Failed to load assets.json');
        }
      }
    }
    xmlhttp.send();
  }, false);

})();
