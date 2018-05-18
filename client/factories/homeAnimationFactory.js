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
        ctx.translate(canvas.width/2, canvas.height /8);    
        ctx.scale(2,2);  
        // ctx.rotate(Math.PI);
        // ctx.translate(canvas.width * -1.6, canvas.height / 30);    
        
     onloadImage = new LSystem({
            axiom: 'X',
            productions: {'F': 'FF', 'X':'F[-X]--[X][-X]+FX'},
            finals: {
              '+': () => {  ctx.rotate((Math.PI/180) * counter); },
              '-': () => {  ctx.rotate((Math.PI/180) * -counter); },
              'F': () => {
                ctx.beginPath();
                ctx.moveTo(0,initNum);
                ctx.lineTo(0, counter/ (onloadImage.iterations + 1));   
                ctx.strokeStyle = `rgb(${counter+75},255,255)`;
                
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

    let stop =()=>{
        time =0;
    };

    const growth = (data)=>{
        if (data < 180){
           return counter += 1/10;
        } else if (data >= 180){
             counter = 0;   
        }
    };

    const scene = ()=>{
        animate();
    };

    let time;
    
    const animate = ()=>{ 
        growth(counter);
        canvas.height=1000;
        canvas.width=1000;
        randomNum();
        treeMaker();
        time = 
            $timeout(()=>{
                scene();        
            },80);
        
    };

    const endAnimate= ()=>{
        $timeout.cancel(time);
    };

	return {animate,endAnimate};
});


   