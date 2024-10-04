import { ServerApp } from './server-app';
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

const options = {
    base: 2,
    limit: 10,
    showTable: false,
    destination: "test-destination",
    name: "test-filename",
    saveFicheroTxt: true,
}

describe("Server App", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("Should create ServerApp instance", () => {
        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test("Should run ServerApp with options", () => {

        const logSpy = jest.spyOn(console, "log");
        const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
        const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

        ServerApp.run(options);
        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(logSpy).toHaveBeenCalledWith('Server runnig...');
        expect(logSpy).toHaveBeenCalledWith('File created');

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit,
        })

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.destination,
            fileName: options.name,
        })
    })

    test("Should run with custom values mocks", () => {

        const textContentTest = '1 x 2 = 2';
        //Mock de las funciones
        const logErrorMock = jest.fn();
        const logMock = jest.fn();
        const createMock = jest.fn().mockReturnValue(textContentTest);
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.error = logErrorMock;
        console.log = logMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server runnig...')
        expect(createMock).toHaveBeenCalledWith({
            "base": options.base,
            "limit":options.limit,
        });

        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: textContentTest,
            fileDestination: options.destination,
            fileName: options.name,
        })

        expect(logMock).toHaveBeenCalledWith('File created')
        expect(logErrorMock).not.toHaveBeenCalledWith()

    })

})