import { Column, jsonArrToColumn } from "./Column";
import { Cluster, jsonArrToCluster } from "./Cluster";

export interface Tag {
    id: string;
    name: string;
    description: string;
    color: string;
    clusters: Cluster[] | null;
    userId: string;
    columns: Column[] | null;
}

export const jsonObjToTag = (jsonObj: object): Tag => {
    let isClustersNull = jsonObj['Clusters' as keyof typeof jsonObj] ? false : true;
    let isColumnsNull = jsonObj['ColumnID' as keyof typeof jsonObj] ? false : true;
    const tag: Tag = {
        id: jsonObj['ID' as keyof typeof jsonObj],
        name: jsonObj['Name' as keyof typeof jsonObj],
        description: jsonObj['Description' as keyof typeof jsonObj],
        color: jsonObj['Color' as keyof typeof jsonObj],
        clusters: isClustersNull ? null : jsonArrToCluster(jsonObj['Clusters' as keyof typeof jsonObj]),
        userId: jsonObj['UserID' as keyof typeof jsonObj],
        columns: isColumnsNull ? null : jsonArrToColumn(jsonObj['Columns' as keyof typeof jsonObj]),
    }
    return tag;
}

export const jsonArrToTag = (jsonArrObj: object[]): Tag[] => {
    const tags: Tag[] = [];
    jsonArrObj.forEach((jsonObj: object) => {
        tags.push(jsonObjToTag(jsonObj));
    });
    return tags;
}