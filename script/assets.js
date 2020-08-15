//Player
(function() {

    function Dog(x, y, type, targ) {
        this.type = type;
        this.enabled = true;

        this.home = {x:x,y:y};
        this.width = 48;
        this.length = 48;
        this.x = x;
        this.y = y;
        this.z = 0;
        this.p = 0;
        this.dx = 0;
        this.dy = 0; 

        this.idle = 0;
        this.jumping = false;
        this.dest = {x:0, y:0};

        this.accel = 180;  

        this.action = C.act.dn;
        this.motion = 0;
        this.death = 0;
        this.endCount = 64;

        this.logic = true;

        this.target = targ;
        this.patrol = {
            rnd:(type == C.ass.wdog),
            wait:256,
            d:0, 
            inp:null,
            p:[{x:this.x+(5*48),y:this.y},
                {x:this.x,y:this.y}],
            pi:0    
        };

        this.shadow = Util.Build([assets.tile.sol],1.5,[C.col.sw]);

        var bodies = [ 
            [
                [Fac[C.src.up],Fac[C.src.up+1],Fac[C.src.up+2]],
                [Fac[C.src.dn],Fac[C.src.dn+1],Fac[C.src.dn+2]],            
                [Fac[C.src.lt],Fac[C.src.lt+1],Fac[C.src.lt+2]],
                [Fac[C.src.rt],Fac[C.src.rt+1],Fac[C.src.rt+2]],
                [Fac[C.src.flat]],[]
            ],
            [
                [Fac[C.src.up+12],Fac[C.src.up+12+1],Fac[C.src.up+12+2]],
                [Fac[C.src.dn+12],Fac[C.src.dn+12+1],Fac[C.src.dn+12+2]],            
                [Fac[C.src.lt+12],Fac[C.src.lt+12+1],Fac[C.src.lt+12+2]],
                [Fac[C.src.rt+12],Fac[C.src.rt+12+1],Fac[C.src.rt+12+2]],
                [Fac[C.src.flat]],[]
            ],
            [
                [Fac[C.src.up+24],Fac[C.src.up+24+1],Fac[C.src.up+24+2]],
                [Fac[C.src.dn+24],Fac[C.src.dn+24+1],Fac[C.src.dn+24+2]],            
                [Fac[C.src.lt+24],Fac[C.src.lt+24+1],Fac[C.src.lt+24+2]],
                [Fac[C.src.rt+24],Fac[C.src.rt+24+1],Fac[C.src.rt+24+2]],
                [Fac[C.src.flat]],[]
            ]
        ]

        this.body= bodies[this.type - 1];

        this.anims = [];
        this.reset = function(die){
            if(die){
                this.death = die;
            }
            this.jumping = false;
            this.dx = 0;
            this.dy = 0;
            this.z = 0;

            this.patrol.inp = null;
        }        
    };

    Dog.prototype = {
        
        Logic: function(dt){
            var speed = this.accel * dt;

            if(this.death == 0){
                if(!this.jumping)
                {
                    if(this.type == C.ass.player)
                    {
                        var inp = {
                                    up: (input.isDown('UP') || input.isDown('W') ),
                                    down: (input.isDown('DOWN') || input.isDown('S') ),
                                    left: (input.isDown('LEFT') || input.isDown('A') ),
                                    right: (input.isDown('RIGHT') || input.isDown('D') )
                                };     
                        AssetUtil.InputLogic(inp, this, speed, 48);                   
                    }
                    else{
                        var inp = AssetUtil.Dir(this.target, this);

                        if( inp.d < (8*48) && inp.d > (4*48) ){
                            AssetUtil.InputLogic(inp, this, speed, 48); 
                        }
                        else
                        {
                            if(this.patrol.inp){                                
                                AssetUtil.InputLogic(this.patrol.inp, this, speed, 48); 
                                if(!this.jumping){
                                    this.patrol.inp = null;
                                }
                            }
                            else if(--this.patrol.wait==0)
                            {
                                var t = {x:this.x, y:this.y};
                                var d = Util.RndI(-4, 5);

                                if(this.patrol.rnd){

                                    if(Util.OneIn(2)){
                                        t.x+=d*48;
                                    }
                                    else{
                                        t.y+=d*48;
                                    }
                                    this.patrol.wait = Util.RndI(64,256);
                                }
                                else{
                                    t = this.patrol.p[this.patrol.pi];
                                    this.patrol.pi = 1-this.patrol.pi;
                                    this.patrol.wait = 256;
                                }

                                this.patrol.inp = AssetUtil.Dir(t, this);
                                this.patrol.d = this.patrol.inp.d/48;
                            }
                        }
                    }
                    if(this.idle>0){
                        if(--this.idle == 0){
                            this.motion = 0; 
                        }
                    }
                }
                else
                {
                    if((this.z) > 4){
                        this.motion = 2;
                    }
                    else{
                        this.motion = 1;
                    }

                    var t = AssetUtil.HopLogic(this, 48, 8);
                    if(!this.jumping)// landed
                    {
                        if(this.patrol.d){
                            if(--this.patrol.d ==0)
                            {
                                this.patrol.inp = null;
                            }                            
                        }
                        this.idle = 64;
                        //check what landed on
                        if(map.colliders.over.indexOf(t) != -1){
                            if(t > 6 && t < 11){//water
                                this.action = C.act.dd;
                                this.death = C.act.dd;

                                for(var i=0;i<16;i++){
                                    this.anims.push(
                                        new Grunt(this.x, this.y, Fac[C.src.spl], C.ass.null,
                                            {x: Util.Rnd(60)-30, y: Util.Rnd(60)-30, z:200}, true));    
                                }
                            }
                            else{
                                this.action = C.act.fl;
                                this.death = C.act.fl;
                            }
                        }
                    }
                }
            }

        },
        Update: function(dt){
            this.x += this.dx;
            this.y += this.dy;

            for(var i=0;i<this.anims.length;i++){
                if(this.anims[i].enabled){                    
                    this.anims[i].Update(dt);
                }
            }

        },
        Collider: function(perps){
            if(this.jumping){
                //determine if can jump
                var d = AssetUtil.Collisions(this, perps, true);
                if(d && (d.type == C.ass.stump || d.type == C.ass.man || d.type == C.ass.wdog || d.type == C.ass.gdog))
                {
                    this.reset();
                }
            } 

            var d = AssetUtil.Collisions(this, perps, false);
            if(d && (d.type == C.ass.carl || d.type == C.ass.carl )){
                this.motion = 0;
                this.action = C.act.sq;
                this.reset(C.act.sq);
            }
        },
        Render: function(os){
            var x = this.x;
            var y = this.y;

            var pt = Util.IsoPoint(x-os.x, y-os.y);
            if(this.death == 0){
                Renderer.PolySprite(pt.x, pt.y, this.shadow);
            }
            if(this.action < C.act.dd){
                Renderer.PolySprite(pt.x, pt.y-this.z, this.body[this.action][this.motion] );
            }

            for(var i=0;i<this.anims.length;i++){
                if(this.anims[i].enabled){                  
                    this.anims[i].Render(os);
                }
            }
        }
    };

    window.Dog = Dog;
})();

