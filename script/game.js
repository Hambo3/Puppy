(function() {
    function Game(map, level) {
        Fac.push(Util.Build([Sources.pupul1(),Sources.pupu()],1.5));//up
        Fac.push(Util.Build([Sources.pupdl1(), Sources.pupd()],1.5));//down
        Fac.push(Util.Build([Sources.pupll1(),Sources.pupl()],1.5));//left
        Fac.push(Util.Build([Sources.puprl1(), Sources.pupr()],1.5));//right

        var isoTileSet = [ 
            Util.Build([Sources.tile(5)],1.5),
            Util.Build([Sources.tile(6)],1.5),            

            Factory.Tile('#F6C996',32),//path
            Factory.Tile('#F3B36E',32),
            Factory.Tile('#C0C0C0',32),//road
            Factory.Tile('#00FFFF',32),//home
            Factory.Tile('#00DBDB',32),

            Factory.Tile('#69EA5D',32),
            Factory.Tile('#61D856',32),
            Factory.Tile('#C0C0C0',32),

            Factory.Tile('#54311D',32),
            Factory.Hole(['#54311D','#744B31'],32),
            Factory.Tile('#744B31',32),

            Factory.Tile('#328DC1',32),
            Factory.Hole(['#328DC1','#4294C4'],32),
            Factory.Tile('#4294C4',32),

            Factory.Tile('#4800FF',32)
            ];  

        this.level = level;    
        this.isomode = true;
        this.scene = new MapManager(map.size, map.levels[this.level], (this.isomode) ? isoTileSet: t2d, this.isomode);
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
            Renderer.Text("MNOPQRSTUVWXYZ", 100, 160, 8);
            Renderer.Text("0123456789", 100, 220, 8);
        }
    };

    window.Game = Game;
})();
