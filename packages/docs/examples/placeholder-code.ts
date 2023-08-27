export const js = `
const welcomeMessage = "Hello,";
let target = "world!";

function greet(target) {
  console.log(welcomeMessage + " " + target);
}

greet(target);

for (let i = 0; i < 5; i++) {
  console.log(\`Count: \${i}\`);
}
`;
