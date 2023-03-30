import { Table, jsonArrToTable } from './Table';

export interface ImportedDatabase {
    id: string;
    name: string;
    dbms: string;
    status: string;
    description: string;
    connectionProfileId: string;
    tables: Table[] | null;
}

export const jsonObjToImportedDatabase = (jsonObj: object): ImportedDatabase => {
    let isTablesNull = jsonObj['Tables' as keyof typeof jsonObj] ? false : true;
    const importedDatabase: ImportedDatabase = {
        id: jsonObj['ID' as keyof typeof jsonObj],
        name: jsonObj['Name' as keyof typeof jsonObj],
        dbms: jsonObj['Dbms' as keyof typeof jsonObj],
        status: jsonObj['Status' as keyof typeof jsonObj],
        description: jsonObj['Description' as keyof typeof jsonObj],
        connectionProfileId: jsonObj['ConnectionProfileID' as keyof typeof jsonObj],
        tables: isTablesNull ? null : jsonArrToTable(jsonObj['Tables' as keyof typeof jsonObj]),
    }
    return importedDatabase;
}