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
                ingredients += (recipeinfo.extendedIngredients[i].originalString + "<br>");
            }
            
            var instruction = recipeinfo.instructions.replace("min.", "minutes");
            getAverageRating(id[1],function(err,rating){
            
                description.innerHTML=(
                    "<p>RATING ="+rating+"</p>"+
                    "<h2> " + recipeinfo.title + "</h2><br>" +
                    "<img src="+ "'" + recipeinfo.image + "'" + "width='40%' height='40%'> <br> " + 
                    "<div style=\"padding-left:44%;padding-right:44%;width:800px; \"> <fieldset class=\"rating\"> <input type=\"radio\" id=\"star5\" name=\"rating\" value=\"5\"/> <label class = \"full\" for=\"star5\"></label> <input type=\"radio\" id=\"star4\" name=\"rating\" value=\"4\" /> <label class = \"full\" for=\"star4\"></label> <input type=\"radio\" id=\"star3\" name=\"rating\" value=\"3\" /><label class = \"full\" for=\"star3\"></label><input type=\"radio\" id=\"star2\" name=\"rating\" value=\"2\" /> <label class = \"full\" for=\"star2\"></label> <input type=\"radio\" id=\"star1\" name=\"rating\" value=\"1\" /><label class = \"full\" for=\"star1\"></label> </fieldset></div>" + "<br><br><br>" +
                    " <h5> ............................................................. </h5><br>" + "<h4> | TOTAL TIME | </h4>" +
                    translateHour(recipeinfo.readyInMinutes) + " minutes" + "\t" + " <h4> | YIELD | </h4>" + recipeinfo.servings + " servings <br>"+
                    "<h5>............................................................</h5><br>" +

                 "<h4> | INGREDIENTS | </h4><br>" + ingredients + "<br>" + "<h4>| INTRUCTIONS |  </h4><br>" + instruction);
            });
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
    var missed_ingredients = "";
    var common_ingredients = ", onion, salt, pepper, garlic";
    readyInMinutes = 1;
    cuisine = document.getElementById('cuisine').value;
    //excludeIngredients = document.getElementById('excludeIngredients').value;
    fillIngredients = true;
    includeIngredients = document.getElementById('search').value;
    var IngredientCount;
    number = 20000;
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
                        if (recipes.missedIngredientCount == 1) {
                            missed_ingredients = recipes.missedIngredients[0].name;
                        }
                        else if (recipes.missedIngredientCount == 2) {
                            missed_ingredients = recipes.missedIngredients[0].name + ", " + recipes.missedIngredients[1].name;
                        }
                        else if (recipes.missedIngredientCount==0){
                            missed_ingredients="You have everything!";
                        }
                        var recipediv = document.createElement('div');
                        console.log(recipes.title);
                        console.log(recipes.missedIngredientCount);
                        recipediv.setAttribute("id","recipediv");
                        recipediv.innerHTML = (
                            "<h4>" + recipes.title + "</h4>" +
                            "<a href='recipeinfo.php?" + recipes.id + "' target='_blank'>" +
                            "<img src="+ "'" + recipes.image + "'"+ "width='50%' height='50%'>" +"</a>" +
                                "<h6> Missed ingredients: " + missed_ingredients +"</h6>");
                        getAverageRating(recipes.id,function(err,rating){
                            recipediv.innerHTML = (
                            "<h4>" + recipes.title + "</h4>" +
                            "<a href='recipeinfo.php?" + recipes.id + "' target='_blank'>" +
                            "<img src="+ "'" + recipes.image + "'"+ "width='50%' height='50%'>" +"</a>" +
                                "<h6> Missed ingredients: " + missed_ingredients +"</h6>" + "<br>" + "rating= "+rating[0]+"<br>"+
                            "<button onclick='getRating("+recipes.id+","+1+");alert(\"Thanks for rating!\")'>1</button>"+
                            "<button onclick='getRating("+recipes.id+","+2+");alert(\"Thanks for rating!\")'>2</button>"+
                            "<button onclick='getRating("+recipes.id+","+3+");alert(\"Thanks for rating!\")'>3</button>"+
                            "<button onclick='getRating("+recipes.id+","+4+");alert(\"Thanks for rating!\")'>4</button>"+
                            "<button onclick='getRating("+recipes.id+","+5+");alert(\"Thanks for rating!\")'>5</button>");
                        });
                        
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


