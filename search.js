/**
 * http://usejsdoc.org/
 */
function search(fillIngredients,limitLicense,ranking){
    var Ingredients = document.getElementById("search").value;
    Ingredients = Ingredients.replace(',','%2C');
    var ingredientArray = Ingredients.split('%2C');
    Ingredients = Ingredients.replace(" ","+");
    var number = document.getElementById("number").value;
    console.log(number);
	var request= new XMLHttpRequest();
	var databox = [];
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE && request.status === 200){
			var data = JSON.parse(request.responseText);
			var dataobject = {};
			if(data.length > 0) {

                for (var i = 0; i < data.length; i++) {
                    if(data[i].usedIngredientCount == ingredientArray.length &&data[i].missedIngredientCount == 0) {
                        dataobject = {
                            'id': data[i].id,
                            'image': data[i].image,
                            'likes': data[i].likes,
                            'missedIngredientCount': data[i].missedIngredientCount,
                            'title': data[i].title,
                            'usedIngredientCount': data[i].usedIngredientCount,
                            'missedIngredients': data[i].missedIngredients
                        };
                        databox.push(dataobject);
                    }
                }
                console.log(databox);
                var body = document.getElementById('body');
                var table = document.createElement('table');
                var thead = document.createElement('thead');
                var trhead = document.createElement('tr');
                var thnames = ['id', 'imgage', 'Dish Name', "Ingredients"];
                for (var k = 0; k < thnames.length; k++) {
                    var th = document.createElement('th');
                    th.innerHTML = thnames[k];
                    trhead.appendChild(th);
                }
                thead.appendChild(trhead);
                table.appendChild(thead);
                var tbody = document.createElement('tbody');
                for (var j = 0; j < databox.length; j++) {
                    var tr = document.createElement('tr');
                    var tdid = document.createElement('td');
                    var tdimg = document.createElement('td');
                    //var tdmic = document.createElement('td');
                    var tdt = document.createElement('td');
                    //var tduic = document.createElement('td');
                    var tdmi = document.createElement('td');
                    tdid.innerHTML = "<a href=" + "recipeinfo.html?" + databox[j].id + ">" + databox[j].id + "";
                    tdimg.innerHTML = ("<a href=" + "recipeinfo.html?" + databox[j].id + ">" + "<img src=" + databox[j].image + ">");
                    //tdmic.innerHTML = (databox[j].missedIngredientCount);
                    tdt.innerHTML = (databox[j].title);
                    //tduic.innerHTML = (databox[j].usedIngredientCount);
                    for (var k = 0; k < databox[j].missedIngredients.length; k++) {
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
function complexSearch(){
    var addRecipeInformation, cuisine, excludeIngredients, fillIngredients, includeIngredients,instructionRequired,intolerances,limitLicense,maxCalories,maxCarbs,
        maxFat,maxProteins,minCalories,minCarbs,minFat,minProtein,number,offset,query,ranking,type, readyInMinutes;
    addRecipeInformation = true;
    cuisine = document.getElementById('cuisine').value;
    excludeIngredients = document.getElementById('excludeIngredients').value;
    fillIngredients = true;
    includeIngredients = document.getElementById('Ingredients').value;
    var IngredientCount;
    IngredientCount = includeIngredients.split(',').length;
    console.log(IngredientCount);
    instructionRequired = true;
    intolerances = document.getElementById('intolerance').value;
    limitLicense =false;
    maxCalories = document.getElementById('maxCalories').value;
    maxCarbs = document.getElementById('maxCarbs').value;
    maxFat= document.getElementById('maxFat').value;
    maxProteins=document.getElementById('maxProtein').value;
    minCalories =document.getElementById('minCalories').value;
    minCarbs=document.getElementById('minCarbs').value;
    minFat=document.getElementById('minFat').value;
    minProtein=document.getElementById('minProtein').value;
    number = document.getElementById('number').value;
    offset=0;
    query=document.getElementById('query').value;
    ranking=1;
    type=document.getElementById('type').value;
    readyInMinutes=document.getElementById('readyInMinutes').value;
    //console.log(addRecipeInformation+" , " +cuisine+" , " + excludeIngredients+" , " + fillIngredients+" , " + includeIngredients+" , " +instructionRequired+" , " +intolerances+" , " +limitLicense+" , " +maxCalories+" , " +maxCarbs+" , " + maxFat+" , " +maxProteins+" , " +minCalories+" , " +minCarbs+" , " +minFat+" , " +minProtein+" , " +number+" , " +offset+" , " +query+" , " +ranking+" , " +type);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200){
            var data = JSON.parse(request.responseText);
            console.log(data);
            var body = document.getElementById('body');
            if(data.totalResults > 0) {
                data.results.forEach(function (recipes) {
                    console.log(recipes.title);
                    console.log(recipes.missedIngredients.length);
                    if (recipes.readyInMinutes <= readyInMinutes && recipes.usedIngredients.length === IngredientCount && (recipes.missedIngredients.length===3 ||recipes.missedIngredients.length===2 ||recipes.missedIngredients.length===1)) {
                        var div = document.createElement('div');
                        div.innerHTML = "<p>" + recipes.title + "<p><br>" + "<a href='recipeinfo.html?" + recipes.id + "'><img src=" + "'" + recipes.image + "'" + "</a>";
                    }else{
                        return;
                    }
                    body.append(div);
                });
            }else if(data.totalResults ===0){
                var p = document.createElement('p');
                p.innerHTML = "NO RECIPE FOUND";
            }
        }
    };
    request.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?" +
        "addRecipeInformation=" + addRecipeInformation + "&" +
        "cuisine="+ replace(cuisine)+"&" +
        "excludeIngredients="+ replace(excludeIngredients)+"&" +
        "fillIngredients="+ fillIngredients+"&" +
        "includeIngredients="+ replace(includeIngredients)+"&" +
        "instructionsRequired="+ instructionRequired+"&" +
        "intolerances="+ replace(intolerances)+"&" +
        "limitLicense="+ limitLicense+"&" +
        "maxCalories="+ maxCalories+"&" +
        "maxCarbs="+ maxCarbs+"&" +
        "maxFat="+ maxFat+"&" +
        "maxProtein="+ maxProteins+"&" +
        "minCalories="+ minCalories+"&" +
        "minCarbs="+ minCarbs+"&" +
        "minFat="+ minFat+"&" +
        "minProtein="+ minProtein+"&" +
        "number="+ number+"&" +
        "offset="+ offset+"&" +
        "query="+ replace(query)+"&" +
        "ranking="+ ranking+"&" +
        "type="+ type);
    request.setRequestHeader('X-Mashape-Key', 'bO9COj191VmshVzI4cNTPoxIxXoMp1ZfMQtjsnsM1bEzjBrumx');
    request.setRequestHeader('Accept', 'application/json');
    request.send();
}
function replace(ingredient){
    var result;
    result = ingredient.replace(',',"%2C");
    result = result.replace(' ', '+');
    return result;
}