let price = 19.5;
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
const changeDue = document.createElement("div");
const cash = document.createElement("input");
const purchase = document.createElement("button");
const total = document.createElement("div");
const remainingCash = document.createElement("div");

changeDue.id = "change-due";
cash.id = "cash";
remainingCash.id = "remaining-cash";
purchase.id = "purchase-btn";
total.id = "total";

cash.type = Number;

cash.placeholder = "Enter cash from customer";
purchase.textContent = "PURCHASE";
total.textContent = `Total: $${price}`;

const remainingCashUpdate = () => {
  remainingCash.innerHTML = `Change in drawer:<br>`;
  cid.forEach((unit) => {
    remainingCash.innerHTML += `${unit[1]}: ${unit[2]}<br>`;
  });
};

remainingCashUpdate();
changeDue.style.display = "none";

body.appendChild(changeDue);
body.appendChild(cash);
body.appendChild(purchase);
body.appendChild(total);
body.appendChild(remainingCash);

const enoughMoneyCheck = (amount) => {
  if (amount < price) {
    alert("Customer does not have enough money to purchase the item");
    cash.value = "";
    return false;
  }
  return true;
};

const totalChangeInDrawer = () => {
  return cid.reduce((acc, num) => Math.round((acc + num[2]) * 100) / 100, 0);
};

const remainingChange = () => {
  let amount = parseFloat(cash.value);
  changeDue.style.display = "block";
  changeDue.innerHTML = "";
  if (amount === price) {
    changeDue.innerHTML = "No change due - customer paid with exact cash";
    return;
  }
  if (!enoughMoneyCheck(amount)) {
    return;
  }

  // if (
  //   price < amount &&
  //   totalChange === Math.round((amount - price) * 100) / 100
  // ) {
  //   changeDue.innerHTML = "Status: CLOSED";
  // }
  amount = Math.round((amount - price) * 100) / 100;

  // if (amount > totalChange) {
  //   changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
  // } else if (amount === totalChange) {
  //   changeDue.innerHTML = "Status: CLOSED";
  // } else {
  //   changeDue.innerHTML += "Status: OPEN ";
  // }
  let newArray = [];
  cid.reverse().forEach((unit) => {
    let count = 0;
    while (
      amount >= currencyUnitAmount[unit[0]] &&
      unit[2] >= currencyUnitAmount[unit[0]]
    ) {
      amount = Math.round((amount - currencyUnitAmount[unit[0]]) * 100) / 100;
      unit[2] = Math.round((unit[2] - currencyUnitAmount[unit[0]]) * 100) / 100;
      count++;
    }
    if (count > 0) {
      newArray.push([
        unit[0],
        Math.round(currencyUnitAmount[unit[0]] * count * 100) / 100,
      ]);
      // changeDue.innerHTML += String(
      //   `${unit[0]}: $${
      //     Math.round(currencyUnitAmount[unit[0]] * count * 100) / 100
      //   }`
      // );
    }
  });
  const totalChange = totalChangeInDrawer();
  if (amount > 0) {
    changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
  } else if (totalChange === 0) {
    changeDue.innerHTML = `<p>Status: CLOSED</p>`;
    newArray.forEach(([unit, value]) => {
      changeDue.innerHTML += `<p>${unit}: $${value}</p>`;
    });
  } else {
    changeDue.innerHTML += `<p>Status: OPEN</p>`;
    newArray.forEach(([unit, value]) => {
      changeDue.innerHTML += `<p>${unit}: $${value}</p>`;
    });
  }
  cash.value = 0;
  cid.reverse();
  remainingCashUpdate();
};

purchase.addEventListener("click", remainingChange);
cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    remainingChange();
  }
});
