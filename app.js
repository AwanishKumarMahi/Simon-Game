// Get all elements with the class 'game-button'
const boxes = document.querySelectorAll('#game-box div');
const para = document.querySelector('#score');

const box_item = ["B1", "B2", "B3", "B4"];

let level = 0;
let count_clicks=0;
let score=0;

let list = [];

let rand_id;

function click_down(boxy){
    boxy.style.opacity = "1";
    boxy.style.transform = "scale(0.90)";
    boxy.style.boxShadow = "12px 7px 7px black";
}

function click_release(boxy){
    boxy.style.opacity = 0.7;
    boxy.style.transform = "scale(1)";
    boxy.style.boxShadow = "5px 5px 8px black";
}

function glow(id){
        const box = document.getElementById(id);
        box.style.opacity = 1;
        box.style.transform = "scale(1.035)";
        box.style.transition = "all ease-in 0.5s";      
}

function glow_off(id){
    setTimeout(function() {
        const bo = document.getElementById(id);
        bo.style.opacity = 0.7;
        bo.style.transform = "scale(1)";
        bo.style.transition = "inherit";
    }, 1000);

}

function end_flash(){
    const body = document.querySelector("body");
    body.style.background = "red";
    
    setTimeout(function(){
        body.style.background = "white";
    },100);
}

boxes.forEach(function(boxy) {

    
    boxy.addEventListener("mousedown",function() {
        click_down(boxy);
    });
    boxy.addEventListener("mouseup", function() {
        click_release(boxy);
    });

    boxy.addEventListener('click',function(event){
        if(level==0){
            rand_id = Math.floor(Math.random()*3.9); 
            const id =box_item[rand_id];

            list.push(id);
            level+=1;
            para.innerText = "Level "+level;
            

            setTimeout(function() {

                glow(id);
                glow_off(id);

            },1000);
        }

        else if(level>0){
            count_clicks++;
            if(count_clicks<=list.length){
                let box = event.target;
                if(list[count_clicks-1]!=box.id){
                    end_flash();
                    // setInterval()
                    setTimeout(function(){
                        end_flash();
                    },150);
                    para.innerText = "Score is "+score+". You lose the game.";
                    level=0;
                    score=0;
                    count_clicks=0;
                    list=[];
                }
                else if(count_clicks==list.length){
                    count_clicks=0;
                    level+=1;
                    para.innerText = "Level "+level;
                    
                    rand_id = Math.floor(Math.random()*3.9); 
                    
                    const id =box_item[rand_id];
                    
                    list.push(id);
                    setTimeout(function() {
                        
                        glow(id);
                        glow_off(id);
                        
                    },1000);
                }
                if(level!=0)
                    score++;
                
            }
        }
    });
});