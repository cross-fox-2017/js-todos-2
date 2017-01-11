// const fs = require('fs')
const jsonfile = require('jsonfile')
const file = 'data.json'
const db = jsonfile.readFileSync(file)

let input = process.argv.slice(2, process.argv.length)

switch (input[0]) {
  case 'list':
    listData()
    break;

  case 'add':
    addData()
    break;

  case 'task':
    taskData()
    break;

  case 'delete':
    deleteData()
    break;

  case 'complete':
    completeData()
    break;

  case 'uncomplete':
    unCompleteData()
    break;
  case 'outstandingAsc':
    outstandingAsc()
    break;

  case 'outstandingDes':
    outstandingDes()
    break;

  case 'completedAsc':
    completedAsc()
    break;

  case 'completedDes':
    completedDes()
    break;

  case 'tag':
    tag()
    break;

  case 'filter':
    filterData()
    break;

  default:
      console.log('$node todo.js list');
      console.log('$node todo.js add <task_content>');
      console.log('$node todo.js task <task_id>');
      console.log('$node todo.js delete <task_id>');
      console.log('$node todo.js complete <task_id>');
      console.log('$node todo.js uncomplete <taks_id>');
      console.log('$node todo.js list:outstanding asc|desc');
      console.log('$node todo.js list:completed asc|desc');
      console.log('$node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N');
      console.log('$node todo.js filter:<tag_name>');
}

function listData() { // untuk menampilkan keseluruhan data
  for (var i = 0; i < db.length; i++) {
    console.log(`${db[i].id}: ${db[i].complete} ${db[i].task} ${db[i].tag}`);
  }
  // console.log(db);
}

function addData() { // untuk menambahkan data
  var temp = ''
  for (var i = 3; i < process.argv.length; i++) {
    temp += process.argv[i]
  }
  var newData = {
    id: db.length+1,
    task: temp,
    complete: "[ ]",
    create_date: new Date,
    tag: []
  }
  db.push(newData)
  jsonfile.writeFileSync(file, db)
}

function taskData(id) { // untuk menampilkan task data
  idx = process.argv[2]
  id = process.argv[3]
  for (var i = 0; i < db.length; i++) {
    if (db[i].id == id && idx == 'task') {
      console.log(db[i]);
    }
  }
}

function completeData(id) { // untuk menandakan data sudah complete
  idx = process.argv[2]
  id = process.argv[3]
  for (var i = 0; i < db.length; i++) {
    if (db[i].id == id && idx == 'complete') {
      console.log(`Task ${db[i].task} complete`);
      db[i].complete = "[X]"
    }
  }
  jsonfile.writeFileSync(file, db)
}

function unCompleteData(id) {
  idx = process.argv[2]
  id = process.argv[3]
  for (var i = 0; i < db.length; i++) {
    if (db[i].id == id && idx == 'uncomplete') {
      console.log(`Task ${db[i].task} complete`);
      db[i].complete = "[ ]"
    }
  }
  jsonfile.writeFileSync(file, db)
}

function outstandingDes() { /// untuk sorting descending data keseluruhan
  for (var i = db.length-1; i > 0; i--) {
    console.log(`${db[i].id}: ${db[i].complete} ${db[i].task} ${db[i].tag}`);
  }
}

function outstandingAsc() {
  for (var i = 0; i < db.length; i++) {
    console.log(`${db[i].id}: ${db[i].complete} ${db[i].task} ${db[i].tag}`);
  }
}

function completedAsc() {
  var temp = []
  idx =process.argv[2]
  id = process.argv[3]
  for (var i = 0; i < db.length; i++) {
    if (idx == 'completedAsc' && db[i].complete == '[X]') {
      temp.push(db[i])
    }
  }
  for (var j = 0; j < temp.length; j++) {
    console.log(`${temp[j].id}: ${temp[j].complete} ${temp[j].task} ${temp[j].tag}`);
  }
}
function completedDes() { /// untuk sorting descending data yang sudah complete
  var temp = []
  idx = process.argv[2]
  id = process.argv[3]
  for (var i = 0; i < db.length; i++) {
    if (idx == 'completedDes' && db[i].complete == '[X]') {
      temp.push(db[i])
    }
  }
  for (var j = temp.length-1; j >= 0; j--) {
    console.log(`${temp[j].id}: ${temp[j].complete} ${temp[j].task} ${temp[j].tag}`);
  }
}

function tag() {
  idx = process.argv[2]
  id = process.argv[3]
  input = process.argv[4]
  for (var i = 0; i < db.length; i++) {
    if ( idx == 'tag' && id == db[i].id) {
      db[i].tag.push(input)
      console.log(db[i].tag);
    }
  }
  jsonfile.writeFileSync(file, db)
}

function deleteData() {
  idx = process.argv[2]
  id = process.argv[3]
  for (var i = 0; i < db.length; i++) {
    if (db[i].id == id && idx == 'delete') {
      db.splice(i, 1)

    }
  }
  jsonfile.writeFileSync(file, db)
}

function filterData() {
  idx = process.argv[2]
  id = process.argv[3]
  for (var i = 0; i < db.length; i++) {
    if (db[i].tag.indexOf(id) >= 0 && idx == 'filter') {
      console.log(db[i]);
    }
  }
}
