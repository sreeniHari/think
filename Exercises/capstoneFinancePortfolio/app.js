let STORE = [];

function generateTimeline(tickerSymbol, tickerIndex, apikey) {
  // Function to generate portfolio timeline
  //
}

function emit(eventName) {
    switch (eventName) {
        case 'list-update':
            updateLocalStorage();
            renderTickerList();
            break;
    }
}

function updateLocalStorage() {
    localStorage.setItem('data', JSON.stringify(STORE));
}

function renderTickerList() {
    const tickers = STORE.map(ticker => {
        return `
            <li class="ticker">
                <button class="ticker-remove" data-ticker="${ticker}">X</button>
                <span class="ticker-name">${ticker}</span>
                <span class="ticker-current"><i>$160.03</i></span>
                <span class="ticker-since"><i>$160.03</i></span>
            </li>`;
    }).join('');
    $('.portfolio').html(tickers);
}

function initializeData() {
    const data = localStorage.getItem('data');
    if (data !== null) {
        STORE = JSON.parse(data);
    }
}

function addToPortfolio(ticker) {
    if (!STORE.includes(ticker)) {
        //STORE.push({ticker, date: new Date().getTime(), costBasis: value, numberOfShares: 100});
        STORE.push(ticker);
        emit('list-update');
    }
}

function removeFromPortfolio(ticker) {
    const index = STORE.indexOf(ticker);
    STORE.splice(index, 1);
    emit('list-update');
}

function submitPortfolio() {
  $('#js-portfolio-form').submit(function(event) {
    event.preventDefault();
    const ticker = $('.js-tickerSymbol').val();
    $('.js-tickerSymbol').val('');
    addToPortfolio(ticker);
  });
}


function clickDelete() {
    $(document).on('click', '.ticker-remove', e => {
        e.preventDefault();
        const ticker = $(e.target).data('ticker');
        removeFromPortfolio(ticker);
    });
}

function render() {
    renderTickerList();
}

function initializeEvents() {
    submitPortfolio();
    clickDelete();
}

// Functions to handle
// function to add/remove ticker symbol to portfolio store
// function to retrieve data using alphavantage API and input symbol
// fuction to show timeline scale after symbol is added.
function initPortfolioList() {
  initializeData();
  initializeEvents();
  render();
}

// First method which is called when page is loaded
$(initPortfolioList);
