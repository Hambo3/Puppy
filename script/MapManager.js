//handles map rendering and collisons
var MapManager = function (mapdim, mapdata, set) {
    var mapSize = mapdim;
    var map = unpack(mapdata.data);
    var mapWidth = mapdata.dim.width;
    var mapHeight = mapdata.dim.height;
    var offset = {x:-64,y:-270};
    var scroll = {x:0, y:0,
        xoffset:0,yoffset:0};
    var tileSize = mapSize.tile.width;

    var tileset = set;

    function unpack(zip){
        var map = [];
        var v, pts;
        var sec = zip.split("|");
        for(var i = 0; i < sec.length; i++){
            pts= sec[i].split(",");
            v = parseInt(pts[0]);
            map.push(v);
            if(pts.length > 1){                
                for(var p = 1; p < pts[1]; p++){
                    map.push(v);
                }
            }
        }
        var s = "";
        for (var i = 0; i < map.length; i++) {
            s+=map[i]+","           
        }

        return map;
    }
    function hpoint(p, w){
        return Math.floor(p / w);
    }		
    function vpoint(p, h){
        return Math.floor(p / h);
    }
    function cell(x, y){
        var h = hpoint(x, tileSize);
        var v = vpoint(y, tileSize);
        var p = h + (v * mapWidth);
        return p;
    }
    function content(x,y){
        var cp = map[cell(x, y)];
        return cp;
    }               
    function render(level) {
        var m = 0;
        var p;

        var mcols = mapWidth;

        var col = mapSize.iso.width;
        var row = mapSize.iso.height;

        var tc=0;
        for(var r = 0; r < row; r++) 
        {
            for(var c = 0; c < col; c++) 
            {
                m = ((r+scroll.yoffset) * mcols) + (c+scroll.xoffset);
                p = map[m];
                var pt = Util.IsoPoint( (c * tileSize) + scroll.x + offset.x, 
                    (r * tileSize) + scroll.y + offset.y);                     
                  
                if(tileset[p].length){
                    tc+=R.PolySprite(
                        pt.x, 
                        pt.y, 
                        tileset[p]); 
                }
                else{
                    tc+=R.PolyTile(
                        pt.x, 
                        pt.y, 
                        tileset[p]);  
                }
             }
        }
    }

    return {  
        Set:function(z){
            offset = (z) ? {x:-323,y:-431} :{x:-64,y:-270}
        },
        Content: function (x, y) {
            return content(x, y);
        },  
        ScrollOffset: function () {
            return {x:(scroll.xoffset*tileSize)-scroll.x-offset.x,
                y:(scroll.yoffset*tileSize)-scroll.y-offset.y};
        }, 
        ScrollTo: function(x, y, r){
            var midx = ( mapSize.iso.width*tileSize) / 2;
            var midy = ( mapSize.iso.height*tileSize) / 2;
            var maxx = (mapWidth * tileSize) - ( mapSize.iso.width*tileSize);
            var maxy = (mapHeight * tileSize) - ( mapSize.iso.height*tileSize);

            var cpx = (scroll.xoffset*tileSize)-scroll.x;
            var cpy = (scroll.yoffset*tileSize)-scroll.y;
            var destx = Util.Lerp(cpx, (x-midx), r||0.04);
            var desty = Util.Lerp(cpy, (y-midy), r||0.04);

            if(destx > 0 && destx < maxx)
            {
                scroll.x = -destx % tileSize;
                scroll.xoffset = parseInt(destx / tileSize);
            }
            if(desty > 0 && desty < maxy)
            {
                scroll.y = -desty % tileSize;
                scroll.yoffset = parseInt(desty / tileSize);
            }

        },     
        Render: function () {
            render();            
        }
    }
};