var Fac = [];

var C = {
    col:{
        sw:15,
        d1:18,
        d2:22,
        d3:26,
        wt:8
    },   
    ass:{
        null:0,
        player:1,
        gdog:2,
        wdog:3,        
        man:4,
        stump:5,
        treat:6,
        toy:7
    },
    src:{
        up:0,
        dn:2,
        lt:4,
        rt:6,
        spl:24,
        mup:25,
        mdn:28,
        mlt:31,
        mrt:34,
        t1:37,
        t2:38
    },
    act:{
        up:0,
        dn:1,
        lt:2,
        rt:3,
        fl:4,
        sp:5,
        sq:6,
        cb:8
    }
}

// "#BC5643",
// "#AD4E40",
// "#914135",
// "#77362B",

//pallette
var PAL = [
"#69EA5D",
"#61D856",
"#C0C0C0",

"#BC5643",
"#77362B",
"#77362B",
"#77362B",

"#3EB1EF",
"#328FC1",
"#328FC1",
"#328FC1",

"#FF2BE2",
"#FF00DC",
"#FF49E6",
"#4800FF",
'rgba(100, 100, 100, 0.6)',
"#000000",
"#FFFFFF",
"#c66f39",//d1
"#c46b36",
"#c16a35",    
"#a15a2e",
"#626466",//d2
"#5f6163",
"#5e6062",
"#4e4f51",
"#81544e",//d3
"#7e524c",
"#734b44",
"#64413b"
];
    
