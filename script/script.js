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
                const targetNode = event.target.closest(".node");
                if (draggedPiece && targetNode) {
                    const dropIndex = Array.from(nodes).findIndex(n => n === targetNode);
                    
                    const existingPiece = targetNode.querySelector(".white-pieces");
                    
                    if ((!valid_Move(draggedPiece, draggedPieceIndex, dropIndex, existingPiece))) {
                        console.log("Invalid move");
                    } 
                    else {
                        console.log("Valid move");

                        if (existingPiece && existingPiece !== draggedPiece) {
                            targetNode.removeChild(existingPiece);
                        }

                        targetNode.innerHTML = "";
                        targetNode.appendChild(draggedPiece);
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


        const nodes = document.querySelectorAll(".node");
            function valid_Move(piece, start, end,existingPiece) {
                
                const whitPieces = piece.classList.contains("white-pieces");
                const blackPieces = piece.classList.contains("black-pieces");
                
                if(existingPiece){
                    const existingWhitePiece = existingPiece.classList.contains("white-pieces");
                    const existingBlackPiece = existingPiece.classList.contains("black-pieces");
                    if((whitPieces &&  existingWhitePiece) ||  (blackPieces && existingBlackPiece)){
                        return false;
                    }
                }


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
            const startRow = Math.floor(start / 8);
            

            // Single step move
            if (end === start + direction) {
                if (!nodes[end].querySelector(".Piece")) {
                    return true;
                }
            }
        
            
            if ((piece.classList.contains("white-pieces") && startRow === 6) ||
                (piece.classList.contains("black-pieces") && startRow === 1)) {
                if (end === start + 2 * direction) {
                    if (!nodes[start + direction].querySelector(".Piece") && !nodes[end].querySelector(".Piece")) {
                        return true;
                    }
                }
            }
        
            // Diagonal capture move
            if(end === start + direction + 1 || end === start + direction - 1 ){
                
                if (nodes[end].querySelector(".Piece") ){
                    return true;
                }   
            }
            
            return false;
                }
                
            // Rook Move
            function validRookMove(start, end) {
            const startX = start % 8;
            const startY = Math.floor(start / 8);
            const endX = end % 8;
            const endY = Math.floor(end / 8);

            
            if (startX === endX || startY === endY) {
                const step = (startX === endX) ? 8 : 1; 
                const direction = (end > start) ? step : -step;


                for (let i = start + direction; i !== end; i += direction) {
                
                    if (nodes[i].querySelector(".Piece")) {
                        return false; 
                    }
                }

                return true; 
            }

            return false; 
        }


            // Knight Move
            function validKnightMove(start, end) {    
                return Math.abs(start - end) % 10 === 0 || Math.abs(start - end) % 15 === 0 || Math.abs(start - end) % 6 === 0 || Math.abs(start - end) % 17 === 0;     
                }

            // Bishop Move
            function validBishopMove(start, end) {
                
                const diff = end - start;
                const step = (Math.abs(diff) % 9 === 0) ? 9 : 7;
            
            
                if (Math.abs(diff) % step !== 0) {
                    return false;
                }
            
                const direction = (diff > 0) ? step : -step;
            
                for (let i = start + direction; i !== end; i += direction) {
                    
                    if (i < 0 || i >= nodes.length) {
                        return false;
                    }
                    
                    if (nodes[i].querySelector(".Piece")) {
                        return false; 
                    }
                }
            
                return true; 
            }
            
            // Queen Move
                function validQueenMove(start, end) {
                    return validBishopMove(start,end) || validRookMove(start,end);
                }



            // King Move
            function validKingMove(start, end) {
                const diff = Math.abs(start - end);

                return diff === 1 || diff === 7 || diff === 8 || diff === 9;
            }