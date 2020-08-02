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
var Renderer;

var level = 0;



var map = {
	size:{
		tile:{width:48, height:48},
		iso:{width:24, height:24},
		screen:{width:17, height:13}			
	},
	colliders:{hit:[11,12,13],
		over:[3,4,5,6,7,8,9,10],
		home:[5,6],
		fend:[16]
	},
	levels:[
		{
			dim:{width:60, height:60},data:"0,60|1,60|0,60|1,60|0,60|1,6|12,48|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,19|4|3,2|1,24|12|1,6|0,6|11|0,19|5|3,4|0,22|11|0,6|1,6|12|1,20|4|3,3|1,2|8|7,2|1,17|12|1,6|0,6|11|0,12|4|0,7|5|3,2|0,3|9|7,2|0,17|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|2,6|13|2,46|13|2,5|14,2|2,5|13|2,46|13|2,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11|0,46|11|0,6|1,6|12|1,46|12|1,6|0,6|11,48|0,6|1,60|0,60|1,60|0,60|1,60|0,60"
			,st:64,
			spawn:{	
				plr:{x:27,y:38},
				man:[{x:39,y:23}],
				dog:[{x:19,y:32},{x:40,y:32}],
				sqr:[{x:34,y:16},{x:20,y:20}],
				hme:{x:30,y:38},
				carl:[{x:59,y:28}],
				carr:[{x:0,y:27}],
				hard:[]
			}
		}
	]
};

/*****************************/
//var ctx;
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
