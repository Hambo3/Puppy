(function() {
    function Game(map, level) {
        //puppy
        for (x of [{s:1.2,c:C.col.d1}, {s:1.5,c:C.col.d2}, {s:1.5,c:C.col.d3}]){
            Fac.push(Util.Build([assets.pupu.leg,assets.pupu.bod],x.s,[x.c,x.c]));//up
            Fac.push(Util.Build([assets.pupu.run,assets.pupu.bod],x.s,[x.c,x.c]));//up run
            Fac.push(Util.Build([assets.pupd.leg,assets.pupd.bod],x.s,[x.c,x.c]));//down
            Fac.push(Util.Build([assets.pupd.run,assets.pupd.bod],x.s,[x.c,x.c]));//down run
            Fac.push(Util.Build([assets.pupl.leg,assets.pupl.bod],x.s,[x.c,x.c]));//left
            Fac.push(Util.Build([assets.pupl.run,assets.pupl.bod],x.s,[x.c,x.c]));//left run
            Fac.push(Util.Build([assets.pupr.leg,assets.pupr.bod],x.s,[x.c,x.c]));//right
            Fac.push(Util.Build([assets.pupr.run,assets.pupr.bod],x.s,[x.c,x.c]));//right run            
        }

        //water particle
        Fac.push(Util.Build([assets.cube],0.3,[C.col.wt]));//splash

        //man
        Fac.push(Util.Build([assets.man.v.leg,assets.man.bod],1,[C.col.d1,C.col.d1]));//up
        Fac.push(Util.Build([assets.man.v.leg1,assets.man.bod],1,[C.col.d1,C.col.d1]));//up
        Fac.push(Util.Build([assets.man.v.leg2,assets.man.bod],1,[C.col.d1,C.col.d1]));//up
        Fac.push(Util.Build([assets.man.v.leg,assets.man.bod],1,[C.col.d1,C.col.d1]));//down
        Fac.push(Util.Build([assets.man.v.leg1,assets.man.bod],1,[C.col.d1,C.col.d1]));//down
        Fac.push(Util.Build([assets.man.v.leg2,assets.man.bod],1,[C.col.d1,C.col.d1]));//down        
        Fac.push(Util.Build([assets.man.h.leg,assets.man.bod],1,[C.col.d1,C.col.d1]));//left
        Fac.push(Util.Build([assets.man.h.leg1,assets.man.bod],1,[C.col.d1,C.col.d1]));//left
        Fac.push(Util.Build([assets.man.h.leg2,assets.man.bod],1,[C.col.d1,C.col.d1]));//left
        Fac.push(Util.Build([assets.man.h.leg,assets.man.bod],1,[C.col.d1,C.col.d1]));//right
        Fac.push(Util.Build([assets.man.h.leg1,assets.man.bod],1,[C.col.d1,C.col.d1]));//right
        Fac.push(Util.Build([assets.man.h.leg2,assets.man.bod],1,[C.col.d1,C.col.d1]));//right    

        //tree
        Fac.push(Util.Build([assets.tree.bod,assets.tree.hd1],1,[C.col.d1,C.col.d1]));//tree1    
        Fac.push(Util.Build([assets.tree.bod,assets.tree.hd2],1,[C.col.d1,C.col.d1]));//tree2    

        var i =0;
        var set = [];
        for (let i = 0; i < 15; i++) {
            set.push( Util.Build([assets.tile.sol],1.5,[i]) );            
        }
        set[4] = Util.Build([assets.tile.sol,assets.tile.hol],1.5,[3,4]);
        set[5] = Util.Build([assets.tile.sol,assets.tile.cor],1.5,[3,4]);
        set[8] = Util.Build([assets.tile.sol,assets.tile.hol],1.5,[7,8]);
        set[9] = Util.Build([assets.tile.sol,assets.tile.cor],1.5,[7,8]);

            // Util.Build([assets.tile.sol],1.5,[i++]),
            // Util.Build([assets.tile.sol],1.5,[i++]),            

            // Util.Build([assets.tile.sol],1.5,[i++]),
            // Util.Build([assets.tile.sol],1.5,[i++]), 
            // Util.Build([assets.tile.sol],1.5,[i++]),
            // Util.Build([assets.tile.sol],1.5,[2]),
            // Util.Build([assets.tile.sol],1.5,[2]), 
            
            // Util.Build([assets.tile.sol],1.5,[C.col.gr]),
            // Util.Build([assets.tile.sol],1.5,[C.col.gr+1]), 
            // Util.Build([assets.tile.sol],1.5,[C.col.rd]),

            // Util.Build([assets.tile.sol],1.5,[C.col.hl]),
            // Util.Build([assets.tile.sol,assets.tile.hol],1.5,[C.col.hl,C.col.hl+1]),    
            // Util.Build([assets.tile.sol],1.5,[C.col.hl+1]),  

            // Util.Build([assets.tile.sol],1.5,[C.col.wt]),
            // Util.Build([assets.tile.sol,assets.tile.hol],1.5,[C.col.wt,C.col.wt+1]),    
            // Util.Build([assets.tile.sol],1.5,[C.col.wt+1]),  
            
            // Util.Build([assets.tile.sol],1.5,[C.col.wt+1]),
            // ];  

        this.level = level;    
        this.scene = new MapManager(map.size, map.levels[this.level], set);
        this.assets = new ObjectPool(); 

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

        //rnd stumps
        for (var i = 0; i < 0; i++) {            
            do{
                spawn = {x:Util.RndI(0, map.levels[this.level].dim.width),
                    y:Util.RndI(0, map.levels[this.level].dim.height)};
                var t = this.scene.Content(spawn.x*tw, spawn.y*th);
                var d = this.assets.Get([C.ass.null]);
                var dz = d.filter(l => (l.x == spawn.x*tw && l.y == spawn.y*th) );               
            }while(t > 1 || dz.length != 0);
            var d = new Grunt(spawn.x*tw, spawn.y*th, Util.OneOf([Fac[C.src.t1], Fac[C.src.t2]]), C.ass.stump);
            this.assets.Add(d);
        } 

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
                case 2:
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

            for(var e = 0; e < asses.length; e++) {
                asses[e].Render(mp);
            }     

            switch (this.gameState) {
                case 0:
                    Renderer.Box(0,0,this.screen.w, this.screen.h, "rgba(0, 0, 0, "+this.scCol+")");
                    Renderer.Text("PUPPY", 260, 100, 12);                    
                    break;
                case 1:
                    Renderer.Text("PUPPY", 260, 100, 12);
                    Renderer.Text("PRESS START", 240, 300, 6);
                    break;
                case 3:
                    //Renderer.Box(0,0,this.screen.w, this.screen.h, "rgba(0, 0, 0, "+this.scCol+")");
                    Renderer.Text("GAME OVER", 280, 100, 8);                    
                    break;
                default:
                    break;
            }

            // Renderer.Text("ABCDEFFGHIJKL", 100, 100, 8);
            // Renderer.Text("MNOPQRSTUVWXYZ", 100, 160, 8);
            // Renderer.Text("0123456789", 100, 220, 8);
        }
    };

    window.Game = Game;
})();
