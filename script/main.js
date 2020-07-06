//https://xem.github.io/miniPixelArt/


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
var Renderer;

var level = 0;
var plyrScore = 0;
var highScore = 0;

var map = {
	size:{
		tile:{width:32, height:32},
		iso:{width:33, height:33},
		screen:{width:25, height:19}			
	},
	colliders:{hit:[7,8,9],
		over:[10,11,12,13,14,15],
		home:[5,6],
		fend:[16]
	},
	levels:[
		{
			dim:{width:66, height:66},data:"0,9|14|15,14|16,2|4|0,39|1,9|13|14|15,4|16|15,8|4,3|1,39|0,9|13,2|14|15,12|4,3|0,39|1,10|13,2|14|15,11|4,3|1,39|0,11|13,2|14|15,7|0,3|4,3|0,39|1,6|8,6|13,2|14|15,5|8,4|9,3|8,33|1,6|0,6|7|0,8|14|0,8|4,3|0,32|7|0,6|1,6|8|1,8|13|1,8|4,3|1,32|8|1,6|0,6|7|0,8|13|0,8|4,3|0,32|7|0,6|1,6|8|1,8|13|1,8|4,3|1,32|8|1,6|0,6|7|0,8|13|0,8|4,3|0,32|7|0,6|1,6|8|1,8|13|1,8|4,3|1,32|8|1,6|0,6|7|0,8|13|0,8|4,3|0,32|7|0,6|1,6|8|1,8|13|0|1,7|4,3|1,32|8|1,6|0,6|7|0,8|13|0,8|4,3|0,32|7|0,6|1,6|8|1,8|13|0|1,7|4,3|1,32|8|1,6|0,6|7|0,8|13|0,8|4,3|0,32|7|0,6|1,6|8|1,8|13|1,8|4,3|1,32|8|1,6|0,6|7|0,8|13|0,7|11|4,3|12,2|0,30|7|0,6|1,6|8|1,8|13|1,6|11|12|4,3|1,32|8|1,6|14|15,15|0,6|10|0|4,3|0,32|7|0,6|13|14|15,14|1,8|4,3|1,32|8|1,6|13,2|14|15,13|0,8|4,3|0,32|7|0,6|13,3|14|15,11|1,9|4,3|1,32|8|1,6|13,4|14|15,9|0,10|4,3|0,32|7|0,6|1|13,4|14|15,7|1,11|4,3|1,32|8|1,6|0,4|13,2|14|15,4|0,13|4,3|0,32|7|0,6|1,6|8|14|15|1,15|4,3|1,32|8|1,6|0,6|7|0,17|4,3|0,32|7|0,6|1,6|8|1,17|4,3|1,32|8|1,6|0,6|7|0,17|4,3|0,32|7|0,6|1,6|8|1,17|4,3|1,32|8|1,6|0,6|7|0,17|4,3|0,32|7|0,6|1,6|8|1,17|4,3|1,11|5,7|1,14|8|1,6|0,6|7|0,17|4,3|0,11|5,7|0,14|7|0,6|1,6|8|1,17|4,3|1,11|5,7|1,14|8|1,6|0,6|7|0,17|4,3|0,11|5,7|0,14|7|0,6|1,6|8|1,17|4,3|1,11|5,7|1,14|8|1,6|0,6|7|0,17|4,3|0,32|7|0,6|1,6|8|1,17|4,3|1,32|8|1,6|0,6|7|0,17|4,3|0,32|7|0,6|1,6|8|1,17|4,3|1,32|8|1,6|0,6|7|0,17|4,3|0,32|7|0,6|1,6|8|1,17|4,3|1,32|8|1,6|0,6|7|0,17|4,3|0,32|7|0,6|1,6|8|1,17|4,3|1,32|8|1,6|0,6|7|0,17|4,3|0,32|7|0,6|1,6|8|1,17|4,3|1,32|8|1,6|0,6|7|0,17|4,3|0,32|7|0,6|1,6|8|1,17|4,3|1,32|8|1,6|4,6|9|4,52|9|4,5|16|1,6|8|1,17|4,3|1,32|8|1,6|16|4,5|9|4,52|9|4,6|1,6|8|1,17|4,3|1,32|8|1,6|0,6|7|0,17|4,3|0,32|7|0,6|1,6|8|1,17|4,3|1,32|8|1,6|0,6|7|0,17|4,3|0,32|7|0,6|1,6|8|1,17|4,3|1,32|8|1,6|0,6|7|0,17|4,3|0,32|7|0,6|1,6|8,18|9,3|8,33|1,6|0,24|4,3|0,39|1,24|4,3|1,39|0,24|4,3|0,39|1,24|4,3|1,39|0,24|4,3|0,39|1,24|4,2|16|1,39",
			st:64,
			features:{	plyrspawn: {x:41,y:35},
						hard:[{x:16,y:18},
							{x:16,y:19},
							{x:21,y:19},
							{x:16,y:20},
							{x:17,y:20},
							{x:19,y:20},
							{x:20,y:20},
							{x:17,y:21},
							{x:18,y:21}
							]
					}
		}
	]
};

/*****************************/
var ctx;
function Start(canvasBody)
{	
	// Create the canvas
	var canvas = document.createElement("canvas");
	if(canvas.getContext)
	{
		ctx = canvas.getContext("2d");
		canvas.width = (map.size.screen.width * map.size.tile.width);
		canvas.height = (map.size.screen.height * map.size.tile.height);

		var b = document.getElementById(canvasBody);
    	b.appendChild(canvas);

		Renderer = new Rendering(ctx, {w:canvas.width, h:canvas.height}, 
			{x1:32,x2:32, y1:32,y2:96});
		init();
	}
}

function init()
{  
  var now = timestamp();	
	lastTime = now;

	gameAsset = new Game(map, level);

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
