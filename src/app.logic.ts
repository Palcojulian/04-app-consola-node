import { writeFileSync, mkdirSync } from 'fs';

const n: number = 10;  

let text:string = ''

for (let index = 1; index <= 3; index++) {
    if (index % 2 === 0) {
        text += '         Tabla del 5         \n';
    } else {
        for (let j = 0; j < 30; j++) {
            text += "=";
        }
        text += "\n";
    }
}

for (let index = 1; index <= n; index++) {
    const resul = `5 x ${index} = ${5 * index} \n`;
    text += resul;
}

const outputPath = 'outputs/multiplicacion';
mkdirSync(`${outputPath}`, { recursive: true });
writeFileSync(`${outputPath}/tabla-${5}.txt`, text);
console.log('File created');