//function simpleSearch(){
//    var addRecipeInformation, cuisine, excludeIngredients, fillIngredients, includeIngredients,instructionRequired,intolerances,limitLicense,number,offset,query,ranking,type,readyInMinutes,timeCook, mealtype, minMinutes;
//    addRecipeInformation = true;
//    readyInMinutes = 1;
//    cuisine = document.getElementById('cuisine').value;
//    //excludeIngredients = document.getElementById('excludeIngredients').value;
//    fillIngredients = true;
//    includeIngredients = document.getElementById('search').value;
//    var IngredientCount;
//    number = 300000;
//    IngredientCount = includeIngredients.split(',').length;
//    console.log(IngredientCount);
//    var replaceINgredients = replace(includeIngredients);
//    console.log(replaceINgredients);
//    instructionRequired = true;
//    //intolerances = document.getElementById('intolerance').value;
//    limitLicense =false;
//    timeCook = document.getElementById('time').value;
//    if (timeCook  == "Fast") {
//        minMinutes = 0;
//        readyInMinutes = 30;
//    }
//    else if (timeCook  == "Medium") {
//        minMinutes = 0;
//        readyInMinutes = 60;
//    }
//    else if (timeCook  == "Slow") {
//        minMinutes = 90;
//        readyInMinutes=300;
//    }
//    else {
//        minMinutes =0;
//        readyInMinutes=400;
//    }
//    
//    offset=0;
//    //query=document.getElementById('query').value;
//    ranking=1;
//    mealtype=document.getElementById('meal').value;
//    //readyInMinutes=document.getElementById('readyInMinutes').value;
//    var request = new XMLHttpRequest();
//    request.onreadystatechange = function(){
//        if(request.readyState === XMLHttpRequest.DONE && request.status === 200){
//            var data = JSON.parse(request.responseText);
//            console.log(data);
//            console.log(minMinutes);
//            console.log(readyInMinutes);
//            var wrapper = document.getElementById('recipes');
//            wrapper.innerHTML="";
//            if(data.totalResults > 0) {
//                data.results.forEach(function (recipes) {
//                    if (recipes.usedIngredientCount <= IngredientCount && recipes.usedIngredientCount > 0 && recipes.readyInMinutes > minMinutes && recipes.readyInMinutes <= readyInMinutes ){
//                        var recipediv = document.createElement('div');
//                        console.log(recipes.title);
//                        console.log(recipes.missedIngredientCount);
//                        recipediv.setAttribute("id","recipediv");
//                        recipediv.innerHTML = (
//                            "<h4>" + recipes.title + "</h4>" +
//                            "<a href='recipeinfo.html?" + recipes.id + "' target='_blank'>" +
//                            "<img src="+ "'" + recipes.image + "'"+ "width='50%' height='50%'>" +"</a>");
//                    } else{
//                        return;
//                    }
//                    wrapper.append(recipediv);
//                });
//            }else if(data.totalResults ===0){
//                var p = document.createElement('p');
//                p.innerHTML = "NO RECIPE FOUND";
//                body.appendChild(p);
//            }
//        }
//    };
//    request.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?" +
//        "addRecipeInformation=" + addRecipeInformation + "&" +
//        "cuisine="+ replace(cuisine)+"&" +
//        //"excludeIngredients="+ replace(excludeIngredients)+"&" +
//        "fillIngredients="+ fillIngredients+"&" +
//        "includeIngredients="+ replace(includeIngredients)+"&" +
//        "instructionsRequired="+ instructionRequired+"&" +
//        //"intolerances="+ replace(intolerances)+"&" +
//        "limitLicense="+ limitLicense+"&" +
//        "number="+ number+"&" +
//        "readyInMinutes="+readyInMinutes+"&"+
//        "offset="+ offset+"&" +
//        //"query="+ replace(query)+"&" +
//        "ranking=1" + "&"+
//        "type="+ mealtype);
//    request.setRequestHeader('X-Mashape-Key', 'bO9COj191VmshVzI4cNTPoxIxXoMp1ZfMQtjsnsM1bEzjBrumx');
//    request.setRequestHeader('Accept', 'application/json');
//    request.send();
//}


function translateHour(time) {
    if (time < 60) {
        return time;
    }
    else {
        var min = time%60;
        var hour = Math.round(time/60);
        var result = hour + " hour " + min;
        return result;
    }
}

function getAverageRating(id,callback) {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            var data =[];
            if (this.readyState == 4 && this.status == 200) {
                data.push(this.responseText);

            }
            callback(null,data);
        };
        request.open("GET", "../javascript/rating.php?function=getAverageRating"+"&id="+id, true);
        request.send();
}
function getRating(id,rating){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    request.open("GET", "../javascript/rating.php?function=Rating"+"&id="+id+"&rating="+rating, true);
    request.send();
}



