const fs = require('fs'); // untuk kebutuhan READ / WRITE file

//untuk kebutuhan mendapatkan nilai MAX dalam array
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

var input = process.argv

switch (input[2]) {

  case "add":

  let arr = []

  for(let i = 3; i < input.length; i++)
  {
    arr.push(input[i]);
  }

  value = arr.join(" ");

  addList(value)
  console.log("TASK : "+input[3]+" ADDED !");

  break;


  case "list":

      showList()
  break;

  case "task":

  let id_task = input[3]
  Task(id_task)
  break;

  case "delete":

    let id_del = input[3]
    Dlete(id_del)
  break;

  case "complete":
    let id_com = input[3]
    Complete(id_com)
  break;

  case "uncomplete":

    let id_un = input[3]

    unComplete(id_un)
  break;

  case "list:outstanding":

  unCompleteSort(input[3]);
  break;

  case "list:completed":

  completeSort(input[3]);
  break;

  case "tag":

  tag(input[3],input.splice(4,input.length - 4));
  break;

  default:

    if(input[2].split(":")[0] == "filter"){
      filter(input[2].split(":")[1])
    }
    else{
      Help()
    }

}


// fs.writeFileSync('data.json',JSON.stringify(json,null,3),'utf8');

function Help(){
    let arr = ['help', 'list', 'add <task_content>', 'task <task_id>', 'delete <task_id>', 'complete <task_id>', 'uncomplete <task_id>','list:outstanding asc | desc','list:completed asc | desc','Tag <task_id> <tag_name 1> <tag_name 2>....<tag_name_N>','filter :<tag_name>']


    for(let i = 0; i < arr.length; i++){
      console.log("node todo.js "+arr[i]);
    }

}

function showList(){

    let data = connect();

    console.log("CURRENT TASK !");
    for(let i = 0; i < data.length; i++){
        console.log(`${(i+1)}. ${data[i].Complete ? "[x]" : "[ ]"}  ${data[i].Task}`);
    }

}

function addList(value){

  let json = connect();
  let id = getincrement() + 1;

  json.push({

          "id" : id,
          "Task" : value,
          "Complete" : false,
          "Created_date" : new Date() ,
          "Complete_date" : "",
          "tag" : []
  })

 fs.writeFileSync('data.json',JSON.stringify(json,null,3),'utf-8')

}

function Task(id){

  let json = connect();

  for(let i = 0; i < json.length; i++)
  {
      if(json[i].id == id)
      {
        console.log("TASK : "+json[i].Task);
      }
  }


}

function Dlete(id){

  let json = connect()

  for(let i = 0; i < json.length; i++){

        if(json[i].id == id){

            let key = json.indexOf(json[i]);

            console.log("TASK : "+json[i].Task+" [DELETED]");
            json.splice(key,1)

        }
  }

    fs.writeFileSync('data.json',JSON.stringify(json,null,3),'utf-8')

}

function Complete(id){

    let json = connect()

    for(let i = 0; i < json.length; i++){

          if(json[i].id == id){

            console.log("TASK : "+json[i].Task+" [COMPLETED]");

              json[i].Complete = true
          }
    }

      fs.writeFileSync('data.json',JSON.stringify(json,null,3),'utf-8')
}

function completeSort(rule){

      let json = connect()
      let temp = []

        for(let i = 0; i < json.length ;i++){

              if(json[i].Complete)
              temp.push(json[i])
        }


        if(rule == "desc"){

          temp.sort(function(a,b){

                var x = new Date(a.Created_date)
                var y = new Date(b.Created_date)
              return y - x
          });

          for(let countDesc = 0; countDesc < temp.length; countDesc++){

            console.log(`${(countDesc+1)}. ${temp[countDesc].Complete ? "[x]" : "[ ]"}  ${temp[countDesc].Task}`);
          }
        }

            if(rule == "asc")
            {
              temp.sort(function(a,b){

                    var x = new Date(a.Created_date)
                    var y = new Date(b.Created_date)
                  return x - y
              });

              for(let countAsc = 0; countAsc < temp.length; countAsc++){

                console.log(`${(countAsc+1)}. ${temp[countAsc].Complete ? "[x]" : "[ ]"}  ${temp[countAsc].Task}`);
              }
            }
}

function unComplete(id){

  let json = connect()

  for(let i = 0; i < json.length; i++){

        if(json[i].id == id){

            console.log("TASK : "+json[i].Task+" [UNCOMPLETED]");
            json[i].Complete = false
        }
  }
    fs.writeFileSync('data.json',JSON.stringify(json,null,3),'utf-8')
}

function unCompleteSort(rule){



      let json = connect()
      let temp = []
        for(let i = 0; i < json.length ;i++){

              if(!json[i].Complete)
              temp.push(json[i])
        }


        if(rule == "desc"){

          temp.sort(function(a,b){

                var x = new Date(a.Created_date)
                var y = new Date(b.Created_date)
              return y - x
          });

            for(let countDesc = 0; countDesc < temp.length; countDesc++){

              console.log(`${(countDesc+1)}. ${temp[countDesc].Complete ? "[x]" : "[ ]"}  ${temp[countDesc].Task}`);
            }
        }

            if(rule == "asc")
            {

              temp.sort(function(a,b){

                    var x = new Date(a.Created_date)
                    var y = new Date(b.Created_date)
                  return x - y
              });

              for(let countAsc = 0; countAsc < temp.length; countAsc++){

                console.log(`${(countAsc+1)}. ${temp[countAsc].Complete ? "[x]" : "[ ]"}  ${temp[countAsc].Task}`);
              }
            }
}

function tag(id,arr){

    let json = connect()

    for(let i = 0; i < json.length; i++){
        if(json[i].id == id)
        {
          json[i].tag = arr
        }
    }
    console.log("TAG :"+arr+" Added");

    fs.writeFileSync('data.json',JSON.stringify(json,null,3),'utf-8')
}

function filter(tag){

  let json = connect()

  let arr = []

      for(let x = 0; x < json.length; x++){

          for(let y = 0; y < json[x].tag.length;y++)
          {
                if(json[x].tag[y] == tag)
                {
                    console.log(`Task : ${json[x].Task}`);
                }
          }
      }


}

function getincrement(){

  let json = connect();

  if(json.length == 0)
  {
    return 0;
  }

  let penampungID = [];
  for(let i = 0; i < json.length;i++)
  {


    penampungID.push(json[i].id)
  }
  return penampungID.max();
}

function connect(){

  let data = fs.readFileSync('data.json', 'utf-8')
  let json = JSON.parse(data);

  return json
}
