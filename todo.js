"use strict"
const fs= require('fs')
var skrip = 'data.json'
let data = JSON.parse(fs.readFileSync(skrip,'utf-8'))
let tes = []
tes.push(process.argv)
let code = process.argv[2]
let code3 = process.argv[3]
var code2 = process.argv.slice(3).join(' ')
let code4 = process.argv.slice(4).join(' ')
class Task{
  constructor(task){
    if(data.length-1>=0){
    this.id = data[data.length-1].id + 1
    }
    else{
      this.id = 1
    }
    this.task=task
    this.completed = false
    this.createdAt = new Date()
    this.completedAt = "not yet"
    this.tag=""
  }
}
function tampilin(){
  for(var i=0;i<data.length;i++){
    if(data[i].completed===true){
      console.log(`${i+1}. [x] ${data[i].task}`)
    }
    else{
      console.log(`${i+1}. [ ] ${data[i].task}`)
    }
  }
}
function tampilinFalse(){
  for(var i=0;i<data.length;i++){
    if(data[i].completed===false){
      console.log(`${i+1}. [ ] ${data[i].task}`)
    }
  }
}
function tampilinTrue(){
  for(var i=0;i<data.length;i++){
    if(data[i].completed===true){
      console.log(`${i+1}. [x] ${data[i].task}`)
    }
  }
}
if(code==='list'){
  tampilin()
}


else if(code==='help'){
  console.log(`$ node todo.js help`)
  console.log(`$ node todo.js list`)
  console.log(`$ node todo.js add <task_content>`)
  console.log(`$ node todo.js task <task_id>`)
  console.log(`$ node todo.js delete <task_id>`)
  console.log(`$ node todo.js complete <task_id>`)
  console.log(`$ node todo.js uncomplete <task_id>`)
  console.log(`$ node todo.js list:outstanding asc|desc`)
  console.log(`$ node todo.js list:completed asc|desc`)
  console.log(`$ node todo.js tag <task_id> <tag_name_1> <tag_name_2>...`)
  console.log(`$ node todo.js filter <tag_name>`)
}

else if(code==='add'){
  data.push(new Task(code2));
  fs.writeFileSync(skrip,JSON.stringify(data),'utf-8')
}

else if(code==='delete'){
  data.splice(code2-1,1)
  fs.writeFileSync(skrip,JSON.stringify(data),'utf-8')
}

else if(code==='task'){

    if(data[code2-1].completed===true){
      console.log(`${code2}. [x] ${data[code2-1].task}`)
    }
    else{
      console.log(`${code2}. [ ] ${data[code2-1].task}`)
    }

}

else if(code==='complete'){
  data[code2-1].completed=true;
  data[code2-1].completedAt = new Date()
  fs.writeFileSync(skrip,JSON.stringify(data),'utf-8')

}

else if(code==='uncomplete'){
  data[code2-1].completed=false;
  data[code2-1].completedAt = "not yet"
  fs.writeFileSync(skrip,JSON.stringify(data),'utf-8')
}

else if(code ==='list:outstanding'){
  if(code2 === 'asc'){
      data.sort(function(a,b){
      return new Date(a.createdAt) - new Date(b.createdAt)
    })
    tampilinFalse()
  }
  else if(code2 === 'desc'){
    data.sort(function(a,b){
      return new Date(a.createdAt) - new Date(b.createdAt)
    }).reverse()
    tampilinFalse()
  }
}

else if(code ==='list:completed'){
  if(code2 === 'asc'){
      data.sort(function(a,b){
      return new Date(a.createdAt) - new Date(b.createdAt)
    })
    tampilinTrue()
  }
  else if(code2 === 'desc'){
    data.sort(function(a,b){
      return new Date(a.createdAt) - new Date(b.createdAt)
    }).reverse()
    tampilinTrue()
  }
}

else if(code==='tag'){

  data[code3-1].tag += code4
  fs.writeFileSync(skrip,JSON.stringify(data),'utf-8')

}

else if(code === 'filter'){
  for(var i=0;i<data.length;i++){
    if(data[i].tag.includes(code2)){
      if(data[i].completed===true){
        console.log(`${i+1}. [x] ${data[i].task}`)
      }
      else{
        console.log(`${i+1}. [ ] ${data[i].task}`)
      }
    }
  }
}

else {
  console.log(`$ node todo.js help`)
  console.log(`$ node todo.js list`)
  console.log(`$ node todo.js add <task_content>`)
  console.log(`$ node todo.js task <task_id>`)
  console.log(`$ node todo.js delete <task_id>`)
  console.log(`$ node todo.js complete <task_id>`)
  console.log(`$ node todo.js uncomplete <task_id>`)
  console.log(`$ node todo.js list:outstanding asc|desc`)
  console.log(`$ node todo.js list:completed asc|desc`)
  console.log(`$ node todo.js tag <task_id> <tag_name_1> <tag_name_2>...`)
  console.log(`$ node todo.js filter <tag_name>`)
}
