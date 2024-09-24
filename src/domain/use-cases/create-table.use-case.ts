export interface CreateTableUseCase {
    execute: (options: Options) => string;
}

export interface Options {
    base: number;
    limit?: number;
}

export class CreateTable  implements CreateTableUseCase{

    constructor(
        /**
       * DI - Dependency Injection
       */
    ) { };

    execute({ base, limit = 10 } : Options) {

        let outputMessage: string = '';
        for (let index = 1; index <= limit; index++) {
            outputMessage += `${base} x ${index} = ${base * index}`;
            if (index < limit) outputMessage += '\n';
        }

        return outputMessage;
    }
}
