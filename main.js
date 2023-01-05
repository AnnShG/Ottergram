// variables for each of the data attributes
// = means “Take the value on the righthand side and give it the name on the lefthand side.
// so var`s text/label is the name for our attribute selector in JS code
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

//first function. Calling a function is like saying “Make a sandwich” instead of “Lay out two slices of bread. Put prosciutto, salami, and provolone on one slice. Put the other slice of bread on top.”
function setDetails(imageUrl, titleText) {
  'use strict';
  // we ddeclare a variable that connects to general variable outside of the function
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);

  //then we use new variable inside the function and it works with connection to general variable that works with html
  detailImage.setAttribute('src', imageUrl); //function inside the function

// document.querySelector - searches for matching results in  the html document
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText; //The textContent property is the text (not including HTML tags) inside of an element.
  // You need a way to tell setDetails which image and what text to use when you call ii (with parameters help)
}

function imageFromThumb(thumbnail) { //thumbnail is a reference to a thumbnail anchor element
'use strict';
return thumbnail.getAttribute('data-image-url'); //It will retrieve and return the value of the data-image-url attribute.
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title')
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

/*An event listener is an object that, as the name suggests, “listens” for a particular event, such as a
mouse click. When its assigned event occurs, the event listener triggers a function call in response to
the event.
This practice of passing a function to another
function is quite common in JavaScript and is known as a callback pattern because the function you
pass in as an argument will get “called back” at some point in the future.
*/

function addThumbClickHandler(thumb) {
thumb.addEventListener('click', function (event) { //anonymous function with event callback
  event.preventDefault();
  setDetailsFromThumb(thumb); /* it is a function. The anonymous function you passed to addEventListener is able to access the setDetailsFromThumb function because
  setDetailsFromThumb was declared in the global scope*/
  showDetails();
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() { //This method will tie together all of the steps for making Ottergram interactive.
  'use strict'
   var thumbnails = getThumbnailsArray(); // I called a previous function
   thumbnails.forEach(addThumbClickHandler); // callback function
   addKeyPressHandler();
}

initializeEvents();

function hideDetails() { //ts job is to add a class name to the <body> element
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  'use strict'
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function addKeyPressHandler() {
  'use strict'
  document.body.addEventListener('keyup', function(event) {
    event.preventDefault();
    console.log(event.keyCode); //All of the keypress events have a property called keyCode that corresponds to the key that triggered the event. The keyCode is an integer, like 13 for Return, 32 for the space bar, and 38 for the up arrow.
    if (event.keyCode === ESC_KEY) { //You used the strict equality operator (===) to compare the values of event.keyCode and ESC_KEY.
    hideDetails(); //When these value are the same, you call hideDetails.
    }
  });
}
