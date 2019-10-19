let layout = 
[
    0, 0, 0, 2, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, "X", 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
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
        this.n = 0
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
        // HORIZONTAL MOVES
        this.horizontalMove()

        // VERTICAL MOVES
        this.verticalMove()

        // RETURN END POSITION
        return `The end position is : ${this.currentPosition}`
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

                        if(this.rowDifference <= 0) {

                            this.currentPosition+=this.rowSize
                            this.rowDifference++

                        } else if(this.rowDifference >= 0) {

                            this.currentPosition-=this.rowSize
                            this.rowDifference--  

                        } else if(this.rowDifference === 0) {
                            alert("ITS ZERO ROWDIFFERENCE")
                        }

                    document.getElementById(`${this.currentPosition}`).style.color = "red"
                    console.log("Current pos : " + this.currentPosition)

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

                if(this.layout[this.currentPosition - 1] === "X") {

                    console.log("FROM HORIZONTAL UNDEFINED IF")

                    while(this.layout[this.currentPosition - 1] === "X") {

                        if(this.rowDifference <= 0) {
    
                                this.currentPosition+=this.rowSize
                                this.rowDifference++
    
                            } else if(this.rowDifference >= 0) {
    
                                this.currentPosition-=this.rowSize
                                this.rowDifference--  
    
                            }
                        
                    document.getElementById(`${this.currentPosition}`).style.color = "red"
                    console.log("Current pos : " + this.currentPosition)

                    }
                }

                this.columnDifference--
                this.currentPosition--
                console.log("left")
                console.log("Current pos : " + this.currentPosition)
                document.getElementById(`${this.currentPosition}`).style.color = "red"
                this.verticalMove()
            }
        }
    }

    verticalMove() {

        console.log("hello")
        if(this.rowDifference <= 0) {

            while(this.rowDifference !== 0) {

                if(this.layout[this.currentPosition + this.rowSize] === "X") {

                    console.log("FROM VERTICAL UNDEFINED IF")

                    while(this.layout[this.currentPosition + this.rowSize] === "X") {

                        

                        if(this.columnDifference <= 0) {

                            this.currentPosition++
                            this.columnDifference++

                        } else if(this.columnDifference >= 0) {

                            this.currentPosition--
                            this.columnDifference--

                        }

                        this.n++

                        document.getElementById(`${this.currentPosition}`).style.color = "red"
                        console.log("Current pos : " + this.currentPosition)

                    }
                }

                console.log("VERTICAL FIRST WHILE")
                this.rowDifference++
                this.currentPosition+=this.rowSize
                this.setNewPosition()
                console.log("Current pos : " + this.currentPosition)
                document.getElementById(`${this.currentPosition}`).style.color = "red"

            }

        }

        if(this.rowDifference >= 0) {

            while(this.rowDifference !== 0) {

                if(this.layout[this.currentPosition - this.rowSize] === "X") {

                    console.log("FROM VERTICAL UNDEFINED IF 2")

                    while(this.layout[this.currentPosition - this.rowSize] === "X") {

                        if(this.columnDifference < 0) {

                            this.currentPosition++
                            this.columnDifference++

                        } else if(this.columnDifference > 0) {

                            this.currentPosition--
                            this.columnDifference--

                        } else if(this.columnDifference === 0) {                            

                            this.currentPosition--
                            this.columnDifference--
                            
                        }

                        document.getElementById(`${this.currentPosition}`).style.color = "red"
                        console.log("Current pos : " + this.currentPosition)

                    }
                }

                this.rowDifference--
                this.currentPosition-=this.rowSize
                this.setNewPosition()
                console.log("up")
                console.log("Current pos : " + this.currentPosition)
                document.getElementById(`${this.currentPosition}`).style.color = "red"
                this.horizontalMove()

            }

        }

    }
}

const gps = new GPS(5, layout, 23)
gps.show()