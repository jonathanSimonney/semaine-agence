window.onload = function() {
  
  var counter = 0;
  var c = 0;
  var i = setInterval(function(){
      
      document.querySelector(".loading-page .counter h1").innerHTML = c + "%";
      
      document.querySelector(".loading-page .counter hr").style.width = c + "%" ;
      
     console.log(counter);
      
    counter++;
    c++;
      
    if(counter == 101) {
        clearInterval(i);
    }
  }, 50);
};