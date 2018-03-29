const YOUTUBE_DATA_API = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(options) {
  const query = {
    q: `${options.searchTerm}`,
    maxResults: 10,
    pageToken: options.pageToken,
    part: 'snippet',
    key: 'AIzaSyDp-1hKduSFbiyblNkHj4YulGn8quWxdw0'
  }
  $.getJSON(YOUTUBE_DATA_API, query, displayYoutubeSearchData);
}

function renderResult(result) {
return `
  <div class ="col">
   <a data-fancybox="gallery" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}"></a>
   <a class="channel" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">More >></a>
 </div>
 `;
}

function renderNavigation(res) {
    const nextPageToken = res.nextPageToken;
    const prevPageToken = res.prevPageToken;
    return `
        <nav>
            <div class="meta">
                Found ${res.pageInfo.totalResults} results!
            </div>
            <div class="buttons">
            ${prevPageToken ? `<button class="prev" data-token="${prevPageToken}">Previous</button>` : ''}
            ${nextPageToken ? `<button class="next" data-token="${nextPageToken}">Next</button>` : ''}
            </div>
        </nav>
    `;
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item)).join('');
  const nav = renderNavigation(data);
  $('.js-search-results').html(`${nav}${results}`);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    getDataFromApi({ searchTerm: query });
  });
}

$(document).on('click', '.next, .prev', e => {
  getDataFromApi({
      searchTerm: $('.js-query').val(),
      pageToken: $(e.target).data('token')
  });
});

$(watchSubmit);
