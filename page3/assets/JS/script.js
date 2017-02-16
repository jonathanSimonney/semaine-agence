function applyGradientToText(text){
    return ('<svg id=\'myLogo\' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1239.95 150.9">'+
        '<defs>'+
        '<defs>'+
        '<linearGradient id="MyGradient" x1="0" x2="0" y1="0" y2="1">'+
        '<stop offset="30%" stop-color="#fff"/>'+
        '<stop offset="70%" stop-color="#fff"/>'+
        '</linearGradient>'+
        '</defs>'+
        '</defs><text fill="url(#MyGradient)">'+text+'</text></svg>');
}

$(function(){
    $('.textPurpleGradient').html(applyGradientToText($('.textPurpleGradient').html()));
});