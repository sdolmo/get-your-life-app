// function appendResults(text) {
//   var results = document.getElementById('results');
//   results.appendChild(document.createElement('P'));
//   results.appendChild(document.createTextNode(text));
// }

$(document).ready($.Mustache.add('string-template', '<div class="item"><h2>{{title}}</h2><iframe class="video w100" width="640" height="360" src="//www.youtube.com/embed/{{videoid}}" frameborder="0" allowfullscreen></iframe></div>'));

function render(data) {
  var  tpl = $.Mustache.render("string-template", data);
  $("#results").append(tpl);
}

function showResponse(response) {
    // var responseString = JSON.stringify(response, '', 2);
    // document.getElementById('results').innerHTML += responseString;
    for(var i = 0; i < response.items.length; i++){
      var title = response.items[i].snippet.title;
      var videoid = response.result.items[i].id.videoId;
      if (!!title && !!videoid) {
        render({title: title, videoid: videoid});
      }
    }
}

function onSearchResponse(response) {
    showResponse(response);
}

function makeRequest() {
  var request = gapi.client.youtube.search.list({
    part: "snippet",
    q: "Beyonce"
  });
  request.then(
    function(response) {
    request.execute(onSearchResponse);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
}

function init() {
  gapi.client.setApiKey('AIzaSyBTbGx_g_3vllA6IEhPn4mCBW5MWdvRFaA');
  gapi.client.load('youtube', 'v3').then(makeRequest); //Research what then() does
}

gapi.load('client', init);
