"use strict";

angular.module("ArtNet").factory("HomeAnimationFactory", function($window, $document, $timeout,$route, $interval) {
    
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext("2d");
    

    // let LSystem;
    let onloadImage;
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
        
     onloadImage = new LSystem({
            axiom: 'X',
            productions: {'F': 'FF', 'X':'F[-X]--[X][-X]+FX'},
            finals: {
              '+': () => {  ctx.rotate((Math.PI/180) * initNum); },
              '-': () => {  ctx.rotate((Math.PI/180) * -initNum*10); },
              'F': () => {
                ctx.beginPath();
                ctx.moveTo(0,initNum);
                ctx.lineTo(0, 25/ (onloadImage.iterations + 1));   
                ctx.strokeStyle = `rgb(${(initNum*10)+20},0,250)`;
                ctx.lineWidth = 1/4;
                ctx.stroke();      
                ctx.translate(0, 25/ (onloadImage.iterations + 1));},
              '[': ()=>{ ctx.save();},
              ']':()=>{ctx.restore();}
            
            }
        });
     onloadImage.iterate(5);  
     onloadImage.final();  
        
    };
  
    
 


const scene = ()=>{
    animate();
};

const animate = ()=>{ 
    canvas.height=700;
    canvas.width=600;
    randomNum();
    treeMaker();
    // $timeout(()=>{
    //     scene();        
    // },250);
};

	return {animate};
});


   // const growth = ()=>{
    //     if (counter < 1){
    //         counter += 1/2;
    //     } else if (counter > 180){
    //         counter-=1/2;   
    //     }
        
    // };