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

function sign_format(coeff, leading_flag) {
	if(leading_flag && coeff === -1){
		return '-';
	} else if (leading_flag) {
		return '';
	} else {
		return (coeff<0?'':'+');
	}
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

// TO DO: Fix this to deal with exponential form (e.g. input of "1,2,4,8" gives v small number)
function print_polynomial(coeffs) {
	let html = "$$f(x)=";
	let leading_flag = true;
	for(let i = coeffs.length-1; i >= 0; i--){
		let coeff = coeffs[i][0];
		let exp = i;

		if (exp === 1){
			exp = "";
		}

		if(coeff === 0){
			continue;
		} else if ((coeff === 1 || coeff === -1) && exp !== 0){
			html += sign_format(coeff, leading_flag) + "x^{" + exp + "}";
			leading_flag = false;
			continue;
		}

		if (exp === 0 && leading_flag === true) {
			html += round(coeff, 4);
			leading_flag = false;
			continue;
		} else if (exp === 0){
			html += sign_format(coeff, leading_flag) + round(coeff, 4);
			leading_flag = false;
			continue;
		} 
		html += sign_format(coeff, leading_flag) + round(coeff, 4) + "x^{" + exp + "}";
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