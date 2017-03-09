var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GetFretBoardNotes = (function () {
    function GetFretBoardNotes() {
        this.notes = document.querySelector('.notes').children;
        this.musicNotes = [];
    }
    GetFretBoardNotes.prototype.getNotes = function () {
        this.musicNotes = [];
        var outerNotes = [];
        for (var i = 0; i < this.notes.length; i++) {
            for (var j = 0; j < this.notes[i].children.length; j++) {
                outerNotes.push(this.notes[i].children[j].children);
            }
        }
        for (var i = 0; i < outerNotes.length; i++) {
            for (var j = 0; j < outerNotes[i].length; j++) {
                this.musicNotes.push(outerNotes[i][j]);
            }
        }
        return this.musicNotes;
    };
    return GetFretBoardNotes;
}());
var ShowOctaves = (function (_super) {
    __extends(ShowOctaves, _super);
    function ShowOctaves() {
        _super.apply(this, arguments);
        this.octavesCheckBox = document.querySelector('.form__checkbox');
    }
    ShowOctaves.prototype.showOctaves = function () {
    };
    return ShowOctaves;
}(GetFretBoardNotes));
var GetRandomNote = (function (_super) {
    __extends(GetRandomNote, _super);
    function GetRandomNote() {
        _super.apply(this, arguments);
    }
    GetRandomNote.prototype.getRandomNote = function () {
        var arr = _super.prototype.getNotes.call(this);
        arr[Math.floor(Math.random() * arr.length)].style.opacity = 1;
    };
    return GetRandomNote;
}(GetFretBoardNotes));
// Disable Buttons to prevent 
var ActiveButtons = (function () {
    function ActiveButtons() {
        this.buttons = document.querySelector('.notes-to-guess__notes').children;
    }
    ActiveButtons.prototype.activeBtns = function () {
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].removeAttribute('disabled');
        }
    };
    return ActiveButtons;
}());
var DeactivateButtons = (function () {
    function DeactivateButtons() {
        this.buttons = document.querySelector('.notes-to-guess__notes').children;
    }
    DeactivateButtons.prototype.deactivateBtns = function () {
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].setAttribute('disabled', true);
        }
    };
    return DeactivateButtons;
}());
var Score = (function () {
    function Score() {
        this.getCorrectHTML = document.querySelector('.score__correct');
        this.getIncorrectHTML = document.querySelector('.score__incorrect');
        this.positive = 0;
        this.negative = 0;
    }
    Score.prototype.setPositive = function () {
        this.positive++;
        this.getCorrectHTML.innerHTML = this.positive;
    };
    Score.prototype.setNegative = function () {
        this.negative++;
        this.getIncorrectHTML.innerHTML = this.negative;
    };
    return Score;
}());
var CompareNotesFromButtonsWithFretboardNotes = (function (_super) {
    __extends(CompareNotesFromButtonsWithFretboardNotes, _super);
    function CompareNotesFromButtonsWithFretboardNotes() {
        _super.apply(this, arguments);
        this.buttons = document.querySelector('.notes-to-guess__notes').children;
        this.randomNote = new GetRandomNote();
        this.activateButtons = new ActiveButtons();
        this.deactivateButtons = new DeactivateButtons();
        this.score = new Score();
        this.showOctaves = new ShowOctaves();
        this.octaves = document.querySelector('.form__checkbox');
    }
    CompareNotesFromButtonsWithFretboardNotes.prototype.removeNoteHTML = function (note) {
        note.innerHTML = '';
    };
    CompareNotesFromButtonsWithFretboardNotes.prototype.setRightNoteAndColorIfNoteIsWrong = function (note) {
        var _this = this;
        note.style.backgroundColor = 'red';
        note.innerHTML = note.getAttribute('data-attr');
        setTimeout(function () {
            _this.removeNoteHTML(note);
            note.removeAttribute('style');
            _this.randomNote.getRandomNote();
            _this.activateButtons.activeBtns();
        }, 3000);
    };
    CompareNotesFromButtonsWithFretboardNotes.prototype.addListenerToBtns = function () {
        var _this = this;
        this.activateButtons.activeBtns();
        for (var i = 0; i < this.buttons.length; i++) {
            (function (i) {
                _this.buttons[i].addEventListener('click', function () {
                    var arr = _super.prototype.getNotes.call(_this);
                    var _loop_1 = function(j) {
                        // Wait for DOM to apply styles...
                        // If the attribute is same as button innerHTML, we guessed the correct note.
                        // Then we run this.runGetRandomNote to get new note and remove innerHTML of old note;
                        setTimeout(function () {
                            if (arr[j].style.opacity === '1' && arr[j].getAttribute('data-attr') === _this.buttons[i].innerHTML) {
                                arr[j].innerHTML = arr[j].getAttribute('data-attr');
                                _this.runGetRandomNote(arr[j], true);
                                _this.deactivateButtons.deactivateBtns();
                                _this.score.setPositive();
                            }
                            if (arr[j].style.opacity === '1' && arr[j].getAttribute('data-attr') != _this.buttons[i].innerHTML) {
                                _this.score.setNegative();
                                _this.deactivateButtons.deactivateBtns();
                                _this.setRightNoteAndColorIfNoteIsWrong(arr[j]);
                            }
                        }, 100);
                    };
                    for (var j = 0; j < arr.length; j++) {
                        _loop_1(j);
                    }
                });
            })(i);
        }
    };
    CompareNotesFromButtonsWithFretboardNotes.prototype.runGetRandomNote = function (arr, noteFound) {
        var _this = this;
        if (noteFound) {
            setTimeout(function () {
                arr.style.opacity = 0;
                _this.removeNoteHTML(arr);
                _this.randomNote.getRandomNote();
                _this.activateButtons.activeBtns();
            }, 2000);
        }
    };
    return CompareNotesFromButtonsWithFretboardNotes;
}(GetFretBoardNotes));
var addListenerToButtons = new CompareNotesFromButtonsWithFretboardNotes();
addListenerToButtons.addListenerToBtns();
var getFretBoardNotes = new GetFretBoardNotes();
getFretBoardNotes.getNotes();
var showOctaves = new ShowOctaves();
showOctaves.showOctaves();
var getRandomNote = new GetRandomNote();
getRandomNote.getRandomNote();
