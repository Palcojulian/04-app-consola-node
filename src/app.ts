
import { yarg  as argv, yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentation/server-app";


// console.log(process.argv);
// console.log(argv);

(async() => {
    await main();
})();

async function main() {
    /*  
        Ejecutar app - Las banderas de definen en el archivo de -
        configuracion yargs.plugin.ts
        npx ts - node src/app -b 8 -l 5 -s -t
    */ 
    const { b: base, l: limit, s: showTable, t:saveFicheroTxt, d: destination, n: name } = argv;
    ServerApp.run({ base, limit, showTable, saveFicheroTxt, destination, name});
}