//Human man
(function() {
    function Man(x, y, targ) {
        this.type = C.ass.man;
        this.enabled = true;

        this.width = 48;
        this.length = 48;
        this.x = x;
        this.y = y;
        this.z = 0;
        this.p =0;
        this.dx = 0;
        this.dy = 0; 

        this.jumping = false;
        this.dest = {x:0, y:0};

        this.accel = 90;  

        this.action = C.act.dn;
        this.motion = 0;
        this.death = 0;
        this.target = targ;

        this.shadow = Util.Build([assets.tile.sol],1.5,[C.col.sw]);
        this.body= [
            [Fac[C.src.mup],Fac[C.src.mup+1],Fac[C.src.mup],Fac[C.src.mup+2]],
            [Fac[C.src.mdn],Fac[C.src.mdn+1],Fac[C.src.mdn],Fac[C.src.mdn+2]],            
            [Fac[C.src.mlt],Fac[C.src.mlt+1],Fac[C.src.mlt],Fac[C.src.mlt+2]],
            [Fac[C.src.mrt],Fac[C.src.mrt+2],Fac[C.src.mrt],Fac[C.src.mrt+1]],
            [Fac[C.src.flat]],[]
        ];
        this.anims = [];
        this.anims.push(new Grunt(this.x, this.y, Fac[C.src.hat], C.ass.null));
        this.reset = function(die){
            if(die){
                this.death = die;
            }
            this.jumping = false;
            this.dx = 0;
            this.dy = 0;
            this.z = 0;
        }
    };

    Man.prototype = {
        Logic: function(dt){
            var speed = this.accel * dt;
            if(this.death == 0)
            {
                if(!this.jumping)
                {
                    var inp = AssetUtil.Dir(this.target, this);

                    if( inp.d < (8*48) && inp.d > (4*48) ){
                        AssetUtil.InputLogic(inp, this, speed, 48); 
                    }
                }
                else
                {
                    this.motion = this.p/12|0;

                    var t = AssetUtil.HopLogic(this, 48, 6);
                    if(!this.jumping)// landed
                    {
                        this.motion = 0;
                        //check what landed on
                        if(map.colliders.over.indexOf(t) != -1){
                            if(t > 6 && t < 11){//water
                                this.action = C.act.dd;
                                this.death = C.act.dd;

                                this.anims[0].enabled = false;
                                for(var i=0;i<16;i++){                                              
                                    this.anims.push(
                                        new Grunt(this.x, this.y, Fac[C.src.spl], C.ass.null,
                                            {x: Util.Rnd(60)-30, y: Util.Rnd(60)-30, z:200}, true));    
                                }
                            }
                            else{
                                this.action = C.act.dd;
                                this.death = C.act.dd;
                            }
                        } 
                    }
                }
            }

        },
        Collider: function(perps){
            if(this.jumping){
                //determine if can jump
                var d = AssetUtil.Collisions(this, perps, true);
                if(d && (d.type == C.ass.stump || d.type == C.ass.man || d.type == C.ass.wdog || d.type == C.ass.gdog)){
                    this.reset();
                }
            } 
            else{
                var d = AssetUtil.Collisions(this, perps, false);
                if(d && (d.type == C.ass.carl || d.type == C.ass.carl )){
                    this.motion = 0;
                    this.action = C.act.sq;
                    this.reset(C.act.sq);
                }
            }
        },
        Update: function(dt){
            this.x += this.dx;
            this.y += this.dy;

            for(var i=0;i<this.anims.length;i++){
                if(this.anims[i].enabled){
                    if(this.death == 0){
                        this.anims[i].x = this.x;
                        this.anims[i].y = this.y;
                        this.anims[i].z = this.z+56;
                    }
                    else{
                        this.anims[i].Update(dt);
                    }

                }
            }
        },
        Render: function(os){
            var x = this.x;
            var y = this.y;

            var pt = Util.IsoPoint(x-os.x, y-os.y);
            if(this.death == 0){
                Renderer.PolySprite(pt.x, pt.y, this.shadow);
            }
            if(this.action < C.act.dd){
                Renderer.PolySprite(pt.x, pt.y-this.z, this.body[this.action][this.motion] );
            }

            for(var i=0;i<this.anims.length;i++){
                if(this.anims[i].enabled){                  
                    this.anims[i].Render(os);
                }
            }
        }
    };

    window.Man = Man;
})();

