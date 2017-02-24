/**
 * Created by geova on 2/23/2017.
 */
function search(item){
    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    var databox = [];
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var Jsoninfo = JSON.parse(this.responseText);
            for(var i=1; i< Jsoninfo.count;i++){
                var object = {};
                var ingredients = [];
                try{
                    for(var j = 0; j<Jsoninfo.hits[i].recipe.ingredients.length;j++){
                        ingredients.push(Jsoninfo.hits[i].recipe.ingredients[j]['text']);
                    }
                    object = {label: Jsoninfo.hits[i].recipe.label, image:Jsoninfo.hits[i].recipe.image,ingredients:ingredients};
                    databox.push(object);
                }catch(undefine){
                    i++;
                }
            }
            insertable(databox);
                }
    };
    xhttp.open("GET", "https://api.edamam.com/search?q=" + item +"&app_id=c31678fe&app_key=9f0a83112ad1a27f64190bf197af11c2&from=0&to=1000"
        , true);
    xhttp.send();
}
function insertable(databox) {
    console.log(databox);
    var body = document.getElementById('body');
    for (var k = 0; k < databox.length; k++) {
        var tr = document.createElement('tr');
        body.appendChild(tr);
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
            //tr.innerHTML = "<td><img src='" + databox[k].image + "'/></td><td>" + databox[k].label + "</td><td id='ingredients" + k + "'></td>";
        td1.innerHTML = "<img src='" + databox[k].image + "'/>";
        td2.innerHTML = databox[k].label;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
            for (var p = 0; p < databox[k].ingredients.length; p++) {
                var tr2=document.createElement('tr');
                tr2.innerHTML ='<tr>' + databox[k].ingredients[p] + '</tr>';
                td3.appendChild(tr2);
            }
        }
}

