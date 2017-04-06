/**
 * http://usejsdoc.org/
 */

function moreinfo() {
    console.log(document.URL);
    var body = document.getElementById('wrapper');
    var description = document.createElement('div');
    var title = document.createElement('title');
    description.setAttribute('id','description'); 
    var id = document.URL.split('?');
    console.log(id[1]);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var recipeinfo = JSON.parse(request.responseText);
            console.log(recipeinfo);
            title.innerHTML = recipeinfo.title;
            var ingredients = "";
            for (var i = 0; i < recipeinfo.extendedIngredients.length; i++) {
                ingredients += (recipeinfo.extendedIngredients[i].originalString + " " + recipeinfo.extendedIngredients[i].name+ "<br>");
            }
            
            var instruction = recipeinfo.instructions.replace("min.", "minutes").split(".");
            var split_instruction="";
            for (var j = 0; j < instruction.length-1; j++) {
                var k = j + 1;
                split_instruction +=
                    "<h6>" + String(k) + "</h6>" +
                    instruction[j] + "<br>";
            }
            description.innerHTML=(
                "<h2> " + recipeinfo.title + "</h2><br>" +
                "<img src="+ "'" + recipeinfo.image + "'" + "width='40%' height='40%'> <br> " +
                "<h5> ..................................................................... </h5><br>" + "<h4> TOTAL TIME: </h4>" +
                recipeinfo.readyInMinutes + " minutes" + "\t" + " <h4> YIELD: </h4>" + recipeinfo.servings + " servings <br>"+
                "<h5>..................................................................... </h5><br>" +
                
             "<h4> INGREDIENTS: </h4><br>" + ingredients + "<br>" + "<h4>INTRUCTIONS:  </h4><br>" + split_instruction);
            document.head.appendChild(title);
            body.append(description);
        }
    };
        request.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id[1] + "/information");
        request.setRequestHeader('X-Mashape-Key', 'bO9COj191VmshVzI4cNTPoxIxXoMp1ZfMQtjsnsM1bEzjBrumx');
        request.setRequestHeader('Accept', 'application/json');
        request.send();
}


function complexSearch(){
    var addRecipeInformation, cuisine, excludeIngredients, fillIngredients, includeIngredients,instructionRequired,intolerances,limitLicense,number,offset,query,ranking,type,readyInMinutes,timeCook, mealtype, minMinutes;
    addRecipeInformation = true;
    readyInMinutes = 1;
    cuisine = document.getElementById('cuisine').value;
    //excludeIngredients = document.getElementById('excludeIngredients').value;
    fillIngredients = true;
    includeIngredients = document.getElementById('search').value;
    var IngredientCount;
    number = 50;
    IngredientCount = includeIngredients.split(',').length;
    console.log(IngredientCount);
    var replaceINgredients = replace(includeIngredients);
    console.log(replaceINgredients);
    instructionRequired = true;
    //intolerances = document.getElementById('intolerance').value;
    limitLicense =false;
    timeCook = document.getElementById('time').value;
    if (timeCook  == "Fast") {
        minMinutes = 0;
        readyInMinutes = 30;
    }
    else if (timeCook  == "Medium") {
        minMinutes = 0;
        readyInMinutes = 60;
    }
    else if (timeCook  == "Slow") {
        minMinutes = 90;
        readyInMinutes=300;
    }
    else {
        minMinutes =0;
        readyInMinutes=400;
    }
    
    offset=0;
    //query=document.getElementById('query').value;
    ranking=1;
    mealtype=document.getElementById('meal').value;
    //readyInMinutes=document.getElementById('readyInMinutes').value;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200){
            var data = JSON.parse(request.responseText);
            console.log(data);
            console.log(minMinutes);
            console.log(readyInMinutes);
            var wrapper = document.getElementById('recipes');
            wrapper.innerHTML="";
            if(data.totalResults > 0) {
                data.results.forEach(function (recipes) {
                    if (recipes.usedIngredientCount <= IngredientCount && recipes.usedIngredientCount > 0 && recipes.missedIngredientCount <= 2 && recipes.readyInMinutes > minMinutes && recipes.readyInMinutes <= readyInMinutes ){
                        var recipediv = document.createElement('div');
                        console.log(recipes.title);
                        console.log(recipes.missedIngredientCount);
                        recipediv.setAttribute("id","recipediv");
                        recipediv.innerHTML = (
                            "<h4>" + recipes.title + "</h4>" +
                            "<a href='recipeinfo.html?" + recipes.id + "' target='_blank'>" +
                            "<img src="+ "'" + recipes.image + "'"+ "width='50%' height='50%'>" +"</a>");
                    } else{
                        return;
                    }
                    wrapper.append(recipediv);
                });
            }else if(data.totalResults ===0){
                var p = document.createElement('p');
                p.innerHTML = "NO RECIPE FOUND";
                body.appendChild(p);
            }
        }
    };
    request.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?" +
        "addRecipeInformation=" + addRecipeInformation + "&" +
        "cuisine="+ replace(cuisine)+"&" +
        //"excludeIngredients="+ replace(excludeIngredients)+"&" +
        "fillIngredients="+ fillIngredients+"&" +
        "includeIngredients="+ replace(includeIngredients)+"&" +
        "instructionsRequired="+ instructionRequired+"&" +
        //"intolerances="+ replace(intolerances)+"&" +
        "limitLicense="+ limitLicense+"&" +
        "number="+ number+"&" +
        "readyInMinutes="+readyInMinutes+"&"+
        "offset="+ offset+"&" +
        //"query="+ replace(query)+"&" +
        "ranking=1" + "&"+
        "type="+ mealtype);
    request.setRequestHeader('X-Mashape-Key', 'bO9COj191VmshVzI4cNTPoxIxXoMp1ZfMQtjsnsM1bEzjBrumx');
    request.setRequestHeader('Accept', 'application/json');
    request.send();
}

