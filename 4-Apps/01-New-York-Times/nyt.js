// shows where api is located and key needed to access (endpoint)
const baseURL = 'https:api.nytimes.com/svc/search/v2/articlesearch.json'; // 1
// need key to access data based on API controller settings
const key = 'UufzYT0Mw0dX6dzLc6pjhI0Sg3mnMTlE'; // 2
// placeholder for future fully built url code
var url;

// assigns a term to all the dom elements you're trying to grab
var searchTerm = document.querySelector('.search');
var startDate = document.querySelector('.start-date');
var endDate = document.querySelector('.end-date');
var searchForm = document.querySelector('form');
var submitBtn = document.querySelector('.submit');
var nextBtn = document.querySelector('.next');
var previousBtn = document.querySelector('.prev');
var section = document.querySelector('section');
var nav = document.querySelector('nav');
// hides the next/prev buttons at start since they aren't needed
nav.style.display = 'none';
// define the initial page number and status of the navigation being displayed
var pageNumber = 0;
// creating variable to be used in the functions
var displayNav = false;
// assigns a function that connects the form submission and clicks to their buttons with the addeventlistener
searchForm.addEventListener('submit', submitSearch);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

// references to the different functions found later on with the 'e' event variable
function submitSearch(e){
// start at pageNumber 0
pageNumber = 0;
fetchResults(e);
}
// using e in place of the 'event' object to be passed to event handlers
function fetchResults(e) {
// keeps page from refreshing contantly so you can actually grab the results; now you can GET data instead of SEND data
e.preventDefault();
// use pieces to build the full URL **careful with syntax
// concatenate strings into one full line
url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value + '&fq=document_type:("article")';
// if statement saying that checks if there is a start or end date before assigning a date range
if(startDate.value !== '') {
    url += '&begin_date=' + startDate.value;
};
if(endDate.value !== '') {
    url += '&end_date=' + endDate.value;
};
// Use fetch() to make the request to the API
fetch(url).then(function(result) {
// return the request to us in js form
    return result.json();
// display the results in a json so we can use it in our function
}).then(function(json) {
    displayResults(json);
});
}
// calling the json function and establishing parameters
function displayResults(json) {
// only while the results are showing on the page, remove those results from the display
while (section.firstChild) {
    section.removeChild(section.firstChild);
}
// creating a variable to pull the docs objects out of the API arrays
var articles = json.response.docs;
// if the length paramater inside articles 
if(articles.length === 10) {
// only display the nav buttons if there are 10 articles in the response
    nav.style.display = 'block';
} else {
    nav.style.display = 'none';
}
// if there are no results
if(articles.length === 0) {
// 
console.log('No Results');
    // var para = document.createElement('p');
    // para.textContent = 'No results returned.'
    // section.appendChild(para);
} else {
    // creates a loop that searches for articles
    for(var i = 0; i < articles.length; i++) {
    // assigns value to the HTML classes on the webpage to feed the api results through
    var article = document.createElement('article');
    var heading = document.createElement('h2');
    var link = document.createElement('a');
    var img = document.createElement('img');
    var para1 = document.createElement('p');
    var para2 = document.createElement('p');
// clears all elements of the div to make room for more
    var clearfix = document.createElement('div');
// setting 'current' to set 
    var current = articles[i];
    console.log(current);
    link.href = current.web_url;
    // takes link item to create the currently displayed headline on the page
    link.textContent = current.headline.main;
    // takes paragraph1 to create new current snippet on the screen
    para1.textContent = current.snippet;
    // creates the area for the keywords search result to populate inside
    para2.textContent = 'Keywords: ';

    // counting by 1, grab each keyword from the API search
    for(var j = 0; j < current.keywords.length; j++) {
        // 
        // for all textContent values (keywords from this search), keep adding them to the 'span' section
        var span = document.createElement('span');
        span.textContent = current.keywords[j].value + ' ';
        para2.appendChild(span);
    }
    // 
    // if current results multimedia exist, populate with the API's image for that current multimedia index
    if(current.multimedia.length > 0) {
        img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
        // if the image doesnt fit or load correctly, dont load it
        img.alt = current.headline.main;
    }
    // clears out the value for these objects after
    clearfix.setAttribute('class','clearfix');
    // sends heading and link back into our function that creates a hyperlink from those items
    article.appendChild(heading);
    heading.appendChild(link);
    article.appendChild(img);
    article.appendChild(para1);
    article.appendChild(para2);
    article.appendChild(clearfix);
    section.appendChild(article);
    }
}
};
// calls the nextpage function that keeps adding a pagenumber addition when you click it
function nextPage(e) {
pageNumber++;
fetchResults(e);
};
// calls the previouspage function that does the same but page backwards instead
function previousPage(e) {
if(pageNumber > 0) {
    pageNumber--;
} else {
    return;
}
fetchResults(e);
};
// 