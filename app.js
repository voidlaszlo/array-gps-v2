let layout = 
[
    0, "X", 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, "X", 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 2, 0, 0
]

class GPS {
    constructor(rowSize, layout, currentPosition) {
        this.rowSize = rowSize
        this.layout = layout
        this.currentPosition = currentPosition
        this.layout[currentPosition] = 1    
        this.currentValue = this.layout[this.currentPosition]
        this.end = this.layout.indexOf(2)
        this.columnDifference = (this.currentPosition%this.rowSize) - this.layout.indexOf(2)%this.rowSize
        this.rowDifference = (Math.floor(this.currentPosition/this.rowSize)) - (Math.floor(this.layout.indexOf(2)/this.rowSize))
        this.left = this.layout[this.currentPosition - 1]
        this.right = this.layout[this.currentPosition + 1]
        this.down = this.layout[this.currentPosition + this.rowSize]
        this.up = this.layout[this.currentPosition - this.rowSize]
        this.previous
    }

    show() {
        let output = document.getElementById('output')
        output.innerHTML = ""
        output.style.display = "grid"
        output.style.width = this.rowSize <= 5 ? "100px" : "500px"
        output.style.fontSize = "1.1em"
        output.style.textAlign = "center"
        output.style.margin = "0 auto"
        output.style.gridTemplateColumns = `repeat(${this.rowSize}, 1fr)`
        for(let i = 0; i < this.layout.length; i++) {
            output.innerHTML += `<div id="${i}" class="box">${this.layout[i] === undefined ? "" : this.layout[i]}</div>`
        }

        document.getElementById(`${this.layout.indexOf(1)}`).style.color = "red";
        document.getElementById(`${this.layout.indexOf(1)}`).style.border = "1px solid red";
        document.getElementById(`${this.layout.indexOf(2)}`).style.color = "red";
        document.getElementById(`${this.layout.indexOf(2)}`).style.border = "1px solid red";
    }

    check() {
        // CHECK NEARBY
        console.log(`--------- CURRENT ---------`)
        console.log(`CURRENT VALUE : ${this.currentValue}`)
        console.log(`CURRENT POSIITON : ${this.currentPosition}`)
        console.log(`--------- END GOAL ---------`)
        console.log(`END POSIITON : ${this.layout.indexOf(2)}`)
        console.log(`--------- NEARBY ---------`)
        console.log(`UP : ${this.up}`)
        console.log(`DOWN : ${this.down}`)
        console.log(`LEFT : ${this.left}`)
        console.log(`RIGHT : ${this.right}`)
        console.log(`-- START-END POINT DIFFERENCE --`)
        console.log(`COLUMN DIFF : ${this.columnDifference}`)
        console.log(`ROW DIFF : ${this.rowDifference}`)
    }

    fastest() {
        console.log(this.columnDifference)
        // HORIZONTAL MOVES
        this.horizontalMove()

        // VERTICAL MOVES
        this.verticalMove()
    }

    search() {
        // GOAL TO MAKE THE ROWDIFFERENCE AND COLUMNDIFFERENCE 0
    }

    setNewPosition() {
        this.left = this.layout[this.currentPosition - 1]
        this.right = this.layout[this.currentPosition + 1]
        this.down = this.layout[this.currentPosition + this.rowSize]
        this.up = this.layout[this.currentPosition - this.rowSize]
        this.currentValue = this.layout[this.currentPosition]
        this.end = this.layout.indexOf(2)
        this.columnDifference = (this.currentPosition%this.rowSize) - this.layout.indexOf(2)%this.rowSize
        this.rowDifference = (Math.floor(this.currentPosition/this.rowSize)) - (Math.floor(this.layout.indexOf(2)/this.rowSize))
    }

    horizontalMove() {
        if(this.columnDifference <= 0) {
            while(this.columnDifference !== 0) {

                if(this.layout[this.currentPosition + 1] === "X") {
                    console.log("FROM UNDEFINED IF")
                    while(this.layout[this.currentPosition + 1] === "X") {
                    this.rowDifference <= 0 ? this.currentPosition+=this.rowSize : this.currentPosition-=this.rowSize
                    document.getElementById(`${this.currentPosition}`).style.color = "red"
                    }
                }
                

                this.columnDifference++
                this.currentPosition++
                console.log("right")
                console.log("Current pos : " + this.currentPosition)
                document.getElementById(`${this.currentPosition}`).style.color = "red"
            }
        } else if(this.columnDifference >= 0) {
            while(this.columnDifference !== 0) {
                this.columnDifference--
                this.currentPosition--
                console.log("left")
                console.log("Current pos : " + this.currentPosition)
                document.getElementById(`${this.currentPosition}`).style.color = "red"
            }
        }
    }

    verticalMove() {
        if(this.rowDifference <= 0) {
            while(this.rowDifference !== 0) {

                    console.log("UNDEFINED SECOND")
                    while(this.layout[this.currentPosition += this.rowSize] === "X") {
                        if(this.columnDifference <= 0) {
                            console.log("1")
                            console.log("Current pos : " + this.currentPosition)
                            this.currentPosition +=1
                            console.log("Current pos : " + this.currentPosition)
                            document.getElementById(`${this.currentPosition}`).style.color = "red"
                        } else if(this.columnDifference >= 0) {
                            console.log("2")
                            this.currentPosition -= 1
                            document.getElementById(`${this.currentPosition}`).style.color = "red"
                        } else if(this.columnDifference === 0) {
                            console.log("3")
                            this.currentPosition += 1
                            document.getElementById(`${this.currentPosition}`).style.color = "red"
                        }
    
                    
                }


                this.rowDifference++
                this.currentPosition+=this.rowSize
                this.setNewPosition()
                console.log("down")
                console.log("Current pos : " + this.currentPosition)
                document.getElementById(`${this.currentPosition}`).style.color = "red"
            }
        }
        if(this.rowDifference >= 0) {
            while(this.rowDifference !== 0) {
                this.rowDifference--
                this.currentPosition-=this.rowSize
                this.setNewPosition()
                console.log("up")
                console.log("Current pos : " + this.currentPosition)
                document.getElementById(`${this.currentPosition}`).style.color = "red"
            }
        }
    }
}

const gps = new GPS(5, layout, 0)
gps.show()