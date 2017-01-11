"use strict"

const fs = require('fs');

let data = JSON.parse(fs.readFileSync('data.json','UTF-8'));

function write(array){
  fs.writeFileSync('data.json', JSON.stringify(array), 'UTF-8')
}

let argv = process.argv;
let node = "$ node todo.js"

switch(argv[2]){

  case undefined || 'help' :
  console.log(`===============HELP===============`);
  console.log(`${node} add <task content>`);
  console.log(`${node} list`);
  console.log(`${node} uncomplete-list asc|dsc`);
  console.log(`${node} complete-list asc|dsc`);
  console.log(`${node} tag <tag_id> <tag1> <tagn>`);
  console.log(`${node} filter <tag-name`);
  console.log(`${node} help`);
  console.log(`${node} delete <task_id>`);
  console.log(`${node} complete <task_id>`);
  console.log(`${node} uncomplete <task_id`);
  console.log(`${node} task <task_id>`);
  break;

  case 'add' :
  let strings = argv.splice(3).join(" ")
  data.push({"id"     : data.length + 1,
             "task"   : strings,
             "status" : "uncomplete",
             "date"   : new Date()})
  write(data);
  break;

  case 'delete' :
  for(var i = 0; i < data.length; i++){
    if(data[i].id == argv[3]){
      data.splice(i,i+1);
      write(data);
    }
  }
  break;

  case 'uncomplete' :
  for(var i = 0; i < data.length; i++){
    if(data[i].id == argv[3]){
      data[i].status = "uncomplete";
      write(data);
    }
  }
  break;

  case 'complete' :
  for(var i = 0; i < data.length; i++){
    if(data[i].id == argv[3]){
      data[i].status = "complete";
      write(data);
    }
  }
  break;

  case 'list' :
  for(var i = 0; i < data.length; i++){
      if(data[i].status == "complete"){
        console.log(`${data[i].id}. [X] ${data[i].task} Date : ${data[i].date}`)
      }else{
        console.log(`${data[i].id}. [ ] ${data[i].task} Date : ${data[i].date}`)
      }
  }
  break;

  case 'task' :
  for(var i = 0; i < data.length; i++){
    if(data[i].id == argv[3]){
      console.log(data[i]);
    }
  }
  break;

  case 'uncomplete-list':
  let sortType = argv[3]
  if(sortType === 'asc' || sortType === undefined){
    data.sort(function(a,b){ return new Date(a.date) - new Date(b.date)});
    write(data)
    for(var i = 0; i < data.length; i++){
      if(data[i].status == "uncomplete"){
      console.log(`${data[i].id}. [ ] ${data[i].task} Date : ${data[i].date}`)
      }
    }
  }
  else if(sortType === 'dsc'){
    data.sort(function(a,b){ return new Date(b.date) - new Date(a.date)});
    write(data)
    for(var i = 0; i < data.length; i++){
      if(data[i].status == "uncomplete"){
      console.log(`${data[i].id}. [ ] ${data[i].task} Date : ${data[i].date}`)
      }
    }
  }

  break;

  case 'complete-list' :
  let sortType2 = argv[3];
  if(sortType2 === 'asc' || sortType2 === undefined){
    data.sort(function(a,b){ return new Date(a.date) - new Date(b.date)});
    write(data)
    for(var i = 0; i < data.length; i++){
      if(data[i].status == "complete"){
      console.log(`${data[i].id}. [X] ${data[i].task} Date : ${data[i].date}`)
      }
    }
  }
  else if(sortType2 === 'dsc'){
    data.sort(function(a,b){ return new Date(b.date) - new Date(a.date)});
    write(data)
    for(var i = 0; i < data.length; i++){
      if(data[i].status == "complete"){
      console.log(`${data[i].id}. [X] ${data[i].task} Date : ${data[i].date}`)
      }
    }
  }
  break;

  case 'tag' :
  for(var i = 0; i < data.length; i++){
    if(data[i].id == argv[3]){
      data[i]['tag'] = argv.slice(4).join(",")
      write(data);
    }
  }

  break;

  case 'filter' :
  for(var i = 0; i < data.length; i++){
    if(data[i].tag === argv[3]){
      console.log(`${data[i].id}. task: ${data[i].task} | tag: ${data[i].tag}`)
    }
  }
  break;


}
