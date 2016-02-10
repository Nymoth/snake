window.onload = function() {
	document.getElementsByTagName('a')[0].onclick = function() {
		start(document.getElementById('dif').value);
		this.style.display = 'none';
		document.getElementById('dif').style.display = 'none';
		document.getElementById('cont').style.display = 'block';
	}
}

function start(dif) {
	
	var canvas = document.getElementById('cont');
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'rgb(0, 0, 0)';

	// posición inicial: 4 cuadros desde 38 - 41 en x , 30 en y
	for (var i = 0; i < 4; i++) {
		ctx.fillRect(380 + i * 10, 300, 10, 10);
	}
	
	//		N
	//		|
	//	W---+---E
	//		|
	//		S

	var mira = 'w';
	var snake = [];
	snake.push({x: 38, y: 30});
	snake.push({x: 39, y: 30});
	snake.push({x: 40, y: 30});
	snake.push({x: 41, y: 30});
	var hungry = true;
	var score = 0;
	var kf = true;
	var speed;
	var hc = false;
	switch(parseInt(dif)) {
		case 0:
			speed = 175;
			break;
		case 1:
			speed = 90;
			break;
		case 2:
			speed = 30;
			break;
		case 3:
			speed = 1;
			hc = true;
			break;
	}

	// 1a comida:
	var cx = parseInt(Math.random() * 80);
	var cy = parseInt(Math.random() * 60);
	ctx.fillRect(cx * 10, cy * 10, 10, 10);

	document.getElementsByTagName('body')[0].onkeydown = function(e) {
		switch (e.keyCode) {
			case 38:
			case 87:
				// N
				if (kf && mira !== 's') {
					mira = 'n';
					kf = false;
				}
				break;
			case 40:
			case 83:
				// S
				if (kf && mira !== 'n') {
					mira = 's';
					kf = false;
				}
				break;
			case 37:
			case 65:
				// W
				if (kf && mira !== 'e') {
					mira = 'w';
					kf = false;
				}
				break;
			case 39:
			case 68:
				// E
				if (kf && mira !== 'w') {
					mira = 'e';
					kf = false;
				}
				break;
		}
	}

	function is_clear(x, y) {
		for (var i = 0; i < snake.length; i++) {
			if (snake[i].x === x && snake[i].y === y) {
				return false;
			}
		}
		return true;
	}

	function game_over() {
		clearInterval(flow);
		if (confirm('Game Over\n' + score + ' punto' + (score === 1 ? '' : 's') + '\nOtra?')) {
			location.reload();
		} else {
			document.getElementById('cont').style.display = 'none';
			var out = document.createTextNode(score + ' punto' + (score === 1 ? '' : 's'));
			document.getElementsByTagName('body')[0].appendChild(out);
		}
	}

	var flow = setInterval(function() {

		switch (mira) {
			case 'n':

				if (snake[0].y < 0 || !is_clear(snake[0].x, snake[0].y - 1)) {
					game_over();
				} else {
					snake.unshift({x: snake[0].x, y: snake[0].y - 1});
				}

				break;
			case 's':

				if (snake[0].y >= 60 || !is_clear(snake[0].x, snake[0].y + 1)) {
					game_over();
				} else {
					snake.unshift({x: snake[0].x, y: snake[0].y + 1});
				}

				break;
			case 'w':

				if (snake[0].x < 0 || !is_clear(snake[0].x - 1, snake[0].y)) {
					game_over();
				} else {
					snake.unshift({x: snake[0].x - 1, y: snake[0].y});
				}

				break;
			case 'e':

				if (snake[0].x >= 80 || !is_clear(snake[0].x + 1, snake[0].y)) {
					game_over();
				} else {
					snake.unshift({x: snake[0].x + 1, y: snake[0].y});
				}

				break;
		}

		if (snake[0].x < 0 || snake[0].x >= 80 ||
			snake[0].y < 0 || snake[0].y >= 60 ||
			!is_clear()) {
			
		} else {

			if (snake[0].x === cx && snake[0].y === cy) {
				hungry = false;
			}


			ctx.fillRect(snake[0].x * 10, snake[0].y * 10, 10, 10);
			
		}

		if (hungry) {
			var rem = snake.pop();
			ctx.clearRect(rem.x * 10, rem.y * 10, 10, 10);
		} else {
			do {
				cx = parseInt(Math.random() * 80);
				cy = parseInt(Math.random() * 60);
			} while (!is_clear(cx, cy));
			score++;

			ctx.fillRect(cx * 10, cy * 10, 10, 10);
			hungry = true;
		}

		kf = true;

		if (hc) {
			var r = parseInt(Math.random() * 255);
			var g = parseInt(Math.random() * 255);
			var b = parseInt(Math.random() * 255);
			var c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
			canvas.style.backgroundColor = c;
			//ctx.fillStyle = c;
		}

	}, speed);


}