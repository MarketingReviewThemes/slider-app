/**
 * Created by tro_alex@mail.ru on 08.09.15.
 */
function Carousel(option) {
  var _this = $(this);
  var elem = option.elem,
    leftPosition = 0,
    innerBoxWidth = 0,
    slicedPart = 0,
    slicedPartRight = 0,
    arrowLeft = $(".prev", elem),
    arrowRight = $(".next", elem),
    carouselInnerBox = $(".carousel-inner-box", elem),
    containerWidth = 0,
    leftPositionABS;

  console.log("containerWidth = " + containerWidth);

  //Init carousel
  setCarouselWidth();
  setLeftPosition();
  getCarouselWidth();
  calcSlicedPart();
  toggleButton();


  // Set width for dynamic inner box
  function setCarouselWidth() {
    var thumbsQuantity = $(".image-frame", elem).length;
    innerBoxWidth = thumbsQuantity*240/2 + 460;
    carouselInnerBox.width(innerBoxWidth + "px");
    console.log("InnerBox = " + innerBoxWidth);
  }

  function getCarouselWidth() {
    return containerWidth = parseInt($(".container").css("width"));
  }

  // Show arrow buttons when possible
  function toggleButton() {
    leftPosition == 0 ? arrowLeft.hide() : arrowLeft.show();
    Math.abs(leftPosition) >= innerBoxWidth - containerWidth ? arrowRight.hide() : arrowRight.show();
  }

  // Calculate sliced part of carousel
  function calcSlicedPart() {
    return slicedPart = innerBoxWidth % containerWidth;
  }

  function setLeftPosition() {
    carouselInnerBox.css("left", leftPosition + "px");
  }


  //Move slides left on prev button click
  _this.moveLeft = function() {

    if(slicedPart > 0 && Math.abs(leftPosition)+containerWidth == innerBoxWidth) {
      leftPosition += slicedPart;
    } else {
      leftPosition += containerWidth;
    }

    setLeftPosition();
    toggleButton();
  };
  arrowLeft.on("click", _this.moveLeft);



  //Move slides right on next button click
  _this.moveRight = function() {
    leftPositionABS = Math.abs(leftPosition);

    if (leftPositionABS == 0 && slicedPart > 0 && innerBoxWidth/containerWidth < 2) {
      leftPosition -= slicedPart;
    } else {
      slicedPartRight = innerBoxWidth - 2*leftPositionABS;
      leftPosition -= (slicedPartRight < containerWidth) ? slicedPart : containerWidth;
    }

    setLeftPosition();
    toggleButton();
  };
  arrowRight.on("click", _this.moveRight);


  // Change Container(Carousel) width on window resize
  $(window).on("resize", function() {
    leftPosition = 0;

    // Init carousel
    getCarouselWidth();
    calcSlicedPart();
    setLeftPosition();
    toggleButton();
  });

}


$(document).ready(function() {
  var firstCarousel = new Carousel({
    elem: $("#carousel")
  });

});
