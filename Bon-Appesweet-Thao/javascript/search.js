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
                var user_id =localStorage.getItem("user_id");
                var image = recipeinfo.image.replace(" ",'');
                var image2 = "\"" + image +"\"";
                var title = "\"" + recipeinfo.title + "\"";
                var button="";
                if (user_id.length > 0) {
                    button = "<button id=\"save\" onclick='postSavings("+recipeinfo.id+","+user_id+","+image2+","+title+");alert(\"Saved!\")'>Save</button>";    
                    
                }
                else { button = ""};
                description.innerHTML=
                    "<h2>" + recipeinfo.title + "</h2><br>" +
                    "<img src="+ "'" + recipeinfo.image + "'" + "width='40%' height='40%'><br>" + button +
                    "<br><br>" + "<h4>RATING: "+rating+"</h4><br><br>" + 
                            "<button id=\"ratebtn\" onclick='getRating("+recipeinfo.id+","+1+");alert(\"Thanks for rating!\")'>1</button>"+
                            "<button id=\"ratebtn\" onclick='getRating("+recipeinfo.id+","+2+");alert(\"Thanks for rating!\")'>2</button>"+
                            "<button id=\"ratebtn\" onclick='getRating("+recipeinfo.id+","+3+");alert(\"Thanks for rating!\")'>3</button>"+
                            "<button id=\"ratebtn\" onclick='getRating("+recipeinfo.id+","+4+");alert(\"Thanks for rating!\")'>4</button>"+
                            "<button id=\"ratebtn\" onclick='getRating("+recipeinfo.id+","+5+");alert(\"Thanks for rating!\")'>5</button><br>" +
                    "<h5> ............................................................. </h5><br>" + "<h4> | TOTAL TIME | </h4>" +
                    translateHour(recipeinfo.readyInMinutes) + " minutes" + "\t" + " <h4> | YIELD | </h4>" + recipeinfo.servings + " servings <br>"+
                    "<h5>............................................................</h5><br>" +
                 "<h4> | INGREDIENTS | </h4><br>" + ingredients + "<br>" + "<h4>| INTRUCTIONS |  </h4><br><p>" + instruction + "</p><br><br><br>"
            });
            document.head.appendChild(title);
            body.appendChild(description);
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
    var common_ingredients = ", onion, salt, pepper, garlic";
    readyInMinutes = 1;
    cuisine = document.getElementById('cuisine').value;
    //excludeIngredients = document.getElementById('excludeIngredients').value;
    fillIngredients = true;
    includeIngredients = document.getElementById('search').value;
    var IngredientCount;
    number =100;
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
                    var missed_ingredients = "";
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
                            "<h6> Missed ingredients: " + missed_ingredients +"</h6>" + "<h4> Rating: "+rating[0]+"</h4>" +
                            "<button id=\"ratebtn\" onclick='getRating("+recipes.id+","+1+");alert(\"Thanks for rating!\")'>1</button>"+
                            "<button id=\"ratebtn\" onclick='getRating("+recipes.id+","+2+");alert(\"Thanks for rating!\")'>2</button>"+
                            "<button id=\"ratebtn\" onclick='getRating("+recipes.id+","+3+");alert(\"Thanks for rating!\")'>3</button>"+
                            "<button id=\"ratebtn\" onclick='getRating("+recipes.id+","+4+");alert(\"Thanks for rating!\")'>4</button>"+
                            "<button id=\"ratebtn\" onclick='getRating("+recipes.id+","+5+");alert(\"Thanks for rating!\")'>5</button>"
                        )});
                        
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

function postSavings(recipeid,id,recipeimage,recipetitle){
    console.log("RUNNING");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log("SUCCESS");
        }
    };
    request.open("GET","favorites.php?function=postSavings&id="+id+"&recipeid="+recipeid+"&recipeimage="+recipeimage+"&recipetitle="+recipetitle,true);
    request.send();
}


function getSavings(id){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var show = document.getElementById('show');
            show.innerHTML = this.responseText;
            console.log(this.responseText);
            console.log("SUCCESS");
        }
    };
    request.open("GET","favorites.php?function=getSavings&id="+id,true);
    request.send();
}

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

function hideDiv() {
   document.getElementById('signout').style.display="none";
}

