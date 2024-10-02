const grid = document.querySelector('.gb');//selects the gameboard
const tiles = grid.querySelectorAll('.tile');//selects all the tiles on the gameboard
let turn = 'P1'; //defaults to p1 going first

tiles.forEach(tile =>{
    tile.dataset.clicked = 'false';
    tile.addEventListener('click', tileclicked);
}) //adds an eventlistener to each tile with the function tileclicked

function tileclicked(clickEvent){// depending on whos turn it is it will add the correct icon
  const tile = clickEvent.target;
  if (tile.dataset.clicked == 'false') {
    if (turn == 'P1') {
      tile.innerHTML = '<i class="bx bx-x" id=symbol"></i>';
      turn = 'P2';
      document.querySelector(".turn").innerHTML = "P2's Turn";
      tile.dataset.x = 'true'
    } else {
      tile.innerHTML = '<i class="bx bx-radio-circle"></i>';
      turn = 'P1';
      document.querySelector(".turn").innerHTML = "P1's Turn";
      tile.dataset.o = 'true'
    }
  }
  tile.dataset.clicked = 'true';
  winner()
  
}
function winner(){
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (tiles[a].dataset.x === 'true' && tiles[b].dataset.x === 'true' && tiles[c].dataset.x === 'true') {
      alert('P1 wins!');
      resetBoard();
      return;
      
    }
    if (tiles[a].dataset.o === 'true' && tiles[b].dataset.o === 'true' && tiles[c].dataset.o === 'true') {
      alert('P2 wins!');
      resetBoard();
      return;
    }
    function resetBoard() {
      tiles.forEach(tile => {
        tile.innerHTML = '';
        tile.dataset.clicked = 'false';
        tile.dataset.x = 'false';
      });
      turn = 'P1';
      document.querySelector(".turn").innerHTML = "P1's Turn";
    }
  }
}