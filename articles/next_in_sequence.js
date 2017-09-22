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

		if (exp === 0) {
			html += sign_format(coeff, leading_flag) + coeff;
			leading_flag = false;
			continue;
		} 
		html += sign_format(coeff, leading_flag) + coeff + "x^{" + exp + "}";
		leading_flag = false;
	}
	html += "$$";
	print(html, "poly");
}

function find_linear_recurrence(sequence) {
	// TODO
}

print_polynomial(find_polynomial([4,16,64,256])); // 2^(2*n)