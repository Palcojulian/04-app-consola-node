import { writeFileSync, mkdirSync } from 'fs';

export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}

export interface Options {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileUseCase {

    constructor(
        /*
            repository: StorageRepository
        */
    ) { };
    
    execute({
        fileContent,
        fileDestination = 'outputs',
        fileName = 'table',
    }: Options): boolean {      
        try {
            mkdirSync(`${fileDestination}`, { recursive: true });
            writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
            console.log('File created');
            return true;
        } catch (error) {
            console.log({err: error});
            return false;
        }
    };
}