document.addEventListener("DOMContentLoaded", function() {
    const initialPieces = [
        "♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜",
        "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟",
    
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        
        "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟",   
        "♜", "♞", "♝", "♚","♛" , "♝", "♞", "♜",
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

    document.addEventListener("dragstart", function(event) {
        if (event.target.classList.contains("Piece")) {
            draggedPiece = event.target;
            event.target.classList.add("dragging");
        }
    });

    document.addEventListener("dragend", function(event) {
        if (event.target.classList.contains("dragging")) {
            event.target.classList.remove("dragging");
        }
    });

    nodes.forEach(node => {
        node.addEventListener("dragover", function(event) {
            event.preventDefault();
        });

        node.addEventListener("drop", function(event) {
            event.preventDefault();
            if (draggedPiece && event.target.classList.contains("node")) {
                event.target.innerHTML = "";
                event.target.appendChild(draggedPiece);
                draggedPiece = null;
            }
        });
    });
});
