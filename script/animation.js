var ticketAnimation1;
var ticketAnimation2;
var repeatTime1 = 10;
var repeatTime2 = 15;

// var birdImg = document.getElementById('birdImg');

var $birdMovingImg1 = $('#birdMovingImg1')
var $birdMovingImg2 = $('#birdMovingImg2')
//hide the images when the second time finishes


var $birdStillImg1 = $('#birdStillImg1');
var $birdStillImg2 = $('#birdStillImg2');
var $birdStillImg3 = $('#birdStillImg3');
var $birdStillImg4 = $('#birdStillImg4');

var movePixels = 3;

function animationInit() {


  $birdMovingImg1.css('top','535px');
  $birdMovingImg1.css('left','300px');


  //place static images
  $birdStillImg2.css('top','505px');
  $birdStillImg2.css('left','160px');

  $birdStillImg1.css('top','420px');
  $birdStillImg1.css('left','450px');

  $birdStillImg3.css('top','525px');
  $birdStillImg3.css('left','89px');
  $birdStillImg4.css('top','517px');
  $birdStillImg4.css('left','0px');
}



function startAnimation(){

  $birdMovingImg1.show();
  $birdMovingImg2.show();
  // birdImg.style.left = 0;
  $birdMovingImg1.css('top','40px');
  $birdMovingImg1.css('left','0px');

  $birdMovingImg2.css('top','200px');
  $birdMovingImg2.css('left','0px');

  setupAnimation();

  // $birdStillImg1.show();
  $birdStillImg2.show();
  $birdStillImg3.show();
  $birdStillImg4.show();
}

// function stopAnimations(ticket) {
//   console.log('clearing ticket ',ticket);
//   clearInterval(ticket)
//   ticket = undefined;
//   console.log('cleared ticket ',ticket);
//   if ((ticketAnimation1 == undefined)&& (ticketAnimation2 == undefined)) {
//     // all animations have stopped
//     console.log('hide images');
//     hideStillImages();
//   }
// }

function hideStillImages() {
  $birdStillImg1.hide();
  $birdStillImg2.hide();
  $birdStillImg3.hide();
  $birdStillImg4.hide();
}

//array ond object by ref, primitive types are a COPY, and wont change the gobal value

function setupAnimation() {
  if (ticketAnimation1 == undefined){
    ticketAnimation1 = setInterval (animateTheBird1, repeatTime1)
  }

  if (ticketAnimation2 == undefined){
    ticketAnimation2 = setInterval (animateTheBird2, repeatTime2)
  }
}

function animateTheBird1() {

  //move the first bird.
  var currentLeft = parseInt($birdMovingImg1.css('left'));
  $birdMovingImg1.css('left', (currentLeft + movePixels) + 'px');

  if (currentLeft > (window.innerWidth- parseInt($birdMovingImg1.css('width')))) {
    $birdMovingImg1.hide();
    clearInterval(ticketAnimation1)
    ticketAnimation1 = undefined;
}
}

function animateTheBird2() {

  //move the second bird.
  var currentLeft = parseInt($birdMovingImg2.css('left'));
  $birdMovingImg2.css('left', (currentLeft + movePixels) + 'px');

  if (currentLeft > (window.innerWidth- parseInt($birdMovingImg2.css('width')))) {
    $birdMovingImg2.hide();
    clearInterval(ticketAnimation2)
    ticketAnimation2 = undefined;
    hideStillImages();
}

}
