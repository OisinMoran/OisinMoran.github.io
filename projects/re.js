var n = 5
// var kernel = "0.125 0.125 0.125 0.125 -0.99 0.125 0.125 0.125 0.125";
var k = 1 / (n*n - 1);
var tings = []

for (var i=0; i < n*n; i++) {
    if (i === Math.floor(n*n/2)) {
        tings.push(-1.0);    
    }
    else {
        tings.push(k);
    }
}

var kernel = tings.join(" ");
var x = document.getElementById("filter");
var f = `<feGaussianBlur stdDeviation="2"/>
         <feConvolveMatrix order="${n},${n}" kernelMatrix="${kernel}"/>
         <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0 1"/>
            <feFuncG type="discrete" tableValues="0 1"/>
            <feFuncB type="discrete" tableValues="0 1"/>
         </feComponentTransfer>`

function iterate() {
    setTimeout(()=>{
        x.innerHTML += f;
        iterate();
    }, 10);
}

iterate();
