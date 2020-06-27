
let textBox = document.getElementById('textBox');
let textBoxTitle = document.getElementById('textBoxTitle');
let showNotesSection = document.getElementById('showNotes');
let addNoteBtn = document.getElementById('addNote');
let searchBar = document.getElementById('searchBar');
let noteCard = document.getElementsByClassName('noteCard');
//listen for the click event on adddNOte
showNotes();
addNoteBtn.addEventListener('click', function () {
    let textArray = [];
    let subTextArray = [];
    if (localStorage.length != 0) {

        let notes = localStorage.getItem('notes');
        //returns  textArray objects of previous times
        textArray = JSON.parse(notes);
        //now we have multiple note objects
       
    }
    
        subTextArray.push(textBoxTitle.value);
        subTextArray.push(textBox.value);
    textArray.push(subTextArray);
    // a note object is stored in textArray
    localStorage.setItem('notes', JSON.stringify(textArray));
    // alert("Your note is added!");
    textBox.value = "";
    textBoxTitle.value = "";
    showNotes();
});

function showNotes() {
    let textArray = [];
    let subTextArray = [];

    let content = "";
    if (localStorage.length != 0) {
        let notes = localStorage.getItem('notes');
        //returns  textArray objects of previous times
        textArray = JSON.parse(notes);
        textArray.forEach((element, index) => {
            subTextArray=textArray[index];
            content += `<div class="noteCard" id="card${index}">
            <h4>${subTextArray[0]}</h4>
            <hr>
            <p>${subTextArray[1]}</p>
            <hr>
            <div class="noteCardButtons">
                <button class="deleteNote" id=${index} onclick="deleteNote(this.id)">
                    Delete Me!
                </button>
                <button class="updateNote" id=${index} onclick="updateNote(this.id)">
                    Update Me!
                </button>
            </div>
        </div>`;
        });
        showNotesSection.innerHTML = content;
    }
    else {
        showNotesSection.innerHTML = "Nothing to show You";
    }
}
function deleteNote(index) {
    let textArray = [];
    let notes = localStorage.getItem('notes');
    //returns  textArray objects of previous times
    textArray = JSON.parse(notes);
    textArray.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(textArray));
    showNotes();

}
function updateNote(index){
    let textArray = [];
    let subTextArray = [];
    let notes = localStorage.getItem('notes');
    //returns  textArray objects of previous times
    textArray = JSON.parse(notes);
    subTextArray=textArray[index];
    textBoxTitle.value=subTextArray[0];
    textBox.value=subTextArray[1];
    textArray.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(textArray));
    showNotes();
}
searchBar.addEventListener('blur',function f(e){
    let textArray = [];
    let subTextArray = [];
    let title = searchBar.value;
    let notes = localStorage.getItem('notes');
    //returns  textArray objects of previous times
    textArray = JSON.parse(notes);
    textArray.forEach(function titleFinder(Element,index) {
        let cardNum = document.getElementById(`card${index}`);
        if (Element[0].includes(title)) {
            cardNum.style.display="block";
        }
        else
          cardNum.style.display="none";
    })
    searchBar.value="";
});


// /*
// Further Features:
// 1. Add Title
// 2. Mark a note as Important
// 3. Separate notes by user
// 4. Sync and host to web server 
// */ 