//a character that can be a tree or simple animatable obect
(function() {
    function Grunt(x, y, b, type, motion, die) {
        this.type = type;
        this.enabled = true;
        this.home = {x:x,y:y};
        this.x = x;
        this.y = y;
        this.z = 0;
        this.width = 48;
        this.length = 48;
        this.dt = motion;
        this.body = b;
        this.die = die;
        this.dest = {x:0, y:0};
        this.desty;
    };

    Grunt.prototype = {
        Logic: function(dt){
            var t = gameAsset.scene.Content(this.x, this.y);
            if(map.colliders.fend.indexOf(t) != -1){  
                this.enabled = false;
            }
            this.dest.x = this.type == C.ass.carl ? this.x-(this.width) : this.x+(this.width);
            this.dest.y = this.y; 
        },
        Collider: function(perps){
            if(this.type == C.ass.carl || this.type == C.ass.carr)
            {
                //predictive collison only with cars, checking a few tiles ahead
                var d = AssetUtil.Collisions(this, perps, true);
                if(d && (d.type == C.ass.carl || d.type == C.ass.carr))
                {
                    this.dt.x = d.dt.x;
                }
            }
        },
        Update: function(dt){
            if(this.enabled && this.dt){
                this.x += this.dt.x*dt;
                this.y += this.dt.y*dt;
                this.z += this.dt.z*dt;

                if(this.dt.z){
                    this.dt.z -= (400*dt);
                    if(this.z < 0 && this.die)
                    {
                        this.enabled = false;
                    }
                }
            }
        },
        Render: function(os){
            var pt = Util.IsoPoint(this.x-os.x, this.y-os.y);
            Renderer.PolySprite(pt.x, pt.y-this.z,  this.body);
        }
    };

    window.Grunt = Grunt;
})();

