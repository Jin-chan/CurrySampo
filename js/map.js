var map;
var param;
var mode=google.maps.DirectionsTravelMode.WALKING;
// var travelmode=walking;
var renderFLG=false;
var directionsDisplay;
var directionsService=new google.maps.DirectionsService();
var currentDirections=null;

var startSpot="東京駅";
var startSpothoge={address: "目黒"};
var endSpot="六本木ヒルズ";

// made by matsui
var infowindow;
var shoplist;

// function initialize() {
//     var mapOptions = {
//         center: new google.maps.LatLng(-34.397, 150.644),
//         zoom: 15,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     };
//     map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
//     geo = new google.maps.Geocoder();

//     param = splitParam();
//     var req = {
//         address: unescape(param['dep']),
//     };
//     //    geo.geocode(req, geoResultCallback);
//     //    geo.geocode(startSpot, geoResultCallback);
    
//     calcRoute(startSpot,endSpot);

// }

param=splitParam();
var startSpot=unescape(param['dep']);

function initialize() {
    var mapOptions={
        zoom:12,
        center: new google.maps.LatLng(35.670236,139.749832),//虎の門

        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    /* 地図オブジェクト生成 */
    map=new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    geo = new google.maps.Geocoder();
    var hoge = geo.geocode(startSpothoge, geoResultCallback);
    console.log("map :");
    console.log(map.center);
    var request = {
    	location: map.center,
     	radius: 500,
	query: 'カレー'
    };

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    shoplist = service.textSearch(request, callbackShop);

    if(!renderFLG) render();
    calcRoute(startSpot,endSpot);
}

/* ルート検索結果を描画 */
function render(){
//    dbg("render:"+renderFLG);
    renderFLG=true;
    /* ルートをレンダリング */
    directionsDisplay=new google.maps.DirectionsRenderer({
        "map": map,
        "preserveViewport": true,
        "draggable": true
    });

    /* 出発地点・到着地点マーカーが移動された時 */
    google.maps.event.addListener(directionsDisplay, 'directions_changed',function() {
        currentDirections=directionsDisplay.getDirections();
        var route=currentDirections.routes[0];
        var s="";
        for(var i=0; i<route.legs.length; i++) {
            var routeSegment=i+1;
            s+=route.legs[i].start_address+'to';
            s+=route.legs[i].end_address+'\n';
            s+=route.legs[i].distance.text;
        }
//        dbg("directions_changed:"+s);
    });
}

/* ルート算出 */
function calcRoute(startSpot,endSpot){
    // witch($("#mode").val()){
    // case "driving":
    //     mode=google.maps.DirectionsTravelMode.DRIVING;
    //     break;
    // case "bicycling":
    //     mode=google.maps.DirectionsTravelMode.BICYCLING;
    //     break;
    // case "transit":
    //     mode=google.maps.DirectionsTravelMode.TRANSIT;
    //     break;
    // case "walking":
    //     mode=google.maps.DirectionsTravelMode.WALKING;
    //     break;
    // }
//    dbg(startSpot);
//    dbg(endSpot);
//    dbg(mode);
    if(!renderFLG) render();

    var request={
        origin:startSpot,            /* 出発地点 */
        destination:endSpot,        /* 到着地点 */
	travelMode:mode                /* 交通手段 */
    };
    /* ルート描画 */
    directionsService.route(request, function(response, status) {
        if (status==google.maps.DirectionsStatus.OK) {
            dbg(response);
            directionsDisplay.setDirections(response);
        }else{
            dbg("status:"+status);
        }
    });
}

// ▼ カレー店の情報を検索表示 ＝＝＝＝＝＝＝＝＝＝＝＝
function callbackShop(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
// ▲ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

//◆総距離合計
function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000.
        console.log(total + "km");
}

function geoResultCallback(result, status) {
    if (status != google.maps.GeocoderStatus.OK) {
        alert(status);
        return;
    }
    var latlng = result[0].geometry.location;
    param['latlng'] = result[0].geometry.location;
    map.setCenter(latlng);
    /*  現在地のピン
	var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: latlng.toString(),
        draggable: true
	});

	google.maps.event.addListener(marker, 'dragend', function (event) {
        marker.setTitle(event.latLng.toString());
	});
    */
    
    //Place情報取得	
    var request = {
	location: latlng,
	radius: '500',
	query: 'カレー'
    };
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

//ここでplaceにカレー屋さん情報を入れる
function callback( results, status) {
    var place = [];
    if (status == google.maps.places.PlacesServiceStatus.OK) {
	for (var i = 0; i < results.length; i++) {
	    place[i] = results[i];
	}
    }
    
    var directionsService = new google.maps.DirectionsService();
    
    var curryPlace = new google.maps.LatLng(place[0].geometry.location.ob,place[0].geometry.location.pb);
    
    iconChange(param['latlng'], curryPlace, map);
    
    var request =
	{
	    origin: param['latlng'],
	    destination: curryPlace,
	    
	    travelMode: google.maps.DirectionsTravelMode.WALKING,//ドライビングモード指定（車）
	    unitSystem: google.maps.DirectionsUnitSystem.METRIC,//単位km表示
	    optimizeWaypoints: true,//最適化された最短距離にする。
	    avoidHighways: false,//trueで高速道路を使用しない
	    avoidTolls: false //trueで有料道路を使用しない
	};
    
    var rendererOptions =
	{
	    draggable: true,
	    preserveViewport:false,
	    suppressMarkers: true
	};
    var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    directionsDisplay.suppressMarkers = true;
    directionsDisplay.setMap(map);
    
    directionsService.route(request, function(response, status){
	if (status == google.maps.DirectionsStatus.OK){
	    directionsDisplay.setDirections(response);
	}
    });
    
    google.maps.event.addListener(directionsDisplay, "directions_changed", function(){
	computeTotalDistance(directionsDisplay.directions);　//◆総距離合計
    });
}

//カレーの距離計算関数
function computeTotalDistance(result)
{
    var total = 0;
    var myroute = result.routes[0];
    for (i = 0; i < myroute.legs.length; i++)
    {
	total += myroute.legs[i].distance.value;
    }
    total = total / 1000.
	console.log(total + "km");
    
    time=cal_time(total);
    cal=Math.round(parseFloat(cal_cal(time)));
    
    // カレーメーターをリセットしてからカロリー分のカレー画像を div に入れてる
    var curryMeter = document.getElementById("curry");
    while (curryMeter.firstChild)
	curryMeter.removeChild(curryMeter.firstChild);
    console.log(cal);
    for(i=0; i<cal; i+=10) {
	var element = document.createElement('img');
  	element.src = "./img/icon.png";
	element.style.width="50px";		// カレーの大きさ変えたいときはここ直してね
	curryMeter.appendChild(element);
    }
    document.write("所要時間は"+time+"分<br>");
    document.write("消費カロリーは"+cal+"kcal");
}

//消費カロリーの計算
function cal_time(length){
    var speed=100;
    var time=length/speed;
    return time;
}
function cal_cal(time){
    var weigh=60;
    var cal_per=0.1083;
    var cal=time*weigh*cal_per*1000;
    return cal;
}

var dbg=function(str){
    try{
        if(window.console && console.log){
            console.log(str);
        }
    }catch(err){
        //alert("error:"+err);
    }
}

function printProperties(obj) {
    var properties = '';
    for (var prop in obj){
        properties += prop + "=" + obj[prop] + "\n";
    }
    alert(properties);
}
