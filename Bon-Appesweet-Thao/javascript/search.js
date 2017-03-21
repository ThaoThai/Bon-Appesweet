/**
 * http://usejsdoc.org/
 */
function search(fillIngredients,limitLicense,ranking){
    var Ingredients = document.getElementById("search").value;
    Ingredients = Ingredients.replace(',','%');
    var number = document.getElementById("number").value;
    console.log(number);
	var request= new XMLHttpRequest();
	var databox = [];
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE && request.status === 200){
			var data = JSON.parse(request.responseText);
			var dataobject = {};
			if(data.length > 0){
                for(var i = 0; i< data.length; i++){
                    dataobject = {'id': data[i].id, 'image': data[i].image, 'likes': data[i].likes, 'missedIngredientCount': data[i].missedIngredientCount,'title': data[i].title,'usedIngredientCount': data[i].usedIngredientCount,'missedIngredients': data[i].missedIngredients};
                    databox.push(dataobject);
                }
                console.log(databox);
                var body = document.getElementById('recipes');
                var table = document.createElement('table');
                var thead = document.createElement('thead');
                var trhead = document.createElement('tr');
                var thnames = ['id','imgage', 'Dish Name',"Ingredients"];
                for(var k = 0; k <thnames.length;k++){
                    var th = document.createElement('th');
                    th.innerHTML = thnames[k];
                    trhead.appendChild(th);
                }
                thead.appendChild(trhead);
                table.appendChild(thead);
                var tbody = document.createElement('tbody');
                for(var j = 0; j< databox.length;j++){
                    var tr = document.createElement('tr');
                    var tdid = document.createElement('td');
                    var tdimg =document.createElement('td');
                    //var tdmic = document.createElement('td');
                    var tdt = document.createElement('td');
                    //var tduic = document.createElement('td');
                    var tdmi = document.createElement('td');
                    tdid.innerHTML = "<a href="+"recipeinfo.html?"+databox[j].id+">"+databox[j].id+"";
                    tdimg.innerHTML = ("<img src="+databox[j].image+">");
                    //tdmic.innerHTML = (databox[j].missedIngredientCount);
                    tdt.innerHTML = (databox[j].title);
                    //tduic.innerHTML = (databox[j].usedIngredientCount);
                    for(var k = 0; k<databox[j].missedIngredients.length;k++){
                        var tring = document.createElement('tr');
                        tring.innerHTML = (databox[j].missedIngredients[k].name);
                        tdmi.appendChild(tring);
                    }

                    tr.appendChild(tdid);
                    tr.appendChild(tdid);
                    tr.appendChild(tdimg);
                    //tr.appendChild(tdmic);
                    tr.appendChild(tdt);
                    //tr.appendChild(tduic);
                    tr.appendChild(tdmi);
                    tbody.append(tr);
                }
                table.appendChild(tbody);
                body.appendChild(table);
            }else{
			    var body = document.getElementById('body');
			    var p = document.createElement('p');
			    p.innerHTML = "NO RECIPE AVAILABLE FOR INGREDIENTS: " + document.getElementById("search").value;
			    body.appendChild(p);
            }
		}
	};
	request.open("GET","https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients="+fillIngredients+"&ingredients="+Ingredients+"&limitLicense="+limitLicense+"&number="+number+"&ranking="+ranking+"");
    request.setRequestHeader('X-Mashape-Key', 'bO9COj191VmshVzI4cNTPoxIxXoMp1ZfMQtjsnsM1bEzjBrumx');
    request.setRequestHeader('Accept', 'application/json');
	request.send();
}

function moreinfo() {
    console.log(document.URL);
    var id = document.URL.split('?');
    console.log(id[1]);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var recipeinfo = JSON.parse(request.responseText);
            console.log(recipeinfo);
            document.write("Title: " + recipeinfo.title + "<br>");
            document.write("....................................................................."+ "<br>");
            document.write("credit to: " + recipeinfo.creditText + "<br>");
            document.write("....................................................................."+ "<br>");
            document.write("Dairy Free: " + recipeinfo.dairyFree + "<br>");
            document.write("....................................................................."+ "<br>");
            document.write("Gluten Free: " + recipeinfo.glutenFree + "<br>");
            document.write("....................................................................."+ "<br>");
            document.write("Id: " + recipeinfo.id + "<br>");
            document.write("....................................................................."+ "<br>");
            document.write("Ready In: " + recipeinfo.readyInMinutes + "<br>");
            document.write("....................................................................."+ "<br>");
            document.write("Servings: " + recipeinfo.servings + "<br>");
            document.write("....................................................................."+ "<br>");
            document.write("Ingredients: <br>");
            for (var i = 0; i < recipeinfo.extendedIngredients.length; i++) {
                document.write("name: " +recipeinfo.extendedIngredients[i].name+ "<br>");
                document.write("amount: " +recipeinfo.extendedIngredients[i].amount+ "<br>");
                document.write("preparation: " + recipeinfo.extendedIngredients[i].originalString + "<br>");
                document.write("....................................................................."+ "<br>");
            }
            document.write("Instructions: " + recipeinfo.instructions);
        }
    };
        request.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id[1] + "/information");
        request.setRequestHeader('X-Mashape-Key', 'bO9COj191VmshVzI4cNTPoxIxXoMp1ZfMQtjsnsM1bEzjBrumx');
        request.setRequestHeader('Accept', 'application/json');
        request.send();
}