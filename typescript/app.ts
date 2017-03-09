
interface IRemoveNoteInnerHTML{
    removeNoteHTML(note);
}

class GetFretBoardNotes{
    notes = document.querySelector('.notes').children;
    musicNotes = [];


    getNotes(){
        this.musicNotes = [];
        let outerNotes = [];
        for(let i = 0; i < this.notes.length; i++){
            for(let j = 0; j < this.notes[i].children.length; j++){
                outerNotes.push(this.notes[i].children[j].children);
            }
        }
        for(let i = 0; i < outerNotes.length; i++){
            for(let j = 0; j < outerNotes[i].length; j++){
                this.musicNotes.push(outerNotes[i][j]);
            }
        }
        return this.musicNotes;
    }

}

class GetRandomNote extends GetFretBoardNotes{
    getRandomNote(){
        let arr = super.getNotes();
        arr[Math.floor(Math.random() * arr.length)].style.opacity = 1;
    }
}

// Disable Buttons to prevent 

class ActiveButtons{
    buttons = document.querySelector('.notes-to-guess__notes').children;

    activeBtns(){
        for(let i = 0; i < this.buttons.length; i++){
            this.buttons[i].removeAttribute('disabled');
        }
    }

}

class DeactivateButtons{
    buttons = document.querySelector('.notes-to-guess__notes').children;

    deactivateBtns(){
        for(let i = 0; i < this.buttons.length; i++){
            this.buttons[i].setAttribute('disabled', true);
        }
    }

}

class Score{
    
    getCorrectHTML = document.querySelector('.score__correct');
    getIncorrectHTML = document.querySelector('.score__incorrect');

    positive : any = 0;
    negative : any = 0;

    setPositive(){
        this.positive++;
        this.getCorrectHTML.innerHTML = this.positive;
    }

    setNegative(){
        this.negative++;
        this.getIncorrectHTML.innerHTML = this.negative;
    }

}

class CompareNotesFromButtonsWithFretboardNotes extends GetFretBoardNotes implements IRemoveNoteInnerHTML{
    buttons = document.querySelector('.notes-to-guess__notes').children;
    randomNote = new GetRandomNote();
    activateButtons = new ActiveButtons();
    deactivateButtons = new DeactivateButtons();
    score = new Score();
    showOctaves = new ShowOctaves();


    octaves = document.querySelector('.form__checkbox');
    
    removeNoteHTML(note){
        note.innerHTML = '';
    }

    setRightNoteAndColorIfNoteIsWrong(note){
        note.style.backgroundColor = 'red';
        note.innerHTML = note.getAttribute('data-attr');
        setTimeout(() => {
            this.removeNoteHTML(note);
            note.removeAttribute('style');
            this.randomNote.getRandomNote();
            this.activateButtons.activeBtns();
        }, 3000);
    }

    addListenerToBtns():void{
        this.activateButtons.activeBtns();
        for(let i = 0; i < this.buttons.length; i++){
            ((i) => {
                this.buttons[i].addEventListener('click', () => {
                   let arr = super.getNotes();
                   for(let j = 0; j < arr.length; j++){
                       // Wait for DOM to apply styles...
                       // If the attribute is same as button innerHTML, we guessed the correct note.
                       // Then we run this.runGetRandomNote to get new note and remove innerHTML of old note;
                       setTimeout(() => {  
                                            

                           if(arr[j].style.opacity === '1' && arr[j].getAttribute('data-attr') === this.buttons[i].innerHTML){
                               arr[j].innerHTML = arr[j].getAttribute('data-attr');
                               this.runGetRandomNote(arr[j], true);
                               this.deactivateButtons.deactivateBtns();
                               this.score.setPositive();
                           }

                           if(arr[j].style.opacity === '1' && arr[j].getAttribute('data-attr') != this.buttons[i].innerHTML){
                               this.score.setNegative();
                               this.deactivateButtons.deactivateBtns();
                               this.setRightNoteAndColorIfNoteIsWrong(arr[j]);
                           }
            
                       }, 100)
                   }
                });
            })(i)
        }
    }

    runGetRandomNote(arr, noteFound){
        if(noteFound) {
            setTimeout(() => {
                arr.style.opacity = 0;
                this.removeNoteHTML(arr);
                this.randomNote.getRandomNote();
                this.activateButtons.activeBtns();
            }, 2000);
        }
    }

}




let addListenerToButtons = new CompareNotesFromButtonsWithFretboardNotes();

addListenerToButtons.addListenerToBtns();

let getFretBoardNotes = new GetFretBoardNotes();
getFretBoardNotes.getNotes();

let getRandomNote = new GetRandomNote();
getRandomNote.getRandomNote();


