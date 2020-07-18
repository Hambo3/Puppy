//Player
(function() {

    function Puppy(x, y) {
        this.type = C.ass.player;
        this.enabled = true;

        this.home = {x:x,y:y};
        this.x = x;
        this.y = y;
        this.z = 0;
        // this.width = 32;
        // this.length = 32;

        this.dx = 0;
        this.dy = 0; 

        this.death = false;
        this.jumping = false;
        this.dest = {x:0, y:0};

        this.accel = 180;  

        this.action = C.act.up;
        this.motion = 0;
 

        this.shadow = Util.Build([assets.tile.sol],1.5,[C.col.sw]);
        this.body= [
            [Fac[C.src.up],Fac[C.src.up+1]],
            [Fac[C.src.dn],Fac[C.src.dn+1]],            
            [Fac[C.src.lt],Fac[C.src.lt+1]],
            [Fac[C.src.rt],Fac[C.src.rt+1]],
            [],[],[]
        ];

        this.reset = function(die){
            //if(die==true){
            //    this.death = die;
            //}
            this.jumping = false;
            this.dx = 0;
            this.dy = 0;
            this.z = 0;
        }        
    };

    Puppy.prototype = {
        
        Logic: function(dt){
            var speed = this.accel * dt;

            if(!this.jumping)
            {
                var inp = {
                            up: (input.isDown('UP') || input.isDown('W') ),
                            down: (input.isDown('DOWN') || input.isDown('S') ),
                            left: (input.isDown('LEFT') || input.isDown('A') ),
                            right: (input.isDown('RIGHT') || input.isDown('D') )
                        };

            
                AssetUtil.InputLogic(inp, this, speed, 48);
            }
            else
            {
                if((this.z) > 4){
                    this.motion = 1;
                }
                else{
                    this.motion = 0;
                }

                var t = AssetUtil.HopLogic(this, 48, 8);
                if(!this.jumping)// landed
                {
                    this.motion = 0;
                     //check what landed on
                    if(map.colliders.over.indexOf(t) != -1){
                        if(t > 12 && t < 16){//water
                            this.action = C.act.sp;
                        }
                        else{
                            this.action = C.act.fall;
                        }
                    }
                    // var c = gameAsset.scene.Cell(this.x, this.y, 48);
                    // this.x = c.x;
                    // this.y = c.y;                    
                }
            }

        },
        Update: function(dt){
            this.x += this.dx;
            this.y += this.dy;
        },
        Collider: function(perps){
            if(this.jumping){
                //determine if can jump
                var d = AssetUtil.Collisions(this, perps, this.jumping);

                //if(d && (d.type == C.ass.stump || d.type == C.ass.dood)){
                //    this.reset();
                //}
            } 
        },
        Render: function(os){
            var x = this.x;
            var y = this.y;

            var pt = Util.IsoPoint(x-os.x, y-os.y);
            Renderer.PolySprite(pt.x, pt.y, this.shadow);

            Renderer.PolySprite(pt.x, pt.y-this.z, this.body[this.action][this.motion] );

        }
    };

    window.Puppy = Puppy;
})();

