// const otp = Math.floor( 10000 + Math.random() * 9000);
// console.log(otp);

let cmembers = [1,2,3];
let amembers = [1,2,3];

let newMembers = cmembers.filter(member => {
    return amembers.includes(member) === false;
});

console.log(newMembers);
