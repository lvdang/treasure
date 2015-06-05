 function Pie() {


 }

 Pie.prototype.draw = function(obj) {
    var text = "Title: " + obj.pie.title + " -- Description : " + obj.pie.description + "  -- [pie id : " + obj.pie.id + "] ";
    var data = obj.data;
    
    $('#container').highcharts({
        title : { text : text },

        series: [{ type : 'pie',
            data: data
        }]
    });
 };


Pie.prototype.organizeData = function(obj) {
   var data = [];
   var len = obj.length;

   for (var i = 0; i < len; i++) {
       data.push([obj[i].name + "[slice id: " + obj[i].id + "]", obj[i].value]);
   }
  
   return data;
};
