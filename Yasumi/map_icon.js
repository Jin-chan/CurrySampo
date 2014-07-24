function initialize() {
//スマホ、ウェブで表示サイズ変更
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map_canvas");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    mapdiv.style.width = '500px';
    mapdiv.style.height = '250px';
  }
  
//基本
//目的地　緯度経度
var　lati1=35.632605;
var	long1=139.88132;
//スタート地　緯度経度
var　lati2=35.625663;
var	long2=139.884238;

var latlng = new google.maps.LatLng(lati1,long1);
  var opts = {
    zoom: 14,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), opts);

  var m_latlng1 = new google.maps.LatLng(lati1,long1);
  var marker1 = new google.maps.Marker({
    position: m_latlng1,
    map: map,
	icon:
	'../img/pin_small_carry.png'
	
  });

  var m_latlng2 = new google.maps.LatLng(lati2,long2);
  var marker2 = new google.maps.Marker({
    position: m_latlng2,
    map: map,
	icon:new google.maps.MarkerImage(
	'../img/pin_small_start.png',
	new google.maps.Size(100,100),
	new google.maps.Point(0,0),
	new google.maps.Point(15,15),
	new google.maps.Size(30,30)
	)
	
  });
  
  
  /*icon:new google.maps.MarkerImage(
	'./img/icon.png',
	new google.maps.Size(100,100),
	new google.maps.Point(0,0),
	new google.maps.Point(50,50),
	new google.maps.Point(30,30)
	)*/
}