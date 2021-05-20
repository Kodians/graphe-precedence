function Traitement() {
  let canvasA = document.getElementById("myCanvasA");
  let ctxA = canvasA.getContext("2d");

  let text_input = document.getElementById( "text-input" ).value; // Lit le texte

  text_input = text_input.replace( /&lt;/g, "<" ); // Remplace le codage dans le textarea

  let strCopy = text_input.split( "\n"); // Crée un tableau

  strCopy.sort(); // Trie le tableau

  first = strCopy[ 0 ]; // Enlève les éléments vides

  while ( ( strCopy.length > 0 ) && ( first == "" ) ) {
      strCopy.shift();
      first = strCopy[ 0 ];
  }

  // enlever les doublons
  strCopy = Array.from(new Set([...strCopy]))
  
  let val = 0;

  let taches = [];
  let positions = {};

  Clear_Canvas('myCanvasA');
  TX = []; TY=[];

  for (let i = 0; i < strCopy.length; i++) {
    TX[i] = val;
    TY[i] = 20;
    val += 100;

    if(strCopy[i] !== '' && strCopy[i].includes('<')) {
      const [prevTache,nextTache] = strCopy[i].split('<');
      
      if(!taches.includes(prevTache)) {
        taches.push(prevTache);
        Tache(ctxA, i, prevTache, "blue"); 
        positions[prevTache] = taches.length;
      }

      if(!taches.includes(nextTache)) {
        taches.push(nextTache);
        Tache(ctxA, i, nextTache, "blue");
        positions[nextTache] = taches.length;
      }
    }
  }

  for (let i = 0; i < strCopy.length; i++) {
    const [prevTache,nextTache] = strCopy[i].split('<');

    Fleche_BH(ctxA, taches.indexOf(prevTache), taches.indexOf(nextTache), "blue");
  }

  console.log(positions);
}

function Clear_Canvas( NomCanvas ) {
  canvas = document.getElementById( NomCanvas );
  ctx = canvas.getContext( "2d" );

  ctx.save();

  ctx.setTransform( 1, 0, 0, 1, 0, 0 );
  ctx.resetTransform();

  ctx.clearRect( 0, 0, canvas.width, canvas.height );

  ctx.restore();
} // >>>> Clear_Canvas

function Ecrire_TEXT( p_X, p_Y, p_Text, p_Color ) {
  ctx.beginPath();
  ctx.font = '24px serif';
  ctx.fillStyle = p_Color;
  ctx.fillText( p_Text, p_X-6, p_Y+10 );
  ctx.closePath();
} // >>>> Ecrire_TEXT

function Norm( xA,yA ,xB,yB ) {
  return Math.sqrt( Math.pow( xB-xA, 2 ) + Math.pow(yB-yA, 2 ) );
} // >>>> Norm

function Vecteur( ctx, xA,yA,xB,yB, p_Color) {
  ArrowLength=10;
  ArrowWidth=8;
  ctx.lineCap="round";
  //-- http://xymaths.free.fr/Informatique-Programmation/javascript/canvas-dessin-fleche.php
  //-- Calculs des coordonnées des points C, D et E
  AB=Norm(xA,yA,xB,yB);
  xC=xB+ArrowLength*(xA-xB)/AB;yC=yB+ArrowLength*(yA-yB)/AB;
  xD=xC+ArrowWidth*(-(yB-yA))/AB;yD=yC+ArrowWidth*((xB-xA))/AB;
  xE=xC-ArrowWidth*(-(yB-yA))/AB;yE=yC-ArrowWidth*((xB-xA))/AB;
  // et on trace le segment [AB], et sa flèche:
  ctx.beginPath();
  ctx.moveTo(xA,yA);ctx.lineTo(xB,yB);
  ctx.moveTo(xD,yD);ctx.lineTo(xB,yB);ctx.lineTo(xE,yE);
  ctx.strokeStyle = p_Color;
  ctx.stroke();
} // >>>> Vecteur

function Dessiner_Segment( ctx, XD, YD, XF, YF, p_Color ) {
  ctx.beginPath();
  ctx.moveTo( XD, YD );
  ctx.lineTo( XF, YF );
  ctx.strokeStyle = p_Color;
  ctx.stroke();
  ctx.closePath();
} // >>>> Dessiner_Segment

function Dessiner_Fleche_DG( ctx, p_XA, p_YA, p_XB, p_YB, p_Color ) {
  XA = p_XA+40;
  YA = p_YA+20;
  XB = p_XB;
  YB = p_YB+20;
  XM = ( XA + XB ) /2;
  YM = ( YA + YB ) /2;
  Vecteur( ctx, XA, YA, XM, YM, p_Color );
  Dessiner_Segment( ctx, XM, YM, XB, YB, p_Color  );
} // >>>> Dessiner_Fleche_DG

