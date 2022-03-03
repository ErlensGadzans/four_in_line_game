const four_in_line = document.querySelector(".four_in_line");
const template = document.createElement("a");
template.setAttribute("href", "#");
move_count = 0;
let data = {}; //data objekts, kur tiks ierakstiti dažādi dati

for (let r = 0; r < 10; r++) {
  for (let c = 0; c < 10; c++) {
    const cell = template.cloneNode();
    // cell.textContent = r + " " + c;
    four_in_line.append(cell);

    cell.onclick = function (event) {
      if (this.textContent != "") {
        return;
      }
      if (
        r == 9 ||
        (data.hasOwnProperty(r + 1) && data[r + 1].hasOwnProperty(c))
      ) {
        let symbol = move_count % 2 === 1 ? "o" : "x";
        // let symbol = "x";
        // if (move_count % 2 === 1) {
        //   symbol = "o";
        // }
        this.textContent = symbol;
        //parbaude vai vertiba ir jau iestatita
        if (!data.hasOwnProperty(r)) {
          data[r] = {}; //iestatam, ka objekts ir tukss
        }
        data[r][c] = symbol;

        if (checkWinner(r, c, symbol)) {
          document.querySelector(".message").textContent = "We have a winner!";
        }

        move_count++;
      }
    };
  }
}

function checkWinner(r, c, symbol) {
  let counter = 0;
  let column = c;

  for (let i = 0; i <= 2; i++) {
    //validation skaita no sunas pa kreisi rinda
    if (data[r][--column] === symbol) {
      counter++;
    } else {
      break;
    }
  }
  column = c;
  for (let i = 0; i <= 2; i++) {
    if (data[r][++column] === symbol) {
      counter++;
    } else {
      break;
    }
  }

  if (counter >= 3) {
    return true;
  }
  return false;
}
