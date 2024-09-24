import { CreateTable } from './create-table.use-case';

describe('CreateTableUseCase', () => {


    test('Should create table with deafult values', () => {


        const createTable = new CreateTable();
        const table = createTable.execute({ base: 2 });
        const rows = table.split('\n').length;

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('2 x 1 = 2');
        expect(table).toContain('2 x 10 = 20');
        expect(rows).toBe(10);

    })

    test('Should create table with custom values', () => {
        const options = {
            base: 3,
            limit: 7,
        }


        const lastValue = options.base * options.limit;
        const middleValue = options.limit % 2 === 0 ? (options.limit / 2) * 3 : Math.floor(options.limit / 2) * 3;
        
        console.log(middleValue);
        

        const createTable = new CreateTable();
        const table = createTable.execute({ base: options.base, limit: options.limit });
        
        const splitValues = table.split('\n');
        const findLastValue = splitValues[splitValues.length - 1];
        const findMiddleValue = splitValues[(Math.floor(splitValues.length / 2)) - 1];

        expect(splitValues.length).toEqual(options.limit);
        expect(findLastValue).toContain(lastValue + '');
        expect(findMiddleValue).toContain(middleValue + '');

        console.log(table);
        

    })


})