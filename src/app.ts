
import { yarg  as argv, yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentation/server-app";


// console.log(process.argv);
// console.log(argv);

(async() => {
    await main();
})();

async function main() {
    const { b: base, l: limit, s: showTable, t:saveFicheroTxt } = argv;

    ServerApp.run({ base, limit, showTable, saveFicheroTxt,});
}