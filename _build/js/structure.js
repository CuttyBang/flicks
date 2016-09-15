const $ = require('jquery');

$("#menu-toggle").click((e)=> {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
