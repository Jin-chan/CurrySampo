function GetSpot(){

  	httpObj = new XMLHttpRequest();
	httpObj.open("get", "http://placeinfo.olp.yahooapis.jp/V1/get?	lat=35.66521320007564&lon=139.7300114513391&appid=dj0zaiZpPXZsUUNZUk1FSVNpTyZzPWNvbnN1bWVyc2VjcmV0Jng9ZjI-&output=json", true);
	httpObj.send(null);

	var array = [];

	httpObj.onreadystatechange = function(){
		if( ( httpObj.readyState == 4) && (httpObj.status == 200))
//		document.getElementById("text2").value=httpObj.responseText;
		var data= JSON.parse(httpObj.responseText);
		for (var i=0; i<data.ResultSet.Result.length; i++){
			array[i] = data.ResultSet.Result[i].Name;
			console.log(array[i]);
		}
	}
	
	return(array);
}
 