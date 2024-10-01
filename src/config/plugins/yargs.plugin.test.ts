// import { yarg } from './yargs.plugin';

const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];
    const { yarg } = await import('./yargs.plugin');
    return yarg;
}

describe('Test args.plugin.ts', () => {

    const originalArgv = process.argv;

    //Resetear variables despues de cada prueba.
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('Should return default values', async () => {
        const argv = await runCommand(['-b', '5']);
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }))
    });

    test('Should return configuration with custom values', async () => {
        const b = 10, l = 3, s = true, n = 'tabla-multiplicar', d = 'multiplicaciones';
        
        const options = [
            '-b', (b+''),
            '-l', (l+''),
            '-s', '',
            '-n', n,
            '-d', d
        ];

        const argv = await runCommand(options);

        console.log(argv);
        
        expect(argv).toEqual(expect.objectContaining({
            b: b,
            l: l,
            s: s,
            n: n,
            d: d,
        }))
    })
})
