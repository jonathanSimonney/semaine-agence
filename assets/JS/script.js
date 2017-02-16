function loadPage(){
    var counter = 0;
    var c = 0;

    var i = setInterval(function(){
        $(".loading-page .counter h1").html(c + "%");

        $(".loading-page .counter hr").css('width' , c + "%");
        counter++;
        c++;

        if(counter == 101) {
            clearInterval(i);
            fillThings('assets/views/page2.html', $('.pseudoBody')[0], function());
        }
    }, 50);
}

function fillThings(url, container, additionalInstructions) {
    $(function() {
        $.ajax({ type: 'GET',
            url: url,
            dataType: 'text',
            success : function(text)
            {
                $(container).html(text);

                if (additionalInstructions !== undefined){
                    additionalInstructions();
                }
            }
        });
    });
}

$(function() {
    loadPage();
});