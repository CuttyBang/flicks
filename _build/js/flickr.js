const $ = require('jquery');

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    console.log('clicked');
});

window.onload = init;

window.setTimeout(()=>{
  $('#main').removeClass('hidden');
}, 1200);

window.setTimeout(()=>{
  $('.loading-page').fadeOut('fast');
}, 1000);

var deviceSize;
var pick;
var pics = [];

function init(){
  //$('#small').button('toggle');

  $('input[type=text]').val() == '';
  window.setTimeout(()=>{$('h1').animate({opacity: 1, top: 300, fontSize: 48}, 1000)}, 1500);
  //window.setTimeout(()=>{$('h1').animate({top: 330}, 100).animate({top: 270}, 1000)
  //.animate({top: 310}, 100).animate({top: 290}, 100).animate({top: 300}, 100)}, 1500);
  window.setTimeout(()=>{$('h1').animate({opacity: 0}, 1000)}, 3000);
}




function searchImg(){
  $('.photo-container').html('');
  var query = $('input[type=text]').val();
  var key = '4e45669371625ebbc0477774d58d8a1e';
  var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+key+"&tags="+query+"&licence=1&format=json&nojsoncallback=1";
  $.getJSON(url, (reply) =>{
    $.each(reply.photos.photo,(i, result) =>{
      var sizeURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key='+key+'&photo_id='+result.id+'&format=json&nojsoncallback=1';
      $.getJSON(sizeURL, (size)=>{
        $.each(size.sizes.size, (i,sizeResult)=>{
          if(sizeResult.width==deviceSize){
            pics.push(sizeResult);
            pick = '<a href="'+sizeResult.url+'" target="_blank"><img class="flicks cover" src="'+sizeResult.source+'"/>';
            $('.photo-container').append(pick);
          }
        });
      });
    });
  });
}

$(document).keypress((e)=>{
  if(e.which === 13){
    if($('input[type=text]').val() === ''){
      $('#alert').removeClass('hidden');
    }else{
      $('#alert').addClass('hidden');
      searchImg();
    }
  }
});


$('#submit').click(()=>{
  deviceSize = $('input[name=choice]:checked').val();
  console.log(deviceSize);
  if($('input[type=text]').val() === '' || !deviceSize){
    $('#alert').removeClass('hidden');
  }else{
    searchImg();
    $('input[type=text]').val('');
  }
});


$('#small').on('checked', ()=>{
  $(this).button('toggle');
});

$('#med').on('checked',()=>{
  $(this).button('toggle');
});

$('#large').on('checked', ()=>{
  $(this).button('toggle');
});
