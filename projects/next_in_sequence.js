// TODO: 
// Named sequences?
// Trivia e.g. LOST
// OEIS search
// Complexity battle
// LRR + c
// frational format?

const tolerance = 1e-6;

function round_floating_errors(number){
	if (Math.abs(Math.round(number)-number) < tolerance){
		return Math.round(number);
	} else {
		return number;
	}
}

function print(message, id) {
	const output = document.getElementById(id);
	output.innerHTML = message;
}

// ===============================
//    LINEAR RECURRENCE SECTION
// ===============================

function create_coeff_matrix(sequence, size) {
	let M = [];
	let index = size - 1;
	for (let i = 0; i < size; i++){
		row = [];
		for (let j = 0; j < size; j++){
			row.push(sequence[index - j]);
		}
		M.push(row);
		index++;
	}
	return M;
}

function create_coeff_matrix_with_const(sequence, size) {
	let M = [];
	let index = size - 2;
	for (let i = 0; i < size; i++){
		row = [];
		for (let j = 0; j < size; j++){
			if (j === size-1){
				row.push(1);
			} else {
				row.push(sequence[index - j]);
			}
		}
		M.push(row);
		index++;
	}
	return M;
}


function generate_seq(coeffs, initial_vals, length){
	// f[0] = initial_vals[0], f[1] = initial_vals[1], ...
    // f[n] = coeffs[0]*f[n-1] + coeffs[1]*f[n-2] + ...
    let sequence = initial_vals;
	const order = initial_vals.length;
    sequence = sequence.concat(Array(length - order).fill(0));
    if (order === coeffs.length){
        for (let n = order; n < length; n++){
            for (let i = 0; i < coeffs.length; i++){
                sequence[n] += coeffs[i] * sequence[n-i-1]
            }
        }
        return sequence;
    }
    return false;
}


function generate_seq_with_const(coeffs, initial_vals, length){
	// f[0] = initial_vals[0], f[1] = initial_vals[1], ...
    // f[n] = coeffs[0]*f[n-1] + coeffs[1]*f[n-2] + ... + coeffs[n-1]
    let sequence = initial_vals;
	const order = initial_vals.length;
    sequence = sequence.concat(Array(length - order).fill(0));
    if (order === coeffs.length-1){
        for (let n = order; n < length; n++){
        	let i = 0
            for (; i < coeffs.length-1; i++){
                sequence[n] += coeffs[i] * sequence[n-i-1]
            }
            sequence[n] += coeffs[i];
        }
        return sequence;
    }
    return false;
}

//console.log(generate_seq_with_const([6,-1,-2],[1,3],10));
console.log(create_coeff_matrix([1,3,15,85,493], 3));

function find_linear_recurrence(sequence) {
	const len = sequence.length;
	// Maximum order is half sequence length
	for(let order = 1; order <= len/2; order++){
		let initial_vals = sequence.slice(0, order);
		let M = create_coeff_matrix(sequence, order);
		let coeffs = math.lusolve(M, sequence.slice(order, 2*order));
		// Check proposed recurence relation satisfies all data
		let predicted = generate_seq(coeffs, initial_vals, len);
		let diff = math.subtract(predicted, sequence);
		if (diff.every(x => Math.abs(x) < tolerance)){
			return {coeffs: coeffs, initial_vals: initial_vals};
		}
	}
	return false;
}

function find_linear_recurrence_with_const(sequence) {
	const len = sequence.length;
	// Maximum order is half sequence length + 1
	for(let order = 1; order <= len/2; order++){
		let initial_vals = sequence.slice(0, order);
		let M = create_coeff_matrix_with_const(sequence, order+1);
		console.log(M);
		let coeffs = math.lusolve(M, sequence.slice(order-1, 2*order-1));
		// Check proposed recurence relation satisfies all data
		let predicted = generate_seq_with_const(coeffs, initial_vals, len);
		let diff = math.subtract(predicted, sequence);
		if (diff.every(x => Math.abs(x) < tolerance)){
			return {coeffs: coeffs, initial_vals: initial_vals};
		}
	}
	return false;
}

console.log(find_linear_recurrence_with_const([1,3,15,85,493]));

function print_linear_recurrence(lrr) {
	let html = "";
	if (lrr){
		let leading_flag = true;
		for (let i = 0; i < lrr.initial_vals.length; i++){
			html += "$$F["+ i + "]=" + lrr.initial_vals[i] + "$$ ";
		}
		
		html += "$$F[n]="
		for (i = 0; i < lrr.coeffs.length; i++) {
			coeff = lrr.coeffs[i][0];
			coeff = round_floating_errors(coeff);
			if (coeff === 0 && !(leading_flag && i === lrr.coeffs.length - 1)){
				continue;
			} else if (coeff === -1){
				html += "-";
			} else if (coeff === 1 && leading_flag){
				html += "";
			} else if (coeff === 1){
				html += "+";
			} else if (coeff < 0 || leading_flag){
				html += coeff;
			} else {
				html += "+" + coeff;
			}
			html += "F[n-" + (i+1) + "]";
			leading_flag = false;
		}	
		html += "$$";
		print(html, "lrr");
	} else {
		print("Nope", "lrr");
	}
}

function print_linear_recurrence_with_const(lrr) {
	let html = "";
	if (lrr){
		let leading_flag = true;
		for (let i = 0; i < lrr.initial_vals.length; i++){
			html += "$$F["+ i + "]=" + lrr.initial_vals[i] + "$$ ";
		}
		
		html += "$$F[n]="
		for (i = 0; i < lrr.coeffs.length; i++) {
			coeff = lrr.coeffs[i][0];
			coeff = round_floating_errors(coeff);
			if (coeff === 0 && !(leading_flag && i === lrr.coeffs.length - 1)){
				continue;
			} else if (coeff === -1){
				html += "-";
			} else if (coeff === 1 && leading_flag){
				html += "";
			} else if (coeff === 1){
				html += "+";
			} else if (coeff < 0 || leading_flag || i === lrr.coeffs.length - 1){
				html += coeff;
			} else {
				html += "+" + coeff;
			}
			if (i !== lrr.coeffs.length - 1){
				html += "F[n-" + (i+1) + "]";
			}
			leading_flag = false;
		}	
		html += "$$";
		print(html, "lrr_c");
	} else {
		print("Nope", "lrr_c");
	}
}

// ===============================
//       POLYNOMIAL SECTION
// ===============================

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
	let html = "$$f(x)=";
	let leading_flag = true;

	for(let i = coeffs.length-1; i >= 0; i--){
		let coeff = coeffs[i][0];
		coeff = round_floating_errors(coeff);
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

function parse_input() {
	let sequence = document.getElementById("input1").value.split(/[ ,]+/);
	sequence = sequence.filter(elem => elem.length > 0);
	sequence = sequence.map(Number);
	return sequence;
}

function main() {
	const sequence = parse_input();
	const polynomial = find_polynomial(sequence);
	print_polynomial(polynomial);

	const linear_recurrence = find_linear_recurrence(sequence);
	print_linear_recurrence(linear_recurrence);

	const linear_recurrence_with_const = find_linear_recurrence_with_const(sequence);
	print_linear_recurrence_with_const(linear_recurrence_with_const);
	// Rerun MathJax
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}