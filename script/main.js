/*
https://xem.github.io/terser-online/
https://siorki.github.io/regPack.html
*/

var rf = (function(){
  return window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(cb){
          window.setTimeout(cb, 1000 / 60);
      };
})();

var lastTime;
var now;
var dt = 0;
var fps = 60;
var step = 1 / fps;

var gameAsset;
var R;

var map = {
	size:{
		tile:{width:48, height:48},
		iso:{width:24, height:24},
		screen:{width:17, height:13}			
	},
	colliders:{hit:[11,12,13],
		over:[3,4,5,6,7,8,9,10],
		fend:[14]
	},
	level:
		{
			dim:{width:70, height:70},data:"0,20|3,18|0,32|1,20|3,18|1,32|0,22|3,15|0,33|1,23|3,12|1,35|0,23|3,11|0,36|1,6|12,17|3,10|12,31|1,6|0,6|11|0,19|3,6|0,11|15,7|0,13|11|0,6|1,6|12|1,19|3,5|1,13|3,5|1,14|12|1,6|0,6|11|0,38|3,3|0,15|11|0,6|1,6|12|1,37|16,5|1,14|12|1,6|0,6|11|0,37|3,4|0,6|15,5|0,4|11|0,6|1,6|12|1,35|3,5|1,7|16,5|1,4|12|1,6|0,6|11|0,38|3,3|0,6|15,5|0,4|11|0,6|1,6|12|1,2|16,5|1,49|12|1,6|0,6|11|0,2|15,5|0,33|3|0,15|11|0,6|1,6|12|1,2|16,5|1,13|7|1,17|3|1,3|3|1,13|12|1,6|0,6|11|0,19|7,2|0,19|3|0,4|3|0,10|11|0,6|7,6|12|1,18|7,3|1,17|3|1|16|1,2|3|1,12|12|1,6|7,7|0,16|7,4|0,19|15,2|0,5|3,2|0,8|11|0,6|7,7|1,15|7,4|1,19|3,2|16|3|1,12|3|1|12|1,6|7,8|0,4|15,3|0,3|7,8|0,18|3,2|15,2|3,4|0,3|3|0|3|0,2|3,2|0|11|0,6|7,13|16|7,11|1,20|16,2|3,3|1,5|3,6|1,2|12|1,6|7,13|15|7,9|0,16|3,2|0,16|3,3|0,3|11|0,6|1,6|12|1,5|16,3|1,48|12|1,6|0,6|11|0,56|11|0,6|1,6|12|1,56|12|1,6|0,6|11|0,56|11|0,6|1,6|12|1,56|12|1,6|0,6|11|0,56|11|0,6|2,6|13|2,56|13|2,5|14|2,6|13|2,56|13|2,5|14,2|2,5|13|2,56|13|2,6|14|2,5|13|2,56|13|2,6|0,6|11|0,56|11|0,6|1,6|12|1,56|12|1,6|0,6|11|0,56|11|0,6|1,6|12|1,56|12|1,6|0,6|11|0,56|11|0,6|1,6|12|1,56|12|1,6|0,6|11|0,56|11|0,6|1,6|12|1,56|12|1,6|0,6|11|0,56|11|0,6|1,6|12|1,56|12|1,6|0,6|11|0,56|11|0,6|1,6|12|1,56|12|1,6|0,6|11|0,56|11|0,6|1,6|12|1,56|12|1,6|0,6|11|0,56|11|0,6|1,6|12|1,56|12|1,6|0,6|11|0,56|11|0,6|1,6|12|1,56|12|1,6|0,6|11|0|15,5|0,50|11|0,6|1,6|12|1|16,5|1,18|16|1,4|16,14|1,13|12|1,6|0,6|11|0|15,5|0,23|15,12|6|15|0,13|11|0,6|1,6|12|1,29|16,14|1,13|12|1,6|0,6|11|0,29|15,3|0,24|11|0,6|1,6|12|1,24|16|1,31|12|1,6|0,6|11|0,56|11|0,6|1,6|12|1,33|16|1,22|12|1,6|0,6|11|0,56|11|0,6|1,6|12|1,56|12|1,6|0,6|11|0,56|11|0,6|1,6|12|1,56|12|1,6|0,6|11,58|0,6|1,70|0,70|1,70|0,70|1,70|0,70"
			,spawn:{	
				plr:[{x:38,y:54},{x:45,y:54}],
				man:[{x:16,y:52},
					{x:11,y:14},
					{x:56,y:11}
					],
				wdog:[{x:38,y:8},
					{x:42,y:18},
					{x:53,y:23},
					{x:44,y:24},
					{x:58,y:36}],
				gdog:[
					{s:{x:27,y:9},e:{x:27,y:13}},
					{s:{x:28,y:17},e:{x:34,y:17}},
					{s:{x:24,y:46},e:{x:30,y:46}}
				],
				hme:{x:48,y:53},
				carl:[{x:69,y:31},
					{x:69,y:32}],
				carr:[{x:0,y:29},
					{x:0,y:30}],
				hard:[{x:57,y:6},
					{x:62,y:6},
					{x:38,y:7},
					{x:60,y:7},
					{x:62,y:7},
					{x:52,y:8},
					{x:59,y:8},
					{x:40,y:9},
					{x:61,y:9},
					{x:36,y:10},
					{x:38,y:13},
					{x:41,y:13},
					{x:61,y:13},
					{x:40,y:16},
					{x:54,y:16},
					{x:58,y:16},
					{x:41,y:18},
					{x:60,y:18},
					{x:61,y:18},
					{x:38,y:19},
					{x:62,y:19},
					{x:62,y:20},
					{x:36,y:22},
					{x:61,y:22},
					{x:9,y:23},
					{x:18,y:23},
					{x:22,y:23},
					{x:52,y:23},
					{x:20,y:24},
					{x:39,y:24},
					{x:43,y:24},
					{x:47,y:24},
					{x:60,y:24},
					{x:7,y:25},
					{x:14,y:28},
					{x:15,y:28},
					{x:20,y:28},
					{x:26,y:33},
					{x:34,y:33},
					],
				tony:[{x:38,y:53},{x:45,y:53}],
			}
		}
	
};

/*****************************/
function Start(canvasBody)
{	
	// Create the canvas
	var canvas = document.createElement("canvas");
	if(canvas.getContext)
	{
		var ctx = canvas.getContext("2d");
		canvas.width = (map.size.screen.width * map.size.tile.width);
		canvas.height = (map.size.screen.height * map.size.tile.height);

		var b = document.getElementById(canvasBody);
    	b.appendChild(canvas);

		R = new Rendering(ctx, {w:canvas.width, h:canvas.height}, 
			{x1:32,x2:32, y1:32,y2:96});
		init();
	}
}

function init()
{  
  var now = timestamp();	
	lastTime = now;

	gameAsset = new Game(map);

	FixedLoop();  
}

function FixedLoop(){
	now = timestamp();
	dt = dt + Math.min(1, (now - lastTime) / 1000);
	while (dt > step) {
	  dt = dt - step;
	  update(step);
	}

	render();
				
	lastTime = now;
	rf(FixedLoop);
}

function timestamp() {
	var wp = window.performance;
	return wp && wp.now ? wp.now() : new Date().getTime();
}

// Update game objects
function update(dt) {
	gameAsset.Update(dt);
};

function render() {
	gameAsset.Render();
};

window.onload = function() {
	Start("canvasBody");
}
