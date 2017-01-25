"use strict"
const fs = require('fs');
let obj = require('./data.json');
let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

let word = '$node todo.js '
let argv = process.argv

if(argv[2] == undefined) {
  console.log(`${word} help`);
  console.log(`${word} list`);
  console.log(`${word} add <task_content>`);
  console.log(`${word} task <task_id>`);
  console.log(`${word} delete <task_id>`);
  console.log(`${word} complete <task_id>`);
  console.log(`${word} uncomplete <task_id>`);
  console.log(`${word} list:outstanding asc|desc`);
  console.log(`${word} list:completed asc|desc`);
  console.log(`${word} tag <task_id> <tag_name_1> <tag_name_2> .. <tag_name_N>`);
} else {
  if (argv[2] == 'help') {
    console.log(`${word} help`);
    console.log(`${word} list`);
    console.log(`${word} add <task_content>`);
    console.log(`${word} task <task_id>`);
    console.log(`${word} delete <task_id>`);
    console.log(`${word} complete <task_id>`);
    console.log(`${word} uncomplete <task_id>`);
    console.log(`${word} list:outstanding asc|desc`);
    console.log(`${word} list:completed asc|desc`);
    console.log(`${word} tag <task_id> <tag_name_1> <tag_name_2> .. <tag_name_N>`);
  }

  if(argv[2] == 'list') {
    console.log("LIST TASK")
    for (var i = 0; i < data.length; i++) {
      if(data[i].completed == true) {
        console.log(`[X] ${data[i].id}. ${data[i].task} ${data[i].created_at} ${data[i].completed_at} ${data[i].tag}`)
      } else {
        console.log(`[ ] ${data[i].id}. ${data[i].task} ${data[i].created_at} ${data[i].completed_at} ${data[i].tag}`)
      }
    }
  }

  if(argv[2] == 'add') {
    console.log("Task added")
    let param = argv.splice(3,argv.length-3)
    data.push({"id":data.length+1,"task":param.join(' '),"completed":false,"tag": " ","created_at":new Date(), "completed_at": " " })
    fs.writeFileSync('data.json',JSON.stringify(data) ,'utf8')
  }

  if(argv[2] == 'task') {
    console.log(`Task id-${argv[3]} is:`)
    if(data[argv[3]-1].completed == true) {
      console.log(`[X] ${data[argv[3]-1].id}. ${data[argv[3]-1].task} ${data[argv[3]-1].created_at} ${data[argv[3]-1].completed_at} ${data[argv[3]-1].tag}`)
    } else {
      console.log(`[ ] ${data[argv[3]-1].id}. ${data[argv[3]-1].task} ${data[argv[3]-1].created_at} ${data[argv[3]-1].completed_at} ${data[argv[3]-1].tag}`)
    }
  }

  if(argv[2] == 'delete') {
    console.log("Task-" + argv[3] + " deleted")
    data.splice(argv[3]-1,1)
    for (var i = 0; i < data.length; i++) {
      data[i].id = i+1
    }
    fs.writeFileSync('data.json',JSON.stringify(data) ,'utf8')
  }

  if(argv[2] == 'complete') {
    console.log(`Task-${argv[3]} marked`)
    data[argv[3]-1].completed = true;
    data[argv[3]-1].completed_at = new Date();
    fs.writeFileSync('data.json',JSON.stringify(data) ,'utf8')
  }

  if(argv[2] == 'uncomplete') {
    console.log(`Task-${argv[3]} unmarked`)
    data[argv[3]-1].completed = false;
    fs.writeFileSync('data.json',JSON.stringify(data) ,'utf8')
  }

  if(argv[2] == 'list:outstanding') {
    if(argv[3] == 'asc' || argv[3] == undefined) {
      let tmp = []
      console.log(`Ascending unmarked list`)
      for (var i = 0; i < data.length; i++) {
        if(data[i].completed == false) {
          tmp.push(data[i])
          tmp.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.created_at) - new Date(a.created_at);
          });
        }
      }
      for (var j = 0; j < tmp.length; j++) {
        tmp[j].id = j+1
        console.log(`[ ] ${tmp[j].id}. ${tmp[j].task} ${tmp[j].created_at} ${tmp[j].completed_at} ${tmp[j].tag}`)
      }
    } else if (argv[3] == 'dsc') {
      let tmp = []
      console.log(`Descending unmarked list`)
      for (var i = 0; i < data.length; i++) {
        if(data[i].completed == false) {
          tmp.push(data[i])
          tmp.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(a.created_at) - new Date(b.created_at);
          });
        }
      }
      for (var j = 0; j < tmp.length; j++) {
        tmp[j].id = j+1
        console.log(`[ ] ${tmp[j].id}. ${tmp[j].task} ${tmp[j].created_at} ${tmp[j].completed_at} ${tmp[j].tag}`)
      }
    }
  }

  if(argv[2] == 'list:completed') {
    if(argv[3] == 'asc' || argv[3] == undefined) {
      let tmp = []
      console.log(`Ascending completed list`)
      for (var i = 0; i < data.length; i++) {
        if(data[i].completed == true) {
          tmp.push(data[i])
          tmp.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.completed_at) - new Date(a.completed_at);
          });
        }
      }
      for (var j = 0; j < tmp.length; j++) {
        tmp[j].id = j+1
        console.log(`[X] ${tmp[j].id}. ${tmp[j].task} ${tmp[j].created_at} ${tmp[j].completed_at} ${tmp[j].tag}`)
      }
    } else if (argv[3] == 'dsc' || argv[3] == undefined) {
      let tmp = []
      console.log(`Descending completed list`)
      for (var i = 0; i < data.length; i++) {
        if(data[i].completed == true) {
          tmp.push(data[i])
          tmp.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(a.completed_at) - new Date(b.completed_at);
          });
        }
      }
      for (var j = 0; j < tmp.length; j++) {
        tmp[j].id = j+1
        console.log(`[X] ${tmp[j].id}. ${tmp[j].task} ${tmp[j].created_at} ${tmp[j].completed_at} ${tmp[j].tag}`)
      }
    }
  }

  if(argv[2] == 'tag') {
    console.log(`Tag added id-${argv[3]}`);
    data[argv[3]-1].tag = argv.splice(4,argv.length-4);
    fs.writeFileSync('data.json',JSON.stringify(data) ,'utf8')
  }

  if(argv[2].split(':')[0] == 'filter') {
    let tmp = []
    let cond = argv[2].split(':')[1].toLowerCase()
    for(var i = 0; i < data.length; i++) {
      if(data[i].tag.indexOf(cond) != -1) {
        tmp.push(data[i])
      }
    }
    for (var i = 0; i < tmp.length; i++) {
      if(tmp[i].completed == true) {
        console.log(`[X] ${tmp[i].id}. ${tmp[i].task} ${tmp[i].created_at} ${tmp[i].completed_at} ${tmp[i].tag}`)
      } else {
        console.log(`[ ] ${tmp[i].id}. ${tmp[i].task} ${tmp[i].created_at} ${tmp[i].completed_at} ${tmp[i].tag}`)
      }
    }
  }
}
