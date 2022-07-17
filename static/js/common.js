window.scrollTo({top: 0, behavior: 'smooth'});

// --------- Facebook SDK ----------------------------
window.fbAsyncInit = function() {
  FB.init({
    appId      : '{your-app-id}',
    cookie     : true,
    xfbml      : true,
    version    : '{api-version}'
  });
    
  FB.AppEvents.logPageView();   
    
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
// --------------------------------------------------

var todo = document.getElementById("todo");
var main = document.getElementById("main");
var scrollbarContainer = document.getElementById("scrollbar-container");
var scrollbar = document.getElementById("scrollbar");

//scrollbar height change on load

window.addEventListener("scroll", (event) => {
    var scroll = this.scrollY;
    scrollbar.style.top = `${scrollbarContainer.clientHeight * (scroll/main.clientHeight)}px`;
});

todo.addEventListener("mouseenter",function(e) {
    e.target.firstElementChild.style.color = 'var(--color4)';
    e.target.firstElementChild.style.margin = '1.5rem';
});

todo.addEventListener('mouseleave', function(e) {
    e.target.firstElementChild.style.color = 'var(--color2)'
});

dragElement(scrollbar);

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos2 = pos4 - e.clientY;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    if (elmnt.offsetTop - pos2 < 0) {
        elmnt.style.top = "0px"
    }
    if (elmnt.offsetTop - pos2 > scrollbarContainer.clientHeight - scrollbar.clientHeight) 
    {
        elmnt.style.top = `${scrollbarContainer.clientHeight - scrollbar.clientHeight}px`
    }
    let scrollAmount = main.clientHeight * ((scrollbar.offsetTop)/(scrollbarContainer.clientHeight));
    window.scrollTo(0,scrollAmount); 
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function scrollbarHeightChange () {
  scrollbar.style.height = `${scrollbarContainer.clientHeight * (window.innerHeight/main.clientHeight)}px`;
}