//handles loading and keeps track of all graphics
//performs all rendering operations
var Rendering = function (context, screen, border) {
    var ctx = context;
    var scale = 1;
    var bounds = null;
    
    if(screen)
    {
        bounds ={
            minx:0, 
            maxx:screen.w, 
            miny:0,
            maxy:screen.h};
    
        if(border){
            bounds.minx -= border.x1,
            bounds.maxx += border.x2,
            bounds.miny -= border.y1,
            bounds.maxy += border.y2
        };    
    }

    function PT(p,s){
        return Math.round(p*(s||scale));
    }
    function polygon(x, y, poly){
        for(var i = 0; i < poly.length; i++) 
        {
            side(x, y, poly[i]);
        } 
    }

    function side(x, y, plane){
        ctx.fillStyle = plane.col;
        ctx.beginPath();
        ctx.moveTo(PT(plane.pt[0].x + x), PT(plane.pt[0].y + y));

        for(var p = 1; p < plane.pt.length; p++) {
            ctx.lineTo(PT(plane.pt[p].x + x), PT(plane.pt[p].y + y) );   
        }
        ctx.closePath();
        ctx.fill();
    }

     function gray(p) {
        var d = p.data;
        for (var i=0; i<d.length; i+=4) {
          var r = d[i],g = d[i+1],b = d[i+2];
          var v = 0.2126*r + 0.7152*g + 0.0722*b;
          d[i] = d[i+1] = d[i+2] = v
        }
        return p;
      }

    //assumes upper
    function txt(str, xs, ys, size, sc, col) {

        ctx.fillStyle = col || '#000000';
        cr = xs;

        for (i = 0; i < str.length; i++) {
            xp = 0;
            yp = 0;
            mx = 0; 

            c = str.charAt(i);                     
            if(c == '+')
            {
                ys += (size*8);
                xs=cr;
            }
            else
            {
                l = FONT[str.charAt(i)];
                if(l){
                    for (var r = 0; r < l.length; r++) 
                    {                
                        xp = 0;
                        row = l[r];
                        for (var c = 0; c < row.length; c++) 
                        {                    
                            szx = (sc && c==row.length-1) ? size*2 : size;
                            szy = (sc && r==l.length-1) ? size*2 : size;
                            if (row[c]) {
                                ctx.fillRect(PT(xp + xs,1), PT(yp + ys,1), szx, szy);
                            }
                            xp += szx;
                        }
                        mx = xp>mx ? xp : mx;
                        yp += szy;
                    }
                    xs += mx + size; 
                }
            }
        }
    }

    return {
        Get:function(x,y, w,h){
            return ctx.getImageData(x, y, w, h);
        },
        Put:function(data, x, y){
            ctx.putImageData(gray(data), x, y);
        },
        Set:function(n){
            scale = n;
        },
        Box: function(x,y,w,h,c){
            ctx.fillStyle = c || '#000000';
            ctx.fillRect(x, y, w, h);
        },
        PolyTile: function(x, y, plane){
            if(!bounds || ((x > bounds.minx && x < bounds.maxx) && (y > bounds.miny  && y < bounds.maxy)) ) {
                side(x, y, plane);
                return 1;
            }
            return 0;
        },
        PolySprite: function(x, y, poly){
            if(poly && (!bounds || ((x > bounds.minx && x < bounds.maxx) && (y > bounds.miny  && y < bounds.maxy))) )
            {  
                polygon(x, y, poly);    
                return 1;
            }
            return 0;
        },   
        Text: function(text, x, y, size, sc, col){
            txt(text, x, y, size, sc, col);
        }
    }
};