function replace(ingredient){
    var result;
    result = ingredient.replace(',','%2C');
    result = result.replace(' ', '+');
    return result;
}




//function search(fillIngredients,limitLicense,ranking){
//    var Ingredients = document.getElementById("search").value;
//    //Ingredients = Ingredients.replace(',','%');
//    var number = document.getElementById("number").value;
//    console.log(number);
//	var request= new XMLHttpRequest();
//	var databox = [];
//	request.onreadystatechange = function(){
//		if(request.readyState === XMLHttpRequest.DONE && request.status === 200){
//			var data = JSON.parse(request.responseText);
//			var dataobject = {};
//			if(data.length > 0){
//                for(var i = 0; i< data.length; i++){
//                    dataobject = {'id': data[i].id, 'image': data[i].image, 'likes': data[i].likes, 'missedIngredientCount': data[i].missedIngredientCount,'title': data[i].title,'usedIngredientCount': data[i].usedIngredientCount,'missedIngredients': data[i].missedIngredients};
//                    databox.push(dataobject);
//                }
//                console.log(databox);
//                var body = document.getElementById('recipes');
//                for(var j = 0; j< databox.length;j++){
//                    var button = document.createElement('BUTTON');
//                    var recipediv = document.createElement('div');
//                    recipediv.setAttribute("id","recipediv");
//                    button.setAttribute("id", "btnrecipes");
////                    tdid.innerHTML = "<a href="+"recipeinfo.html?"+databox[j].id+">"+databox[j].id+"";
//                    recipediv.innerHTML = (
//                    "<h4>" + databox[j].title + "</h4>" +
//                        "<img src="+databox[j].image+ " width='200px' height='200px'>");
//                    //tdmic.innerHTML = (databox[j].missedIngredientCount);
//                    //button.innerHTML = (databox[j].title);
////                    for(var k = 0; k<databox[j].missedIngredients.length;k++){
////                        var tring = document.createElement('tr');
////                        tring.innerHTML = (databox[j].missedIngredients[k].name);
////                        tdmi.appendChild(tring);
////                    }
//                    body.appendChild(recipediv);
//                }
//                
//            }else{
//			    var body = document.getElementById('body');
//			    var p = document.createElement('p');
//			    p.innerHTML = "NO RECIPE AVAILABLE FOR INGREDIENTS: " + document.getElementById("search").value;
//			    body.appendChild(p);
//            }
//		}
//	};
//	request.open("GET","https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients="+fillIngredients+"&ingredients="+Ingredients+"&limitLicense="+limitLicense+"&number="+number+"&ranking="+ranking+"");
//    request.setRequestHeader('X-Mashape-Key', 'bO9COj191VmshVzI4cNTPoxIxXoMp1ZfMQtjsnsM1bEzjBrumx');
//    request.setRequestHeader('Accept', 'application/json');
//	request.send();
//}

