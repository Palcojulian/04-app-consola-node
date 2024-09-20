import { writeFileSync, mkdirSync } from 'fs';
import { yarg } from './config/plugins/yargs.plugin';

const { b: base, l: limit, s: showTable, t: saveFicheroTxt } = yarg;

let text:string = ''

for (let index = 1; index <= 3; index++) {
    if (index % 2 === 0) {
        text += `         Tabla del ${base}         \n`;
    } else {
        for (let j = 0; j < 30; j++) {
            text += "=";
        }
        text += "\n";
    }
}

for (let index = 1; index <= limit; index++) {
    const resul = `${base} x ${index} = ${base * index} \n`;
    text += resul;
}

if (showTable) console.log(text);

if (saveFicheroTxt) {
    const outputPath = 'outputs/multiplicacion';
    mkdirSync(`${outputPath}`, { recursive: true });
    writeFileSync(`${outputPath}/tabla-${base}.txt`, text);
    console.log('File created');
}

console.log('End program :3 ');
