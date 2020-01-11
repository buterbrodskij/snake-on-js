const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');


const bg = new Image();
bg.src = "img/1562688808.png";

const food = new Image();
food.src = "img/poop.png";


let box = 32;
let score = 0;
let gameFood = {z
	x:Math.floor(Math.random() * 17 + 1) * box,
	y:Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
};


document.addEventListener('keydown',step);

let dir;

function step(e){
	if(e.keyCode == 37 && dir != "right")
		dir = 'left'
	else if(e.keyCode == 38 && dir != "down")
		dir = 'up'
	else if(e.keyCode == 39 && dir != "left")
		dir = 'right'
	else if(e.keyCode == 40 && dir != "up")
		dir = 'down'
};

function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);
			alert(`you lose, score: ${score}`)
	}
}


function startGame() {
	ctx.drawImage(bg, 0, 0);

	ctx.drawImage(food, gameFood.x, gameFood.y);

	for(let i = 0;i<snake.length;i++){
		ctx.fillStyle = i == 0 ? 'blue' : 'red';

		ctx.fillRect(snake[i].x,snake[i].y,box,box)
	};
	ctx.fillStyle = "#fff";
	ctx.font = "50px Arial";
	ctx.fillText(score,box * 2.5,box * 1.7);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;


	if(snakeX == gameFood.x && snakeY == gameFood.y){
		score++;
		gameFood = {
			x:Math.floor(Math.random() * 17 + 1) * box,
			y:Math.floor(Math.random() * 15 + 3) * box
		};
	}else{
		snake.pop();
	}

	if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > 17 * box){
		clearInterval(game)
		alert(`you lose, score: ${score}`)
	}


	if(dir == 'left') snakeX -= box;
	if(dir == 'right') snakeX += box;
	if(dir == 'up') snakeY -= box;
	if(dir == 'down') snakeY += box;


	let newHead = {
		x:snakeX,
		y:snakeY
	};
	eatTail(newHead,snake);
	snake.unshift(newHead);
};

let game = setInterval(startGame,100);