//const products = [];
const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "grades.json"
);

const getSubjectFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            console.log(err);
            cb([]);
        }else{
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Subject{
    constructor(idsubject,name,grade,credit) {
        this.idsubject = idsubject;
        this.name = name;
        this.grade = grade;
        this.credit = credit;
        
    }


    save() {
        getSubjectFromFile((subjects) => {
            subjects.push(this);
            fs.writeFile(p, JSON.stringify(subjects), (err) => {
                console.log(err);
            });
        });  
    }

    static fetchAll(cb) {
        getSubjectFromFile(cb);
    }

};