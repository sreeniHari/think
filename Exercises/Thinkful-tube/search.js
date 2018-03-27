const YOUTUBE_DATA_API = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    q: `${searchTerm}`,
    resultsPerPage: 5,
    part: 'snippet',
    key: 'AIzaSyDp-1hKduSFbiyblNkHj4YulGn8quWxdw0'
  }
  $.getJSON(YOUTUBE_DATA_API, query, callback);
}

function renderResult(result, thumbnail, id) {
  var url = 'https://www.youtube.com/watch?v=' + id;
  return `
    <div>
    <a href="${url}">
    <img class="banner" src="${thumbnail}">
    </a>
    </div>
  `;
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item,
    data.items[index].snippet.thumbnails.high.url,
    data.items[index].id.videoId
  ));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(watchSubmit);
