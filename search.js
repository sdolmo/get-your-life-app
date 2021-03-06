$(document).ready($.Mustache.add('string-template', '<div class="item"><h2>{{title}}</h2><iframe class="video w100" width="640" height="360" src="//www.youtube.com/embed/{{videoid}}" frameborder="0" allowfullscreen></iframe></div>'));

function renderResponse(data) {
  var  tpl = $.Mustache.render("string-template", data);
  $("#results").append(tpl);
  resetSearch()
}

function showResponse(response) {
    for(var i = 0; i < response.items.length; i++){
      var title = response.items[i].snippet.title;
      var videoid = response.result.items[i].id.videoId;
      if (!!title && !!videoid) {
        renderResponse({title: title, videoid: videoid});
      }
    }
}

function onSearchResponse(response) {
    if ($("#results").is(":empty")){
      showResponse(response);
    } else {
      $("#results").empty();
      showResponse(response);
    }
}

function makeRequest() {
  $("form").on("submit", function(event){
    event.preventDefault();
    var request = gapi.client.youtube.search.list({
      part: "snippet",
      q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
    });
    request.then(
      function(response) {
      request.execute(onSearchResponse);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  });
}

function resetSearch() {
  $("#search").val('');
}

function init() {
  gapi.client.setApiKey('AIzaSyBTbGx_g_3vllA6IEhPn4mCBW5MWdvRFaA');
  gapi.client.load('youtube', 'v3').then(makeRequest); //Research what then() does
}

gapi.load('client', init);
