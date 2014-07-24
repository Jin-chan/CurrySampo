//画像を配列に格納する
var img = new Array();

img[0] = new Image();
img[0].src = "./img/button_nomall.png";
img[1] = new Image();
img[1].src = "./img/button_push.png";



//画像番号用のグローバル変数
var cnt=0;


//画像切り替え関数
function showImage0(){
	document.getElementById("gazo").src=img[0].src;
}
function showImage1(){
	document.getElementById("gazo").src=img[1].src;
}