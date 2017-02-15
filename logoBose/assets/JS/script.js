function redirect(event){
    if (event.target === document.querySelector('#myLogoContainer')){
        console.log('you went to another part on the same page!');
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

function fillThings() {
    $(function() {
        $.ajax({ type: 'GET',
            url: 'assets/images/logo.svg',
            async: true,
            dataType: 'text',
            success : function(text)
            {
                $('#myLogoContainer').html(text);

                document.querySelector('#myLogo').addEventListener('animationend', function(e){
                    testFunction(this);
                });
            }
        });
    });
}

window.onload = function () {
    fillThings();
}