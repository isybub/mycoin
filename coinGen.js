
function dispCoins(){
	if(localStorage.getItem("coins") === null){
		saveToStorage(localCoins);
	}

	if (typeof(Storage) !== "undefined") {
		var div = "<h3> Coins </h3>";
		var totalAmount = 0;
		var currAmount = 0;
		localCoins = JSON.parse(localStorage.coins);
		
		div += "<table><tr><th>Coin Name</th><th>Amount Held</th><th>Total Price</th></tr>"
		for(var i = 1; i< localCoins.length; i++){
			div+="<tr>";
			for(var j = 0; j<aData.length; j++){
				if(localCoins[i][0]==aData[j].id){
					currAmount = (parseFloat(aData[j].price_usd)*localCoins[i][1]);
					div += "<td id=name>"+aData[j].id+"</td><td>"
					+localCoins[i][1]+"</td><td>"
					+currAmount+"</td>";
					totalAmount += currAmount;
					break;
				}
			}
			div+="</tr>";
		}
		div+="<tr><td></td><td>Total:</td><td>$"+totalAmount+"</td></table>";
		div += "<a href=\"#\" onclick=\"addCoin()\" id=\"add\"'>+</a><div id=\"addTip\">Add a new coin.</div><br>";
		document.getElementById("coins").innerHTML = div; 
		    
	} else {
	    console.log("UH");
	}
	
}

function addCoin(){
	console.log("you've activated me.");
	var div = "<select id=\"coinSelect\">";
	for(var i = 0; i< coins.length; i++){
		div += "<option value=\""+coins[i]+"\">"+coins[i]+"</option>";
	}
	div +="</select>";
	div +="<input type=number placeholder=\"How many?\" id=\"coinAmount\"></input>";
	div +="<a id=\"addToList\" href=\"#\" onclick=\"listCoin()\">🗸</a>";





	
	document.getElementById("coins").innerHTML += div;

}	   
function saveToStorage(localCoins){
	localStorage.setItem("coins", JSON.stringify(localCoins));
	dispCoins()
}


function listCoin(){
	var i;
	var exists;
	var id = document.getElementById("coinSelect").value;
	var amount = document.getElementById("coinAmount").value;
	localCoins = JSON.parse(localStorage.coins);

	for(i = 0; i < localCoins.length; i++){
			console.log(id);
			console.log(localCoins[i][0]);
		if(localCoins[i][0]==id) {
			exists = true
			break;
		};
	}
	if(exists){
		localCoins[i].splice(0,localCoins[i].length);
		localCoins[i].push(id);
		localCoins[i].push(amount);
	}
	else{
		localCoins.push([id,amount]);
	}
	exists = false;
	saveToStorage(localCoins);
} 
var url = "https://api.coinmarketcap.com/v1/ticker/";
var coins = [];
var localCoins = [["placeholder","404"]];
var aData = [[]];
fetch(url)
		  .then((resp) => resp.json()) 
		  .then(function(data) {
		  	aData = data;
			dispCoins();
			for(var i = 0; i < data.length; i++){
  				coins.push(data[i].id);
  			}
});
//var aData
// fetch(url)
//  .then((resp) => resp.json()) 
//  .then(function(data) {
//  	aData = data;
//  });