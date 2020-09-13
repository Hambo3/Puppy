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
    WhichDir: function(src, list){
        for(var i = 0; i < list.length; i++) {
            if(src == list[i].v){
                return list[i].r;
            }
        }
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
                asset.p = asset.dest.y - asset.y;                
                asset.z = Util.Arc(asset.p, step, ht);
            }
        }
        else if(asset.dy < 0){
            if(asset.y < asset.dest.y){
                asset.y = asset.dest.y;
                asset.dy = 0;
                asset.jumping = false;
                asset.z = 0;
            }else{
                asset.p = asset.y - asset.dest.y;   
                asset.z = Util.Arc(asset.p, step, ht);
            }
        }
        if(asset.dx > 0){
            if(asset.x > asset.dest.x){
                asset.x = asset.dest.x;
                asset.dx = 0;
                asset.jumping = false;
                asset.z = 0;
            }else{
                asset.p = asset.dest.x - asset.x; 
                asset.z = Util.Arc(asset.p, step, ht);
            }
        }
        else if(asset.dx < 0){
            if(asset.x < asset.dest.x){
                asset.x = asset.dest.x;
                asset.dx = 0;
                asset.jumping = false;
                asset.z = 0;
            }else{
                asset.p = asset.x - asset.dest.x; 
                asset.z = Util.Arc(asset.p, step, ht);
            }
        }
        return gameAsset.scene.Content(asset.x, asset.y);
    },
    CarSpawn: function(list, assets, type,sz){
        for (var i = 0; i < assets.length; i++) {
            list.push({ready:100, 
                x:assets[i].x*sz, 
                y:assets[i].y*sz,
                type:type});
        }  
    },
    PlaceAssets: function(qty, tw, b, width, height, map, assets, avoid, oneof, type){
        for (var i = 0; i < qty; i++) {            
            do{
                var spawn = {x:Util.RndI(b, width-b),
                    y:Util.RndI(b, height-b)};
                var t = map.Content(spawn.x*tw, spawn.y*tw);
                var d = assets.Get(avoid);
                var dz = d.filter(l => (l.x == spawn.x*tw && l.y == spawn.y*tw) );               
            }while(t > 1 || dz.length != 0);
            var d = new Grunt(spawn.x*tw, spawn.y*tw, Util.OneOf(oneof), type);
            assets.Add(d);
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
    SLerp: function(start, end, amt)
    {
        if(start>end){
            return ((start-amt) > end) ? start-amt : end;
        }
        else{
            return ((start+amt) < end) ? start+amt : end;
        }
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
    },
    OSet:function(s,d){
        if(Util.AbsDist(s,d) < (5*48)){
            return 0;
        }
        else{
            return s > d ? -1 : 1;
        }
    },
    Replies: function(r,v){
        var arr = [4,5,6,7,8,9];        
        arr.sort(() => Math.random() - 0.5);
        arr[r] = v;
        arr = arr.slice(0, 4);
        var m = [];
        for(var j=0;j<arr.length;j++){
            m.push(SP[arr[j]]);
        }
        return m;
    },
    Speaks: function(n){
        var r =[];
        for(var i=0;i<n;i++){            
            do{
                var m="";
                var l = Util.RndI(1,5);
                for(var j=0;j<l;j++){
                    m+=SP[Util.RndI(0,2)]+" ";
                }
            }while(r.includes(m));
            r.push(m);
        }
        return r;
    }
}

// a v simple object pooler
var ObjectPool = function () {
    var list = [];

    return {
        Is: function(type){
            for (var i = 0; i < list.length; i++) {
                if (list[i].enabled == false && list[i].type == type)
                {
                    return list[i];
                }
            }
            return null;
        },
        Add: function(obj){
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

