var jsonfile = require('jsonfile')
var file = 'db.json'

var database = jsonfile.readFileSync(file)

process.argv.forEach((pilihan) => {
    if (pilihan == "list") {
        console.log(database);
    } else if (pilihan == "help") {
        console.log(`\n node todo.js list \n node todo.js add <task_content> \n node todo.js task <task_id> \n node todo.js delete <task_id> \n node todo.js complete <task_id> \n node todo.js uncomplete <task_id>`);
    } else if (pilihan == "add") {
        var tmp = ''
        var tmpArr = []
        for (var i = 3; i < process.argv.length; i++) {
            if (/(tag:)/g.test(process.argv[process.argv.length - 1]) && i == process.argv.length - 1) {
                tmpArr = process.argv[process.argv.length - 1].replace(/(tag:)/g, "").split(",")
            } else {
                tmp += process.argv[i] + " "
            }
        }

        var tambah = {
            id: database[database.length - 1].id + 1,
            task: tmp,
            status: "[ ]",
            tag: tmpArr,
            modified: new Date()
        }
        database.push(tambah)
        jsonfile.writeFileSync(file, database)
        console.log(`Add "${tmp}" ke Todo List`);
        console.log(database);
    } else if (pilihan == "task") {
        var index = process.argv[3]
        for (var i = 0; i < database.length; i++) {
            if (index == database[i].id) {
                console.log(database[i]);
            }
        }
    } else if (pilihan == "delete") {
        var index = process.argv[3]
        for (var i = 0; i < database.length; i++) {
            if (index == database[i].id) {
                console.log("Hapus Data");
                console.log(database[i]);
                database.splice([i], 1)
            }
        }
        console.log(database);
        jsonfile.writeFileSync(file, database)
    } else if (pilihan == "complete") {
        var index = process.argv[3]
        for (var i = 0; i < database.length; i++) {
            if (index == database[i].id) {
                database[i].status = "[X]"
                console.log(database);
                jsonfile.writeFileSync(file, database)
                break;
            }
        }
    } else if (pilihan == "uncomplete") {
        var index = process.argv[3]
        for (var i = 0; i < database.length; i++) {
            if (index == database[i].id) {
                database[i].status = "[ ]"
                console.log(database);
                jsonfile.writeFileSync(file, database)
                break;
            }
        }
    } else if (pilihan == "list:outstanding") {
        var index = process.argv[3]
        if (index == "desc") {
            for (var i = database.length - 1; i >= 0; i--) {
                console.log(database[i])
            }
        } else if (index == "asc" || " ") {
            console.log(database);
        }
    } else if (pilihan == "list:completed") {
        var index = process.argv[3]
        var tmp = []
        for (var i = 0; i < database.length; i++) {
            if (database[i].status == "[X]") {
                tmp.push(database[i])
            }
        }
        if (index == "desc") {
            for (var j = tmp.length - 1; j >= 0; j--) {
                console.log(tmp[j])
            }
        } else if (index == "asc" || " ") {
            console.log(tmp);
        }
    } else if (pilihan == "tag") {
        var index = process.argv[3]
        var jmltag = 0
        var isitag = []
        for (var i = 4; i < process.argv.length; i++) {
            jmltag++
            isitag.push(process.argv[i])
        }
        if (index == jmltag) {
            for (var i = 0; i < database.length; i++) {
                var status = false;
                for (var j = 0; j < isitag.length; j++) {
                    if (database[i].tag.indexOf(isitag[j]) == -1) {
                        status = false;
                        break;
                    } else {
                        status = true
                    }
                }
                if (status == true) {
                    console.log(`Tagged task "${database[i].task}" with tags: ${isitag.join(" ")}`);
                }
            }
        }
    } else if (/(filter:)/g.test(pilihan)) {
        pilihan = pilihan.replace(/(filter:)/g, "")
        pilihan = pilihan.split(" ")
        console.log(database[0].tag);
        if (pilihan.length == 1) {
            for (var i = 0; i < database.length; i++) {
                if (database[i].tag.indexOf(pilihan[0]) >= 0) {
                    console.log(database[i].task+": "+JSON.stringify(database[i].tag));
                }
            }
        }
    }
})
