let price = 3.26;
// 1.87
let cid = [
  ["PENNY", "PENNIES", 1.01],
  ["NICKEL", "NICKELS", 2.05],
  ["DIME", "DIMES", 3.1],
  ["QUARTER", "QUARTERS", 4.25],
  ["ONE", "ONES", 90],
  ["FIVE", "FIVES", 55],
  ["TEN", "TENS", 20],
  ["TWENTY", "TWENTIES", 60],
  ["ONE HUNDRED", "HUNDREDS", 100],
];

const currencyUnitAmount = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

const body = document.querySelector("body");
const statusBar = document.createElement("div");
const cash = document.createElement("input");
const purchase = document.createElement("button");
const total = document.createElement("div");
const changeDue = document.createElement("div");

statusBar.id = "status";
cash.id = "cash";
changeDue.id = "change-due";
purchase.id = "purchase-btn";
total.id = "total";

cash.type = Number;

cash.placeholder = "Enter cash from customer";
purchase.textContent = "PURCHASE";
total.textContent = `Total: $${price}`;

const changeDueUpdate = () => {
  changeDue.innerHTML = `Change in drawer:<br>`;
  cid.forEach((unit) => {
    changeDue.innerHTML += `${unit[1]}: ${unit[2]}<br>`;
  });
};

changeDueUpdate();
statusBar.style.display = "none";

body.appendChild(statusBar);
body.appendChild(cash);
body.appendChild(purchase);
body.appendChild(total);
body.appendChild(changeDue);

const enoughMoneyCheck = (amount) => {
  if (amount < price) {
    alert("The customer does not have enough money to buy the product");
    cash.value = "";
    return false;
  }
  return true;
};

const totalChangeInDrawer = () => {
  return cid.reduce((acc, num) => Math.round((acc + num[2]) * 100) / 100, 0);
};

const remainingChange = () => {
  let amount = cash.value;
  if (!enoughMoneyCheck(amount)) {
    return;
  }
  amount -= price;
  statusBar.style.display = "block";
  statusBar.innerHTML = "";
  const totalChange = totalChangeInDrawer();

  if (amount > totalChange) {
    statusBar.innerHTML += `Status: INSUFFICIENT_FUNDS`;
  } else if (amount === totalChange) {
    statusBar.innerHTML += `Status: CLOSED`;
  } else {
    statusBar.innerHTML += `Status: OPEN`;
  }

  cid.reverse().forEach((unit) => {
    let count = 0;
    while (
      amount >= currencyUnitAmount[unit[0]] &&
      unit[2] >= currencyUnitAmount[unit[0]]
    ) {
      amount = Math.round((amount - currencyUnitAmount[unit[0]]) * 100) / 100;
      unit[2] = Math.round((unit[2] - currencyUnitAmount[unit[0]]) * 100) / 100;
      console.log(cid);
      count++;
    }
    if (count > 0) {
      statusBar.innerHTML += `<br>${unit[0]}: $${
        Math.round(currencyUnitAmount[unit[0]] * count * 100) / 100
      }`;
    }
  });

  if (amount > 0) {
    statusBar.innerHTML = "Status: INSUFFICIENT_FUNDS";
  }
  cash.value = "";
  cid.reverse();
  changeDueUpdate();
};

purchase.addEventListener("click", remainingChange);
cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    remainingChange();
  }
});
