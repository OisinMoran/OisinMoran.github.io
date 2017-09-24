function round(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

function print(message, id) {
	const output = document.getElementById(id);
	output.innerHTML = message;
}

function find_polynomial(sequence) {
	const len = sequence.length;
	let M = [];
	for(let i = 0; i < len; i++){
		row = [];
		for(let j = 0; j < len; j++){
			row.push(i**j);
		}
		M.push(row);
	}
	return math.lusolve(M, sequence);
}

// TO DO: Fix this to deal with exponential form (e.g. input of "1,2,4,8" gives v small number) and general number formatting
// -> round(coeff, 4)
// My god, human beings are awkward
function print_polynomial(coeffs) {
	console.log(coeffs)
	let html = "$$f(x)=";
	let leading_flag = true;


	for(let i = coeffs.length-1; i >= 0; i--){
		let coeff = coeffs[i][0];
		let exp = i;

		// Coefficients
		if (leading_flag && exp === 0){
			html += coeff;
			continue;
		} else if (coeff === 0){
			continue;
		} else if (coeff === -1 && exp !== 0){
			html += "-";
		} else if (coeff === -1){
			html += coeff;
		} else if (coeff === 1 && leading_flag && exp !== 0){
			html += "";
		} else if (coeff === 1 && exp !== 0){
			html += "+";
		} else if (coeff > 0 && leading_flag){
			html += coeff;
		} else if (coeff > 0){
			html += "+" + coeff;
		} else {
			html += coeff;
		}

		// X terms
		if (exp === 1){
			html += "x"
		} else if (exp >= 2){
			html += "x^{" + exp + "}"
		}
		leading_flag = false;
	}
	html += "$$";
	print(html, "poly");
}

function find_linear_recurrence(sequence) {
	// TODO
}

function parse_and_solve() {
	let sequence = document.getElementById("input1").value.split(/[ ,]+/);
	sequence = sequence.filter(elem => elem.length > 0);
	sequence = sequence.map(Number);
	print_polynomial(find_polynomial(sequence)); // 4,16,64,256 -> 2^(2*n)
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}