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
        this.woof = 32;
        this.power = 0;

        this.help = null;

        this.target = targ;
        this.altTarget = null;
        this.patrol = {
            rnd:true,
            wait:256,
            d:0, 
            inp:null,
            p:[{x:0,y:0},{x:this.x,y:this.y}],
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
                        if( gameAsset.dlog.active != 1)
                        {
                            if(this.altTarget){

                                var inp = AssetUtil.Dir(this.altTarget, this); 
                                AssetUtil.InputLogic(inp, this, 100*dt, 48); 
                            }
                            else{
                                var inp = {
                                            up: (input.isDown('UP') || input.isDown('W') ),
                                            down: (input.isDown('DOWN') || input.isDown('S') ),
                                            left: (input.isDown('LEFT') || input.isDown('A') ),
                                            right: (input.isDown('RIGHT') || input.isDown('D') )
                                        };     
                                AssetUtil.InputLogic(inp, this, speed, 48); 
                            }                           
                        }
                    }
                    else
                    {
                        var inp = AssetUtil.Dir(this.target, this);

                        if( inp.d < (6*48) ){
                            AssetUtil.InputLogic(inp, this, speed * 1.2, 48); 
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
                    if(this.idle > 0 && --this.idle == 0){
                        this.motion = 0;                        
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
                            if(--this.patrol.d == 0)
                            {
                                this.patrol.inp = null;
                            }                            
                        }
                        if(this.altTarget == null && this.help){
                            if(this.help.man && gameAsset.dlog.active == 2){
                                gameAsset.AddChat(HT[4], this.x-140, this.y+(this.action == C.act.dn?80:-80), null,3,100);
                                this.help.man = 0;
                            }

                            if(this.help.brk && this.power>0){
                                if(this.help.trt==0){
                                    gameAsset.AddChat(HT[3], this.x-140, this.y+(this.action == C.act.dn?80:-80), null,3,100);
                                        this.help.brk = 0;
                                }
                            }
                            if(this.help.toy){
                                var x = gameAsset.assets.Get([C.ass.toy]);
                                for (var i = 0; i < x.length; i++) {
                                    var hm = AssetUtil.Dir(x[i], this);
                                    if(hm.d < 5*48){                                        
                                        gameAsset.AddChat(HT[0], x[i].x-140, x[i].y+(hm.up?64:-64), null,3,100);
                                        this.help.toy = 0;
                                    }
                                }
                            }
                            if(this.help.trt){
                                var x = gameAsset.assets.Get([C.ass.treat]);
                                for (var i = 0; i < x.length; i++) {
                                    var hm = AssetUtil.Dir(x[i], this);
                                    if(hm.d < 5*48){                                        
                                        gameAsset.AddChat(HT[1], x[i].x-140, x[i].y+(hm.up?64:-64), null, 3,100);
                                        this.help.trt = 0;
                                    }
                                }
                            }

                            if(this.help.dog){
                                var x = gameAsset.assets.Get([C.ass.gdog,C.ass.wdog]);
                                for (var i = 0; i < x.length; i++) {
                                    var hm = AssetUtil.Dir(x[i], this);
                                    if(hm.d < 10*48){                                        
                                        gameAsset.AddChat(HT[2], this.x+(hm.left?-210:0), this.y+(hm.up?-64:64), null,3,100);
                                        this.help.dog = 0;
                                    }
                                }
                            }
                        }
                        this.idle = 64;
                        //check what landed on
                        if(map.colliders.over.indexOf(t) != -1){ 
                            if(t > 6 && t < 11){//water
                                this.action = C.act.dd;
                                this.death = C.act.wt;

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

                if(this.woof > 0){
                    this.woof--;
                }

                if(this.type == C.ass.player && gameAsset.dlog.active !=1 && this.woof == 0){
                    if(input.isUp('SPACE')){

                        var d = AssetUtil.WhichDir(this.action,[
                            {v:C.act.rt, r:{x:this.x+48, y:this.y-48}},
                            {v:C.act.lt, r:{x:this.x-144, y:this.y-48}},
                            {v:C.act.up, r:{x:this.x-48, y:this.y-96}},
                            {v:C.act.dn, r:{x:this.x-48, y:this.y+48}}]);

                        gameAsset.AddChat(SP[0], d.x, d.y);
                        this.woof = 48;

                        var inp = AssetUtil.Dir(this.target, this);

                        if(inp.d < 5*48){
                            this.target.target = this;
                            gameAsset.StartChat();
                        }
                        else{ 
                            if(inp.d < ((this.power*17)*48)){
                                gameAsset.AddChat("!!", this.x+(Util.OSet(this.x,this.target.x)*300), 
                                this.y+(Util.OSet(this.y,this.target.y)*200),null,6,100);
                            }                            
                        }  

                        if(this.power>0)this.power--;                                             
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
            if(this.death == 0){
                if(this.jumping){
                    //determine if can jump
                    var d = AssetUtil.Collisions(this, perps, true);
                    if(d && (d.type == C.ass.stump || d.type == C.ass.man || d.type == C.ass.wdog || d.type == C.ass.gdog))
                    {
                        this.reset();
                    }
                } 

                var d = AssetUtil.Collisions(this, perps, false);
                if(d)
                {
                    if(d.type == C.ass.carl || d.type == C.ass.carr || d.type == C.ass.wdog || d.type == C.ass.gdog){
                        this.motion = 0;
                        this.action = C.act.sq;
                        this.type = C.ass.null;
                        this.reset(C.act.sq);
                        gameAsset.splats.push({x:this.x,y:this.y,src:this.body[this.action][0]});
                    }
                    else if(d.type == C.ass.toy &&this.type == C.ass.player){
                        gameAsset.time+=10;
                        d.enabled = false;
                    }
                    else if(d.type == C.ass.treat && this.type == C.ass.player){
                        this.power ++;
                        d.enabled = false;
                    }
                }

            }
        },
        Render: function(os){
            var x = this.x;
            var y = this.y;

            var pt = Util.IsoPoint(x-os.x, y-os.y);
            if(this.death == 0){
                R.PolySprite(pt.x, pt.y, this.shadow);
            }
            if(this.action < C.act.sq){
                R.PolySprite(pt.x, pt.y-this.z, this.body[this.action][this.motion] );
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
        this.targMin = 3;

        this.shadow = Util.Build([assets.tile.sol],1.5,[C.col.sw]);
        this.body= [
            [Fac[C.src.mup],Fac[C.src.mup+1],Fac[C.src.mup],Fac[C.src.mup+2]],
            [Fac[C.src.mdn],Fac[C.src.mdn+1],Fac[C.src.mdn],Fac[C.src.mdn+2]],            
            [Fac[C.src.mlt],Fac[C.src.mlt+1],Fac[C.src.mlt],Fac[C.src.mlt+2]],
            [Fac[C.src.mrt],Fac[C.src.mrt+2],Fac[C.src.mrt],Fac[C.src.mrt+1]],
            [Fac[C.src.flat]],[]
        ];
        this.hat = 56;
        this.anims = [];
        this.anims.push(new Grunt(this.x, this.y, Fac[C.src.hat], C.ass.null,null,false));
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
                    if(this.target){
                        var inp = AssetUtil.Dir(this.target, this);

                        if(gameAsset.dlog.active == 1){

                            this.action =AssetUtil.WhichDir(true,[
                                {v:inp.right, r:C.act.rt},
                                {v:inp.left, r:C.act.lt},
                                {v:inp.up, r:C.act.up},
                                {v:inp.down, r:C.act.dn}]);

                        }
                        else if( inp.d < (8*48) && inp.d > (this.targMin*48) ){
                            AssetUtil.InputLogic(inp, this, speed, 48); 
                        }                        
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
                                this.death = C.act.wt;

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
                                for(var i=0;i<this.anims.length;i++){                                              
                                    this.anims[i].dt = {x: 0, y: 0, z:100};
                                    this.anims[i].die = true;
                                }
                            }
                        } 
                    }
                }
            }

        },
        Collider: function(perps){
            if(this.death == 0){
                if(this.jumping){
                    //determine if can jump
                    var d = AssetUtil.Collisions(this, perps, true);
                    if(d && (d.type == C.ass.stump || d.type == C.ass.man || d.type == C.ass.wdog || d.type == C.ass.gdog)){
                        this.reset();
                    }
                } 
                else{
                    var d = AssetUtil.Collisions(this, perps, false);
                    if(d && (d.type == C.ass.carl || d.type == C.ass.carr )){
                        this.motion = 0;
                        this.action = C.act.sq;
                        this.type = C.ass.null;
                        this.reset(C.act.sq);
                        gameAsset.splats.push({x:this.x,y:this.y,src:this.body[this.action][0]});

                        for(var i=0;i<this.anims.length;i++){                                              
                            this.anims[i].dt = {x: Util.Rnd(60)-30, y: Util.Rnd(60)-30, z:200};
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
                    if(this.death == 0){
                        this.anims[i].x = this.x;
                        this.anims[i].y = this.y;
                        this.anims[i].z = this.z+this.hat;
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
                R.PolySprite(pt.x, pt.y, this.shadow);
            }
            if(this.action < C.act.sq){
                R.PolySprite(pt.x, pt.y-this.z, this.body[this.action][this.motion] );
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
                    if(this.z < 0)// && this.die)
                    {
                        this.enabled = !this.die;
                        this.dt=null;
                    }
                }
            }
        },
        Render: function(os){
            var pt = Util.IsoPoint(this.x-os.x, this.y-os.y);
            R.PolySprite(pt.x, pt.y-this.z,  this.body);
        }
    };

    window.Grunt = Grunt;
})();

