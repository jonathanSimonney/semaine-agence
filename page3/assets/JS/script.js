function getRandomStringInLength(length){
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
            top : getRandomStringInLength($(parentElement).height()),
            left : getRandomStringInLength($(parentElement).width())
        });

        console.log(parentElement);
         parentElement.appendChild(noteContainer);
    }
}

$(function(){
    createRandomNote(4, $('body')[0]);
});