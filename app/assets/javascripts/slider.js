/**
 * Created by tro_alex@mail.ru on 08.09.15.
 */
function Carousel(option) {
  var _this = $(this);
  var elem = option.elem,
    newLeft = 0,
    arrowButton = $(".arrow", elem),
    arrowLeft = $(".prev", elem),
    arrowRight = $(".next", elem),
    carouselInnerBox = $(".carousel-inner-box", elem),
    containerWidth = $(".container").width() + 8,
    innerBoxWidth = 0;


  setCarouselWidth();
  toggleButton();

  // Set width for dynamic inner box
  function setCarouselWidth() {
    var thumbsQuantity = $(".row .image-frame", elem).length;
    innerBoxWidth = thumbsQuantity*240/2 + 496;
    carouselInnerBox.width(innerBoxWidth + "px");
  }

  // Show arrow buttons when possible
  function toggleButton() {
    newLeft == 0 ? arrowLeft.hide() : arrowLeft.show();
    Math.abs(newLeft) >= innerBoxWidth - containerWidth ? arrowRight.hide() : arrowRight.show();
  }

  //Move slides left/right
  _this.moveCarousel = function() {

    if($(this).hasClass("prev")) {
      newLeft += containerWidth;
    } else {
      newLeft -= containerWidth;
    }
    carouselInnerBox.css("left", newLeft + "px");
    toggleButton();
  };

  arrowButton.on("click", _this.moveCarousel);


  // Change Container(Carousel) width on window resize
  $(window).on("resize", function() {
    containerWidth = $(".container").width() + 8;
    newLeft = 0;
    carouselInnerBox.css("left", newLeft + "px");
    toggleButton();
  });

}


$(document).ready(function() {
  var firstCarousel = new Carousel({
    elem: $("#carousel")
  });

});
