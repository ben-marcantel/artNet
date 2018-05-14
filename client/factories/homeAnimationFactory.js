"use strict";

angular.module("ArtNet").factory("HomeAnimationFactory", function($window, $document, $timeout,$route, $interval) {
    
    const canvas = document.getElementById('canvasHome');
    const ctx = canvas.getContext("2d");

    let LSystem;
    let koch;
    let initNum;
    let counter=0;
    
    const randomNum =()=>{
       initNum= Math.floor((Math.random()*5)+1);   
    }; 
    


    const treeMaker = ()=>{
        ctx.translate(canvas.width/2, canvas.height /3);    
        ctx.scale(2,2);  
        ctx.rotate(Math.PI);
        // ctx.translate(canvas.width * -1.6, canvas.height / 30);    
        
        koch = new LSystem({
            axiom: 'X',
            productions: {'F': 'FF', 'X':'F[-X]--[X][-X]+FX'},
            finals: {
              '+': () => {  ctx.rotate((Math.PI/180) * initNum); },
              '-': () => {  ctx.rotate((Math.PI/180) * -initNum*10); },
              'F': () => {
                ctx.beginPath();
                ctx.moveTo(0,initNum);
                ctx.lineTo(0, 25/(koch.iterations + 1));   
                ctx.strokeStyle = `rgb(${(initNum*10)+20},0,250)`;
                ctx.lineWidth = 1/4;
                ctx.stroke();      
                ctx.translate(0, 25/(koch.iterations + 1));},
              '[': ()=>{ ctx.save();},
              ']':()=>{ctx.restore();}
            
            }
        });
        koch.iterate(5);  
        koch.final();  
        
    };
  
    
    // const growth = ()=>{
    //     if (counter < 1){
    //         counter += 1/2;
    //     } else if (counter > 180){
    //         counter-=1/2;   
    //     }
        
    // };


const scene = ()=>{
    animate();
};

const animate = ()=>{ 
    canvas.height=700;
    canvas.width=600;
    randomNum();
    treeMaker();
    $timeout(()=>{
        scene();        
    },250);
};

	return {animate};
});