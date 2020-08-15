(function() {
    function Game(map, level) {
        //puppy
        var aa = C.col.aa;
        var mn = C.col.mn;
        for (x of [{t:1,s:1.2,c:C.col.d1,c2:aa}, {t:0,s:1.5,c:C.col.d2,c2:aa}, {t:0,s:1.5,c:C.col.d3,c2:aa}]){
            Fac.push(Util.Build([assets.pupu.idl,assets.pupu.fc],x.s,[x.c,x.c2]));//up idle
            Fac.push(Util.Build([assets.pupu.leg,assets.pupu.bod, assets.pupu.fc],x.s,[x.c,x.c,x.c2]));//up stand
            Fac.push(Util.Build([assets.pupu.run,assets.pupu.bod, assets.pupu.fc],x.s,[x.c,x.c,x.c2]));//up run

            Fac.push(Util.Build([assets.pupd.idl,x.t?assets.pupd.fc:assets.pupd.fc2],x.s,[x.c,x.c2]));//dn idle
            Fac.push(Util.Build([assets.pupd.leg,assets.pupd.bod,x.t?assets.pupd.fc:assets.pupd.fc2],x.s,[x.c,x.c,x.c2]));//down
            Fac.push(Util.Build([assets.pupd.run,assets.pupd.bod,x.t?assets.pupd.fc:assets.pupd.fc2],x.s,[x.c,x.c,x.c2]));//down run

            Fac.push(Util.Build([assets.pupl.idl,x.t?assets.pupl.fc:assets.pupl.fc2],x.s,[x.c,x.c2]));//lt idle
            Fac.push(Util.Build([assets.pupl.leg,assets.pupl.bod,x.t?assets.pupl.fc:assets.pupl.fc2],x.s,[x.c,x.c,x.c2]));//left
            Fac.push(Util.Build([assets.pupl.run,assets.pupl.bod,x.t?assets.pupl.fc:assets.pupl.fc2],x.s,[x.c,x.c,x.c2]));//left run

            Fac.push(Util.Build([assets.pupr.idl,x.t?assets.pupr.fc:assets.pupr.fc2],x.s,[x.c,x.c2]));//rt idle
            Fac.push(Util.Build([assets.pupr.leg,assets.pupr.bod,x.t?assets.pupr.fc:assets.pupr.fc2],x.s,[x.c,x.c,x.c2]));//right
            Fac.push(Util.Build([assets.pupr.run,assets.pupr.bod,x.t?assets.pupr.fc:assets.pupr.fc2],x.s,[x.c,x.c,x.c2]));//right run            
        }

        //water particle
        Fac.push(Util.Build([assets.cube],0.3,[C.col.wt]));//splash

        //man
        Fac.push(Util.Build([assets.man.v.leg,assets.man.bod,assets.man.v.ex],1,[mn,mn,mn]));//up
        Fac.push(Util.Build([assets.man.v.leg1,assets.man.bod,assets.man.v.ex],1,[mn,mn,mn]));//up
        Fac.push(Util.Build([assets.man.v.leg2,assets.man.bod,assets.man.v.ex],1,[mn,mn,mn]));//up
        Fac.push(Util.Build([assets.man.v.leg,assets.man.bod,assets.man.v.ex],1,[mn,mn,mn]));//down
        Fac.push(Util.Build([assets.man.v.leg1,assets.man.bod,assets.man.v.ex],1,[mn,mn,mn]));//down
        Fac.push(Util.Build([assets.man.v.leg2,assets.man.bod,assets.man.v.ex],1,[mn,mn,mn]));//down        
        Fac.push(Util.Build([assets.man.h.leg,assets.man.bod,assets.man.h.ex],1,[mn,mn,mn]));//left
        Fac.push(Util.Build([assets.man.h.leg1,assets.man.bod,assets.man.h.ex],1,[mn,mn,mn]));//left
        Fac.push(Util.Build([assets.man.h.leg2,assets.man.bod,assets.man.h.ex],1,[mn,mn,mn]));//left
        Fac.push(Util.Build([assets.man.h.leg,assets.man.bod,assets.man.h.ex],1,[mn,mn,mn]));//right
        Fac.push(Util.Build([assets.man.h.leg1,assets.man.bod,assets.man.h.ex],1,[mn,mn,mn]));//right
        Fac.push(Util.Build([assets.man.h.leg2,assets.man.bod,assets.man.h.ex],1,[mn,mn,mn]));//right    

        //tree
        Fac.push(Util.Build([assets.tree.bod,assets.tree.hd1],1,[C.col.d3,C.col.tr]));//tree1    
        Fac.push(Util.Build([assets.tree.bod,assets.tree.hd2],1,[C.col.d3,C.col.tr]));//tree2    

        Fac.push(Util.Build([assets.hat],0.3,[aa]));//hat

        Fac.push(Util.Build([assets.car.bod, assets.car.win, assets.car.ltf],1.3,[C.col.d2, aa,aa]));//car
        Fac.push(Util.Build([assets.car.bod, assets.car.win, assets.car.ltr],1.3,[C.col.d2, aa,aa]));//car

        Fac.push(Util.Build([assets.flat],1,[aa]));//flat pup

        var i =0;
        var set = [];
        for (let i = 0; i < 15; i++) {
            set.push( Util.Build([assets.tile.sol],1.5,[i]) );            
        }
        set[4] = Util.Build([assets.tile.sol,assets.tile.hol],1.5,[3,4]);
        set[5] = Util.Build([assets.tile.sol,assets.tile.cor],1.5,[3,4]);
        set[8] = Util.Build([assets.tile.sol,assets.tile.hol],1.5,[7,8]);
        set[9] = Util.Build([assets.tile.sol,assets.tile.cor],1.5,[7,8]);

        this.level = level;    
        this.scene = new MapManager(map.size, map.levels[this.level], set);
        this.assets = new ObjectPool(); 

        this.carSpawn = [];

        this.player;
        this.screen = {w:map.size.screen.width*map.size.tile.width, h:map.size.screen.height*map.size.tile.height};
        var spawn = map.levels[this.level].spawn;

        var tw = map.size.tile.width;
        var th = map.size.tile.height;
        
        this.player = new Dog(spawn.plr.x*tw, spawn.plr.y*th, C.ass.player);
        this.assets.Add(this.player);

        for (var i = 0; i < spawn.man.length; i++) {
            var d = new Man(spawn.man[i].x*tw, spawn.man[i].y*th, this.player);
            this.assets.Add(d);
        }
        for (var i = 0; i < spawn.dog.length; i++) {            
            var d = new Dog(spawn.dog[i].x*tw, spawn.dog[i].y*th, 
                Util.OneOf([C.ass.gdog,C.ass.wdog])
                , this.player);
            this.assets.Add(d);
        }

        // //mapped stumps
        for (var i = 0; i < spawn.hard.length; i++) {
            var d = new Grunt(spawn.hard[i].x*tw, spawn.hard[i].y*th, 
                Util.OneOf([Fac[C.src.t1], Fac[C.src.t2]]), C.ass.stump);
            this.assets.Add(d);
        }

        AssetUtil.CarSpawn(this.carSpawn, spawn.carl, C.ass.carl,tw);
        AssetUtil.CarSpawn(this.carSpawn, spawn.carr, C.ass.carr,tw);

        //rnd stumps
        for (var i = 0; i < 64; i++) {            
            do{
                spawn = {x:Util.RndI(0, map.levels[this.level].dim.width),
                    y:Util.RndI(0, map.levels[this.level].dim.height)};
                var t = this.scene.Content(spawn.x*tw, spawn.y*th);
                var d = this.assets.Get([C.ass.stump,C.ass.man,C.ass.wdog,C.ass.gdog,C.ass.player]);
                var dz = d.filter(l => (l.x == spawn.x*tw && l.y == spawn.y*th) );               
            }while(t > 1 || dz.length != 0);
            var d = new Grunt(spawn.x*tw, spawn.y*th, Util.OneOf([Fac[C.src.t1], Fac[C.src.t2]]), C.ass.stump);
            this.assets.Add(d);
        } 

        this.splats = [];
        this.gameState = 0;
        this.scCol = 1;
        this.count = 64;
        this.scene.ScrollTo(this.player.x, this.player.y, 1);  
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
                        this.count = 64;
                        this.gameState = 2;
                    } 
                    break; 
                case 2://game
                    for (var i = 0; i < this.carSpawn.length; i++) {
                        if(this.carSpawn[i].ready == 0){
                            var sp = Util.RndI(100, 300);
                            var a = Fac[C.src.car];
                            if(this.carSpawn[i].type == C.ass.carl)
                            {
                                sp = -sp;
                                a = Fac[C.src.car+1];
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

                            this.carSpawn[i].ready = Util.RndI(200, 400);
                        }
                        else{
                            this.carSpawn[i].ready--;
                        }
                    }
                    
                    if(this.player.death){
                        if(--this.count == 0)
                        {
                            this.gameState = 3;
                        }
                    }
                    break; 
                default:
                    break;
            }
 
            for(var e = 0; e < asses.length; e++) 
            {
                //do move
                if(this.gameState == 2){
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
                Renderer.PolySprite(
                    pt.x, 
                    pt.y, 
                    this.splats[e].src);
            }  

            for(var e = 0; e < asses.length; e++) {
                asses[e].Render(mp);
            }     

            switch (this.gameState) {
                case 0:
                    Renderer.Box(0,0,this.screen.w, this.screen.h, "rgba(0, 0, 0, "+this.scCol+")");
                    Renderer.Text("PUPPY", 260, 100, 12,1);                    
                    break;
                case 1:
                    Renderer.Text("PUPPY", 260, 100, 12,1);
                    Renderer.Text("PRESS START", 240, 300, 6,0);
                    break;
                case 2:
                    var l = asses.length;
                    Renderer.Text(""+l, 100, 100, 8,0);
                    break;
                case 3:
                    //Renderer.Box(0,0,this.screen.w, this.screen.h, "rgba(0, 0, 0, "+this.scCol+")");
                    Renderer.Text("GAME OVER", 280, 100, 8,0);                    
                    break;
                default:
                    break;
            }

            // Renderer.Text("MNOPQRSTUVWXYZ", 100, 160, 8);
            // Renderer.Text("0123456789", 100, 220, 8);
        }
    };

    window.Game = Game;
})();
