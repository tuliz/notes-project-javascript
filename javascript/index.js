class Task{
    constructor(content, date, time){
        this.content = content;
        this.date = date;
        this.time = time
    }
}


//event for remove button to delete selected note
const deleteNote = (index) =>{
    tasks.splice(index,1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
}




//function for creating elements and building a note in html
const buildingNotes = (task, index, isnew) =>{
    let noteContainer;
    let row;
    let col;
    let noteContent;
    let noteDate;
    let noteTime;
    let textNode;
    let fontAwsome;
    let image;
    
    noteContainer = document.createElement("div");
    noteContainer.className = "noteContainer container";
    
    image = document.createElement("img");
    image.src = "images/notebg.png";
    noteContainer.appendChild(image);
    
    
    //icon creation and adding to note
    fontAwsome = document.createElement("i");
    fontAwsome.className = "fas fa-times ml-20";
    //fontAwsome.addEventListener("click", deleteNote(index));
    fontAwsome.id = index;
    row = document.createElement("div");
    row.className = "row";
    col = document.createElement("div");
    col.className = "col-lg-12";
    col.appendChild(fontAwsome);
    row.appendChild(col);
    noteContainer.appendChild(row);
    
    //content of note
    textNode = document.createTextNode(task.content);
    noteContent = document.createElement("p");
    noteContent.appendChild(textNode);
    row = document.createElement("div");
    row.className = "row content overflow-auto";
    col = document.createElement("div");
    col.className = "col-lg-12";
    col.appendChild(noteContent);
    row.appendChild(col);
    noteContainer.appendChild(row);
    
    
    //target date of task in note
    textNode = document.createTextNode(task.date);
    noteDate = document.createElement("p");
    noteDate.id = "date";
    noteDate.appendChild(textNode);
    row = document.createElement("div");
    row.className = "row";
    col = document.createElement("div");
    col.className = "col-lg-12";
    col.appendChild(noteDate);
    row.appendChild(col);
    noteContainer.appendChild(row);
    
    
    //target time of task in note
    textNode = document.createTextNode(task.time);
    noteTime = document.createElement("p");
    noteTime.appendChild(textNode);
    row = document.createElement("div");
    row.className = "row position-relative";
    row.id ="time";
    col = document.createElement("div");
    col.className = "col-lg-12";
    col.appendChild(noteTime);
    row.appendChild(col);
    noteContainer.appendChild(row);

    if(isnew){
        noteContainer.classList.add("newTask");

    }
    document.getElementById("notesRow").appendChild(noteContainer);
    }


let tasks = [];



if(JSON.parse(localStorage.getItem("tasks")))
    tasks = JSON.parse(localStorage.getItem("tasks"));


//Building notes of exsisting tasks
if(tasks.length > 0){


//loop to create note for each task
tasks.forEach((task, index)=>{
    buildingNotes(task, index, false);
});

}


//event for saving button and adding new task
document.getElementById("saveTask").addEventListener("click", ()=>{

    const inputArr = [
    document.getElementById("content"),
    document.getElementById("taskDate"), 
    document.getElementById("taskTime")
];

    
//checking if inputs are empty, if they are return the user to form without creating new task
    for(let i = 0; i < inputArr.length; i++){
        if(inputArr[i].hasAttribute('required') && inputArr[i].value.length == 0){
            inputArr[i].focus();
            return;
        }
    }
    

    
    let newTask = new Task(inputArr[0].value, inputArr[1].value, inputArr[2].value);
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    buildingNotes(newTask, tasks.length -1, true);
    //setInterval(()=>{window.location.reload()}, 3000); 

});




//event for reset button to empty the textarea
document.getElementById("resetTask").addEventListener("click", ()=>{
    document.getElementById("content").value = "";
});


//event for showing delete button of note when mouse is on the note
tasks.forEach((task, index)=>{ 
    document.getElementsByClassName("noteContainer")[index].addEventListener("mouseover", (e)=>{
           document.getElementsByClassName("fas")[index].style.visibility = "visible";
    });
});

//event for hiding the delete button of note when the mouse is getting out of the note
tasks.forEach((task, index)=>{ 
    document.getElementsByClassName("noteContainer")[index].addEventListener("mouseout", (e)=>{
           document.getElementsByClassName("fas")[index].style.visibility = "hidden";
    });
});