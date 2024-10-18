setTimeout( function() {
    var a = document.getElementById('shuttle');
    var address = a.attributes['href'].nodeValue;
    window.location.href = address;
}, 30 * 1000 );