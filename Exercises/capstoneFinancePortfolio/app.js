const STORE = [
  {name: "AAPL"},
];


function generateTimeline(tickerSymbol, tickerIndex, apikey) {
  // Function to generate portfolio timeline
  //
}

function addtoPortfolio(tickerSymbol) {
  STORE.push({name: tickerSymbol});
}

function submitPortfolio() {
  $('#js-portfolio-form').submit(function(event) {
    event.preventDefault();
    const ticker = $('.js-tickerSymbol').val();
    $('.js-tickerSymbol').val('');
    addtoPortfolio(ticker);
  });
}


function deletefromPortfolio() {
  });
}

// Functions to handle
// function to add/remove ticker symbol to portfolio store
// function to retrieve data using alphavantage API and input symbol
// fuction to show timeline scale after symbol is added.
function initPortfolioList() {
  submitPortfolio();
  deletefromPortfolio();
}

// First method which is called when page is loaded
$(initPortfolioList);
