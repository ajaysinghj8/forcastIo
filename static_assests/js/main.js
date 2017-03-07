(function($){


$('td[key="time"]').each(processElem);
$('form#city-form').on('submit', redirectTo)

return;
////////////////////////////////////////////
function redirectTo(event){
  event.preventDefault();
  var city = $(this).serialize().split('=')[1];
  if(city){
     window.location.href = '/weather/'+city;
  }
}
function processElem(elm){
  try{
    var number =  window.parseInt($(this).text()) *1000;
    $(this).text(moment(number).format('YYYY-MM-DD  HH:mm'));
  }catch(ex){
    console.warn(ex);
  }
}


})(jQuery);

