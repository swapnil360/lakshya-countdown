var deadline = setEventString();

$(document).ready(function () {
  $('#play-button').click(function () {
    console.log('click');
    console.log(deadline);
    cookieMaker("EventShuruHuaTha");
    console.log(deadline);
    initializeClock(deadline);
  });
});

function initializeClock(endtime) {
  console.log('Miss Me?');
  var hoursSpan = document.getElementById('hours');
  var minutesSpan = document.getElementById('minutes');
  var secondsSpan = document.getElementById('seconds');

  function updateClock() {
    var t = getTimeRemaining(deadline);
    console.log(t);
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  setInterval(updateClock, 1000);
}

function cookieMaker(cookieVar) {
  var result = readCookie(cookieVar);
  if(result != null || result != undefined){
    console.log('Cookie Found!' + result);
    console.log('Previous Time Used');
    window.deadline = Cookies.get(cookieVar);
    console.log(window.deadline);
  }
  else {
    console.log('Making A Cookie');
    console.log(window.deadline);
    Cookies.set(cookieVar, window.deadline, { expires: 7, path: '' });
    window.deadline = setEventString();
  }
}

function setEventString() {
  var myDate = new Date();
  var startHours = myDate.getHours();
  var startMinutes = myDate.getMinutes();
  var startSeconds = myDate.getSeconds();
  // var startHours = ("0" + (myDate.getHours()).toString).slice(-2);
  // var startMinutes = ("0" + (myDate.getMinutes()).toString).slice(-2);
  // var startSeconds = ("0" + (myDate.getSeconds()).toString).slice(-2);
  var eventEndTemplate = "January 09 2016 " +
                            (("0" + startHours.toString()).slice(-2)) +
                            ":" + (("0" + startMinutes.toString()).slice(-2)) +
                            ":" + (("0" + startSeconds.toString()).slice(-2)) +
                            " GMT+05:30";
  return eventEndTemplate;
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function readCookie(name) {
  console.log("Running check for cookie: " + name);
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