var assets ={
    pupu:{
        bod:[3,[14,-14,15,-16,15,-25,14,-23],0,[14,-23,12,-24,13,-26,15,-25],3,[10,-6,14,-14,14,-29,10,-21],2,[10,-6,-7,-10,-7,-25,10,-21],0,[10,-21,-7,-25,-3,-33,14,-29],3,[3,7,10,-8,10,-17,3,-2],1,[3,-2,-14,-6,-7,-20,10,-16.8],2,[3,7,-14,3,-14,-6,3,-2],3,[-3,-3,-2,-5.8,-2,-8.2,-3,-6.6],2,[-3,-3,-6,-4,-6,-7,-3,-6.3],0,[-3,-6.3,-5.8,-7,-4.3,-9,-2,-8.4]],
        leg:[3,[8,3,10,-1,10,-8,8,-4],2,[8,3,5,2,5,-5,8,-4],3,[3,13,5,9,5,2,3,6],2,[3,13,0,12,0,5,3,6],3,[-11,10,-9,6,-9,-1,-11,3],2,[-11,10,-14,9,-14,2,-11,3]],
        run:[2,[10,1,15,-15,9,-15,6,0],3,[10,1,10,-9,12,-14,12,-8,15,-15,15,-10],3,[1,15,5,7,5,2,1,10],1,[1,15,-4,14,-4,10,-1,5,3,6,1,10],3,[-11,12,-6,3,-7,0,-11,8],1,[-11,12,-16,11,-16,7,-14,3,-8,2,-11,8]]
    },
    pupd:{
        bod:[3,[6,0,13,-15,13,-24,6,-9],1,[6,-9,-10,-13,-3,-27,13,-23.8],3,[2,10,6,2,6,-13,2,-5],2,[2,10,-15,6,-15,-9,2,-5],0,[2,-5,-15,-9,-11,-17,6,-13],3,[1,11,2,10,2,0,1,2],1,[1,11,-16,7,-16,-2,1,2],0,[1,2,-16,-2,-15,-4,2,0],3,[5,-22,6,-24.8,6,-27.2,5,-25.6],2,[5,-22,2,-23,2,-26,5,-25.3],0,[5,-25.3,2.2,-26,3.7,-28,6,-27.4]],
        leg:[3,[11,-4,13,-8,13,-15,11,-11],2,[11,-4,8,-5,8,-12,11,-11],3,[6,6,8,2,8,-5,6,-1],2,[6,6,3,5,3,-2,6,-1]],
        run:[2,[11,-5,16,-22,12,-23,8,-6],3,[11,-5,11,-11,16,-22,16,-16],2,[-1,10,4,12,7,2,2,-2],3,[4,12,4,7,6,3,6,-2,8,-8,8,3]]
    },
    pupl:{
        bod:[2,[-19,-3,-21,-3.7,-21,-12,-19,-11.7],0,[-19,-11.6,-21,-12,-16,-22,-14,-21.7],3,[-10,-1,-5,-12,-5,-26.3,-10,-15.2],2,[-10,-1,-19,-3,-19,-17,-10,-15],0,[-10,-15,-19,-17,-13,-28,-5,-26],2,[13,3,-10,-2,-10,-11,13,-6],1,[13.2,-5.9,-10,-10.9,-5,-20,18,-15],3,[13,3,18,-8,18,-15,13,-5.1],3,[15,-8,16,-10,16,-13,15,-11],2,[15,-8.1,12,-9,12,-12,15,-11.1],0,[15,-11.2,12,-12,13,-14,16,-13.1]],
        leg:[3,[-5,6,-3,1,-3,-4,-5,-1],2,[-5,6,-9,5,-9,-3,-5,-2],3,[16,2,18,-3,18,-8,16,-5],2,[16,2,12,1,12,-7,16,-6],3,[13,10,15,5,15,-4,13,1],2,[13,10,9,9,9,0,13,1]],
        run:[3,[-5,5,-2,-1,-14,-6,-16,-2],2,[-5,5,-16,2,-16,-2,-9,0,-9,-3,-5,-2],3,[22,1,24,-3,24,-7,14,-9,14,-6,22,-4],2,[22,1,15,-1,15,-6,22,-4],3,[18,9,20,5,20,1,11,-1,8,2,18,4],2,[18,9,8,7,8,2,18,4]]
    },
    pupr:{
        bod:[2,[5,0,-18,-5,-18,-14,5,-9],1,[5,-8.9,-18,-13.9,-13,-23,10,-18],3,[11,4,16,-7,16,-21.3,11,-10.2],2,[11,4,2,2,2,-12,11,-10],0,[11,-10,2,-12,8,-23,16,-21],3,[13,4,18,-7,18,-15,13,-5],2,[13,4,11,4,11,-5,13,-4.7],1,[13,-4.6,11,-5,16,-15,18,-14.7],3,[-13,-16,-12,-18,-12,-21,-13,-19],2,[-13,-16.1,-16,-17,-16,-20,-13,-19.1],0,[-13,-19.2,-16,-20,-15,-22,-12,-21.1]],
        leg:[3,[-14,3,-12,-2,-12,-7,-14,-4],2,[-14,3,-18,2,-18,-6,-14,-5],3,[1,7,3,2,3,-3,1,-2],2,[1,7,-3,6,-3,-3,1,-2]],
        run:[0,[-20,-15,-18,-18,-12,-16,-13,-13],3,[-15,-10,-20,-11,-20,-15,-15,-14],1,[-24,-7,-22,-10,-13,-8,-11,-6,-14,-1,-14,-5],2,[-14,-1,-24,-3,-24,-7,-14,-5],3,[7,7,10,2,-1,-5,-1,2],2,[7,7,-3,5,-3,-3,1,-2,1,2,7,3]]
    },
    man:{
        bod:[3,[11,-2,21,-25,21,-44,11,-21],2,[11,-2,-21,-9,-21,-28,11,-21],3,[11,-21,21,-44,21,-63,11,-40],2,[11,-21,-21,-28,-21,-47,11,-40],1,[11,-40,-21,-47,-9,-70,21,-63]],
        v:{            
            leg:[0,[-8,4,-3,-6,-3,-24,-8,-14],1,[-8,4,-17,2,-17,-14,-8,-13],0,[12,8,17,-2,17,-20,12,-10],1,[12,8,3,6,3,-10,12,-9]],
            leg1:[0,[-11,9,-6,-1,-6,-19,-11,-9],1,[-11,9,-20,7,-20,-9,-11,-8],0,[15,2,20,-8,20,-26,15,-16],1,[15,2,6,0,6,-16,15,-15]],
            leg2:[0,[-7,-2,-2,-12,-2,-30,-7,-20],1,[-7,-2,-16,-4,-16,-20,-7,-19],0,[10,13,15,3,15,-15,10,-5],1,[10,13,1,11,1,-5,10,-4]]
            },
        h:{            
            leg:[0,[7,-1,12,-11,12,-29,7,-19],1,[7,-1,-2,-3,-2,-19,7,-18],0,[1,11,5,3,5,-11,1,-7],1,[1,11,-11,8,-11,-7,1,-5]],
            leg1:[0,[15,0,19,-8,19,-26,15,-16],1,[15,0,5,-2,5,-18,15,-17],0,[-8,9,-4,1,-4,-13,-8,-9],1,[-8,9,-20,6,-20,-9,-8,-7]],
            leg2:[0,[-4,-3,0,-11,0,-29,-4,-19],1,[-4,-3,-14,-5,-14,-21,-4,-20],0,[10,13,14,5,14,-9,10,-5],1,[10,13,-2,10,-2,-5,10,-3]]
            }
    },
    tree:
    {
        bod:[3,[7,8,13,-5,13,-38,7,-26],2,[7,8,-12,4,-12,-30,7,-26]],
        hd1:[3,[11,-6,21,-29,21,-57,11,-35],2,[11,-6,-21,-13,-21,-41,11,-34],0,[11,-34,-21,-41,-9,-64,21,-57]],
        hd2:[3,[21,-15,41,-60,41,-69,21,-25],2,[21,-15,-42,-29,-42,-39,21,-25],0,[21,-25,-42,-39,-22,-82,41,-69],3,[11,-38,21,-61,21,-72,11,-49],2,[11,-38,-21,-45,-21,-56,11,-49],0,[11,-49,-21,-56,-10,-79,21,-72]]
    },
    tile:{
        sol:[0,[-11,-15,21.4,-7.7,11.0,15.4,-21.4,7.9]],
        hol:[0,[-11,-15,-20.9,7.9,-11.3,10.1]],
        cor:[0,[-1.2,-12.6,-11,-14.6,-21.3,7.6,-1.2,11.7]]
    },
    cube:[2,[11,15,21,-8,21,-27,11,-4],1,[11,15,-21,8,-21,-11,11,-4],0,[11,-4,-21,-11,-9,-34,21,-27]]
};


