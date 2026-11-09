let a = "123456";

let passwordReg = /^[a-zA-Z0-9]{8,16}$/;
console.log(passwordReg.test(a));