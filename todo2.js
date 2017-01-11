"use strict"
const fs = require('fs')
const Table = require('cli-table')

class Task{
  constructor(id, name){
    this.id = id;
    this.name = name;
    this.completed = "[ ]";
    this.createdAt = new Date().toLocaleString();
    this.completedAt = ""
  }
}

class ToDo{
  constructor(){
    this.data = []
  }
  static help(){
     console.log(`\t node todo.js \n \t node todo.js help \n\t node todo.js list \n\t node todo.js add <task_content> \n\t node todo.js task <task_id> \n\t node todo.js delete <task_id> \n\t node todo.js complete <task_id> \n\t node todo.js uncomplete <task_id>`);
     return ""
  }
  static list(){
    var table = new Table({head: ['ID', 'Task', 'Completed'], colWidths: [10, 30, 12]});
    this.data.forEach(function(val){
      table.push([val.id, val.name, val.completed])
    })
    return table.toString()
  }
  static add(task){
    let tambah = new Task(this.data[this.data.length-1].id+1, task)
    this.data.push(tambah);
    this.saveJSON()
    return `"${tambah.name}" added`
  }
  static task(id){
    for (let i = 0; i< this.data.length; i++){
      if(id == this.data[i].id){
        return this.data[i]
      }
    }
    return "id tidak ditemukan"
  }
  static delete(id){
    for (let i = 0; i< this.data.length; i++){
      if(id == this.data[i].id){
        this.data.splice(i,1)
        this.saveJSON()
        return `${this.data[i].name} deleted`
      }
    }
    return "id tidak ditemukan"
  }
  static complete(id){
    for (let i = 0; i< this.data.length; i++){
      if(id == this.data[i].id){
        this.data[i].completed = "[X]"
        this.saveJSON()
        return `${this.data[i].name} status completed`
      }
    }
    return "id tidak ditemukan"
  }
  static uncomplete(id){
    for (let i = 0; i< this.data.length; i++){
      if(id == this.data[i].id){
        this.data[i].completed = "[ ]"
        this.saveJSON()
        return `${this.data[i].name} status Uncomplete`
      }
    }
    return "id tidak ditemukan"
  }
  static getJSON(){
    this.data = fs.readFileSync('data.json', 'utf8')
    return this.data = JSON.parse(this.data)
  }
  static saveJSON(){
    let save = JSON.stringify(this.data)
    fs.writeFileSync('data.json', save)
  }
  static sort(typesort){
    if (typesort == "dsc"){
      this.data.sort(function(a,b) {
      if ( a.createdAt > b.createdAt )
          return -1;
      if ( a.createdAt < b.createdAt )
          return 1;
      return 0;
      })
    } else {
      this.data.sort(function(a,b) {
      if ( a.createdAt < b.createdAt )
          return -1;
      if ( a.createdAt > b.createdAt )
          return 1;
      return 0;
      })
    }
    return this.data
  }
  static listComp(typesort){

  }
  static tagging(id, tags){

  }
  static filter(tag){

  }
}
ToDo.getJSON()
console.log(ToDo.listOut());
// console.log(run());
function run(){
  let cmd = process.argv[2]
  let taskid = process.argv.slice(3).join(" ")
  ToDo.getJSON()
  switch (cmd) {
    case "help":
      return ToDo.help()
      break;
    case "list":
      return ToDo.list()
      break;
    case "add":
      return ToDo.add(taskid)
      break;
    case "task":
      return ToDo.task(taskid)
      break;
    case "delete":
      return ToDo.delete(taskid)
      break;
    case "complete":
      return ToDo.complete(taskid)
      break;
    case "uncomplete":
      return ToDo.uncomplete(taskid)
      break;
    default:
      return ToDo.help()
  }
}
