let DATA = {
  // a string array of the symbols
  symbols: [],
  // keep the time series for each symbol
  data: {},
  current: {},
  original: {},
};
const KEY = '1FQ2EX4V1KYE0I8K';

function getSymbol(symbol) {
  return $.ajax({
    url: 'https://www.alphavantage.co/query',
    data: {
      function: 'TIME_SERIES_DAILY',
      symbol: symbol,
      apikey: KEY
    }
  });
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
  localStorage.setItem('data', JSON.stringify(DATA));
}

function renderTickerList() {
  const tickers = DATA.symbols.map(ticker => {
    return `
                <li>
                <span class="row-span">
                <a href="#" class="ticker-name">${ticker}</a></span>
                <span class="ticker-current"><i>$${DATA.current[ticker]}</i></span>
                <span class="ticker-since"><i>$${DATA.original[ticker]}</i></span>
                <span class="row-span">
                <button class="ticker-remove" data-ticker="${ticker}"></button>
                </span>
                </li>
            `


  }).join('');
  $('.portfolio').html(tickers);
}

function initializeData() {
  const data = localStorage.getItem('data');
  if (data !== null) {
    DATA = JSON.parse(data);
  }
}

function addToPortfolio(ticker) {
  getSymbol(ticker).then(data => {
    if (data['Error Message']) {
      console.warn(`Invalid symbol: ${ticker}`);
    } else if (data['Time Series (Daily)']) {
      if (!DATA.symbols.includes(ticker)) {
        const series = Object.entries(data['Time Series (Daily)']).map((pair) => {
          const date = pair[0];
          const close = pair[1]['4. close'];
          return [new Date(date).getTime(), parseFloat(close, 10)];
        });
        DATA.symbols.push(ticker);
        DATA.data[ticker] = series;
        DATA.current[ticker] = series[series.length - 1][1];
        DATA.original[ticker] = series[series.length - 1][1];
        emit('list-update');
      }
    }
  });
}

function removeFromPortfolio(ticker) {
  const index = DATA.symbols.indexOf(ticker);
  DATA.symbols.splice(index, 1);
  delete DATA.data[ticker];
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
    if (DATA.symbols.length === 0) {
      $('#stock *').attr('visibility', 'hidden');
      $('#stock').css('visibility', 'hidden');
    } else {
      $('#stock*').attr('visibility', 'visible');
      $('#stock').css('visibility', 'visible');
    }
  });
}

function clickStock() {
  $(document).on('click', '.ticker-name', e => {
    e.preventDefault();
    const symbol = $(e.target).text();
    renderStockTimeSeries(symbol);
  });
}

function render() {
  const html = `  <div class="portfolio-header">
                  <span class="row-span">Holding</span>
                  <span class="row-span">Current</span>
                  <span class="row-span">Previous</span>
                  <span class="row-span">Delete</span>
                  </div>
               `;
  $('.portfolio-header').html(html);
  renderTickerList();
}

function renderStockTimeSeries(symbol) {
  Highcharts.stockChart('stock', {
    rangeSelector: {
      selected: 1
    },

    title: {
      text: `${symbol} Stock Price`
    },

    series: [{
      name: symbol,
      data: DATA.data[symbol],
      tooltip: {
        valueDecimals: 2
      }
    }]
  });
}

function initializeEvents() {
  submitPortfolio();
  clickDelete();
  clickStock();
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
