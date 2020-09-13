(function() {
    function Game(map) {
        //puppy
        var aa = 47;
        var mn = 33;
        var pu =assets.pupu;
        var pd =assets.pupd;
        var pl =assets.pupl;
        var pr =assets.pupr;
        for (x of [{t:1,s:1.2,c:17,c2:aa}, {t:0,s:1.5,c:21,c2:aa}, {t:0,s:1.5,c:25,c2:aa}]){
            Fac.push(Util.Build([pu.idl,pu.fc],x.s,[x.c,x.c2]));//up idle
            Fac.push(Util.Build([pu.leg,pu.bod, pu.fc],x.s,[x.c,x.c,x.c2]));//up stand
            Fac.push(Util.Build([pu.run,pu.bod, pu.fc],x.s,[x.c,x.c,x.c2]));//up run

            Fac.push(Util.Build([pd.idl,x.t?pd.fc:pd.fc2],x.s,[x.c,x.c2]));//dn idle
            Fac.push(Util.Build([pd.leg,pd.bod,x.t?pd.fc:pd.fc2],x.s,[x.c,x.c,x.c2]));//down
            Fac.push(Util.Build([pd.run,pd.bod,x.t?pd.fc:pd.fc2],x.s,[x.c,x.c,x.c2]));//down run

            Fac.push(Util.Build([pl.idl,x.t?pl.fc:pl.fc2],x.s,[x.c,x.c2]));//lt idle
            Fac.push(Util.Build([pl.leg,pl.bod,x.t?pl.fc:pl.fc2],x.s,[x.c,x.c,x.c2]));//left
            Fac.push(Util.Build([pl.run,pl.bod,x.t?pl.fc:pl.fc2],x.s,[x.c,x.c,x.c2]));//left run

            Fac.push(Util.Build([pr.idl,x.t?pr.fc:pr.fc2],x.s,[x.c,x.c2]));//rt idle
            Fac.push(Util.Build([pr.leg,pr.bod,x.t?pr.fc:pr.fc2],x.s,[x.c,x.c,x.c2]));//right
            Fac.push(Util.Build([pr.run,pr.bod,x.t?pr.fc:pr.fc2],x.s,[x.c,x.c,x.c2]));//right run            
        }

        //water particle
        Fac.push(Util.Build([assets.cube],0.3,[8]));//splash

        //man
        var m = assets.man;
        Fac.push(Util.Build([m.v.leg,m.bod,m.v.ex,m.v.fceu],1,[mn,mn,mn,aa]));//up
        Fac.push(Util.Build([m.v.leg1,m.bod,m.v.ex,m.v.fceu],1,[mn,mn,mn,aa]));//up
        Fac.push(Util.Build([m.v.leg2,m.bod,m.v.ex,m.v.fceu],1,[mn,mn,mn,aa]));//up
        Fac.push(Util.Build([m.v.leg,m.bod,m.v.ex,m.v.fced],1,[mn,mn,mn,aa]));//down
        Fac.push(Util.Build([m.v.leg1,m.bod,m.v.ex,m.v.fced],1,[mn,mn,mn,aa]));//down
        Fac.push(Util.Build([m.v.leg2,m.bod,m.v.ex,m.v.fced],1,[mn,mn,mn,aa]));//down        
        Fac.push(Util.Build([m.h.leg,m.bod,m.h.ex,m.h.fcel],1,[mn,mn,mn,aa]));//left
        Fac.push(Util.Build([m.h.leg1,m.bod,m.h.ex,m.h.fcel],1,[mn,mn,mn,aa]));//left
        Fac.push(Util.Build([m.h.leg2,m.bod,m.h.ex,m.h.fcel],1,[mn,mn,mn,aa]));//left
        Fac.push(Util.Build([m.h.leg,m.bod,m.h.ex,m.h.fcer],1,[mn,mn,mn,aa]));//right
        Fac.push(Util.Build([m.h.leg1,m.bod,m.h.ex,m.h.fcer],1,[mn,mn,mn,aa]));//right
        Fac.push(Util.Build([m.h.leg2,m.bod,m.h.ex,m.h.fcer],1,[mn,mn,mn,aa]));//right    

        //tree
        Fac.push(Util.Build([assets.tree.bod,assets.tree.hd1],1,[25,29]));//tree1    
        Fac.push(Util.Build([assets.tree.bod,assets.tree.hd2],1,[25,29]));//tree2    

        Fac.push(Util.Build([assets.hat],0.3,[aa]));//hat

        var cc = [38,42,21];
        for (var i = 0; i < cc.length; i++) {            
            Fac.push(Util.Build([assets.car.bod, assets.car.win, assets.car.ltf],1.3,[cc[i], aa,aa]));//car
            Fac.push(Util.Build([assets.car.bod, assets.car.win, assets.car.ltr],1.3,[cc[i], aa,aa]));//car 
        }

        Fac.push(Util.Build([assets.well],1.5,[17]));//well
        Fac.push(Util.Build([assets.flat],1,[17]));//flat pup

        //tony
        Fac.push(Util.Build([m.h.leg,m.bod,m.h.ex,m.h.fcer],0.8,[mn,mn,mn,aa]));//right
        Fac.push(Util.Build([m.h.leg1,m.bod,m.h.ex,m.h.fcer],0.8,[mn,mn,mn,aa]));//right
        Fac.push(Util.Build([m.h.leg2,m.bod,m.h.ex,m.h.fcer],0.8,[mn,mn,mn,aa]));//right  

        Fac.push(Util.Build([assets.cube],0.2,[17]));//treat
        Fac.push(Util.Build([assets.cube],0.4,[38]));//toy

        var i =0;
        var set = [];
        for (let i = 0; i < 17; i++) {
            set.push( Util.Build([assets.tile.sol],1.5,[i]) );            
        }
        set[4] = Util.Build([assets.tile.sol,assets.tile.hol],1.5,[3,4]);
        set[5] = Util.Build([assets.tile.sol,assets.tile.cor],1.5,[3,4]);
        set[8] = Util.Build([assets.tile.sol,assets.tile.hol],1.5,[7,8]);
        set[9] = Util.Build([assets.tile.sol,assets.tile.cor],1.5,[7,8]);
  
        this.scene = new MapManager(map.size, map.level, set);
        this.screen = {w:map.size.screen.width*map.size.tile.width, h:map.size.screen.height*map.size.tile.height};

        this.gameState = 0;
        this.scCol = 1;
        this.count = 16;
        

        this.photo = null;
        
        this.reset = function(sc){
            R.Set(sc||1);
            this.endCheck = true;
            this.scene.Set(sc);
            this.chat = [];
            this.carSpawn = [];
            this.splats = [];

            this.level = 0;
            this.win = 0;

            this.assets = new ObjectPool(); 
            this.dlog = {active:0, p:0, r:2, 
                wt:0,
                tx:Util.Speaks(4)
                ,
                rp:[
                    SP[4],SP[6],SP[2],SP[7]
                ]
            };
            var spawn = map.level.spawn;
            var tw = map.size.tile.width;
            var th = map.size.tile.height;
    
            AssetUtil.CarSpawn(this.carSpawn, spawn.carl, 8,tw);
            AssetUtil.CarSpawn(this.carSpawn, spawn.carr, 9,tw);

            this.player = new Dog(spawn.plr[0].x*tw, spawn.plr[0].y*th, 1);
            this.assets.Add(this.player);

            this.man = new Man(spawn.man[this.level].x*tw, spawn.man[this.level].y*th, null);
            this.player.target = this.man;
            this.assets.Add(this.man);

            for (var i = 0; i < spawn.wdog.length; i++) {            
                var d = new Dog(spawn.wdog[i].x*tw, spawn.wdog[i].y*th, 3, this.player);
                this.assets.Add(d);
            }

            for (var i = 0; i < spawn.gdog.length; i++) {            
                var d = new Dog(spawn.gdog[i].s.x*tw, spawn.gdog[i].s.y*th, 2, this.player);
                d.patrol.p[0] = {x:spawn.gdog[i].e.x*tw, y:spawn.gdog[i].e.y*th};
                d.patrol.rnd = false;
                this.assets.Add(d);
            }

            // //mapped stumps
            for (var i = 0; i < spawn.hard.length; i++) {
                var d = new Grunt(spawn.hard[i].x*tw, spawn.hard[i].y*th, 
                    Util.OneOf([Fac[49], Fac[50]]), 5);
                this.assets.Add(d);
            }
            //toys n treats
            for (var i = 0; i < spawn.trt.length; i++) {
                var d = new Grunt(spawn.trt[i].x*tw, spawn.trt[i].y*th, Fac[63], 6);
                this.assets.Add(d);
            }
            for (var i = 0; i < spawn.tys.length; i++) {
                var d = new Grunt(spawn.tys[i].x*tw, spawn.tys[i].y*th, Fac[64], 7);
                this.assets.Add(d);
            }

            //well
            var w= spawn.hme;
            var well = [
                {x:w.x-1, y:w.y-1}, {x:w.x, y:w.y-1}, {x:w.x+1, y:w.y-1},
                {x:w.x-1, y:w.y}, {x:w.x+1, y:w.y},
                {x:w.x-1, y:w.y+1}, {x:w.x, y:w.y+1}, {x:w.x+1, y:w.y+1}
            ];
            this.home = {x:w.x*48,y:w.y*48};

            for (var i = 0; i < well.length; i++) {
                var d = new Grunt(well[i].x*tw, well[i].y*th, Fac[58], 5);
                this.assets.Add(d);
            }            

            if(!sc){
                this.tony = new Man(spawn.tony[0].x*tw, spawn.tony[0].y*th, {x:spawn.tony[1].x*tw, y:spawn.tony[1].y*th});
                this.tony.action = C.act.rt;
                this.tony.targMin = 0;
                this.tony.hat = 56*0.8;
                this.tony.body = [
                    [], [], [],
                    [Fac[60],Fac[60+2],Fac[60],Fac[60+1]],
                    [Fac[59]],[]
                ];
    
                this.assets.Add(this.tony);

                //rnd stumps
                AssetUtil.PlaceAssets(120, tw, 4, map.level.dim.width, map.level.dim.height,
                    this.scene, this.assets, [5,4,3,2,1],
                    [Fac[49], Fac[50]], 5);

                //treats
                AssetUtil.PlaceAssets(16, tw, 8, map.level.dim.width, map.level.dim.height-26,
                    this.scene, this.assets, [5,4,3,2,1],
                    [Fac[63]], 6);

                AssetUtil.PlaceAssets(8, tw, 8, map.level.dim.width, map.level.dim.height-26,
                    this.scene, this.assets, [5,4,3,2,1,7,6],
                    [Fac[64]], 7);
            }
            this.subTick = 160            
            this.time = 60;
            this.subTime = this.subTick;

            this.scriptStage = 0;
            this.scriptStop = 4;
            this.player.altTarget ={x:spawn.plr[1].x*tw, y:spawn.plr[1].y*th};

            this.player.help = {toy:1,trt:1,dog:1,brk:1,man:1};
            this.scene.ScrollTo(this.player.x, this.player.y, 1);  
        };
        
        
        var t = this;
        this.script=[
            function(){
                if(t.player.x == t.player.altTarget.x){
                    t.scriptStage ++;
                    t.player.altTarget = null;
                }
            },
            function(){
                t.scCol = Util.SLerp(t.scCol, 1, 0.02);
                if(t.scCol > 0.9){
                    t.scriptStage ++;
                    t.count = 300;
                }
            },
            function(){                
                t.scCol = 1;
                if(input.isUp("SPACE")){
                    t.scriptStage ++;
                    t.tony.x = t.home.x;
                    t.tony.y = t.home.y;
                    input.Clr();
                } 
            },
            function(){
                t.scCol = Util.SLerp(t.scCol, 0, 0.02);
                if(t.scCol < 0.1){
                    t.scriptStage ++;
                    t.player.script = false; 
                    t.count=64;
                   
                    t.tony.action = C.act.dd;
                    t.tony.death = C.act.dd;
                                            
                    t.tony.anims[0].dt = {x: 0, y: 0, z:100};
                    t.tony.anims[0].die = true;

                    gameAsset.AddChat(SP[10]+SP[11], t.tony.x-200, t.tony.y-100, PAL[47], 4, 80, 32, function(){
                        gameAsset.AddChat(SP[12], t.tony.x-200, t.tony.y-100, PAL[47], 4, 80,32);
                    });
                }
            },
            function(){
                t.scCol = Util.SLerp(t.scCol, 1, 0.02);
                if(t.scCol > 0.9){
                    t.scriptStage ++;
                    t.count = 100;
                }
            },            
            function(){
                t.scCol = 1;
                if(input.isUp("SPACE")){
                    t.scriptStage ++;
                    
                    var g = new Grunt(t.tony.x, t.tony.y, Fac[51], 0,                        
                             {x: 0, y: 0, z:100},true);
                    g.z = 56*0.8;
                    t.assets.Add(g);

                    //reset man    
                    t.level++;
                    
                    var spawn = map.level.spawn;
                    var tw = map.size.tile.width;
                    t.man.x = spawn.man[t.level].x*tw;
                    t.man.y = spawn.man[t.level].y*tw;
                    t.man.target = null;
                    t.dlog.active = 0;
                    t.dlog.r = Util.RndI(0,4);
                    t.dlog.rp = Util.Replies(t.dlog.r, t.level==1 ? 3 : Util.RndI(2,4));
                    t.dlog.tx = Util.Speaks(4);
                    t.endCheck = true;
                    input.Clr();
                }
            },
            function(){
                t.scCol = Util.SLerp(t.scCol, 0, 0.02);
                if(t.scCol < 0.1){
                    t.scriptStage ++;
                    t.count=64;
                   
                    t.tony.action = C.act.dd;
                    t.tony.death = C.act.dd;                                           

                    gameAsset.AddChat(SP[10], t.tony.x-200, t.tony.y-100, PAL[47], 4, 80, 32, function(){
                        gameAsset.AddChat(SP[13], t.tony.x-200, t.tony.y-100, PAL[47], 4, 80,32);
                    });
                }
            },
        ];
        this.AddChat = function(txt, x, y, c, sz, tm, wt, next){
            this.chat.push({w:txt,tm:tm||64, sz:sz||4, x:x, y:y, c:c, wt:wt, nt:next});
        }
        this.StartChat = function(){
            if(this.dlog.active == 0){this.dlog.active = 1;}
        }

        this.reset(2);
    };

    Game.prototype = {
        Update: function(dt){
            var asses = this.assets.Get();
            
            switch (this.gameState) {
                case 0:     //app start
                    if(this.count == 0){
                        this.scCol = Util.SLerp(this.scCol, 0, 0.01);
                        if(this.scCol < 0.1){
                            this.gameState = 1;
                        }
                    }
                    else{
                        this.count--;
                    }
                    break;
                case 1:
                    if(input.isUp("SPACE")){
                        this.photo = R.Get(300,200,200,200);
                        this.gameState = 2;
                    } 
                    break; 
                case 2:
                    this.scCol = Util.SLerp(this.scCol, 1, 0.02);
                    if(this.scCol > 0.9){
                        this.gameState = 3;
                        this.count = 240;
                    }
                    break; 
                case 3:
                    if(input.isUp("SPACE")){
                        this.gameState = 4;   
                        this.reset();  
                    } 
                    break;  
                case 4:
                    this.scCol = Util.SLerp(this.scCol, 0, 0.02);
                    if(this.scCol < 0.1){
                        this.gameState = C.state.game;  
                        this.count = 64;                   
                    }
                    break; 
                case C.state.game://game
                    if(this.scriptStage < this.scriptStop){
                        this.script[this.scriptStage]();
                    }
                    for (var i = 0; i < this.carSpawn.length; i++) {
                        if(this.carSpawn[i].ready == 0){
                            var sp = Util.RndI(100, 300);
                            var o = Util.OneOf([52,52+2,52+4]);
                            var a = Fac[o];
                            if(this.carSpawn[i].type == 8)
                            {
                                sp = -sp;
                                a = Fac[o+1];
                            }
                            var c = this.assets.Is(this.carSpawn[i].type);
                            if(c){
                                c.enabled = true;
                                c.x = this.carSpawn[i].x;
                                c.dt.x = sp;
                            }
                            else{
                                var g = new Grunt(this.carSpawn[i].x, this.carSpawn[i].y, a, 
                                    this.carSpawn[i].type, {x: sp, y: 0, z:0}, true);
                                g.width = 96; 
                                this.assets.Add(g);
                            }

                            this.carSpawn[i].ready = Util.RndI(300, 500);
                        }
                        else{
                            this.carSpawn[i].ready--;
                        }
                    }
                    
                    if(this.dlog.active == 1){
                        if(this.dlog.wt == 0){
                            if(input.isUp('UP')){
                                if(this.dlog.p >0) {this.dlog.p--};
                            }
                            if(input.isUp('DOWN')){
                                if(this.dlog.p < 3) {this.dlog.p++};
                            }
                            if(input.isUp('SPACE')){
                                var t = this;
                                var d = {x:t.player.x-140, y:t.player.y+120};

                                t.dlog.wt = 1;
                                gameAsset.AddChat(this.dlog.tx[t.dlog.p], d.x, d.y, PAL[47], 3, 128, 0, function(){
                                        var tx =t.dlog.rp[t.dlog.p].replace("{*}",t.time);
                                        gameAsset.AddChat(
                                            tx, d.x, d.y, PAL[51], 3,
                                            t.dlog.p == t.dlog.r ? tx.length*4 : 196,32, function(){ 
                                            if(t.dlog.p == t.dlog.r){
                                                gameAsset.AddChat(Util.OneOf([SP[14],SP[15]]), 
                                                        d.x, d.y, PAL[51], 3, 128,32, function(){
                                                    t.dlog.wt=0;
                                                    t.dlog.active = 2;
                                                    t.player.woof=48;
                                                });
                                            }  
                                            else{
                                                t.dlog.wt=0;  
                                            }
                                        });
                                });

                            }
                        }
                    }
                    else if(--this.subTick <= 0)
                    {
                        this.time--;
                        this.subTick = this.subTime;

                        if(this.time==0){
                            this.count = 64;
                            this.gameState = C.state.game+1;//out of time
                            this.win = [NT[1],
                                        NT[3]+NT[4],
                                        Util.OneOf([NT[7],NT[8],NT[9]])
                                    ];
                        }
                    }

                    var hm = AssetUtil.Dir(this.home, this.man);
                   
                    if(this.endCheck && hm.d < (5*48)){
                        this.endCheck = false;
                        if(this.level < 2){
                            this.scriptStop = 7;
                            this.scriptStage = 4;
                        }
                        else{
                            this.count = 64;
                            this.gameState = C.state.game+1;//Game completed??
                            this.win = [NT[2],
                                        Util.OneOf([NT[5],NT[6]]),
                                        Util.OneOf([NT[7],NT[8],NT[9]])
                                    ];
                        }
                    }
                    if(this.player.death || this.man.death){
                        if(--this.count == 0)
                        {
                            var os = this.scene.ScrollOffset(); 
                            var pt = Util.IsoPoint(this.player.x-os.x, this.player.y-os.y);
                            this.photo = R.Get(pt.x-100,pt.y-100,200,200);

                            this.count = 64;
                            this.gameState = C.state.game+1;//game over
                            if(this.man.death>0){
                                this.win = [NT[1],
                                    NT[10]+Util.OneOf([NT[11],NT[4]]),
                                    Util.OneOf([NT[7],NT[8],NT[9]])
                                ];
                            }
                            else{
                                if(this.level >0){
                                    this.win = [NT[1],
                                            NT[10]+Util.OneOf([ NT[11],NT[4]]),
                                            Util.OneOf([NT[7],NT[8],NT[9]])
                                        ];
                                }
                                else{
                                    this.win = [NT[1],
                                            NT[3]+NT[4],
                                            Util.OneOf([NT[7],NT[8],NT[9]])
                                        ];
                                }

                            }
                        }
                    }
                    break; 
                case 6:
                    if(input.isUp("SPACE")){
                        this.count = 64;
                        this.gameState = 0;
                        this.scCol = 1;
                        this.count = 64;
                        this.reset(2);
                    }
                    break; 

                default:
                    break;
            }
 
            for(var e = 0; e < asses.length; e++) 
            {
                //do move
                if(this.gameState ==  C.state.game){
                    if(asses[e].enabled){
                        asses[e].Logic(dt);
                        asses[e].Collider(asses);
                    }
                }
                asses[e].Update(dt);
            }        

            this.scene.ScrollTo(this.player.x, this.player.y);   

            input.Clr();
        },
        Render: function(){   
            var mp = this.scene.ScrollOffset(); 

            var asses = this.assets.Get();

            asses.sort(function(a, b){
                var p1 = Util.IsoPoint(a.x,a.y);
                var p2 = Util.IsoPoint(b.x,b.y);
                return p1.y - p2.y;
            });

            this.scene.Render();

            for(var e = 0; e < this.splats.length; e++) {
                var pt = Util.IsoPoint(this.splats[e].x-mp.x, this.splats[e].y-mp.y);
                R.PolySprite(
                    pt.x, 
                    pt.y, 
                    this.splats[e].src);
            }  

            for(var e = 0; e < asses.length; e++) {
                asses[e].Render(mp);
            }     

            switch (this.gameState) {
                case 0:
                    R.Box(0,0,this.screen.w, this.screen.h, "rgba(0, 0, 0, "+this.scCol+")");
                    R.Text(TT[0], 260, 100, 12,1);                    
                    break;
                case 1:
                    R.Text(TT[0], 260, 100, 12,1);
                    R.Text(TT[1], 280, 480, 6,0);
                    break;
                case 2:    
                    R.Box(0,0,this.screen.w, this.screen.h, "rgba(0, 0, 0, "+this.scCol+")");
                    break;
                case 3:
                    R.Box(0,0,this.screen.w, this.screen.h, "rgba(0, 0, 0, 1)");
                    R.Text("TONY WAS OUT WALKING WITH HIS+FAITHFULL COMPANION", 20, 100, 4,0,PAL[51]);
                    R.Text(TT[1], 580, 580, 4,0,PAL[51]);  
                    break;
                case 4:
                    R.Box(0,0,this.screen.w, this.screen.h, "rgba(0, 0, 0, "+this.scCol+")");
                    break;    
                case  C.state.game:
                    if(this.scriptStage < this.scriptStop){
                        R.Box(0,0,this.screen.w, this.screen.h, "rgba(0, 0, 0, "+this.scCol+")");
                        if(this.scriptStage == 2){
                            R.Text("WHEN THEY CAME ACROSS AN OLD WELL.", 20, 100, 4,0,PAL[51]);
                            R.Text("^MAKE A WISH PUPPY!^, SAID TONY", 20, 134, 4,0,PAL[51]);
                            R.Text("AS HE LEANED OVER TO THROW A PENNY", 20, 168, 4,0,PAL[51]);
                            R.Text("INTO THE WELL...", 20, 202, 4,0,PAL[51]);
                            R.Text(TT[1], 580, 580, 4,0,PAL[51]);                            
                        }
                        if(this.scriptStage == 5){
                            if(this.level ==0){
                            R.Text("PUPPY FINDS HELP AND BRINGS HIM TO HIS MASTER.", 20, 100, 4,0,PAL[51]);
                            R.Text("^HELLO DOWN THERE!^, SHOUTS THE MAN.", 20, 134, 4,0,PAL[51]);
                            R.Text("^THANK THE LORD IM SAVED^, REPLIES TONY AS HIS", 20, 168, 4,0,PAL[51]);
                            R.Text("RESCUER LEANS OVER THE EDGE OF THE WELL...", 20, 202, 4,0,PAL[51]);
                            }else{
                            R.Text("PUPPY GUIDES THE MAN TO THE WELL.", 20, 100, 4,0,PAL[51]);
                            R.Text("^ARE THERE TROLLS DOWN THERE^ ASKS THE MAN.", 20, 134, 4,0,PAL[51]);
                            R.Text("PUPPY GIVES A SIGH AS THE MAN LEANS+OVER TO TAKE A LOOK...", 20, 168, 4,0,PAL[51]);
                            R.Text(TT[1], 580, 580, 4,0,PAL[51]);
                            }
                        }
                    }
                    else{
                    //score panel thing
                        R.Box(0,0,this.screen.w, 48, "rgba(0, 0, 0, 0.7)");
                        R.Text("TIME", this.screen.w-200, 8, 3, 0, PAL[51]);  
                        R.Text("TO LIVE", this.screen.w-200, 26, 3, 0, PAL[51]);  
                        R.Text(""+this.time, this.screen.w-100, 10, 6, 0, PAL[51]); 

                        R.Text("BARK", 60, 14, 4, 0, PAL[51]); 
                        R.Box(140,20,this.player.power * 8, 16, PAL[51]);
                    }
                    //txts
                    for(var e = 0; e < this.chat.length; e++) {
                        var cht = this.chat[e];
                        if(cht.tm > 0){
                            if(cht.wt>0){
                                cht.wt--;   
                            }
                            else{
                                var pt = Util.IsoPoint(cht.x-mp.x, cht.y-mp.y);
                                R.Text(cht.w, pt.x, pt.y, cht.sz,1, cht.c);   

                                if(--cht.tm == 0 && cht.nt){
                                    cht.nt();
                                }
                            }

                        }
                    }

                    //if active, dialog panel
                    if(this.dlog.active == 1){
                        var h = 480;
                        R.Box(0,h,this.screen.w, this.screen.h, "rgba(0, 0, 0, 0.7)");
                        for(var e = 0; e < this.dlog.tx.length; e++) {
                            R.Text( this.dlog.tx[e], 180, h+16+(e*28), 4,0, 
                            this.dlog.wt == 1 ?  PAL[49] : this.dlog.p == e ? PAL[33] : PAL[33+2]); 
                        }
                    }
                    break;
                case 6:
                    R.News(this.screen.w, this.screen.h, this.photo,this.win);
                    break;
                default:
                    break;
            }

        }
    };

    window.Game = Game;
})();
