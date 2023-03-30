import { Tag, jsonArrToTag } from "./Tag";

export interface Cluster {
    id: string;
    name: string;
    userId: string;
    tags: Tag[] | null;
}

export const jsonObjToCluster = (jsonObj: object): Cluster => {
    let isTagsNull = jsonObj['Tags' as keyof typeof jsonObj] ? false : true;
    const cluster: Cluster = {
        id: jsonObj['ID' as keyof typeof jsonObj],
        name: jsonObj['Name' as keyof typeof jsonObj],
        userId: jsonObj['UserID' as keyof typeof jsonObj],
        tags: isTagsNull ? null : jsonArrToTag(jsonObj['Tags' as keyof typeof jsonObj]),
    }
    return cluster;
}

export const jsonArrToCluster = (jsonArrObj: object[]): Cluster[] => {
    const clusters: Cluster[] = [];
    jsonArrObj.forEach((jsonObj: object) => {
        clusters.push(jsonObjToCluster(jsonObj));
    });
    return clusters;
}