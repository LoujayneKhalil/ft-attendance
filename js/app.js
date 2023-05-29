/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */

var Model = {
    Students: [
        {"name": "Slappy the Frog", "records": [
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            true,
            false,
            false,
            false,
            false
        ]},
        {"name": "Lilly the Lizard", "records": [
            false,
            false,
            false,
            false,
            false,
            true,
            true,
            true,
            false,
            false,
            false,
            false
        ]},
        {"name": "Paulrus the Walrus", "records": [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false
        ]},
        {"name": "Gregory the Goat", "records": [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ]},
        {"name": "Adam the Anaconda", "records": [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            true
        ]},
    ],
    inputStorage: function(){
        localStorage.setItem("attendance",JSON.stringify(this.Students));
    },

    getData:function(){
        Model.Students = JSON.parse(localStorage.getItem("attendance"));
        if (Model.Students == null) {
            this.inputStorage();
            Model.Students = JSON.parse(localStorage.getItem("attendance"));
        }
        return Model.Students
    }

}



var View = {
    
    init: function(){
        var colName =  $(".name-col");
        var students = document.getElementsByClassName("student");

        for(let i = 0; i < Model.Students.length;i++){
            colName.eq(i).html(Model.getData()[i].name);
            for (let j = 0; j < 12; j++) {
                students[i].querySelectorAll(".attend-col")[j].querySelector("input").checked = Model.getData()[i]["records"][j];
                students[i].querySelectorAll(".attend-col")[j].querySelector("input").onclick = function () {
                    Model.Students[i]["records"][j] = this.checked;
                    Model.inputStorage();
                    View.missedDays();
                };
            }
        }
        
        

    },


    missedDays:function(){
        
        for(let j = 0; j <Model.Students.length;j++){
            var recordsLength = Model.getData()[j].records.length;
            for(let i = 0; i < recordsLength; i++){
                var clickedBox = Model.getData()[j].records;
                var count = clickedBox.filter(Boolean).length;
                $(".missed-col").eq(j).text(recordsLength - count)
            }
        }
    }
}

var Controller = {
    init: function(){
        View.init();
        View.missedDays();
    }

}

Controller.init();