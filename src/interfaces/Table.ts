import { Column, jsonArrToColumn } from "../interfaces/Column";

export interface Table {
    id: string;
    name: string;
	description: string;
	importedDatabaseID: string;
    columns: Column[] | null;
    createdAt?: String;
}

export const jsonObjToTable = (jsonObj: object): Table => {
    let isColumnNull = jsonObj['Columns' as keyof typeof jsonObj] ? false : true;
    const table: Table = {
        id: jsonObj['ID' as keyof typeof jsonObj],
        name: jsonObj['Name' as keyof typeof jsonObj],
        description: jsonObj['Description' as keyof typeof jsonObj],
        importedDatabaseID: jsonObj['ImportedDatabaseID' as keyof typeof jsonObj],
        columns: isColumnNull ? null : jsonArrToColumn(jsonObj['Columns' as keyof typeof jsonObj]),
        createdAt: jsonObj['CreatedAt' as keyof typeof jsonObj] ? (jsonObj['CreatedAt' as keyof typeof jsonObj]) : undefined
    }
    return table;
}

export const jsonArrToTable = (jsonArrObj: object[]): Table[] => {
    const tables: Table[] = [];
    jsonArrObj.forEach((jsonObj: object) => {
        tables.push(jsonObjToTable(jsonObj));
    });
    return tables;
}
