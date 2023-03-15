/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////

/*
Requests with Fetch API
Review

In this lesson, we learned how to make GET and POST requests using the Fetch API
and async/await keywords. Let’s recap on the concepts covered in the previous
exercises:

    GET and POST requests can be created in a variety of ways.
    We can use fetch() and async/await to asynchronous request data from APIs.
    Promises are a type of JavaScript object that represents data that will
    eventually be returned from a request.
    The fetch() function can be used to create requests and will return
    promises.
    We can chain .then() methods to handle promises returned by the fetch()
    function.
    The async keyword is used to create asynchronous functions that will return
    promises.
    The await keyword can only be used with functions declared with the async
    keyword.
    The await keyword suspends the program while waiting for a promise to
    resolve.

Congratulations on learning all about asynchronous requests using fetch(),
async, and await! These concepts are fundamental to helping you develop more
robust web apps!
Instructions

Play around with the browser and code to make GET and POST requests. To make
POST requests to the Rebrandly API, make sure you assign apiKey your Rebrandly
API key and run the code!

If you want to challenge yourself:

    Rewrite the requests from scratch.
    Replace the helper functions (renderResponse() in public/helperFunctions.js)
    with your own code.
    Use different APIs to make GET/POST requests using async/await.


*/

/////////////////////////////////////////////////////////////////////////////////
// NOTE: wordSmith functions from lines 4 - 41
// NOTE: byteSize functions from lines 43 - 85 (remember to add your API key!)

/*
wordSmith
*/
// Information to reach API
const dataMuseUrl = 'https://api.datamuse.com/words?';
const queryParams = 'rel_jja=';

// Selecting page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

// Asynchronous function
// Code goes here
const getSuggestions = async () => {
  const wordQuery = inputField.value;
  const endpoint = `${dataMuseUrl}${queryParams}${wordQuery}`;
  try {
    const response = await fetch(endpoint, {cache: 'no-cache'});
    if(response.ok){
      const jsonResponse = await response.json();
      renderWordResponse(jsonResponse);
    }
  } catch (error) {
    console.log(error);
  }
}

// Clear previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  getSuggestions();
}

submit.addEventListener('click', displaySuggestions);

/*
byteSize
*/
// information to reach API
const apiKey = '<Your API Key>';
const rebrandlyEndpoint = 'https://api.rebrandly.com/v1/links';

// Some page elements
const shortenButton = document.querySelector('#shorten');

// Asynchronous functions
// Code goes here
const shortenUrl = async () => {
	const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten});
  try {
    const response = await fetch(rebrandlyEndpoint, {
			method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json',
				'apikey': apiKey
      }
    });
		if(response.ok){
      const jsonResponse = await response.json();
      renderByteResponse(jsonResponse);
    }
  } catch (error) {
    console.log(error);
  }
}

// Clear page and call Asynchronous functions
const displayShortUrl = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  shortenUrl();
}

shortenButton.addEventListener('click', displayShortUrl);

/////////////////////////////////////////////////////////////////////////////////
