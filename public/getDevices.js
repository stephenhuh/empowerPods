var bar = new ProgressBar.Line(container, {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: {width: '100%', height: '100%'}
});

bar.animate(1.0);  // Number from 0.0 to 1.0

/*
$(function(){
  $.ajax({
    url: ""  
  
  }).done(function(){
    $("#loader"). 
  
  });
});
*/
