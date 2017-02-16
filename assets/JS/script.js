function redirectPage2(){
    fillThings('assets/views/videoTag.html', $('.audioContainer')[0]);

    fillThings('assets/views/page2.html', $('.pseudoBody')[0], function(){
        $('.pseudoBody').removeClass('page1');
        $('.pseudoBody').addClass('page2');
        fillThings('assets/style/images/logo.svg', document.querySelector('#myLogoContainer'), function(){
            document.querySelector('#myLogo').addEventListener('animationend', function(e){
                testFunction(this);
            });
        });
    });
}

function createSubPage(numberPage){
    var subPage = document.createElement('div');
    $(subPage).addClass('subPage'+numberPage);
    return subPage;
}

function redirectPage3(){
    $('.page2').addClass('page3');
    $('.page2').removeClass('page2');
    $('.pseudoBody').html('');

    for (var i = 1; i != 5; i++){
        var subpage = createSubPage(i);
        $('.pseudoBody')[0].appendChild(subpage);

        fillThings('assets/views/subPage'+i+'.html', subpage);
    }
}

function redirect(event){
    if (event.target === document.querySelector('#myLogoContainer')){
        redirectPage3();
    }
}

function getRandomNumberInLength(length){
    return Math.floor(Math.random()*length);
}

function createRandomNote(number, parentElement){
    console.log(parentElement);
    for (var i = 0; i != number; i++){
        var noteContainer = document.createElement('span');
        noteContainer.className = 'musicNote';

        if (Math.random() < 0.5){
            noteContainer.className += ' musicAnimationLeft'
        }else{
            noteContainer.className += ' musicAnimationRight'
        }

        $(noteContainer).html('<i class="fa fa-music" aria-hidden="true"></i>');
        $(noteContainer).css({
            top : getRandomNumberInLength($(parentElement).height()),
            left : getRandomNumberInLength($(parentElement).width())
        });

        parentElement.appendChild(noteContainer);
    }
}

function testFunction(currentElement) {
    if (currentElement.parentNode.className.search(' enlarging') === -1){
        currentElement.parentNode.className += ' enlarging';
        document.querySelector('.enlarging').addEventListener('animationend', function(e){
            redirect(e);
        });
    }
}

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
            redirectPage2();
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