var FONT = {
    'A': [
        [, 1],
        [1, , 1],
        [1, 1, 1],
        [1, , 1],
        [1, , 1]
    ],
    'B': [
        [1, 1],
        [1, , 1],
        [1, 1, 1],
        [1, , 1],
        [1, 1]
    ],
    'C': [
        [1, 1, 1],
        [1],
        [1],
        [1],
        [1, 1, 1]
    ],
    'D': [
        [1, 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1]
    ],
    'E': [
        [1, 1, 1],
        [1],
        [1, 1, 1],
        [1],
        [1, 1, 1]
    ],
    'F': [
        [1, 1, 1],
        [1],
        [1, 1],
        [1],
        [1]
    ],
    'G': [
        [, 1, 1],
        [1],
        [1, , 1, 1],
        [1, , , 1],
        [, 1, 1]
    ],
    'H': [
        [1, , 1],
        [1, , 1],
        [1, 1, 1],
        [1, , 1],
        [1, , 1]
    ],
    'I': [
        [1, 1, 1],
        [, 1],
        [, 1],
        [, 1],
        [1, 1, 1]
    ],
    'J': [
        [1, 1, 1],
        [, , 1],
        [, , 1],
        [1, , 1],
        [1, 1, 1]
    ],
    'K': [
        [1, , , 1],
        [1, , 1],
        [1, 1],
        [1, , 1],
        [1, , , 1]
    ],
    'L': [
        [1],
        [1],
        [1],
        [1],
        [1, 1, 1]
    ],
    'M': [
        [1, 1, 1, 1, 1],
        [1, , 1, , 1],
        [1, , 1, , 1],
        [1, , , , 1],
        [1, , , , 1]
    ],
    'N': [
        [1, , , 1],
        [1, 1, , 1],
        [1, , 1, 1],
        [1, , , 1],
        [1, , , 1]
    ],
    'O': [
        [1, 1, 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1]
    ],
    'P': [
        [1, 1, 1],
        [1, , 1],
        [1, 1, 1],
        [1],
        [1]
    ],
    'Q': [
        [0, 1, 1],
        [1, , , 1],
        [1, , , 1],
        [1, , 1, 1],
        [1, 1, 1, 1]
    ],
    'R': [
        [1, 1],
        [1, , 1],
        [1, , 1],
        [1, 1],
        [1, , 1]
    ],
    'S': [
        [1, 1, 1],
        [1],
        [1, 1, 1],
        [, , 1],
        [1, 1, 1]
    ],
    'T': [
        [1, 1, 1],
        [, 1],
        [, 1],
        [, 1],
        [, 1]
    ],
    'U': [
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1]
    ],
    'V': [
        [1, , , , 1],
        [1, , , , 1],
        [, 1, , 1],
        [, 1, , 1],
        [, , 1]
    ],
    'W': [
        [1, , , , 1],
        [1, , , , 1],
        [1, , , , 1],
        [1, , 1, , 1],
        [1, 1, 1, 1, 1]
    ],
    'X': [
        [1, , , , 1],
        [, 1, , 1],
        [, , 1],
        [, 1, , 1],
        [1, , , , 1]
    ],
    'Y': [
        [1, , 1],
        [1, , 1],
        [, 1],
        [, 1],
        [, 1]
    ],
    'Z': [
        [1, 1, 1],
        [, , 1],
        [, 1],
        [1],
        [1, 1, 1]
    ],
    '0': [
        [1, 1, 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1]
    ],
    '1': [
        [, 1],
        [, 1],
        [, 1],
        [, 1],
        [, 1]
    ],
    '2': [
        [1,1,1],
        [0,0,1],
        [1,1,1],
        [1,0,0],
        [1,1,1]
    ],
    '3':[
        [1,1,1],
        [0,0,1],
        [1,1,1],
        [0,0,1],
        [1,1,1]
    ],
    '4':[
        [1,0,1],
        [1,0,1],
        [1,1,1],
        [0,0,1],
        [0,0,1]
    ],
    '5':[
        [1,1,1],
        [1,0,0],
        [1,1,1],
        [0,0,1],
        [1,1,1]
    ],
    '6':[
        [1,1,1],
        [1,0,0],
        [1,1,1],
        [1,0,1],
        [1,1,1]
    ],
    '7':[
        [1,1,1],
        [0,0,1],
        [0,0,1],
        [0,0,1],
        [0,0,1]
    ],
    '8':[
        [1,1,1],
        [1,0,1],
        [1,1,1],
        [1,0,1],
        [1,1,1]
    ],
    '9':[
        [1,1,1],
        [1,0,1],
        [1,1,1],
        [0,0,1],
        [1,1,1]
    ],
    ' ': [
        [, ,],
        [, ,],
        [, ,],
        [, ,],
        [, ,]
    ]
};
