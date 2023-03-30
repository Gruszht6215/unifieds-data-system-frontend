import { ImportedDatabase, jsonObjToImportedDatabase } from './ImportedDatabase';
export interface ConnectionProfile {
    id: string;
    dbms: string;
    connectionName: string;
    host: string;
    port: string;
    databaseName: string;
    username: string;
    password: string;
    importedDatabase: ImportedDatabase | null;
}

export const jsonObjToConnectionProfile = (jsonObj: object): ConnectionProfile => {
    const connectionProfile: ConnectionProfile = {
        id: jsonObj['ID' as keyof typeof jsonObj],
        dbms: jsonObj['Dbms' as keyof typeof jsonObj],
        connectionName: jsonObj['ConnectionName' as keyof typeof jsonObj],
        host: jsonObj['Host' as keyof typeof jsonObj],
        port: jsonObj['Port' as keyof typeof jsonObj],
        databaseName: jsonObj['DatabaseName' as keyof typeof jsonObj],
        username: jsonObj['Username' as keyof typeof jsonObj],
        password: jsonObj['Password' as keyof typeof jsonObj],
        importedDatabase: jsonObjToImportedDatabase(jsonObj['ImportedDatabase' as keyof typeof jsonObj]),
    }
    return connectionProfile;
}