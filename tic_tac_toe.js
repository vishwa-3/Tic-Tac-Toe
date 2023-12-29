const boxes = document.querySelectorAll('.box')
const restart = document.getElementById('restart')
const pxs = document.getElementById('px-s')
const pos = document.getElementById('po-s')

const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let boxValues = ['','','','','','','','',''];

let currPlayer = 'X';
let gameInProcess = false;
let [xPoint,oPoint] = [0,0];

Start();

function Start(){
    gameInProcess = true;
    boxes.forEach(box => box.addEventListener('click',Click));
    restart.addEventListener('click',Restart);
}

function Click(){
    if(gameInProcess){
        const boxCode = this.getAttribute('boxCode');
        if(boxValues[boxCode]==''){
            Update(this,boxCode);
        }
    }
}

function Update(box,boxCode){
    boxValues[boxCode] = currPlayer;
    box.textContent = currPlayer;

    if (currPlayer === 'X') {
        box.classList.add('X');
        box.classList.remove('O');
    } else {
        box.classList.add('O');
        box.classList.remove('X');
    }

    changeplayer();
    Win();
}

function changeplayer(){
    currPlayer = (currPlayer == 'X')?'O':'X';
}

function Win(){
    for(i=0;i<winCondition.length;i++){
        let condition = winCondition[i];
        let [b1, b2, b3] = condition.map(index => boxes[index]);

        if( b1.textContent !== '' && 
            b1.textContent === b2.textContent && 
            b2.textContent === b3.textContent) {

            gameInProcess = false;
            
            Remove(b1,b2,b3);

            if(currPlayer == 'O') xPoint++;
            else oPoint++;

            pxs.textContent = xPoint;
            pos.textContent = oPoint;
            setTimeout(Restart,500);
        }
        else if(!boxValues.includes('')){
            gameInProcess = false;
            setTimeout(Restart,500);
        }
    }
}

function Remove(b1,b2,b3){
    boxes.forEach(box => {
        if (box !== b1 && box !== b2 && box !== b3 &&  box.textContent !== '') {
            box.textContent = '';
        }
    });
}

function Restart(){
    currPlayer = 'X';
    boxValues = ['','','','','','','','',''];
    boxes.forEach(box => box.textContent = '');
    gameInProcess = true;
}
