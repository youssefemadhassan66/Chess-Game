document.addEventListener("DOMContentLoaded", function() {
    const initialPieces = [
        "♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜",
        "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟",
    
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        
        "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟",   
        "♜", "♞", "♝", "♚", "♛", "♝", "♞", "♜",
    ];

    const nodes = document.querySelectorAll(".node");

    initialPieces.forEach((piece, index) => {
        if (piece !== "") {
            const pieceContainer = document.createElement("div");
            pieceContainer.innerHTML = piece;
            pieceContainer.classList.add("Piece");
            pieceContainer.setAttribute("draggable", "true");
            nodes[index].appendChild(pieceContainer);
        }
    });

    let draggedPiece = null;
    let draggedPieceIndex = null;

    document.addEventListener("dragstart", function(event) {
        if (event.target.classList.contains("Piece")) {
            draggedPiece = event.target;
            draggedPiece.classList.add("dragging");

            draggedPieceIndex = Array.from(nodes).findIndex(node => node.contains(draggedPiece));
            console.log(`Dragging piece from node: ${draggedPieceIndex}`);
        }
    });

    document.addEventListener("dragend", function(event) {
        if (draggedPiece) {
            draggedPiece.classList.remove("dragging");
            draggedPiece = null;
            draggedPieceIndex = null;
        }
    });

    nodes.forEach(node => {
        node.addEventListener("dragover", function(event) {
            event.preventDefault();
        });

        node.addEventListener("drop", function(event) {
            event.preventDefault();
            if (draggedPiece && event.target.classList.contains("node")) {
                const targetNode = event.target;
                targetNode.innerHTML = "";
                targetNode.appendChild(draggedPiece);

                const dropIndex = Array.from(nodes).findIndex(n => n.contains(draggedPiece));

                console.log(`Dropped piece at node: ${dropIndex}`);

                if (!valid_Move(draggedPiece.innerHTML, draggedPieceIndex, dropIndex)) {
                    console.log("Invalid move");
                    targetNode.removeChild(draggedPiece);
                    nodes[draggedPieceIndex].appendChild(draggedPiece);
                } else {
                    console.log("Valid move");
                }
            }
        });
    });
});

function valid_Move(piece, start, end) {
    switch (piece) {
        case "♟":
            return validPawnMove(start, end);
        case "♜":
            return validRookMove(start, end);
        case "♞":
            return validKnightMove(start, end);
        case "♝":
            return validBishopMove(start, end);
        case "♛":
            return validQueenMove(start, end);
        case "♚":
            return validKingMove(start, end);
        default:
            return false;
    }
}

function validPawnMove(start, end) {
    // Implement the logic for pawn movement
    // Assuming white pawns moving upwards (negative direction)
    const direction = -8;
    if (end === start + direction) {
        return true;
    }
    // Initial double move
    if (Math.floor(start / 8) === 6 && end === start + 2 * direction) {
        return true;
    }
    return false;
}

function validRookMove(start, end) {
        
        if(start % 8 == end % 8){
            return true;
        }
        if(Math.floor(start / 8) == Math.floor(end / 8)){
            return true;
        }
    return false;
}

function validKnightMove(start, end) {
    
    if(end === start+10 || end === start-10){
        return true;
    }
    if(end === start+6 || end === start-6){
        return true;
    }
    if(end === start+17 || end === start-17){
         return true;
     }
    if(end === start+15 || end === start-15){
        return true;
       }    
}

function validBishopMove(start, end) {
    // Implement the logic for bishop movement
    if(end % 9 === start % 9 || end % 7  === start % 7 ){
        return true;
    }
    return false;
}

function validQueenMove(start, end) {
    
    if(validRookMove(start,end)){
        return true;
    }
    if(validBishopMove(start,end)){
        return true;
    }
    
    return false;
}


function validKingMove(start, end) {
    
    let verticalDirection = 8;
    let horizontalDirection = 1;
    let leftDiagonal = 9;
    let rightDiagonal = 7;
    if(end === start + horizontalDirection || end  === start - horizontalDirection ){
    return true;
    }
    if(end === start + verticalDirection || end  === start - verticalDirection ){
        return true;
    }
    if(end === start + leftDiagonal || end  === start - leftDiagonal ){
        return true;
    }
    if(end === start + rightDiagonal || end  === start - rightDiagonal ){
        return true;
    }
    return false;
}
