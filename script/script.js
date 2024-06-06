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
            if (index > 46) {
                pieceContainer.classList.add("white-pieces");
            }
            if (index < 16) {
                pieceContainer.classList.add("black-pieces");
            }
        }
    });

    let turn = 1;
    let draggedPiece = null;
    let draggedPieceIndex = null;

    function setupDragAndDrop() {
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

                    if (!valid_Move(draggedPiece, draggedPieceIndex, dropIndex)) {
                        console.log("Invalid move");
                        targetNode.removeChild(draggedPiece);
                        nodes[draggedPieceIndex].appendChild(draggedPiece);
                    } else {
                        console.log("Valid move");
                        turn++;
                        updateDraggableState();
                    }
                }
            });
        });
    }

    function updateDraggableState() {
        const whitePieces = document.querySelectorAll(".white-pieces");
        const blackPieces = document.querySelectorAll(".black-pieces");

        if (turn % 2 === 0) {
            console.log("Black turn");
            whitePieces.forEach(piece => piece.setAttribute("draggable", "true"));
            blackPieces.forEach(piece => piece.setAttribute("draggable", "true"));
        } else {
            console.log("White turn");
            whitePieces.forEach(piece => piece.setAttribute("draggable", "true"));
            blackPieces.forEach(piece => piece.setAttribute("draggable", "false"));
        }
    }

    setupDragAndDrop();
    updateDraggableState();
});



function valid_Move(piece, start, end) {
    switch (piece.innerHTML) {
        case "♟":
            return validPawnMove(start, end,piece);
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
 
        // Pawn move 
        function validPawnMove(start, end, piece) {
            const direction = piece.classList.contains("white-pieces") ? -8 : 8;
            
            if (end === start + direction) {
                
                return true;
            }
        
            if ((piece.classList.contains("white-pieces") && Math.floor(start / 8) === 6) ||
                (piece.classList.contains("black-pieces") && Math.floor(start / 8) === 1)) {
                
                if (end === start + 2 * direction) {
                    return true;
                }
            }
        
            return false;
        }
        // Rook Move

        function validRookMove(start, end) {
                
            return start % 8 == end % 8 || Math.floor(start / 8) == Math.floor(end / 8);
        }

            // Knight Move
        function validKnightMove(start, end) {    
        return Math.abs(start - end) % 10 === 0 || Math.abs(start - end) % 15 === 0 || Math.abs(start - end) % 6 === 0 || Math.abs(start - end) % 17 === 0;     
        }
            // Bishop Move
        function validBishopMove(start, end) {
            return  end % 9 === start % 9 || end % 7  === start % 7;
        }

        // Queen Move
        function validQueenMove(start, end) {
            return validBishopMove(start,end) || validRookMove(start,end);
        }



        // King Move
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
