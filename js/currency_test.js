const lbs_per_pound = 1; // Trivial Homophonic Unit Transposition
const kgs_per_lb = 0.45359237; // 1963 Weights and Measures Act

let demo = () => {
  let rate = fx(1).from("USD").to("GBP")
  alert("$1 = " + (rate*lbs_per_pound*kgs_per_lb).toFixed(4) + " kg")
}

fetch('https://api.fixer.io/latest')
  .then((resp) => resp.json())
  .then((data) => fx.rates = data.rates)
  .then(demo)