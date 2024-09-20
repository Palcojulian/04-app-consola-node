
import { yarg  as argv } from "./config/plugins/yargs.plugin";

// console.log(process.argv);
// console.log(argv);

(async() => {
    await main();
    console.log('Fin del programa');

})();

async function main() {
    console.log('Main ejecutado');
    
}