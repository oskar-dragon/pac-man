const width = 28
const squares = [];
let score = 0
const grid = document.querySelector(".grid");
const scoreElement = document.getElementById("score")


// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty 

// Layout of the labiryth

// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

function createBoard() {
	for (const i in layout) {
		const square = document.createElement("div");
		grid.appendChild(square);
		squares.push(square);

		if (layout[i] === 0) {
			squares[i].classList.add("pac-dot");
		} else if (layout[i] === 1) {
			squares[i].classList.add("wall");
		} else if (layout[i] === 3) {
			squares[i].classList.add("power-pellet");
		} else if (layout[i] === 2) {
			squares[i].classList.add("ghost-lair")
		}
	}
}
createBoard()

// Pacman and control
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add("pacman")

function control(e) {
	squares[pacmanCurrentIndex].classList.remove("pacman")

	switch(e.key) {
		case "ArrowDown":
			if (!squares[pacmanCurrentIndex + width].classList.contains("wall") && !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair") && pacmanCurrentIndex + width < width * width) pacmanCurrentIndex += width
		break;

		case "ArrowUp":
			if (!squares[pacmanCurrentIndex - width].classList.contains("wall") && pacmanCurrentIndex - width >=0) pacmanCurrentIndex -= width
		break;

		case "ArrowLeft":
			if(!squares[pacmanCurrentIndex - 1].classList.contains("wall") && pacmanCurrentIndex % width !==0) pacmanCurrentIndex -=1
			if(pacmanCurrentIndex === 364) pacmanCurrentIndex = 391
		break;

		case "ArrowRight":
			if(!squares[pacmanCurrentIndex + 1].classList.contains("wall") && pacmanCurrentIndex % width < width -1) pacmanCurrentIndex +=1
			if(pacmanCurrentIndex === 391) pacmanCurrentIndex = 364
		break
	}
	
	squares[pacmanCurrentIndex].classList.add('pacman')
	pacDotEaten()
	powerPelletEaten()
	checkForWin()
	checkForGameOver()
}
 
document.addEventListener("keyup", control)

function pacDotEaten() {
	if(squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
		score++
		scoreElement.innerHTML = score
		squares[pacmanCurrentIndex].classList.remove("pac-dot")
	}
}

function powerPelletEaten() {
	if(squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
		score += 10
		squares[pacmanCurrentIndex].classList.remove("power-pellet")

		ghosts.forEach(ghost => {
			ghost.isScared = true
			setTimeout(() => {
				ghost.isScared = false;
			}, 10000)
		})

	}
}

// Class with ghosts
class Ghost {
	constructor(className, startIndex, speed) {
		this.className = className
		this.startIndex = startIndex
		this.speed = speed
		this.currentIndex = startIndex
		this.isScared = false
		this.timerId = NaN
	}
}

const ghosts = [
	new Ghost("blinky", 348, 250),
	new Ghost("pinky", 376, 400),
	new Ghost("inky", 351, 300),
	new Ghost("clyde", 379, 500)
]

// Draw my ghosts onto a grid
ghosts.forEach(ghost => {
	squares[ghost.currentIndex].classList.add(ghost.className)
	squares[ghost.currentIndex].classList.add("ghost")
})

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
	const directions = [-1, +1, -width, +width]
	let direction = directions[Math.floor(Math.random() * directions.length)]

	ghost.timerId = setInterval(function() {
		if (!squares[ghost.currentIndex + direction].classList.contains("wall") && !squares[ghost.currentIndex + direction].classList.contains("ghost")) {
			squares[ghost.currentIndex].classList.remove(ghost.className)
			squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost")
			ghost.currentIndex += direction
			squares[ghost.currentIndex].classList.add(ghost.className)
			squares[ghost.currentIndex].classList.add("ghost")
		} else direction = directions[Math.floor(Math.random() * directions.length)]

		if (ghost.isScared) {
			squares[ghost.currentIndex].classList.add("scared-ghost")
		}

		if(ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")) {
			squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
			score += 100
			ghost.currentIndex = ghost.startIndex
			squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
		}
		checkForGameOver()
	}, ghost.speed)
}

function checkForGameOver() {
	if (squares[pacmanCurrentIndex].classList.contains("ghost") && !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
		ghosts.forEach(ghost => {
			clearInterval(ghost.timerId);
		})
		document.removeEventListener("keyup", control)
		scoreElement.innerHTML = "You LOSE"
	}
}

function checkForWin() {
	if (score === 274) {
		ghosts.forEach(ghost => clearInterval(ghost.timerId))
		document.removeEventListener("keyup", control)
		scoreElement.innerHTML = "You WON!"
	}
}