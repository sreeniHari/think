const YOUTUBE_DATA_API =  'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
    const query = {
        q: `${searchTerm}`,
        resultsPerPage: 5,
        part: 'snippet',
        key: 'AIzaSyDp-1hKduSFbiyblNkHj4YulGn8quWxdw0'
    }
    $.getJSON(YOUTUBE_DATA_API, query, callback);
}

function renderResult(result) {
    return `
    <div>
    <img class="banner" src="${result.snippet.thumbnails.high.url}">
    </div>
  `;
}

function displayYoutubeSearchData(data) {

    const results = data.items.map((item, index) => renderResult(item));
    console.log(results);
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
