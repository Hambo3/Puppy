var AssetUtil = {
    Dir: function(perp, prot){
        var inp = {
            up: false,
            down: false,
            left: false,
            right: false,
            d:0
        };
        var distx = Util.AbsDist( perp.x, prot.x);
        var disty = Util.AbsDist( perp.y, prot.y);
        inp.d = Util.PDist(distx, disty);
        if(distx > disty){
            if(perp.x > prot.x){
                inp.right = true;
            }
            else if(perp.x < prot.x){
                inp.left = true;      
            }
        }else{
            if(perp.y > prot.y){
                inp.down = true;           
            }
            else if(perp.y < prot.y){
                inp.up = true;
            }
        }
        return inp;
    },
    RectHit: function (prot, perp){ //if 2 rects overlap
        prot.x -= (prot.width/2);
        prot.y -= (prot.length/2);
        perp.x -= (perp.width/2);
        perp.y -= (perp.length/2);
        return (prot.x < perp.x + perp.width &&
            prot.x + prot.width > perp.x &&
            prot.y < perp.y + perp.length &&
            prot.length + prot.y > perp.y);
    },    
    Collisions: function(prot, perps, dest){

        for(var i = 0; i < perps.length; i++) {
            if(prot != perps[i]){
                var p = {x:(dest) ? prot.dest.x : prot.x, y:(dest) ? prot.dest.y : prot.y, width: prot.width, length: prot.length};
                var e = {
                    x:perps[i].x, 
                    y:perps[i].y, 
                    width: perps[i].width, 
                    length: perps[i].length};

                if(AssetUtil.RectHit(p, e)){
                    return perps[i];
                }
            }
        }            

        return null;
    },
    InputLogic: function(inp, prop, speed, step){
        var x = prop.x;
        var y = prop.y;
        var dx = prop.dx;
        var dy = prop.dy;

        if( inp.up ) {
            dy = -speed;
            y = prop.y - step;
            prop.action = C.act.up;
        }
        else if(inp.down) {
            dy = speed;
            y = prop.y + step;
            prop.action = C.act.dn;
        }    
        else if(inp.left) {
            dx = -speed;
            x = prop.x - step;
            prop.action = C.act.lt;
        }
        else if(inp.right) {
            dx = speed;
            x = prop.x + step;
            prop.action = C.act.rt;
        } 

        if(x != prop.x || y != prop.y){
            var c = gameAsset.scene.Content(x, y); //check for obstructions
            if(map.colliders.hit.indexOf(c) == -1){  
                prop.dest.x = x;
                prop.dest.y = y;
                prop.dx = dx;
                prop.dy = dy;
                prop.jumping = true;
            }
        }
    },
    HopLogic: function(asset, step, ht){
        if(asset.dy > 0){
            if(asset.y > asset.dest.y){
                asset.y = asset.dest.y;
                asset.dy = 0;
                asset.jumping = false;
                asset.z = 0;
            }else{
                asset.z = Util.Arc(asset.dest.y - asset.y, step, ht);
            }
        }
        else if(asset.dy < 0){
            if(asset.y < asset.dest.y){
                asset.y = asset.dest.y;
                asset.dy = 0;
                asset.jumping = false;
                asset.z = 0;
            }else{
                asset.z = Util.Arc(asset.y - asset.dest.y, step, ht);
            }
        }
        if(asset.dx > 0){
            if(asset.x > asset.dest.x){
                asset.x = asset.dest.x;
                asset.dx = 0;
                asset.jumping = false;
                asset.z = 0;
            }else{
                asset.z = Util.Arc(asset.dest.x - asset.x, step, ht);
            }
        }
        else if(asset.dx < 0){
            if(asset.x < asset.dest.x){
                asset.x = asset.dest.x;
                asset.dx = 0;
                asset.jumping = false;
                asset.z = 0;
            }else{
                asset.z = Util.Arc(asset.x - asset.dest.x, step, ht);
            }
        }
        return gameAsset.scene.Content(asset.x, asset.y);
    },
    CarSpawn: function(list, assets, type, tw, th){
        for (var i = 0; i < assets.length; i++) {
            list.push({ready:100, 
                x:assets[i].x*tw, 
                y:assets[i].y*th,
                type:type});
        }  
    }
}


var Util = {
    OneIn: function(c){
        return Util.RndI(0,c)==0;
    },
    OneOf: function(arr){
        return arr[Util.RndI(0,arr.length)];
    },
    //int min to max-1
    RndI: function (min, max){
        return parseInt(Math.random() * (max-min)) + min;
    },
    Rnd: function (max){
        return Math.random() * max;
    },     
    Lerp: function(start, end, amt)
    {
        return (end-start) * amt+start;
    },
    AbsDist: function(p1, p2){
        return Math.abs( p1 - p2);
    },   
    Dist: function(x1,y1,x2,y2){
        var x = x2 - x1, y = y2 - y1;
        return Util.PDist(x, y);
    },
    PDist: function(x, y){        
        return Math.sqrt(x*x + y*y);
    },
    IsoPoint: function(x, y)
    {
        return {x: x - (y * 0.32), y: (y + (x * 0.32))*0.7};
    },
    Arc: function(i, items, radius)
    {
        return (radius * Math.sin( Math.PI * i / items));
    },
    Build:function(src, scl,c){
        var b = [];
        scl=scl||1;
        for (var f = 0; f < src.length; f++){
            for (var i = 0; i < src[f].length; i+=2){
                var pts = [];
                for (var p = 0; p < src[f][i+1].length; p+=2){
                    pts.push({x: src[f][i+1][p]*scl, y:src[f][i+1][p+1]*scl})
                }
                var n = (c)?c[f]||0 :0;
                b.push({col:PAL[src[f][i]+n], pt: pts});
            }
        }
        return b;
    }
}

// a v simple object pooler
var ObjectPool = function () {
    var list = [];

    return {
        Add: function(obj){
            for (var i = 0; i < list.length; i++) {
                if (list[i].enabled == false && list[i].type == obj.type)
                {
                    list[i] = obj;
                    return list[i];
                }
            }
            list.push(obj);         
        },
        Get: function(type){
            if(type){
                return list.filter(l => l.enabled && type.indexOf(l.type) != -1)
            }else{
                return list.filter(l => l.enabled);
            }

        },
        Count: function(all){
            return (all) ? list : list.filter(l => l.enabled).length;
        }      
    }
};

