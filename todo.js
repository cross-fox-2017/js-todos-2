'use strict'

const fs = require('fs');

let getJSON = JSON.parse(fs.readFileSync('data.json', 'UTF-8'));

function setArray(array){
  fs.writeFileSync('data.json', JSON.stringify(array), 'UTF-8')
}

let getArgv = process.argv;
let getNode = "$ node todo.js" // Untuk membaca dokumentasi penggunaan dari fungsi node

switch (getArgv[2]) {
  case undefined || 'help' :
    console.log(`===================== HELP =====================`);
    console.log(`${getNode} add <task content>`);
    console.log(`${getNode} show list`);
    console.log(`${getNode} uncomplete list ascending || descending`);
    console.log(`${getNode} complete list ascending || descending`);
    console.log(`${getNode} tag <tag_id>, <tag_1>, <tag_n>`)
    console.log(`${getNode} filter by <tag_name>`)
    console.log(`${getNode} task <task_id>`);
    console.log(`${getNode} delete <task_id>`);
    console.log(`${getNode} complete <task_id>`);
    console.log(`${getNode} uncomplete <task_id>`);
    break;

  case 'list' :
  for(var i = 0; i < getJSON.length; i++){
    if(getJSON[i].Status == "Complete"){
      console.log(`${getJSON[i].ID}.[x] ${getJSON[i].Task} Date : ${getJSON[i].Date}`)
    } else {
      console.log(`${getJSON[i].ID}.[ ] ${getJSON[i].Task} Date : ${getJSON[i].Date}`)
    }
  }
  break;

  // Menambahkan nilai berupa object yang di push ke getJSON
  case 'add' :
  let valStr = getArgv.splice(3).join(" ")
  getJSON.push({"ID"     : getJSON.length + 1,
                "Task"   : valStr,
                "Status" : "Uncomplete",
                "Date"    : new Date()})
  setArray(getJSON);
  break;

  // Menghapus nilai berupa object dari getJSON
  case 'delete' :
  for(var i = 0; i < getJSON.length; i++){
    if(getJSON[i].ID == getArgv[3]){
      getJSON.splice(i,i+1);
      setArray(getJSON);
    }
  }
  break;

  case 'uncomplete' :
  for(var i = 0; i < getJSON.length; i++){
    if(getJSON[i].ID == getArgv[3]){
      getJSON[i].Status = "Uncomplete";
      setArray(getJSON);
    }
  }
  break;

  case 'complete' :
  for(var i = 0; i < getJSON.length; i++){
    if(getJSON[i].ID == getArgv[3]){
      getJSON[i].Status = "Complete";
      setArray(getJSON);
    }
  }
  break;

  case 'task' :
  for(var i = 0; i < getJSON.length; i++){
    if(getJSON[i].ID == getArgv[3]){
      console.log(getJSON[i]);
    }
  }
  break;

  case 'uncomplete-list':
  let sortType = getArgv[3]
  if(sortType === 'ascending' || sortType === undefined){
    getJSON.sort(function(a,b){
      return new Date(a.Date) - new Date(b.Date)
    });
    setArray(getJSON)
    for(var i = 0; i < getJSON.length; i++){
      if(getJSON[i].Status == "uncomplete"){
        console.log(`${getJSON[i].ID}. [] ${getJSON[i].Task} Date : ${getJSON[i].Date}`)
      }
    }
  }
  else if(sortType === 'descending'){
    getJSON.sort(function(a,b){
      return new Date(b.Date) - new Date(a.Date)
    });
    setArray(getJSON)
    for(var i = 0; i < getJSON.length; i++){
      if(getJSON[i].Status == "uncomplete"){
        console.log(`${getJSON[i].ID}. [] ${getJSON[i].Task} Date : ${getJSON[i].Date}`)
      }
    }
  }
  break;

  case 'complete-list' :
  let sortType2 = getArgv[3];
  if(sortType2 === 'ascending' || sortType2 === undefined){
    getJSON.sort(function(a,b){
      return new Date(a.Date) - new Date(b.Date)
    });
    setArray(getJSON)
    for(var i = 0; i < getJSON.length; i++){
      if(getJSON[i].Status == "complete"){
        console.log(`${getJSON[i].ID}. [X] ${getJSON[i].Task} Date : ${getJSON[i].Date}`)
      }
    }
  }
  else if(sortType2 === 'descending'){
    getJSON.sort(function(a,b){
      return new Date(b.Date) - new Date(a.Date)
    });
    setArray(getJSON)
    for(var i = 0; i < getJSON.length; i++){
      if(getJSON[i].Status == "complete"){
        console.log(`${getJSON[i].ID}. [X] ${getJSON[i].Task} Date : ${getJSON[i].Date}`)
      }
    }
  }
  break;

  case 'tag' :
  for(var i = 0; i < getJSON.length; i++){
    if(getJSON[i].ID == getArgv[3]){
      getJSON[i]['tag'] = getArgv.slice(4).join(",")
      setArray(getJSON);
    }
  }
  break;

  case 'filter' :
  for(var i = 0; i < getJSON.length; i++){
    if(getJSON[i].tag === getArgv[3]){
      console.log(`${getJSON[i].ID}. Task: ${getJSON[i].Task} | tag: ${getJSON[i].tag}`)
    }
  }
  break;
}
