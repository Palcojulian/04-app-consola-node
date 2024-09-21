import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base            : number;
    limit           : number;
    showTable       : boolean;
    saveFicheroTxt  : boolean;
    name            : string;
    destination     : string;
}


export class ServerApp {

    static run({ base, limit, saveFicheroTxt, showTable, destination, name }: RunOptions) {
        console.log('Server runnig...');
        console.log({ base, limit, saveFicheroTxt, showTable });

        const table = new CreateTable().execute({ base, limit });
        const wasCreatedFile = new SaveFile().execute({
            fileContent: table,
            fileDestination: destination,
            fileName: name,
        });

        if (showTable) console.log(table);

    }
}