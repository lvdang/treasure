
(function($) {


function Controller(obj) {
    this.S = obj.services;
    this.P = new Pie(); 

    this.main = document.getElementById('main');
    this.main_slice = document.getElementById('main_slice');
}

Controller.prototype.eventDelegation = function() {
  var self = this;

  $('#bar').click(function(e) {
      var text = e.target.innerText;
      switch (text) {
         case 'Create' :
           self.main.innerHTML = document.getElementById('c_cont').innerHTML;
           self.createContainer();
           break;
         case 'Delete' :
            self.main.innerHTML = document.getElementById('d_cont').innerHTML;
            self.deleteContainer();
            break;
         case 'List' :
            self.main.innerHTML = document.getElementById('list_cont').innerHTML;
            self.listContainer();
            break;
         case 'Update' :
            self.main.innerHTML = document.getElementById('u_cont').innerHTML;
            self.updateContainer();
            break;
         case 'Read' :
            self.main.innerHTML = document.getElementById('r_cont').innerHTML;
            self.readPie();
            break;
      }
   });

   $('#slice_options').click(function(e) {
      var text = e.target.innerText;
      switch (text) {
         case 'Create' :
           self.main_slice.innerHTML = document.getElementById('c_cont_s').innerHTML;
           self.createSlice();
           break;
         case 'Delete' :
            self.main_slice.innerHTML = document.getElementById('d_cont_s').innerHTML;
            self.deleteSlice();
            break;
         case 'Draw' :
            self.main_slice.innerHTML = document.getElementById('list_cont_s').innerHTML;
            self.getPieSlices();
            break;
         case 'Update' :
            self.main_slice.innerHTML = document.getElementById('u_cont_s').innerHTML;
            self.updateSlice();
            break;
      }
   });
};

Controller.prototype.updateSlice = function(obj) {
   var self = this;

   $("#update_slice").click(function(e) {
       console.log('update slice');
       self.S.updateSlice({ pie_id : $('#pie_num_s').val(),  slice_id : $('#slice_num').val(), value : $('#u_value_s').val(), name : $('#u_name_s').val() });
   });
   
};

Controller.prototype.deleteSlice = function(obj) {
   var self = this;
   $('#delete_slice').click(function(e) {
      console.log('delete slice');
       self.S.deleteSlice( { pie_id : $('#pie_num_s').val(),  slice_id : $('#slice_num').val() });

   });
};

Controller.prototype.createSlice = function(obj) {
   var self = this;
   $('#create_slice').click(function(event) {
       console.log('create slice');
       self.S.createSlice({ name : $('#p_name').val(), value : $('#p_value').val(), pie_id : $('#pie_num_s').val() });
   });
};

Controller.prototype.getPieSlices = function(obj) {
   var self = this;
   $('#get_slices').click(function(event) {
       console.log('get pie slice');
       var pie_id = $('#pie_num_s').val();
       var promise = self.S.getPieSlices({ pie_id : pie_id });
       promise.done(function(slices) {
            self.slices = slices;
            if (slices.length) {
               var data = self.P.organizeData(slices);
               self.P.draw( { data : data, pie : self.S.pies[pie_id].pie });
            }

            console.log('all slices', self.slices);
       });
   });
};


 

Controller.prototype.readPie = function(obj) {
    var self = this;
     
    $('#read_pie').click(function(e) {
        var pie_id = $('#pie_num').val();
        var promise = self.S.readPie( { pie_id : pie_id });
        console.log('read pie');
        promise.done(function (pie) {
            document.getElementById('read_data').innerHTML = "title: " + pie.title + "| description : " + pie.description + "| id : " + pie.id;
             
        });
    });

  
};


Controller.prototype.updateContainer = function(obj) {
   var self = this;
   $('#update_pie').click(function(e) {
       console.log('update pie');
       var g = { title : $('#u_title').val(),
                 description : $('#u_desc').val(),
                 pie_id : $('#pie_num').val()

                };
        self.S.updatePie(g);
   });

};

Controller.prototype.listContainer = function(obj) {
    var self = this;
    var promise = self.S.getList();
  
    promise.done(function (pie_list) {
       self.S.pie_list = pie_list;
       for (var x in pie_list) {
        var li = document.createElement('li');
        li.innerHTML = "title: " + pie_list[x].title + " | description : " + pie_list[x].description + " | id : " + pie_list[x].id;
        document.getElementById('pie_list').appendChild(li);
       }
    });
};

Controller.prototype.listContainer_ = function(obj) {
    var self = this;
    var promise = self.S.getList();
  
    promise.done(function (pie_list) {
       self.S.pie_list = pie_list;
       for (var x in pie_list) {
        var li = document.createElement('li');
        li.innerHTML = "title: " + pie_list[x].title + " | description : " + pie_list[x].description + " | id : " + pie_list[x].id;
        document.getElementById('pie_list').appendChild(li);
       }
    });
};


Controller.prototype.getAllPies = function() {
   var self = this;
   var promise = self.S.getList();
  
    promise.done(function (pie_list) {
       self.S.pie_list = pie_list;
       for (var x in pie_list) {
          self.S.pies[pie_list[x].id] = { pie : pie_list[x]};
       }

       console.log('all pies', self.S.pies);
    });
}


Controller.prototype.deleteContainer = function(obj) {
    var self = this;
    $('#delete_pie').click(function(e) {
         console.log('delete pie');
         self.S.deletePie( { pie_id : $('#pie_num').val() });
    });

};

Controller.prototype.createContainer = function(obj) {
      var self = this;
      $('#create_pie').click(function(e) {
         console.log('create pie');
         var g = { title : $('#p_title').val(),
                   description: $('#p_desc').val() };
         self.S.postNewPie(g);
      });   

};

var S = new Services();
 
var C = new Controller( { services : S });
C.eventDelegation();
C.getAllPies();
 

})($);