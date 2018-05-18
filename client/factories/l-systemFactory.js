"use strict";



angular.module("ArtNet").factory("LsystemFactory", function($window, $document, $timeout,$route, $interval) {
    
    // let LSystem;
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext("2d");
    let koch;
    let time;
    let counter=0;    
     
    //AXIOM RANDOMIZATION
    let axiomString ='';
    let productionString ='';
    let production2String ='';
    let initNum;
    let leftInitNum;
    let rightInitNum;
    let axiomInitNum;
    let prodInitNum1;
    let prodInitNum2;
    let moveX;
    let moveY;
    let dividend;
    let drawInitNum;
    let saveInitNum;
    let restoreInitNum;
    let rgb;
    let result;
    
    //VALUES FOR NEURAL NET
    let axiomValue;
    let production1Value;
    let production2Value;
    let leftValue;
    let rightValue;
    let iterationValue;
    let dividendValue;
    let moveXValue;
    let moveYValue;
    let drawLogicValue;
    let setSaveLogicValue;
    let setRestoreLogicValue;


    let trainObject;
    let inputObject;
    let outputObject;
    
    
    let rColorValue;
    let gColorValue;
    let bColorValue;



    ////INITIALIZE VALUES
    const iterateInit =()=>{
        initNum = Math.floor((Math.random()*3)+1)+2; 
        iterationValue = initNum/3;
    };
    const leftAngleInit =()=>{
        leftInitNum= Math.floor((Math.random()*180)+1)+11; 
        leftValue = leftInitNum/180;
    }; 
    
    const rightAngleInit =()=>{
        rightInitNum= Math.floor((Math.random()*180)+1)+11;   
        rightValue = rightInitNum/180;
    }; 
    
    const axiomInit = ()=>{
        axiomInitNum = Math.floor(Math.random()*2)+1;
        axiomValue = axiomInitNum/2;
    };
    
    const production1Init = ()=>{
        prodInitNum1 =  Math.floor(Math.random()*7)+1;
        production1Value = prodInitNum1/7;
     };
    
    const production2Init = ()=>{
        prodInitNum2 =  Math.floor(Math.random()*6)+1;
        production2Value = prodInitNum2/6;
     };
    
    const dividendInit = ()=>{
        dividend = Math.floor((Math.random()*90)+1) +10;
        dividendValue = dividend/90;
    };
    
    const moveXInit = ()=>{
        moveX = Math.floor(Math.random()*3);
        moveXValue = moveX/3;
    };
    
    const moveYInit = ()=>{
        moveY = Math.floor(Math.random()*2);
        moveYValue = moveY/2;
    };
    
    const drawLogicInit = ()=>{
        drawInitNum =  Math.floor(Math.random()*2)+1;
        drawLogicValue = drawInitNum/2; 
    };
    
    const saveLogicInit = ()=>{
        saveInitNum =  Math.floor(Math.random()*3)+1;
        setSaveLogicValue = saveInitNum/3;
    };
    
    const restoreLogicInit=()=>{
        restoreInitNum =  Math.floor(Math.random()*2)+1;
        setRestoreLogicValue = restoreInitNum/2;
    };
    
    ///CONDITIONAL SETS
    const setConditional = ()=>{
        ctx.rotate((Math.PI/180) * rightInitNum);   
    };
    
    const setConditional2 = ()=>{ 
        ctx.rotate(-((Math.PI/180) * leftInitNum)); 
    };
    
    const axiomMaker = ()=>{    
            if (axiomInitNum === 1){
                axiomString = 'F';
            } else if(axiomInitNum === 2)   {
                axiomString = 'X';
            } 
        return axiomString;
    };
    
    const setProduction1 = ()=>{
            if (prodInitNum1 === 1){
    
                if (axiomString === 'X'){
                    productionString ='F'; 
                }else productionString = 'FF+-FF';
    
            } else if(prodInitNum1 === 2){
    
                if (axiomString === 'X'){
                    productionString ='FXF'; 
                } else productionString = 'FF-+F';
    
            } else if (prodInitNum1 === 3){
    
                if (axiomString === 'X'){
                    productionString ='FFF';  
                } else productionString ='FF--FF++';
    
            } else if(prodInitNum1 === 4){
    
                if (axiomString === 'X'){
                    productionString ='FF';                       
                } else productionString ='F+FF-';
    
            } else if(prodInitNum1 === 5){
    
                if (axiomString ==='X'){
                    productionString ='FF-';                       
                } else productionString ='F[F]+-F-FF';
    
            } else if(prodInitNum1 === 6){
    
                if (axiomString ==='X'){
                    productionString ='FF+';                       
                } else productionString ='FF+--+[F]F';
    
            } else if(prodInitNum1 === 7){
                if (axiomString === 'X'){
                    productionString ='F[-]F';  
                } else productionString ='F-F++F-F';
            } 
        return productionString;
    };
    
    const setProduction2 = ()=>{
            if (prodInitNum2 === 1){
                production2String = 'F-F++F-F';
            } else if(prodInitNum2 === 2){
                if (axiomString === 'X'){
                production2String = 'F-[[+]F-]';
                } else production2String ='X';
            } else if(prodInitNum2 === 3){
                production2String ='F-[[X]+X]+F[+FX]-X';
            } else if(prodInitNum2 === 4){
                production2String ='F--[-[X]-]-F[-FX]+X';  
            } else if(prodInitNum2 === 5){
                production2String ='F[-[F-]-F[+FX]-X-[----]';
            } else if(prodInitNum2 === 6){
                production2String ='F--[-[X]----X]-F[+FX]-X';
            } 
        return production2String;
    };
    
    const setDrawLogic = ()=>{
            if (drawInitNum=== 1){
                ctx.beginPath();
                ctx.moveTo(moveX,moveY);
                ctx.lineTo(0, dividend/(koch.iterations + 1));
                ctx.stroke();
                ctx.strokeStyle= `${rgb}`;
                ctx.translate(0, dividend/(koch.iterations + 1));   
            } else if(drawInitNum === 2)  {
                ctx.beginPath();
                ctx.moveTo(0,0);
                ctx.lineTo(0, dividend/(koch.iterations + 1));
                ctx.stroke();
                ctx.strokeStyle= `${rgb}`;
                ctx.translate(0, dividend/(koch.iterations + 1));
            }
    };
    
    const setSaveLogic = ()=>{
            if (saveInitNum=== 1){
                ctx.save();  
            } else if(saveInitNum=== 2){
                ctx.save();
                ctx.strokeStyle= `${rgb}`;   
            } else if(saveInitNum === 3){} 
    };
    
    const setRestoreLogic = ()=>{
            if (restoreInitNum === 1){
                ctx.restore();
            } else if(restoreInitNum === 2){
                ctx.restore();
                ctx.strokeStyle= `${rgb}`;   
            } 
    };
    
    //////INITIALIZE VALUES   
    const setInitValues = ()=>{
        axiomInit(); 
        production1Init();
        production2Init();
        rightAngleInit();
        leftAngleInit(); 
        dividendInit();
        moveXInit();
        moveYInit();
        drawLogicInit();
        saveLogicInit();
        restoreLogicInit();
        
    };
    
    // L-SYSTEM 
    ctx.translate(canvas.width / 2, canvas.height / 4);
    const initLsystem = ()=>{
        koch = new LSystem({
            axiom: axiomMaker(),
            productions: {'F': setProduction1(), 'X':setProduction2()},
            finals: {
            '+': () => {setConditional();},
            '-': () => {setConditional2();},
            'F': () => {setDrawLogic();},
            '[': () => {setSaveLogic();},
            ']': () => {setRestoreLogic();}
            }
        });
    };
     
    let defineInputObject = ()=>{
        inputObject = {
            axiomValue: axiomValue,
            productionOneValue: production1Value,
            productionTwoValue: production2Value,
            leftValue: leftValue,
            rightValue: rightValue,
            iterationValue: 5,
            dividendValue: dividendValue,
            moveXValue: moveXValue,
            moveYValue: moveYValue,
            drawLogicValue: drawLogicValue,
            setSaveLogicValue: setSaveLogicValue,
            setRestoreLogicValue: setRestoreLogicValue, 
        };
    };
    
    let resetObject = ()=>{
        
        axiomValue=null;
        production1Value=null;
        production2Value=null;
        leftValue=null;
        rightValue=null;
        iterationValue=null;
        dividendValue=null;
        moveXValue= null;
        moveYValue=null;
        drawLogicValue=null;
        setSaveLogicValue=null;
        setRestoreLogicValue=null;
    };
     
    const resetImage=()=>{
        canvas.height = 1000;
        canvas.width = 1000;
        ctx.translate(canvas.width / 2, canvas.height / 4);
        resetObject();    
        setInitValues(); 
        initLsystem();
        koch.iterate(5); 
        koch.final();   
    };

    const zoomImage=(zoom)=>{
        if (zoom === 2){
            canvas.height = 1000;
            canvas.width = 1000;
            ctx.scale(3,3);    
            ctx.translate(-canvas.width/12, -canvas.height/24);            
            ctx.translate(canvas.width/4, canvas.height/8);
            ctx.lineWidth=1/4;
        } else if(zoom === 1){
            canvas.height = 1000;
            canvas.width = 1000;
            ctx.scale(2,2);    
            ctx.translate(-canvas.width / 4, -canvas.height / 8);            
            ctx.translate(canvas.width / 2, canvas.height / 4);
            ctx.lineWidth=1/2;
        } else if(zoom === -1){
            canvas.height = 1000;
            canvas.width = 1000;
            ctx.scale(1/2,1/2);    
            ctx.translate(canvas.width / 4, canvas.height / 8);            
            ctx.translate(canvas.width / 2, canvas.height / 4);
            ctx.lineWidth=2;
        } else if(zoom === -2){
            canvas.height = 1000;
            canvas.width = 1000;
            ctx.scale(1/4,1/4);    
            ctx.translate(canvas.width/2 , canvas.height/4 );            
            ctx.translate(canvas.width / 2, canvas.height / 4);
            ctx.lineWidth=4;
        } else if(zoom === 0){
            canvas.height = 1000;
            canvas.width = 1000;
            ctx.translate(canvas.width / 2, canvas.height / 4);
            
        }    
        
        initLsystem();
        koch.iterate(5);    
        koch.final();
        
    }; 

    const getColorValue = (color,zoom)=>{
        canvas.height = 1000;
        canvas.width = 1000;
        rgb = color;
        zoomImage(zoom);          
    };
 
    const onLoadImage = ()=>{
        setInitValues();
        initLsystem();
        koch.iterate(5);
        koch.final();
    };

    const dislike = ()=>{
        defineInputObject(); 
        trainObject = {inputObject};        
        resetImage();
    };

    const like = ()=>{
        defineInputObject(); 
        trainObject = {inputObject};
        resetImage();
   };
    
//to neural net
    const sendTrainObject = ()=>{
        return trainObject;
    };

    const defineObjectToTest=()=>{
        defineInputObject();
        trainObject = {inputObject};
    };

    const drawResult = ()=>{
        canvas.height = 1000;
        canvas.width = 1000;
        ctx.translate(canvas.width / 2, canvas.height / 4);
        initLsystem();
        koch.iterate(5);
        koch.final();
    };
       
    const resetCanvasOnLoad = ()=>{
        canvas.height = 1000;
        canvas.width = 1000;
        ctx.translate(canvas.width / 2, canvas.height / 4);
    };

////ANIMATION
const animateLsystem = ()=>{
    koch = new LSystem({
        axiom: axiomMaker(),
        productions: {'F': setProduction1(), 'X':setProduction2()},
        finals: {
        // '+': () => {setConditional();},
        // '-': () => {setConditional2();},
        '+': () => {  ctx.rotate((Math.PI/180) * counter);},
          '-': () => {  ctx.rotate((Math.PI/180) * -counter);},
        'F': () => {setDrawLogic();},
        '[': () => {setSaveLogic();},
        ']': () => {setRestoreLogic();}
        }
    });
};

const growth = (data)=>{
    if (data < 180){
       return counter += 1/10;
    } else if (data >= 180){
         counter = 0;   
    }
};

const scene = ()=>{
    animateIt();
};

const animateIt = ()=>{ 
    growth(counter);
    canvas.height = 1000;
    canvas.width = 1000;
    ctx.translate(canvas.width / 2, canvas.height / 4);    
    animateLsystem();
    koch.iterate(5);
    koch.final();
    time = $timeout(()=>{
                scene();        
            },80);
    
};

const endAnimate= ()=>{
    $timeout.cancel(time);
};


    return{ onLoadImage, resetImage, dislike, like, sendTrainObject, zoomImage, getColorValue, drawResult,setInitValues, defineObjectToTest, resetObject,resetCanvasOnLoad,animateIt,endAnimate };

});