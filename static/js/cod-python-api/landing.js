let path = document.querySelector("#landing-path");
const length = path.getTotalLength();

path.style.strokeDasharray = length;
path.style.strokeDashoffset = length; 