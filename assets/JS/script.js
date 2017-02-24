function formatString(string){
    if (string.search(/\S/) === -1) {
        string =  '';
    }else{
        string = string.replace('/&/g','&amp;');
        string = string.replace(/</g,'&lt;');
    }

    return string;
}

function addMenu(){
    console.log($('nav')[0]);
    fillThings('assets/views/menu.html', $('body'), function (){
        $('#usernameHere').html(sessionStorage['username']);
        $('a').click(function(event) {
            event.preventDefault();
            if (!isNaN(event.target.className) && event.target.className != undefined && event.target.className != '') {
                window["loadPage" + event.target.className]();
            }
        });
    }, false);
}

function addFormConnect() {
    fillThings('assets/views/formConnect.html', $('body'), function (){
        $('form')[0].onsubmit = function(event){
            var userString = formatString($('#name')[0].value);
            if ( userString !== ''){
                sessionStorage.setItem('username', userString);
                suppressHead();
                $('#usernameHere').html(sessionStorage['username']);
                loadPage3();
            }
            return false;
        };
    }, false);
}

function loadPageWithHeader(funcToLoadPage){
    if (addHead() === 'menu'){
        funcToLoadPage();
    }else{
        $('.pseudoBody')[0].className = 'pseudoBody';
        $('.pseudoBody').html('');
    }
}

function addHead(){
    if ($('nav')[0] === undefined){
        if (sessionStorage['username'] !== undefined){
            if (formatString(sessionStorage['username']) !== ''){
                console.log('new menu');
                addMenu();
                return 'menu';
            }
        }
        addFormConnect();
        return 'connect';
    }
    return 'menu';
}

function suppressHead(){
    if ($('nav')[0] != undefined){
        $('nav')[0].parentNode.removeChild($('nav')[0]);
    }
}

function loadPage1(){
    fillThings('assets/views/page1.html',$('body'), function(){
        loadPage();
        $('.pseudoBody')[0].className = 'pseudoBody page1';
        $('body').addClass('noOverflow');
    });
    suppressHead();
}

function loadPage2(){
    $('.pseudoBody')[0].className = 'pseudoBody page2';
    fillThings('assets/views/videoTag.html', $('.audioContainer'));

    fillThings('assets/views/page2.html', $('.pseudoBody'), function(){
        fillThings('assets/style/images/logo.svg', $('#myLogoContainer')[0], function(){
            $('#myLogo')[0].addEventListener('animationend', function(e){
                testFunction(this);
            });
            $('body').addClass('noOverflow');
        });
    });
}

function loadPage3(){
    loadPageWithHeader(function() {
        $('.pseudoBody')[0].className = 'pseudoBody page3';

        fillThings('assets/views/page3.html', $('.pseudoBody'), function(){
            //createRandomNote(4, $('.pseudoBody')[0]);
        });
        $('body').removeClass('noOverflow');
    });
}

function disconnect(){
    sessionStorage.clear();
    suppressHead();
    loadPage3();
}

function loadPage4(){
    loadPageWithHeader(function () {
        $('.pseudoBody')[0].className = 'pseudoBody page4';
        fillThings('assets/views/page4.html', $('.pseudoBody'), function(){
            alert('Sorry. This page does the worst thing you could imagine. You\'d better get out.');
            setTimeout(function () {
                disconnect();
            }, 1000)
        });
    });
}

function loadPage5(){
    loadPageWithHeader(function () {
        $('.pseudoBody')[0].className = 'pseudoBody page5';
        fillThings('assets/views/page5.html', $('.pseudoBody'), function(){
            $('#name')[0].value = sessionStorage['username'];

            $('form')[0].onsubmit = function(event){
                var userString = formatString($('#name')[0].value);
                if ( userString !== ''){
                    sessionStorage['username'] = userString;
                    $('#usernameHere').html(sessionStorage['username']);
                }
                return false;
            };
        });
    });
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
            left : getRandomNumberInLength($(parentElement).width()),//$(parentElement).width()
            top : getRandomNumberInLength($(parentElement).height())//$(parentElement).height()
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
            dataType: 'html',
            async : true,
            success : function(text){
                if (removeContent != false){
                    $(container).html(text);
                }else{
                    $(container).html($(container).html()+text);
                }

                if (additionalInstructions !== undefined){
                    additionalInstructions();
                }
            },
            fail : function (text) {
                console.log('failure', text);
            }
        });
    });
}

$(function() {
    loadPage1();
});