const fs = require('fs');

var tampung = process.argv;
var potong = tampung.slice(2);
// console.log( potong);

if (potong[0] == "list") {
  list();
} else if (potong[0] == "add") {
  add();
} else if (potong[0] == "task") {
  task();
} else if (potong[0] == "delete") {
  hapus();
} else if (potong[0] == "complete") {
  complete();
} else if (potong[0] == "uncomplete") {
  uncomplete();
} else if (potong[0] == "outstanding") {
  if (potong[1] == "asc") {
    asc();
  } else {
    desc();
  }
} else if (potong[0] == "tag") {
  tag();
} else if (potong[0] == "filter") {
  filter();
} else if (potong[0] == "help") {
  help();
}

function help() {
  console.log(`
  Command:
  // 1. help
  // 2. list
  // 3. add <task_content>
  // 4. task <task_id>
  // 5. delete <task_id>
  // 6. complete <task_id>
  // 7. uncomplete <task_id>
  // 8. outstanding asc || dsc
  // 9. tag <task number tag_1 tag_2 tag_n>
  // 10. filter <tag>`);
}

function list() {
  var list = JSON.parse(fs.readFileSync('data.json', "utf-8"));
  for (var i = 0; i < list.length; i++) {
      console.log(`${i+1}. [${list[i]["status"]}] ${list[i]["task"]}`);
  }
}

function add() {
  // harus dirubah dulu ke object
  var list = JSON.parse(fs.readFileSync('data.json', "utf-8"));
  var obj = JSON.parse(`{ "task": "${potong[1]}", "id": "${list.length + 1}", "status": "", "created_date": "${new Date()}", "tags": ""}`);
  list.push(obj)
  // saat di masukkan, harus di convert lagi jadi string
  var json = JSON.stringify(list, false, 3);
  fs.writeFileSync("data.json", json, "utf-8");
}

function task() {
  var list = JSON.parse(fs.readFileSync('data.json', "utf-8"));
  var index = potong[1] - 1;
  console.log(` Task ke ${potong[1]}, adalah ${list[ index ]["task"]} `);
}

function hapus() {
  var list = JSON.parse(fs.readFileSync('data.json', "utf-8"));
  let index = potong[1] - 1
  delete list[ index ];
  list.splice( index, 1 );
  var json = JSON.stringify(list, false, 3);
  fs.writeFileSync("data.json", json, "utf-8");
  console.log(`Task ke ${potong[1]} sudah di hapus`);
  //console.log(`Deleted ${list[index]["task"]} from your todo list...`);
}

function complete() {
  var list = JSON.parse(fs.readFileSync('data.json', "utf-8"));
  let index = potong[1] - 1;
  list[index]["status"] = "X";
  var json = JSON.stringify(list, false, 3);
  fs.writeFileSync("data.json", json, "utf-8");
}

function uncomplete() {
  var list = JSON.parse(fs.readFileSync('data.json', "utf-8"));
  let index = potong[1] - 1;
  list[index]["status"] = "";
  var json = JSON.stringify(list, false, 3);
  fs.writeFileSync("data.json", json, "utf-8");
}

function asc() {
  var list = JSON.parse(fs.readFileSync('data.json', "utf-8"));
  let tampil = list.sort(compare_sort);
  console.log(tampil);
}

function desc() {
  var list = JSON.parse(fs.readFileSync('data.json', "utf-8"));
  let tampil = list.sort(compare_desc);
  console.log(tampil);
}

function tag() {
  var list = JSON.parse(fs.readFileSync('data.json', "utf-8"));
  let index = potong[1] - 1;
  var tag = potong.splice(2);
  list[index]["tag"] = tag;
  var json = JSON.stringify(list, false, 3);
  fs.writeFileSync("data.json", json, "utf-8");
}


// filter = mencari ID yg memiliki tag tertentu
function filter() {
  var list = JSON.parse(fs.readFileSync('data.json', "utf-8"));
  for (let i = 0; i < list.length; i++) {
    let hasil = list[i]["tag"].indexOf(potong[1]);
    if (hasil != -1) {
      console.log(`tag yang dicari ada di nomor ${i + 1}, dengan task: ${list[i]["task"]}`)
    }
  }
}

function compare_sort(a,b) {
  if (a.created_date < b.created_date) {
    return -1
  }
  if (a.created_date > b.created_date) {
    return  1
  }
  return 0
}
function compare_desc(a,b) {
  if (a.created_date > b.created_date) {
    return -1
  }
  if (a.created_date < b.created_date) {
    return  1
  }
  return 0
}


// 1. help
// 2. list
// 3. add <task_content>
// 4. task <task_id>
// 5. delete <task_id>
// 6. complete <task_id>
// 7. uncomplete <task_id>
// 8. outstanding asc || dsc
// 9. tag <task number tag_1 tag_2 tag_n>
// 10. filter <tag>
