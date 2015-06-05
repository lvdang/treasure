function Services() {
	this.url = 'https://pie-chart.herokuapp.com/pie_charts';
    this.pies = {};
    this.pie_list = [];
}


Services.prototype.updateSlice = function(obj) {
  var self = this;
  var slice_id = obj.slice_id;
  var pie_id = obj.pie_id;  

  var g =  {
         "value": parseInt(obj.value),
         "name": obj.name
      };

     g = self.toJSON(g); 

     $.ajax({
       url: self.url + "/" + obj.pie_id + "/slices/" + slice_id,
       type: 'PATCH',
       contentType:'application/json',
       crossDomain: true,
       data: g,
       dataType:'json',
       success: function(response) {
       	   console.log('slice update success');
       	   
       	   if (self.pies[obj.pie_id.slices]) {
            self.pies[obj.pie_id]['slices'][slice_id].name = obj.name;
            self.pies[obj.pie_id]['slices'].value = obj.value;
            console.log(self.pies);
           }
       }
    });

};

Services.prototype.postNewPie = function(obj) {
 var self = this;

 var g =  {
  "title": obj.title,
  "description": obj.description
 };

 g = self.toJSON(g);
 
 $.ajax({
       url: self.url,
       type: 'POST',
       contentType:'application/json',
       data: g,
       crossDomain: true,
       dataType:'json',
       success: function(response) {
       	  console.log('pie created success');
          self.pies[response.id] = { pie : response };
          console.log(self.pies);
       }
});
};

Services.prototype.readPie = function(obj) {
   var self = this;

   var promise = $.ajax({
       url: self.url + "/" + obj.pie_id,
       type: 'GET',
       contentType:'application/json',
       crossDomain: true,
       dataType:'json'
   });

   return promise;

};

Services.prototype.updatePie = function(obj) {
    var self = this;

    var g =  {
         "title": obj.title,
         "description": obj.description
      };

     g = self.toJSON(g); 

     $.ajax({
       url: self.url + "/" + obj.pie_id,
       type: 'PATCH',
       contentType:'application/json',
       crossDomain: true,
       data: g,
       dataType:'json',
       success: function(response) {
       	   console.log('pie update success');
       	   
       	   if (self.pies[obj.pie_id]) {
            self.pies[obj.pie_id]['pie'].title = obj.title;
            self.pies[obj.pie_id]['pie'].description = obj.description;
            console.log(self.pies);
           }
       }
    });

};

Services.prototype.getList = function(obj) {
  var self = this;

   var promise = $.ajax({
       url: self.url,
       type: 'GET',
       contentType:'application/json',
       crossDomain: true,
       dataType:'json'
   });

   return promise;
};


Services.prototype.deleteSlice = function(obj) {
  var self = this;
  var pie_id = obj.pie_id;
  var slice_id = obj.slice_id;

  $.ajax({
       url: self.url + "/" + pie_id + "/slices/" + slice_id,
       type: 'DELETE',
       contentType:'application/json',
       crossDomain: true,
       dataType:'json',
       success: function(response) {
       	   console.log('slice delete success');
           if (self.pies[pie_id].slices) {
             delete self.pies[pie_id].slices[slice_id];
           }
                      
       }
});

};

Services.prototype.deletePie = function(obj) {
  var self = this;
  var pie_id = obj.pie_id;

  $.ajax({
       url: self.url + "/" + pie_id,
       type: 'DELETE',
       contentType:'application/json',
       crossDomain: true,
       dataType:'json',
       success: function(response) {
       	   console.log('pie delete success');
           delete self.pies[pie_id];
           console.log(self.pies);
       }
});

};


Services.prototype.getPieSlices = function(obj) {
  var self = this;
  var pie_id = obj.pie_id;

  var promise = $.ajax({
       url: self.url + "/" + pie_id + "/slices",
       type: 'GET',
       contentType:'application/json',
       crossDomain: true,
       dataType:'json'
   });

   return promise;
};

Services.prototype.createSlice = function(obj) {
  var self = this;
  var pie_id = obj.pie_id;
   
  var g =  {
    name : obj.name,
    value :  parseInt(obj.value),
  };
 
  g = self.toJSON(g);

  $.ajax({
       url: self.url + "/" + pie_id + "/slices",
       type: 'POST',
       contentType:'application/json',
       crossDomain: true,
       data : g,
       dataType:'json',
       success: function(response) {
       	  console.log('slice created success');
       	  if (!self.pies[pie_id]["slices"]) {
           self.pies[pie_id]["slices"] = {};
           self.pies[pie_id]["slices"][response.id] = response;
          } else {
           self.pies[pie_id]["slices"][response.id] = response;
          }
          console.log(self.pies);
       }
});
  
}

Services.prototype.toJSON = function(obj) {
	return JSON.stringify(obj);
}
