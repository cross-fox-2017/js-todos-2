"use strict"
const fs = require('fs')
var colors = require('colors');

var dataFile = fs.readFileSync('data.json','UTF-8')
var dataList = JSON.parse(dataFile)
let dataArr = []
//
// for (var i = 0; i < dataList.length; i++) {
//   dataArr.push(dataList[i])
// }
//
// dataList.push({ "id":5, "task": "tes", "status": false })
let messageArr = ["# will call help",'help', 'list', 'add <task_content>', 'task <task_id>', 'delete <task_id>', 'complete <task_id>', 'uncomplete <task_id>', 'completed-list asc | dsc', 'uncompleted-list asc | dsc', 'tag <task_id> <input tag>', 'filter <selected tag>' ]

let argv = process.argv

// show menu & help
if (argv[2] == undefined || argv[2] =='help') {
  for (var i = 0; i < messageArr.length; i++) {
    console.log(messageArr[i]);
  }
}

// task ...
if (argv[2] == 'task' ) {
  if (argv[3] == undefined || argv[3] == 0 || argv[3] > dataList.length || typeof(argv[3]) !== Number) {
    console.log(`Format salah. Masukkan ${'task <spasi> nomer id'.bold}. Jumlah task saat ini : ${dataList.length}`);
  }
  else {
    console.log(`task ke ${argv[3]} :\n` + dataList[argv[3]-1]['task']);
  }
}

// list ..
if (argv[2] == 'list') {
  console.log(`\nBerikut to do list:\n`);
  for (var i = 0; i < dataList.length; i++) {
    if (dataList[i]['status'] == false) {
      console.log(`[ ] ${dataList[i]['task']}`);
    }
    if (dataList[i]['status'] == true) {
      console.log(`[X] ${dataList[i]['task']}`.bold.cyan);
    }
  }
}

// completed-list
if (argv[2] == 'completed-list') {
  if (argv[3] == 'asc' || argv[3] == undefined) {
    dataList.sort(function(a,b){ return new Date(a.Date) - new Date(b.Date)})
    let cek = 0
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i]['status'] == true) {
        console.log(`[X] ${dataList[i]['task']}`.bold.cyan);
        cek++
      }
    }
    if (cek==0) {
      console.log('belum ada completed-task'.red);
    }
  }

  if (argv[3] == 'desc') {
    dataList.sort(function(a,b){ return new Date(b.Date) - new Date(a.Date)})
    let cek = 0
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i]['status'] == true) {
        console.log(`[X] ${dataList[i]['task']}`.bold.cyan);
        cek++
      }
    }
    if (cek==0) {
      console.log('belum ada completed-task'.red);
    }
  }
}

// uncompleted-list
if (argv[2] == 'uncompleted-list') {
  if (argv[3] == 'asc' || argv[3] == undefined) {
    dataList.sort(function(a,b){ return new Date(a.Date) - new Date(b.Date)})
    let cek = 0
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i]['status'] == false) {
        console.log(`[ ] ${dataList[i]['task']}`.bold.red);
        cek++
      }
    }
    if (cek==0) {
      console.log('belum ada completed-task'.red);
    }
  }

  if (argv[3] == 'desc') {
    dataList.sort(function(a,b){ return new Date(b.Date) - new Date(a.Date)})
    let cek = 0
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i]['status'] == false) {
        console.log(`[ ] ${dataList[i]['task']}`.bold.red);
        cek++
      }
    }
    if (cek==0) {
      console.log('semua task telah complete'.red);
    }
  }
}

// add ..
if (argv[2] == 'add') {
  if (argv[3] == undefined) {
    console.log('Masukkan task id yang akan diinput');
  }
  else {
    // here add process
    let addData = argv.splice(3, argv.length)
    dataList.push({"id":dataList.length + 1, "task": addData.join(' '), "status": false, "Date": new Date(), "tag":[]})
    console.log(`Task ${addData.join(' ').cyan} berhasil terinput dengan id ${colors.cyan(dataList.length)}`);
  }
  fs.writeFileSync('data.json',JSON.stringify(dataList) ,'utf8')
}

// delete
if (argv[2] == 'delete') {
  if (argv[3] == undefined || argv[3] == 0 || argv[3] > dataList.length) {
    console.log(`Format salah. Masukkan ${'delete <spasi> nomer id'.bold}. Jumlah task saat ini = ${dataList.length}`);
  }
  else {
    console.log(`Task ${dataList[argv[3]-1]['task'].red} berhasil didelete`);
    dataList.splice(argv[3]-1,1)
    for (var i = 0; i < dataList.length; i++) {
      dataList[i]['id'] = i+1
    }
    fs.writeFileSync('data.json',JSON.stringify(dataList) ,'utf8')
  }
}

// complete
if (argv[2] == 'complete') {
  if (argv[3] == undefined) {
    console.log(`Format salah. Masukkan ${'complete <spasi> nomer id'.bold}. Jumlah task saat ini = ${dataList.length}`);
  }
  else {
    dataList[argv[3]-1]['status'] = true
    console.log(`task ${dataList[argv[3]-1]['task'].bold.cyan} telah menjadi ${'complete!'.bold}`);
  }
    fs.writeFileSync('data.json',JSON.stringify(dataList) ,'utf8')
  }

  // uncomplete
  if (argv[2] == 'uncomplete') {
    if (argv[3] == undefined) {
      console.log(`Format salah. Masukkan ${'uncomplete <spasi> nomer id'.bold}. Jumlah task saat ini = ${dataList.length}`);
    }
    else {
      dataList[argv[3]-1]['status'] = false
      console.log(`task ${dataList[argv[3]-1]['task'].bold.cyan} telah menjadi ${'uncomplete!'.bold}`);
    }
      fs.writeFileSync('data.json',JSON.stringify(dataList) ,'utf8')
    }

// tag
if (argv[2] == 'tag'){
  if (argv[3] == undefined || argv[3] == 0 || argv[3] > dataList.length) {
    console.log('Masukkan task id yang akan diberi tag');
  }
  else {
    if (argv[4] == undefined) {
      console.log(`Masukkan jenis tag yang akan diinput ke task ${dataList[argv[3]-1]['task'].red}`);
    }
    else {
      let addData = (argv.splice(4, argv.length)).join(' ')
      dataList[argv[3]-1]['tag'].push(addData)
      console.log(`Task ${dataList[argv[3]-1]['task'].cyan} telah masuk dalam tag ${colors.red(addData)}`);
    }
  }
  fs.writeFileSync('data.json',JSON.stringify(dataList) ,'utf8')
}

// filter
if (argv[2] == 'filter'){
  if (argv[3] == undefined) {
    console.log('Masukkan task id yang akan difilter');
  }
  else {
    let cek = 0
    let addData = (argv.splice(3, argv.length)).join(' ')
    for (var i = 0; i < dataList.length; i++) {
      for (var j = 0; j < dataList[i]['tag'].length; j++) {
        if (dataList[i].tag[j] == addData) {
          console.log(`- ${dataList[i]['task'].blue} with tag : ${colors.cyan(dataList[i]['tag'])}`)
          cek++
        }
      }
    }
    if (cek == 0) {
      console.log(`Tag '${addData.red}' tidak ditemukam`)
    }
  }
}
