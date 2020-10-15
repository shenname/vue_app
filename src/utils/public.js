let Public = new Object();

// 加法
Public.Addition = function(a,b){
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
};
// 减法
Public.Subtraction = function(a,b){
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
};
// 乘法
Public.Multiplication = function(arg1,arg2){
     var r1,r2, m, n,q;  
    if(parseInt(arg1) == arg1){  
        r1 = 0;  
    }else{  
        r1 = arg1.toString().split(".")[1].length;  
    }  
    if(parseInt(arg2) == arg2){  
        r2 = 0;  
    }else{  
        r2 = arg2.toString().split(".")[1].length;  
    }  
    m = Math.pow(10,r1);  
    n = Math.pow(10,r2);  
    q = m*n;  
    var sum = (((arg1*m) * (arg2*n))/q);  
    return sum;  
};
// 除法
Public.Division = function(a,b){
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
};

function mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
export default Public;