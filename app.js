let list = document.querySelector('ul.list');
let btnAdd = document.getElementById('btnAdd');
let listTask = [
    {
        content: 'content task 1',
        status: 'doing'
    },
    {
        content: 'content task 2',
        status: 'complete'
    }
];
//check if has data listTask in local Storage
if(localStorage.getItem('listTask') != null){
    listTask = JSON.parse(localStorage.getItem('listTask'));
}

//This function is used to save your task to local storage
//so they will not disappear when you refresh the page
function saveLocalStorage(){
    localStorage.setItem('listTask', JSON.stringify(listTask));
}
btnAdd.onclick = function(event){
    // Every time click the button
    // the page has to reload
    // add this code to fit it
    event.preventDefault();
    // get data content task you wrote
    let content = document.getElementById('task').value;
    // we only continue if the content not empty
    if(content != ''){
        // use unshift to add to the beginning of the array
        listTask.unshift({
            content: content,
            status: 'doing'
        });
    }
    // fun function addTaskToHTML to put task data out of HTML
    addTaskToHTML();
    // after adding delete the content of the input
    document.getElementById('task').value = '';
    // when F5 or close the browser, newly added data is not saved
    // because they are in the array listTask
    // run the saveLocalStorage function to save them
    saveLocalStorage();
};
//create a function to put task data out of HTML
function addTaskToHTML(){
    list.innerHTML = '';
    listTask.forEach((task, index) => {
        let newTask = document.createElement('li');
        newTask.classList.add(task.status);
        newTask.innerHTML = `
        <div class="complete-icon" onClick="completeTask(${index})">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
            </div>
            <div class="content">${task.content}</div>
            <div class="close-icon" onClick="deleteTask(${index})"> 
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </div>
        `;
        // add newTask in class list
        list.appendChild(newTask);
    });
}
addTaskToHTML();
// when click complete icon, run function completeTask to change status task
// index is the position of the task in the array listTask
function completeTask(index){
    // change status task
    listTask[index].status = 'complete';
    // run function addTaskToHTML to put task data out of HTML
    addTaskToHTML();
    // when F5 or close the browser, newly added data is not saved
    // because they are in the array listTask
    // run the saveLocalStorage function to save them
    saveLocalStorage();
}

//when click close icon, run function deleteTask to delete task
function deleteTask(index){
    // use filter to delete task
    listTask = listTask.filter((task, newIndex) => {return newIndex != index});
    // run addTaskToHTML function to put task data out of HTML
    addTaskToHTML();
    // run saveLocalStorage function to save them
    saveLocalStorage();
}