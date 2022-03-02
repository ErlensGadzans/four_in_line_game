const four_in_line = document.querySelector(".four_in_line");
const template = document.createElement("a");
template.setAttribute("href", "#");

move_count = 0;

for (let i = 0; i < 100; i++) {
  const cell = template.cloneNode();
  four_in_line.append(cell);

  cell.onclick = function (event) {
    if (this.textContent != "") {
      return;
    }
    let symbol = "x";
    if (move_count % 2 === 1) {
      symbol = "o";
    }
    this.textContent = symbol;

    move_count++;
  };
}
