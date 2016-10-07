const $ = require('jquery');
  window.setTimeout(()=>{
    $('.wrapper').removeClass('hidden');
  },1200);
  window.setTimeout(()=>{
    $('.loading-page').fadeOut('fast');
  }, 1000);
  var deviceSize;
  var pick;
  var pics = [];

  function init(){
    $('input[type=text]').val('');
    window.setTimeout(()=>{$('h1').animate({opacity: 1, top: 300, fontSize: 56}, 1000)}, 1500);
    //window.setTimeout(()=>{$('h1').animate({top: 330}, 100).animate({top: 270}, 1000)
    //.animate({top: 310}, 100).animate({top: 290}, 100).animate({top: 300}, 100)}, 1500);
    window.setTimeout(()=>{$('h1').animate({fontSize: 60}, 200).animate({top: 400}, 50)
    .animate({top: -100, opacity: 0, fontSize: 28}, 200)}, 3000);
  }



  function searchImg(){
    $('input[type=text]').val('');
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
              pick = '<p class="flicks"><a href="'+sizeResult.url+'" target="_blank"><img src="'+sizeResult.source+'"/>';
              $('.photo-container').append(pick);
            }
          });
        });
      });
    });
  }
  window.onload = init;

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
      $('#alert').addClass('hidden');
      searchImg();
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
