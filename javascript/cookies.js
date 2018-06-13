<<<<<<< HEAD
// code cookies


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
=======
// https://stackoverflow.com/questions/14573223/

function setCookie(name,value,hours) {
    var expires = "";
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours*60*60*1000));
>>>>>>> 151d37c1d71df4e5a05f99ad79b937b3faaf12bd
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
<<<<<<< HEAD
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}
=======
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

eraseCookie('heure');

// setCookie('ppkcookie','testcookie',7);

// var x = getCookie('ppkcookie');
// if (x) {
//     console.log('cookie: '+x);
// }
>>>>>>> 151d37c1d71df4e5a05f99ad79b937b3faaf12bd
