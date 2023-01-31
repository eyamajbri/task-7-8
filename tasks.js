// US Telephone Number Validator
function telephoneCheck(str) {
  let pattern = /^(1\s?)?(\(\d{3}\)|\d{3})([-\s]){0,2}(\d{3})([-\s]){0,2}(\d{4})$/;
  return pattern.test(str);
}
//Cash Register
function checkCashRegister(price, cash, cid) {
    let changeDue = cash - price;
    let totalCid = 0;
    for (let i = 0; i < cid.length; i++) {
        totalCid += cid[i][1];
    }
    if (changeDue > totalCid) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (changeDue === totalCid) {
        return { status: "CLOSED", change: cid };
    } else {
        const currencyValues = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
        const change = [];
        for (let i = cid.length - 1; i >= 0; i--) {
            const currencyValue = currencyValues[i];
            if (changeDue >= currencyValue && cid[i][1] >= currencyValue) {
                let amount = 0;
                while (changeDue >= currencyValue && cid[i][1] >= currencyValue) {
                    changeDue -= currencyValue;
                    changeDue = Math.round(changeDue * 100) / 100;
                    cid[i][1] -= currencyValue;
                    amount += currencyValue;
                }
                change.push([cid[i][0], amount]);
            }
        }
        if (changeDue > 0) {
            return { status: "INSUFFICIENT_FUNDS", change: [] };
        } else {
            return { status: "OPEN", change: change };
        }
    }
}
