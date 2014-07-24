var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
// 再生候補リスト
var musics = ['3ynvgHSJ-cs', '4VbAxyShqMs', '7F3GNZMThrU'];
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '80',
    width: '100',
    videoId: musics[Math.floor(Math.random()*musics.length)],
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
		playerVars: {
			'controls':0,
		  'showinfo':0,
			'rel':0,
			//'autoplay':1,		// ここ外すと自動再生するようになるけど、なんかやかましいのでオフにしてる
		}
  });
}

function onPlayerReady(event) {
	/*
	// PC の場合は自動再生 (iPhone だと自動再生禁止されてる)
  if (!((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 )) {
    event.target.playVideo();
  }
  */
}

function onPlayerStateChange(event) {
	console.log(YT.PlayerState.ENDED);
  if (event.data == YT.PlayerState.ENDED) {
    player.loadVideoById(musics[Math.floor(Math.random()*musics.length)],0); 
  }
}

function playerHidden() {
	document.getElementById("player").style.visibility = 'hidden';
}
