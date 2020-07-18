(function() {
    function Game(map, level) {
        Fac.push(Util.Build([assets.pupu.leg,assets.pupu.body],1.5,[C.col.d1,C.col.d1]));//up
        Fac.push(Util.Build([assets.pupu.run,assets.pupu.body],1.5,[C.col.d1,C.col.d1]));//up run
        Fac.push(Util.Build([assets.pupd.leg,assets.pupd.body],1.5,[C.col.d1,C.col.d1]));//down
        Fac.push(Util.Build([assets.pupd.run,assets.pupd.body],1.5,[C.col.d1,C.col.d1]));//down run
        Fac.push(Util.Build([assets.pupl.leg,assets.pupl.body],1.5,[C.col.d1,C.col.d1]));//left
        Fac.push(Util.Build([assets.pupl.run,assets.pupl.body],1.5,[C.col.d1,C.col.d1]));//left run
        Fac.push(Util.Build([assets.pupr.leg,assets.pupr.body],1.5,[C.col.d1,C.col.d1]));//right
        Fac.push(Util.Build([assets.pupr.run,assets.pupr.body],1.5,[C.col.d1,C.col.d1]));//right run


        var isoTileSet = [ 
            Util.Build([assets.tile.sol],1.5,[C.col.gr]),
            Util.Build([assets.tile.sol],1.5,[C.col.gr+1]),            

            Util.Build([assets.tile.sol],1.5,[C.col.pt]),
            Util.Build([assets.tile.sol],1.5,[C.col.pt+1]), 
            Util.Build([assets.tile.sol],1.5,[C.col.rd]),
            Util.Build([assets.tile.sol],1.5,[2]),
            Util.Build([assets.tile.sol],1.5,[2]), 
            
            Util.Build([assets.tile.sol],1.5,[C.col.gr]),
            Util.Build([assets.tile.sol],1.5,[C.col.gr+1]), 
            Util.Build([assets.tile.sol],1.5,[C.col.rd]),

            Util.Build([assets.tile.sol],1.5,[C.col.hl]),
            Util.Build([assets.tile.sol,assets.tile.hol],1.5,[C.col.hl,C.col.hl+1]),    
            Util.Build([assets.tile.sol],1.5,[C.col.hl+1]),  

            Util.Build([assets.tile.sol],1.5,[C.col.wt]),
            Util.Build([assets.tile.sol,assets.tile.hol],1.5,[C.col.wt,C.col.wt+1]),    
            Util.Build([assets.tile.sol],1.5,[C.col.wt+1]),  
            
            Util.Build([assets.tile.sol],1.5,[C.col.wt+1]),
            ];  

        this.level = level;    
        this.scene = new MapManager(map.size, map.levels[this.level], isoTileSet, true);
        this.assets = new ObjectPool(); 

        this.player;
        this.screen = {w:map.size.screen.width*map.size.tile.width, h:map.size.screen.height*map.size.tile.height};
        var spawn = map.levels[this.level].features.plyrspawn;

        var tw = map.size.tile.width;
        var th = map.size.tile.height;

        this.player = new Puppy(spawn.x*tw, spawn.y*th);
        this.assets.Add(this.player);

        
        // //mapped stumps
        // for (var i = 0; i < map.levels[this.level].features.hard.length; i++) {
        //     spawn = map.levels[this.level].features.hard[i];
        //     var d = new Stump(spawn.x*tw, spawn.y*th);
        //     this.assets.Add(d);
        // }

        // //rnd stumps
        // for (var i = 0; i < 32; i++) {            
        //     do{
        //         spawn = {x:Util.RndI(0, map.levels[this.level].dim.width),
        //             y:Util.RndI(0, map.levels[this.level].dim.height)};
        //         var t = this.scene.Content(spawn.x*tw, spawn.y*th);
        //         var tl = this.scene.Content((spawn.x-1)*tw, spawn.y*th);//check for close to water 13,14,15
        //         var tr = this.scene.Content((spawn.x+1)*tw, spawn.y*th);
        //         var d = this.assets.Get([Const.actors.dood,Const.actors.stump]);
        //         var dz = d.filter(l => (l.x == spawn.x*tw && l.y == spawn.y*th) );
               
        //     }while(t > 1 || tl>12 || tr>12 || dz.length != 0);
        //     var d = new Stump(spawn.x*tw, spawn.y*th);
        //     this.assets.Add(d);
        // }  
    };

    Game.prototype = {
        Update: function(dt){
            var asses = this.assets.Get();

            for(var e = 0; e < asses.length; e++) 
            {
                //do move
                asses[e].Logic(dt);
                asses[e].Collider(asses);
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

             Renderer.Text("ABCDEFFGHIJKL", 100, 100, 8);
            // Renderer.Text("MNOPQRSTUVWXYZ", 100, 160, 8);
            // Renderer.Text("0123456789", 100, 220, 8);
        }
    };

    window.Game = Game;
})();
