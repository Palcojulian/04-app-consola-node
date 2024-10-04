import { ServerApp } from './presentation/server-app'

describe('Test App.ts', () => {
    test('Should call Server.run with values', async () => {
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = ['node', 'app.ts', '-b', '10', '-l', '6', '-s'];

        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith({
            "base": 10,
            "limit": 6,
            "destination": "outputs",
            "name": "multiplication-table",
            "saveFicheroTxt": false,
            "showTable": true,
        })
    })
})