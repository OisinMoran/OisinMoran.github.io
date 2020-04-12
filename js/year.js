const G = 6.67408E-11; // (m^3 kg^-1 s^-2) gravitational constant
const M = 1.9884E30; // (kg) mass of more massive body, in this case the sun
let d = 365.256363004;
let T = 60 * 60 * 24 * d; // (s) length of orbit

function get_semi_major(G, M, T) {
    return Math.pow((G * M * Math.pow(T, 2)) / (4 * Math.pow(Math.PI, 2)), 1/3); // (m) semi-major axis of orbit
}

// let a = get_semi_major(G, M, T); 
// console.log(a/1E3); // = 1AU

// d = 365; // exactly
// T = 60 * 60 * 24 * d;
// b = get_semi_major(G, M, T);
// console.log((a - b)/10E3);

// d = 366; // exactly
// T = 60 * 60 * 24 * d;
// c = get_semi_major(G, M, T);
// console.log((a - c)/10E3);

// console.log(findPrimeFactors(365));

// looking for highly composite numbers
// and close approximations

// how to make leap year rule
// -> interesting thing is it doesn't actually matter how long the year is
// all that matters is this fractional part! Fun insight!
T = 365.256363004;
T = 365.2425;
fractionalPart = T - Math.round(T); // sign does matter here
console.log(fractionalPart);

// extra day every n years
roundedYears = Math.round(1/fractionalPart);
console.log(roundedYears);
remainder = 1/roundedYears - fractionalPart;
console.log(1/remainder); // sign matters here too



// d = 7 * 4 * 12;
// T = 60 * 60 * 24 * d;
// console.log(findPrimeFactors(d));
// c = get_semi_major(G, M, T);
// console.log(c/1E6);