//Player
(function() {

    function Puppy(x, y) {
        this.type = Const.actors.player;
        this.enabled = true;

        this.home = {x:x,y:y};
        this.x = x;
        this.y = y;
        this.z = 0;
        this.width = 32;
        this.length = 32;

        this.dx = 0;
        this.dy = 0; 
        this.dz = 0;

        this.bonus = 0;
        this.amount = 1;
        this.death = false;
        this.jumping = false;
        this.dest = {x:0, y:0};

        this.accel = 120;  

        this.action = Const.actions.up;
        this.status = 0;
        
        this.shadow = [ Factory.Tile('rgba(100, 100, 100, 0.6)', this.width) ];        
        this.body= [
            Factory.Man2(0),
            Util.FlipX(Factory.Man1(0)),            
            Util.FlipX(Factory.Man2(0)),
            Factory.Man1(0),
            [],
            [],
            Factory.Flat()];

            this.reset = function(die){
                if(die==true){
                    this.death = die;
                }
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

                
                    AssetUtil.InputLogic(inp, this, speed, 32);
                }
                else
                {
                    var t = AssetUtil.HopLogic(this, 32, 16);
                    if(!this.jumping)// landed
                    {
                        this.status = 0;
                        //check what landed on
                        var c = gameAsset.scene.Cell(this.x, this.y, 32);
                        this.x = c.x;
                        this.y = c.y;                    
                    }
                }

        },
        Update: function(dt){
            this.x += this.dx;
            this.y += this.dy;
        },
        Collider: function(perps){
          //if hit something
        },
        Render: function(os){
            var x = this.x;
            var y = this.y;

            var pt = Util.IsoPoint(x-os.x, y-os.y);
            Renderer.PolySprite(pt.x, pt.y, this.shadow);

            Renderer.PolySprite(pt.x, pt.y-this.z, this.body[this.action] );

        }
    };

    window.Puppy = Puppy;
})();

