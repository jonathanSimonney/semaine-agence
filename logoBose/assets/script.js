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

window.onload = function () {
    document.querySelector('#myLogo').addEventListener('animationend', function(e){
        testFunction(this);
    });
}