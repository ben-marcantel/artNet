"use strict";



angular.module("ArtNet").factory("LsystemFactory", function($window, $document, $timeout,$route, $interval) {
    const canvas = document.getElementById('canvasTrain');
    const ctx = canvas.getContext("2d");
    const zoom = document.getElementById("zoom");
    const inputColor = document.getElementById("inputColor");
    let koch;
    // let LSystem;
     
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
    const leftAngleInit =()=>{
        leftInitNum= Math.floor((Math.random()*180)+11); 
        leftValue = leftInitNum/190;
        // console.log("leftValue", leftValue)
    }; 
    
    const rightAngleInit =()=>{
        rightInitNum= Math.floor(((Math.random()*180)+11));   
        rightValue = rightInitNum/190;
        // console.log("rightValue", rightValue); 
    }; 
    
    const axiomInit = ()=>{
        axiomInitNum = Math.floor(Math.random()*2)+1;
        axiomValue = axiomInitNum/2;
        console.log("axiomValue", axiomInitNum);
    };
    
    const production1Init = ()=>{
        prodInitNum1 =  Math.floor(Math.random()*7)+1;
        production1Value = prodInitNum1/7;
        // console.log("prod1", prodInitNum1);  
     };
    
    const production2Init = ()=>{
        prodInitNum2 =  Math.floor(Math.random()*6)+1;
        production2Value = prodInitNum2/6;
        // console.log("prod2", production2Value,prodInitNum2);  
     };
    
    const dividendInit = ()=>{
        dividend = Math.floor(Math.random()*90)+11;
        dividendValue = dividend/100;
    };
    
    const moveXInit = ()=>{
        moveX = Math.floor(Math.random()*3);
        moveXValue = moveX/3;
        // console.log("moveX", moveXValue);  
    };
    
    const moveYInit = ()=>{
        moveY = Math.floor(Math.random()*2);
        moveYValue = moveY/2;
        // console.log("moveY", moveYValue);  
    };
    
    const drawLogicInit = ()=>{
        drawInitNum =  Math.floor(Math.random()*2)+1;
        drawLogicValue = drawInitNum/2; 
        // console.log("drawLogic", drawLogicValue);  
    };
    
    const saveLogicInit = ()=>{
        saveInitNum =  Math.floor(Math.random()*3)+1;
        setSaveLogicValue = saveInitNum/3;
        // console.log("saveLogic", setSaveLogicValue);  
    };
    
    const restoreLogicInit=()=>{
        restoreInitNum =  Math.floor(Math.random()*2)+1;
        setRestoreLogicValue = restoreInitNum/2;
        // console.log("restoreLogic", setRestoreLogicValue);         
    };
    
    ///CONDITIONAL SETS
    const setConditional = ()=>{
        ctx.rotate((Math.PI/180) * rightInitNum);   
    };
    
    const setConditional2 = ()=>{ 
        ctx.rotate(-((Math.PI/180) * leftInitNum)); 
    };
    
    const axiomMaker = ()=>{    
        // for(let i = 0;i<2;i++){
            if (axiomInitNum === 1){
                axiomString = 'F';
            } else if(axiomInitNum === 2)   {
                axiomString = 'X';
            } 
        // }
        return axiomString;
    };
    
    const setProduction1 = ()=>{
        // for(let i = 0;i<2;i++){
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
                    productionString ='XFF';  
                } else productionString ='F-F++F-F';
            } 
        // }   
        return productionString;
    };
    
    const setProduction2 = ()=>{
        // for(let i = 0;i<1;i++){
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
        // }    
        return production2String;
    };
    
    const  getRgb = (hex)=> {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
      
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        console.log(result);
            rColorValue = result[1];
            gColorValue =result[2];
            bColorValue = result[3];
            console.log(rColorValue,gColorValue,bColorValue);
        return result ? {
            r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
            g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
            b: Math.round(parseInt(result[3], 16) / 2.55) / 100, 
        } : null;
    };
    
    
    
    const setDrawLogic = ()=>{
        // for(let i = 0;i<2;i++){
            if (drawInitNum=== 1){
                ctx.beginPath();
                ctx.moveTo(0,moveY);
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
        // }
    };
    
    const setSaveLogic = ()=>{
        // for(let i = 0;i<3;i++){
            if (saveInitNum=== 1){
                ctx.save();  
            } else if(saveInitNum=== 2){
                ctx.save();
                ctx.strokeStyle= `${rgb}`;   
            } else if(saveInitNum === 3){} 
        // }   
    };
    
    const setRestoreLogic = ()=>{
        // for(let i = 0;i<2;i++){
            if (restoreInitNum === 1){
                ctx.restore();
            } else if(restoreInitNum === 2){
                ctx.restore();
                ctx.strokeStyle= `${rgb}`;   
            } 
        // }   
    };
    
    //////INITIALIZE VALUES   
    const setInitValues = ()=>{
        axiomInit(); 
        rightAngleInit();
        leftAngleInit(); 
        dividendInit();
        moveXInit();
        moveYInit();
        drawLogicInit();
        saveLogicInit();
        restoreLogicInit();
        production1Init();
        production2Init();
    };
    
    
    // L-SYSTEM 
    ctx.translate(canvas.width / 2, canvas.height / 4);
    const initLsystem = ()=>{
        koch = new LSystem({
            axiom: axiomMaker(),
            
            // productions: {'F': setProduction1(), 'X':setProduction2()},
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
    
    
    
    const onLoadImage = ()=>{
        setInitValues();
        initLsystem();
        koch.iterate(5);
        koch.final();
    };
   
    
    
    let defineInputObject = ()=>{
        inputObject = {
            axiomValue: axiomValue,
            production1Value: production1Value,
            production2Value: production2Value,
            leftValue: leftValue,
            rightValue: rightValue,
            iterationValue: iterationValue,
            dividendValue: dividendValue,
            moveXValue: null,
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
            canvas.height = 2000;
            canvas.width = 2000;
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

    const getColorValue = (color)=>{
        rgb = color;
        zoomImage();          
    };
 
    
    
    const hexToRgb =(hex)=> {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const dislike = ()=>{
        defineInputObject(); 
        outputObject = {
            like:0
        };
        trainObject = {input:inputObject, output: outputObject};        
        resetImage();
    };

    const like = ()=>{
        defineInputObject(); 
        outputObject = {
            like:1
        };
        trainObject = {input:inputObject, output: outputObject};
        resetImage();
   };
    

//to neural net
    const sendTrainObject = ()=>{
        return trainObject;
    };


    return{onLoadImage, resetImage, dislike, like, sendTrainObject, zoomImage, getColorValue };

});