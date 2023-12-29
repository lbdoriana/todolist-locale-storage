
"use strict"
let taskList=document.getElementById('taskList');
// changer les tâches depuis le localStorage lors du chargement de la page
loadTasks();
function addTask(){
 let taskInput=document.getElementById('taskInput');
 let taskText=taskInput.value;

 if(taskText===""){
  return;
 }
 let li=document.createElement('li');
 li.innerHTML=taskText;
let editButton=document.createElement('button');
editButton.innerHTML='<ion-icon name="pencil-outline"></ion-icon>'

editButton.Onclick=function(){
 editTask(li)
};

let deleteButton=document.createElement('button');


deleteButton.innerHTML='<ion-icon name="trash-outline" class="delete"></ion-icon>'

deleteButton.onclick=function(){
 deleteTask(li);
};

li.appendChild(editButton);

li.appendChild(deleteButton);

taskList.appendChild(li);

taskInput.value="";
//enregistrer la tâche dans le localstorage
saveTask(taskText);

}
function editTask(task){
 let taskTextElement=task.firstChild;
 let taskText=taskTextElement.textcontent;
 let newTaskText=prompt('Modifier la tâche:',taskText);

 if(newTaskText === null || newTaskText===""){
  return; //Ne rien faire si l'utilisateur a cliqué sur annuler ou n'a pas entré de nouveau texte
 }

 taskTextElement.textContent = newTaskText;
 //Mettre à jour la tâche dans localstorage
 updateTask(taskText,newTaskText);
}

function deleteTask(task){
 taskList.removeChild(task);
 //Supprimer la tache du localStorage
 removeTask(task.firsChild.textContent);
}

function saveTask(taskText){
 //Récuperer les tâches existantes depuis le localstorage
 let existingTasks=JSON.parse(localStorage.getItem('tasks'))||[]
 existingTasks.push(taskText);
 localSturage.setItem('tasks',JSON.stringify(existingTasks))
}

function loadTasks() {
 let existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
 existingTasks.forEach((taskText) => {
     let li = document.createElement('li');
     li.innerHTML = taskText;
     // Ajouter les boutons d'édition et de suppression ici
     taskList.appendChild(li);
 });
}

function updateTask(oldTaskText, newTaskText) {
 let existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
 let index = existingTasks.indexOf(oldTaskText);
 if (index !== -1) {
     existingTasks[index] = newTaskText;
     localStorage.setItem('tasks', JSON.stringify(existingTasks));
 }
}

function removeTask(taskText) {
 let existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
 let index = existingTasks.indexOf(taskText);
 if (index !== -1) {
     existingTasks.splice(index, 1);
     localStorage.setItem('tasks', JSON.stringify(existingTasks));
 }
}