fs = require('fs');
// fs.writeFile('data.json', 'Hello World!', function (err) {
//   if (err) return console.log(err);
// });
let data = JSON.parse(fs.readFileSync('data.json','utf8'));
let arg = process.argv
let help = ['node todo.js','node todo.js help','node todo.js list','node todo.js add <task_content>',
'node todo.js task <task_id>','node todo.js delete <task_id>','node todo.js complete <task_id>',
'node todo.js uncomplete <task_id>','node todo.js list:outstanding asc|desc','node todo.js list:completed asc|desc',
'node todo.js tag <task_id> <tasg_name_1> <tasg_name_2> ... <tasg_name_N>','node todo.js filter:<tag_name>']
help = help.join('\n')

switch (arg[2]) {

  case 'help':
  console.log('=========Menu Help=========');

  case 'list':
  console.log('=========Menu List=========');
  for (let i=0; i<data.length; i++){
    if (data[i].complete == true) {
      console.log(`${data[i].id}. [x] ${data[i].task}, ${data[i].date}, ${data[i].tag}`);
    }
    else {
      console.log(`${data[i].id}. [ ] ${data[i].task}, ${data[i].date}, ${data[i].tag}`);
    }
  }
  break;

  case 'add':
  let kata = arg.splice(3,arg.length-3)
  data.push({ "id": data.length+1,"task":kata.join(' '),"complete":false,"date":new Date(),"dateComplete":new Date(),"tag":[]})
  fs.writeFileSync('data.json', JSON.stringify(data) , 'utf-8');
  break;

  case 'task':
  for(let i=0; i<arg.length; i++) {
    if(arg[3]==[i+1]){
      if (data[i].complete == true) {
        console.log(`${data[i].id}. [x] ${data[i].task}, ${data[i].date}`);
      }
      else {
        console.log(`${data[i].id}. [ ] ${data[i].task}, ${data[i].date}`);
      }
    }
  }
  break;

  case 'delete':
  for(let i=0; i<arg.length; i++) {
    if(arg[3]==[i+1]){
      data.splice(i,1);
    }
  }
  fs.writeFileSync('data.json', JSON.stringify(data) , 'utf-8');
  break;

  case 'complete':
  for(let i=0; i<arg.length; i++) {
    if(arg[3]==[i+1]){
      data[i].complete = true;
      data[i].dateComplete = new Date();
    }
  }
  fs.writeFileSync('data.json', JSON.stringify(data) , 'utf-8');
  break;

  case 'uncomplete':
  for(let i=0; i<arg.length; i++) {
    if(arg[3]==[i+1]){
      data[i].complete = false;
    }
  }
  fs.writeFileSync('data.json', JSON.stringify(data) , 'utf-8');
  break;

  case 'list:outstanding':
  if (arg[3]=='asc') {

    data.sort(function(a,b){return new Date(a.date) - new Date(b.date);});

    for(let i=0; i<data.length; i++) {
      if (data[i].complete == false) {
        console.log(`${data[i].id}. [ ] ${data[i].task}, created at ${data[i].date}`);
      }
    }
  }
  if (arg[3]=='desc') {

    data.sort(function(a,b){return new Date(b.date) - new Date(a.date);});

    for(let i=0; i<data.length; i++) {
      if (data[i].complete == false) {
        console.log(`${data[i].id}. [ ] ${data[i].task}, created at ${data[i].date}`);
      }
    }
  }
  break;

  case 'list:completed':
  if (arg[3]=='asc') {

    data.sort(function(a,b){return new Date(a.dateComplete) - new Date(b.dateComplete);});

    for(let i=0; i<data.length; i++) {
      if (data[i].complete == true) {
        console.log(`${data[i].id}. [X] ${data[i].task} || created at ${data[i].date} || completed at ${data[i].dateComplete}`);
      }
    }
  }
  if (arg[3]=='desc') {

    data.sort(function(a,b){return new Date(b.dateComplete) - new Date(a.dateComplete);});

    for(let i=0; i<data.length; i++) {
      if (data[i].complete == true) {
        console.log(`${data[i].id}. [X] ${data[i].task} || created at ${data[i].date} || completed at ${data[i].dateComplete}`);
      }
    }
  }
  break;

  case 'tag':
  let tagTag = arg.splice(4,arg.length-4)
  for(let i=0; i<arg.length; i++) {
    if(arg[3]==[i+1]){
      data[i].tag = tagTag;
    }
  }
  fs.writeFileSync('data.json', JSON.stringify(data) , 'utf-8');
  console.log(`${tagTag} berhasil ditambahkan`);
  break;

  case 'filter:':
  for(let i=0; i<data.length; i++) {
    if(arg[3]==data[i].tag){
      console.log(`${data[i].id}. ${data[i].task}, ${data[i].tag}`);
    }
  }
  break;

  default:
  console.log(help);
  break;
}
