import { Tag, jsonArrToTag } from "./Tag";

export interface Column {
    id: string;
    name: string;
    dataType: string;
    isNullable: boolean;
	key: string;
	defaultValue: string;
	extra: string;
	description: string;
	tags: Tag[] | null;
}

export const jsonObjToColumn = (jsonObj: object): Column => {
    let isTagsNull = jsonObj['Tags' as keyof typeof jsonObj] ? false : true;
    const column: Column = {
        id: jsonObj['ID' as keyof typeof jsonObj],
        name: jsonObj['Name' as keyof typeof jsonObj],
        dataType: jsonObj['Datatype' as keyof typeof jsonObj],
        isNullable: jsonObj['IsNullable' as keyof typeof jsonObj],
        key: jsonObj['Key' as keyof typeof jsonObj],
        defaultValue: jsonObj['DefaultValue' as keyof typeof jsonObj],
        extra: jsonObj['Extra' as keyof typeof jsonObj],
        description: jsonObj['Description' as keyof typeof jsonObj],
        tags: isTagsNull ? null : jsonArrToTag(jsonObj['Tags' as keyof typeof jsonObj]),
    }
    return column;
}

export const jsonArrToColumn = (jsonArrObj: object[]): Column[] => {
    const columns: Column[] = [];
    jsonArrObj.forEach((jsonObj: object) => {
        columns.push(jsonObjToColumn(jsonObj));
    });
    return columns;
}