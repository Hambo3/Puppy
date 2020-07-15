var Fac = [];

var C = {
    col:{
        d1:9
    },   
    ass:{
        null:0,
        player:1,
        dood:2,
        carhr:3,
        carhl:4,
        carvu:5,
        carvd:6,
        drone:7,
        stump:8,
        log:9
    },
    act:{
        up:0,
        dn:2,
        lt:4,
        rt:6,
        fall:4,
        splash:5,
        squash:6,
        waveup:7,
        wavedown:8,
        waveleft:9,
        waveright:10
    }
}

//pallette
var PAL = [
    'rgba(100, 100, 100, 0.6)',
    "#000000",
    "#FFFFFF",
    "#C8C8C8",
    "#aaaaaa",

    "#F6C996",
    "#F3B36E",
    "#C0C0C0",
    "#00FFFF",

    "#915c2a",//d1
    "#84501e",
    "#7c4714",    
    "#6e3d0a",

    "#4ab230", //green
    "#368122",
    "#225216",

    "#915c2a",//brown
    "#84501e",
    "#6e3d0a",

    "#ffad6d",//face
    "#ee7f52",

    "#6bb8c8", //blue
    "#2b8596",
    "#e668e3", //prple
    "#9930a7"
    ];
    

var Sources ={
    tile:function(c){
        return [c,[-11,-15,21,-7.83,10.75,14.56,-21.24,7.4]];
    },
    pupu:function(){
        return[
            3,[14,-14,15,-16,15,-25,14,-23],0,[14,-23,12,-24,13,-26,15,-25],3,[10,-6,14,-14,14,-29,10,-21],2,[10,-6,-7,-10,-7,-25,10,-21],0,[10,-21,-7,-25,-3,-33,14,-29],3,[3,7,10,-8,10,-17,3,-2],1,[3,-2,-14,-6,-7,-20,10,-16.8],2,[3,7,-14,3,-14,-6,3,-2],3,[-3,-3,-2,-5.8,-2,-8.2,-3,-6.6],2,[-3,-3,-6,-4,-6,-7,-3,-6.3],0,[-3,-6.3,-5.8,-7,-4.3,-9,-2,-8.4]
        ];
    },
    pupul1: function(){
        return [
            3,[8,3,10,-1,10,-8,8,-4],2,[8,3,5,2,5,-5,8,-4],3,[3,13,5,9,5,2,3,6],2,[3,13,0,12,0,5,3,6],3,[-11,10,-9,6,-9,-1,-11,3],2,[-11,10,-14,9,-14,2,-11,3]
        ];
    },
    pupul2:function(){
        return[
            2,[10,1,15,-15,9,-15,6,0],3,[10,1,10,-9,12,-14,12,-8,15,-15,15,-10],3,[1,15,5,7,5,2,1,10],1,[1,15,-4,14,-4,10,-1,5,3,6,1,10],3,[-11,12,-6,3,-7,0,-11,8],1,[-11,12,-16,11,-16,7,-14,3,-8,2,-11,8]
        ];
    },
    pupd:function(){
        return[
            3,[6,0,13,-15,13,-24,6,-9],1,[6,-9,-10,-13,-3,-27,13,-23.8],3,[2,10,6,2,6,-13,2,-5],2,[2,10,-15,6,-15,-9,2,-5],0,[2,-5,-15,-9,-11,-17,6,-13],3,[1,11,2,10,2,0,1,2],1,[1,11,-16,7,-16,-2,1,2],0,[1,2,-16,-2,-15,-4,2,0],3,[5,-22,6,-24.8,6,-27.2,5,-25.6],2,[5,-22,2,-23,2,-26,5,-25.3],0,[5,-25.3,2.2,-26,3.7,-28,6,-27.4]
        ];
    },
    pupdl1: function(){
        return [
            3,[11,-4,13,-8,13,-15,11,-11],2,[11,-4,8,-5,8,-12,11,-11],3,[6,6,8,2,8,-5,6,-1],2,[6,6,3,5,3,-2,6,-1]
        ];
    },
    pupdl2: function(){
        return [
            2,[11,-5,16,-22,12,-23,8,-6],3,[11,-5,11,-11,16,-22,16,-16],2,[-1,10,4,12,7,2,2,-2],3,[4,12,4,7,6,3,6,-2,8,-8,8,3]
        ];
    },
    pupr: function(){
        return [
            2,[5,0,-18,-5,-18,-14,5,-9],1,[5,-8.9,-18,-13.9,-13,-23,10,-18],3,[11,4,16,-7,16,-21.3,11,-10.2],2,[11,4,2,2,2,-12,11,-10],0,[11,-10,2,-12,8,-23,16,-21],3,[13,4,18,-7,18,-15,13,-5],2,[13,4,11,4,11,-5,13,-4.7],1,[13,-4.6,11,-5,16,-15,18,-14.7],3,[-13,-16,-12,-18,-12,-21,-13,-19],2,[-13,-16.1,-16,-17,-16,-20,-13,-19.1],0,[-13,-19.2,-16,-20,-15,-22,-12,-21.1]
        ];
    },
    puprl1: function(){
        return [
            3,[-14,3,-12,-2,-12,-7,-14,-4],2,[-14,3,-18,2,-18,-6,-14,-5],3,[1,7,3,2,3,-3,1,-2],2,[1,7,-3,6,-3,-3,1,-2] 
        ];
    },
    puprl2: function(){
        return [
            0,[-20,-15,-18,-18,-12,-16,-13,-13],3,[-15,-10,-20,-11,-20,-15,-15,-14],1,[-24,-7,-22,-10,-13,-8,-11,-6,-14,-1,-14,-5],2,[-14,-1,-24,-3,-24,-7,-14,-5],3,[7,7,10,2,-1,-5,-1,2],2,[7,7,-3,5,-3,-3,1,-2,1,2,7,3]
        ];
    },
    pupl: function(){
        return [
            2,[-19,-3,-21,-3.7,-21,-12,-19,-11.7],0,[-19,-11.6,-21,-12,-16,-22,-14,-21.7],3,[-10,-1,-5,-12,-5,-26.3,-10,-15.2],2,[-10,-1,-19,-3,-19,-17,-10,-15],0,[-10,-15,-19,-17,-13,-28,-5,-26],2,[13,3,-10,-2,-10,-11,13,-6],1,[13.2,-5.9,-10,-10.9,-5,-20,18,-15],3,[13,3,18,-8,18,-15,13,-5.1],3,[15,-8,16,-10,16,-13,15,-11],2,[15,-8.1,12,-9,12,-12,15,-11.1],0,[15,-11.2,12,-12,13,-14,16,-13.1]
        ];
    },
    pupll1:function(){
        return [
            3,[-5,6,-3,1,-3,-4,-5,-1],2,[-5,6,-9,5,-9,-3,-5,-2],3,[16,2,18,-3,18,-8,16,-5],2,[16,2,12,1,12,-7,16,-6],3,[13,10,15,5,15,-4,13,1],2,[13,10,9,9,9,0,13,1]
        ]
    },
    pupll2: function(){
        return [
            3,[-5,5,-2,-1,-14,-6,-16,-2],2,[-5,5,-16,2,-16,-2,-9,0,-9,-3,-5,-2],3,[22,1,24,-3,24,-7,14,-9,14,-6,22,-4],2,[22,1,15,-1,15,-6,22,-4],3,[18,9,20,5,20,1,11,-1,8,2,18,4],2,[18,9,8,7,8,2,18,4]
        ]
    }
}