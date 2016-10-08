// function appendResults(text) {
//   var results = document.getElementById('results');
//   results.appendChild(document.createElement('P'));
//   results.appendChild(document.createTextNode(text));
// }

function showResponse(response) {
    var resultsView = document.getElementById("results");
    // var responseString = JSON.stringify(response, '', 2);
    // document.getElementById('results').innerHTML += responseString;
    for(var i = 0; i < response.items.length; i++){
      var node = document.createElement("p");
      var textNode = document.createTextNode(response.items[i].snippet.title );
      node.appendChild(textNode);
      resultsView.appendChild(node);
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
