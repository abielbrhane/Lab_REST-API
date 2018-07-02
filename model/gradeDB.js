
const{from} = require('rxjs');
const{filter} = require('rxjs/operators');

class Grades{

    Constructor(){
        this.gradeArr = [];
    }

    insertNewGrade(obj){
        this.gradeArr.push(obj);
    }

    
    findGradeById(id){
        from(this.gradeArr).pipe(filter((grade) => grade.id === id))
        .subscribe((grade) => {return grade;});
      }
  
  deleteGrade(id){
      var temp=this.gradeArr;
      this.gradeArr=[];
     
      from(temp)
      .pipe(filter((grade)=> grade.id !== this.findGradeById(id))) 
      .subscribe((grade)=>{this.gradeArr.push(grade);});
  
      return this.gradeArr;
  }

  updateGrade(obj){
      let grade = this.deleteGrade(obj.id);
      (grade.id) ? this.insertNewGrade(obj) : {};
  }
  
  findAllGrades(){
      return this.gradeArr;
  }
  }
        
  module.exports = Grades;