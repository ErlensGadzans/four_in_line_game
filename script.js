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
  let counter;

  horizontal: {
    counter = 0;
    counter += countInDirection(r, c, symbol, 0, -1);
    counter += countInDirection(r, c, symbol, 0, 1);

    if (counter >= 3) {
      return true;
    }
  }

  vertical: {
    counter = 0;
    counter += countInDirection(r, c, symbol, 1, 0);

    if (counter >= 3) {
      return true;
    }
  }

  diognal1: {
    counter = 0;
    counter += countInDirection(r, c, symbol, 1, -1);
    counter += countInDirection(r, c, symbol, -1, 1);

    if (counter >= 3) {
      return true;
    }
  }
  diognal2: {
    counter = 0;
    counter += countInDirection(r, c, symbol, 1, 1);
    counter += countInDirection(r, c, symbol, -1, -1);

    if (counter >= 3) {
      return true;
    }
  }

  return false;
}

function countInDirection(r, c, symbol, diff_r = 0, diff_c = 0) {
  let counter = 0;
  for (let i = 0; i <= 2; i++) {
    r = r + diff_r;
    c = c + diff_c;

    if (data.hasOwnProperty(r) && data[r][c] === symbol) {
      counter++;
    } else {
      break;
    }
  }
  return counter;
}
