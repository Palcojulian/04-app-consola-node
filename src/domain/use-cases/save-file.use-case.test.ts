import { SaveFile } from './save-file.use-case';
import fs from 'fs';
import path from 'path';

describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'custom content julian',
        fileDestination: 'folder-content-files',
        fileName: 'fichero-de-prueba',
    }

    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`

    //Ciclo de vida, antes de cada prueba hacer lo siguiente
    // beforeEach(() => {
    //     //clean up
    //     fs.rmSync('outputs', { recursive: true });
    // });

    //Ciclo de vida, despues de cada prueba hacer los siguiente.
    afterEach(() => {
        //clean up
        const outputFolderExist = fs.existsSync('outputs');
        if (outputFolderExist) fs.rmSync('outputs', { recursive: true });

        const customOutputFolderExist = fs.existsSync('outputs');
        if (customOutputFolderExist) fs.rmSync(customFilePath, { recursive: true });
    });

    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content',
        }

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(result).toBe(true);
        expect(fileExists).toBe(true);        
        expect(fileContent).toBe(options.fileContent);
    })

    test('should save file with custom values', () => {
        const saveFile = new SaveFile();

        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(customFilePath);
        const contentFile = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(contentFile).toBe(customOptions.fileContent);
    });

    test('should return false if directory file could not be created', () => {
        
        const saveFile = new SaveFile();

        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        );
        const result = saveFile.execute(customOptions);
        expect(result).toBe(false);

        //Restaura el mock implementado con  spyOn
        mkdirSpy.mockRestore();
    });

    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile();

        const mkdirSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        );
        const result = saveFile.execute(customOptions);
        expect(result).toBe(false);

        //Restaura el mock implementado con  spyOn
        mkdirSpy.mockRestore();
    });

})