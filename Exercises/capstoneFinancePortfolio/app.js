//FANG stocks to begin with
//'FB','AAPL','AMZN','GOOG'}
let STORE = [];

function validateTickerSymbol(tickerSymbol) {
  // Validate with yahoo finance API csv or NASDAQ csv
}

function generateTimeline(tickerSymbol, tickerIndex, apikey) {
  // Function to generate portfolio timeline
  //
}

function renderPortfolio() {
  if (STORE.length > 0) {
    const html = STORE.map(ticker => {
      return '<li class="ticker">${ticker}</li>';
    }).join('');
    $('.portfolio').html(html);
  }
}

function addtoPortfolio(tickerSymbol) {

  // Push into store
  STORE.push(tickerSymbol);

  // Update local storage
  localStorage.setItem('portfolio', JSON.stringify(STORE));

  //render portfolio symbols
  renderPortfolio();
}


function submitPortfolio() {
  $('#portfolio-form').submit(function(event) {
    event.preventDefault();
    const ticker = $('.js-tickerSymbol').val();
    $('.js-tickerSymbol').val('');
    addtoPortfolio(ticker);
  });
}


function removefromPortfolio() {

}


function initialize() {
  previousRetainedData = localStorage.getItem('portfolio');
  if (previousRetainedData != null) {
    STORE = JSON.parse(previousRetainedData);
  }
}

// Functions to handle
// function to add/remove ticker symbol to portfolio store
// function to retrieve data using alphavantage API and input symbol
// fuction to show timeline scale after symbol is added.
function initPortfolioList() {
  initialize();
  submitPortfolio();
  removefromPortfolio();
  addtoPortfolio();
  renderPortfolio();
}

// First method which is called when page is loaded
$(initPortfolioList);
