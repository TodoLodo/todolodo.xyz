let path = document.querySelector("#landing-path");
const length = path.getTotalLength();

path.style.strokeDasharray = length;
path.style.strokeDashoffset = length; 

let navList = document.getElementsByClassName('nav');
var style = window.getComputedStyle(navList[0], null).getPropertyValue('font-size');
var fontSize = parseFloat(style); 

