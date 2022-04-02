const rows = 13;
const cols = 13;
let flag = 0;

function initBoard() {
  let fragment = new DocumentFragment();
  for (let i = 0; i < rows * cols; i++) {
    let div = document.createElement("div");
    fragment.appendChild(div);
  }

  let board = document.getElementById("board");
  board.appendChild(fragment);
}

function createSelectArea() {
  let gridMap = [];
  for (let i = 0; i <= rows; i++) {
    let temp = new Array(cols + 1);
    gridMap.push(temp);
  }

  let fragment = new DocumentFragment();
  let selectArea = document.getElementById("selectArea");
  for (let i = 0; i < (rows + 1) * (cols + 1); i++) {
    let div = document.createElement("div");
    div.classList.add("corner");

    let rowIndex = Math.floor(i / (cols + 1));
    let colIndex = i % (cols + 1);
    div.dataset.row = rowIndex;
    div.dataset.col = colIndex;

    gridMap[rowIndex][colIndex] = div;

    DOMlogic(div, gridMap);
    fragment.appendChild(div);
  }

  selectArea.appendChild(fragment);

  let replay = document.getElementById("replay");
  replay.onclick = function () {
    flag = 0;
    clearSelectArea(gridMap);
  };
}

function DOMlogic(el, gridMap) {
  el.onclick = function () {
    let curColor;
    if (flag === 0) {
      flag = 1;
      curColor = "black";
    } else {
      flag = 0;
      curColor = "white";
    }
    this.classList.add(curColor);

    //  判断游戏是否截止
    let i = parseInt(this.dataset.row);
    let j = parseInt(this.dataset.col);
    if (
      verticalLine(i, j, gridMap, curColor) ||
      horizonLine(i, j, gridMap, curColor) ||
      leftSlashLine(i, j, gridMap, curColor) ||
      rightSlashLine(i, j, gridMap, curColor)
    ) {
      let res = document.getElementById("res");
      let msg = `游戏结束，颜色为${curColor}的一方胜利`;
      res.innerText = msg;
    } else {
      this.onclick = null;
    }
  };
}

function horizonLine(i, j, gridMap, curColor) {
  let num = 0;

  for (let col = j; col >= 0; --col) {
    if (gridMap[i][col].classList.contains(curColor)) {
      ++num;
    } else {
      break;
    }
  }

  for (let col = j + 1; col <= cols; ++col) {
    if (gridMap[i][col].classList.contains(curColor)) {
      ++num;
    } else {
      break;
    }
  }

  return num === 5;
}

function verticalLine(i, j, gridMap, curColor) {
  let num = 0;

  for (let row = i; row >= 0; --row) {
    if (gridMap[row][j].classList.contains(curColor)) {
      ++num;
    } else {
      break;
    }
  }

  for (let row = i + 1; row <= rows; ++row) {
    if (gridMap[row][j].classList.contains(curColor)) {
      ++num;
    } else {
      break;
    }
  }

  return num === 5;
}

function leftSlashLine(i, j, gridMap, curColor) {
  let num = 0;

  let row = i;
  let col = j;
  while (row >= 0 && col >= 0) {
    if (gridMap[row][col].classList.contains(curColor)) {
      ++num;
      --row;
      --col;
    } else {
      break;
    }
  }

  row = i + 1;
  col = j + 1;
  while (row <= rows && col <= cols) {
    if (gridMap[row][col].classList.contains(curColor)) {
      ++num;
      ++row;
      ++col;
    } else {
      break;
    }
  }

  return num === 5;
}

function rightSlashLine(i, j, gridMap, curColor) {
  let num = 0;

  let row = i;
  let col = j;
  while (row >= 0 && col <= cols) {
    if (gridMap[row][col].classList.contains(curColor)) {
      ++num;
      --row;
      ++col;
    } else {
      break;
    }
  }

  row = i + 1;
  col = j + 1;

  while (row <= rows && col >= 0 && col <= cols) {
    if (gridMap[row][col].classList.contains(curColor)) {
      ++num;
      ++row;
      --col;
    } else {
      break;
    }
  }

  return num === 5;
}

function clearSelectArea(gridMap) {
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      gridMap[i][j].classList.remove("white");
      gridMap[i][j].classList.remove("black");
      DOMlogic(gridMap[i][j], gridMap);
    }
  }
}

initBoard();
createSelectArea();
