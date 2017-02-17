function addMenu(){
    if ($('nav')[0] === undefined){
        fillThings('assets/views/menu.html', $('body')[0], function (){}, false);

        $('a').each(
            $(this).click(function(event){
                event.preventDefault();
                if (!isNaN(event.target.className) && event.target.className != undefined && event.target.className != ''){
                    alert(event.target.className);
                    window["loadPage"+event.target.className]();
                }
            })
        );
    }
}

function suppressMenu(){
    if ($('nav')[0] != undefined){
        $('nav')[0].parentNode.removeChild($('nav')[0]);
    }
}

function loadPage1(){
    fillThings('assets/views/page1.html',$('body'), function(){
        loadPage();
        $('.pseudoBody')[0].className = 'pseudoBody page1';
    });
    suppressMenu();
}

function loadPage2(){
    $('.pseudoBody')[0].className = 'pseudoBody page2';
    fillThings('assets/views/videoTag.html', $('.audioContainer')[0]);

    fillThings('assets/views/page2.html', $('.pseudoBody')[0], function(){
        fillThings('assets/style/images/logo.svg', $('#myLogoContainer')[0], function(){
            document.querySelector('#myLogo').addEventListener('animationend', function(e){
                testFunction(this);
            });
        });
    });
}

function loadPage3(){
    $('.pseudoBody')[0].className = 'pseudoBody page3';

    fillThings('assets/views/page3.html', $('.pseudoBody')[0], function(){
        createRandomNote(4, $('.pseudoBody')[0]);
        addMenu();
    });
}

function loadPage4(){
    $('.pseudoBody')[0].className = 'pseudoBody page4';
    fillThings('assets/views/page4.html', $('.pseudoBody')[0], function(){
        addMenu();
    })
}

function loadPage5(){
    $('.pseudoBody')[0].className = 'pseudoBody page5';
    fillThings('assets/views/page5.html', $('.pseudoBody')[0], function(){
        addMenu();
    })
}

function load(event){
    if (event.target === document.querySelector('#myLogoContainer')){
        loadPage3();
    }
}

function getRandomNumberInLength(length){
    return Math.floor(Math.random()*length);
}

function createRandomNote(number, parentElement){
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
            load(e);
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
            loadPage2();
        }
    }, 50);
}

function fillThings(url, container, additionalInstructions, removeContent) {
    $(function() {
        $.ajax({ type: 'GET',
            url: url,
            dataType: 'text',
            success : function(text)
            {
                if (removeContent != false){
                    $(container).html(text);
                }else{
                    $(container).html($(container).html()+text);
                }

                if (additionalInstructions !== undefined){
                    additionalInstructions();
                }
            }
        });
    });
}

$(function() {
    loadPage1();
});