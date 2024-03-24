const Subject = require('../model/subject');
let rawdata = require('../data/grades.json');
let sumcredit = 0;
let sumgpa = 0; 
exports.getSubjects = (req, res, next) =>{
    console.log('Subject has shown');
    Subject.fetchAll((subjects) => 
        res.render('home',{
            subjs: subjects,
            sumcr: sumcredit,
            sumgpa: sumgpa,
            docTitle:'Home',
            path:'/',
        })
    );
}

exports.getAddSubject = (req, res, next) => {
    res.render('frmAddSubject',{
        docTitle:'Add Subject',
        path:'/frmAddSubject',
    });
};

exports.postAddSubject = (req, res, next) => {
    const subject = new Subject(req.body.idsubject,req.body.name,req.body.grade,Number(req.body.credit));
    if (req.body.idsubject !== '' && req.body.name !== ''&& req.body.credit !== ''&& req.body.grade !== '') {
        subject.save();
        console.log(subject+"sucessfully added");
      } else {
        console.log('Cannot be empty');
      }
    
    res.redirect('/');
};

const sumgtofcreditvalue = (raw) => {
    const rawdata = raw;
    rawdata.forEach((raws)=>{
      if(raws.grade == 'W'){
        sumcredit = sumcredit + 0;
      }
      else sumcredit += raws.credit;
    })
    return sumcredit
};

  
const sumgpavalue = (raw) =>{
    const rawdata = raw;
    let cgvalue = 0;
    let sumcgvalue = 0;
    const gradeValues = {
        A: 4.0,
        "B+": 3.5,
        B: 3.0,
        "C+": 2.5,
        C: 2.0,
        "D+": 1.5,
        D: 1.0,
        F: 0.0,
      };
    rawdata.forEach((raws)=>{
      if(raws.grade == 'W'){
        cgvalue = 0;
        sumcgvalue += cgvalue;
      }
      else{
        cgvalue = gradeValues[raws.grade]*raws.credit;
        sumcgvalue += cgvalue;
        cgvalue = 0;
      }
    });
    return sumgpa = (sumcgvalue/sumcredit).toFixed(2);
}

sumgtofcreditvalue(rawdata);
sumgpavalue(rawdata);