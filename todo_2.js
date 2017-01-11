const fs = require('fs')
let argv = process.argv;
let id = 1
switch (argv[2]) {
  case 'list':
  let data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  for(let i = 0; i < data.length; i++){
    console.log(`${data[i].id} ${data[i].todo}`)
  }
  break;

  case 'add':
  let str = '';
  for(let i = 3; i < argv.length; i++) {
    str += argv[i] + ' '
  }
  let todo = [];
  todo.push({id: id, todo: `[ ] ${str}`, date: new Date()});

  let file = fs.readFileSync('data.json', 'utf-8');
  todo = JSON.parse(file);

  id = todo.length + 1
  todo.push({id: id, todo: `[ ] ${str}`, date: new Date()})
  var json = JSON.stringify(todo);
  fs.writeFile('data.json', json);
  break;

  case 'task':
  let taskID = argv[3] - 1;
  let taskFile = fs.readFileSync('data.json', 'utf-8');
  let taskTodo = JSON.parse(taskFile);
  console.log(`${taskTodo[taskID].id} ${taskTodo[taskID].todo}`)

  break;

  case 'delete':
  let deleteID = argv[3];
  let deleteFile = fs.readFileSync('data.json', 'utf-8');

  let deleteTodo = JSON.parse(deleteFile);
  deleteTodo.splice(deleteID-1,1);

  let deleteJSON = JSON.stringify(deleteTodo);
  fs.writeFile('data.json', deleteJSON);

  break;

  case 'complete':
  let completeID = argv[3] - 1;
  let completeFile = fs.readFileSync('data.json', 'utf-8');

  let completeTodo = JSON.parse(completeFile);
  let changeComplete = completeTodo[completeID].todo.slice(3,20);

  completeTodo[completeID].todo = `[x]${changeComplete}`

  let completeJSON = JSON.stringify(completeTodo);
  fs.writeFile('data.json', completeJSON);
  break;

  case 'uncomplete':
  let uncompleteID = argv[3] - 1;
  let uncompleteFile = fs.readFileSync('data.json', 'utf-8');

  let uncompleteTodo = JSON.parse(uncompleteFile);
  let changeUncomplete = uncompleteTodo[uncompleteID].todo.slice(3,20);

  uncompleteTodo[uncompleteID].todo = `[ ]${changeUncomplete}`

  let uncompleteJSON = JSON.stringify(uncompleteTodo);
  fs.writeFile('data.json', uncompleteJSON);
  break;

  case 'list:outstanding':
  // get asc | desc
  let sortList = argv[3];

  let listUncompleteFile = fs.readFileSync('data.json', 'utf-8');
  let listUncompleteTodo = JSON.parse(listUncompleteFile);
  let patt1 = /\[\s\]/;

  if(sortList === 'asc'){
    listUncompleteTodo.sort(function(a,b){ return new Date(a.date) - new Date(b.date)});
    for(let i = 0; i < listUncompleteTodo.length; i++){
      if(patt1.test(listUncompleteTodo[i].todo)){
          console.log(`${listUncompleteTodo[i].id} ${listUncompleteTodo[i].todo}`)
      }
    }
  } else if (sortList === 'dsc'){
    listUncompleteTodo.sort(function(a,b){ return new Date(b.date) - new Date(a.date)});
    for(let i = 0; i < listUncompleteTodo.length; i++){
      if(patt1.test(listUncompleteTodo[i].todo)){
          console.log(`${listUncompleteTodo[i].id} ${listUncompleteTodo[i].todo}`)
      }
    }
  }
  break;

  case 'list:completed':
  // get asc | desc
  let sortListComplete = argv[3];

  let listCompleteFile = fs.readFileSync('data.json', 'utf-8');
  let listCompleteTodo = JSON.parse(listCompleteFile);
  let patt2 = /\[[x]\]/;

  if(sortListComplete === 'asc'){
    listCompleteTodo.sort(function(a,b){ return new Date(a.date) - new Date(b.date)});
    for(let i = 0; i < listCompleteTodo.length; i++){
      if(patt2.test(listCompleteTodo[i].todo)){
          console.log(`${listCompleteTodo[i].id} ${listCompleteTodo[i].todo}`)
      }
    }
  } else if (sortListComplete === 'dsc'){
    listCompleteTodo.sort(function(a,b){ return new Date(b.date) - new Date(a.date)});
    for(let i = 0; i < listCompleteTodo.length; i++){
      if(patt2.test(listCompleteTodo[i].todo)){
          console.log(`${listCompleteTodo[i].id} ${listCompleteTodo[i].todo}`)
      }
    }
  }
  break;

  case 'tag':

  let tagID = argv[3] - 1;

  let tagList = [];
  for(let i = 4; i < argv.length; i++){
    tagList.push(argv[i]);
  }

  let taglistJoin = tagList.join(', ');

  let tagFile = fs.readFileSync('data.json', 'utf-8');
  let tagTodo = JSON.parse(tagFile);

  for(let i = 0; i < tagTodo.length; i++){
    if(tagTodo[i].id === tagID){
      tagTodo[tagID]['tag'] = taglistJoin
    }
  }

  var addTagJSON = JSON.stringify(tagTodo);
  fs.writeFile('data.json', addTagJSON);
  break;

  case 'filter':

  let tagName = argv[3];

  let tagFilterFile = fs.readFileSync('data.json', 'utf-8');
  let tagFilterTodo = JSON.parse(tagFilterFile);

  for(let i = 0; i < tagFilterTodo.length; i++){
    if(tagFilterTodo[i].tag === tagName){
      console.log(`${tagFilterTodo[i].id} ${tagFilterTodo[i].todo} | tag: ${tagFilterTodo[i].tag}`)
    }
  }
  break;

  default:
  console.log('node todo.js list\nnode todo.js add <task_content>\nnode todo.js task <task_id>\nnode todo.js delete <task_id>\nnode todo.js complete <task_id>\nnode todo.js uncomplete <task_id>\nnode todo.js list:outstanding asc|desc\nnode todo.js list:completed asc|desc\nnode todo.js tag <task_id> <tag_name_1> <tag_name_2> .....\nnode todo.js filter <tag_name>')
  break;
}
