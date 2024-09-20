interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    saveFicheroTxt: boolean;
}


export class ServerApp {

    static run(options: RunOptions) {
        console.log(options);
        console.log('Server runnig...');
    }
}