function Dessiner_Fleche_DG_T( ctx, p_XA, p_YA, p_XB, p_YB, p_Color ) {
  XA = p_XA+40;
  YA = p_YA+20;
  XB = p_XB;
  YB = p_YB+20;
  XM = ( XA + 3*XB ) /4;
  YM = ( YA + 3*YB ) /4;
  Vecteur( ctx, XA, YA, XM, YM, p_Color );
  Dessiner_Segment( ctx, XM, YM, XB, YB, p_Color  );
} // >>>> Dessiner_Fleche_DG

function Dessiner_Fleche_GD( ctx, p_XA, p_YA, p_XB, p_YB, p_Color ) {
  XA = p_XA;
  YA = p_YA+20;
  XB = p_XB+40;
  YB = p_YB+20;
  XM = ( XA + XB ) /2;
  YM = ( YA + YB ) /2;
  Vecteur( ctx, XA, YA, XM, YM, p_Color );
  Dessiner_Segment( ctx, XM, YM, XB, YB, p_Color  );
} // >>>> Dessiner_Fleche_GD

function Dessiner_Fleche_HB( ctx, p_XA, p_YA, p_XB, p_YB, p_Color  ) {
  XA = p_XA+20;
  YA = p_YA;
  XB = p_XB+20;
  YB = p_YB+40;
  XM = ( XA + XB ) /2;
  YM = ( YA + YB ) /2;
  Vecteur( ctx, XA, YA, XM, YM, p_Color  );
  Dessiner_Segment( ctx, XM, YM, XB, YB, p_Color  );
} // >>>> Dessiner_Fleche_HB

function Dessiner_Fleche_BH( ctx, p_XA, p_YA, p_XB, p_YB, p_Color  ) {
  XA = p_XA+20;
  YA = p_YA+40;
  XB = p_XB+20;
  YB = p_YB;
  XM = ( XA + XB ) /2;
  YM = ( YA + YB ) /2;
  Vecteur( ctx, XA, YA, XM, YM, p_Color  );
  Dessiner_Segment( ctx, XM, YM, XB, YB, p_Color  );
} // >>>> Dessiner_Fleche_BH

function Dessiner_RECT( ctx, XD, YD, WW, HH, p_Color ) {
  ctx.beginPath();
  ctx.moveTo( XD, YD );
  ctx.lineTo( XD, YD+HH );
  ctx.lineTo( XD+WW, YD+HH );
  ctx.lineTo( XD+WW, YD );
  ctx.lineTo( XD, YD );
  ctx.strokeStyle = p_Color;
  ctx.stroke();
  ctx.closePath();
} // >>>> Dessiner_RECT

function Dessiner_TACHE( ctx, p_X, p_Y, p_Nom, p_Color  ) {
  Dessiner_RECT( ctx, p_X, p_Y , 40, 40, "blue" );

  ctx.beginPath();
  ctx.font = '18px serif';
  ctx.fillStyle = p_Color;
  if ( p_Nom.length < 3 ) {
    ctx.fillText( p_Nom, p_X+10, p_Y+25 );
  } else {
    ctx.fillText( p_Nom, p_X+6, p_Y+25 );
  }

  ctx.closePath();
} // >>>> Dessiner_TACHE

function Tache( ctx, p_Num, p_Nom, p_Color  ) {
  Dessiner_TACHE( ctx, TX[ p_Num ], TY[ p_Num ], p_Nom, p_Color  );
} // >>>> Tache

function Fleche_DG( ctx, p_From, p_To, p_Color  ) {
  Dessiner_Fleche_DG( ctx, TX[ p_From ], TY[ p_From ], TX[ p_To ], TY[ p_To ], p_Color  );
} // >>>> Fleche_DG

function Fleche_DG_T( ctx, p_From, p_To, p_Color  ) {
  Dessiner_Fleche_DG_T( ctx, TX[ p_From ], TY[ p_From ], TX[ p_To ], TY[ p_To ], p_Color  );
} // >>>> Fleche_DG_T

function Fleche_GD( ctx, p_From, p_To, p_Color  ) {
  Dessiner_Fleche_GD( ctx, TX[ p_From ], TY[ p_From ], TX[ p_To ], TY[ p_To ], p_Color  );
} // >>>> Fleche_GD

function Fleche_HB( ctx, p_From, p_To, p_Color  ) {
  Dessiner_Fleche_HB( ctx, TX[ p_From ], TY[ p_From ], TX[ p_To ], TY[ p_To ], p_Color  );
} // >>>> Fleche_HB

function Fleche_BH( ctx, p_From, p_To, p_Color  ) {
  Dessiner_Fleche_BH( ctx, TX[ p_From ], TY[ p_From ], TX[ p_To ], TY[ p_To ], p_Color  );
} // >>>> Fleche_BH


function PoseTache( ctx, p_NX, p_NY, p_Nom, p_Color ) {
  BD = 40;
  DX = 80;
  DY = 80;
  PosX = BD + (p_NX -1) * DX; 
  PosY = BD + (p_NY -1) * DY;
    console.log( p_NX, PosX, p_NY, PosY );

  Dessiner_TACHE( ctx, PosX, PosY, p_Nom, p_Color );
} // >>>> PoseTache

document.getElementById('id-t').addEventListener('click',() => {
    Traitement();
})