import { signOut } from "next-auth/react"
import { ConnectionProfile, jsonObjToConnectionProfile } from "../interfaces/ConnectionProfile"
import { ImportedDatabase, jsonObjToImportedDatabase } from "../interfaces/ImportedDatabase"
import { Table, jsonObjToTable } from "../interfaces/Table"
import { Column, jsonObjToColumn } from "../interfaces/Column"
import { Cluster, jsonObjToCluster } from "../interfaces/Cluster"
import { Tag, jsonObjToTag } from "../interfaces/Tag"
import { getSession } from "next-auth/react"
import jwt from "jsonwebtoken";

export const generateUserToken = async (userData?: any) =>
    await getSession().then(async (session) => {
        const secret = process.env.NEXT_PUBLIC_JWT_SECRET
        const payload = (session?.user || userData)
        const token = jwt.sign(payload, secret as any, {
            algorithm: "HS256",
            expiresIn: 5, // 5 seconds
        })
        return token
    });

export const handleResponse = async (response: any, serviceType: string) => {
    if (response) {
        let data;
        try {
            data = await response.json()
        } catch (error) {
            data = { status: "error", message: "An error occurred while parsing the response" }
        }

        if (data.status === "success") {
            if (!data.data) {
                return data
            }
            switch (serviceType) {
                case "connectionProfile":
                    if (Array.isArray(data.data)) {
                        const connectionProfiles: ConnectionProfile[] = []
                        data.data.forEach((connectionProfile: object) => {
                            connectionProfiles.push(jsonObjToConnectionProfile(connectionProfile))
                        })
                        data.data = connectionProfiles
                        return data
                    } else {
                        data.data = jsonObjToConnectionProfile(data.data)
                        return data
                    }
                case "importedDatabase":
                    if (Array.isArray(data.data)) {
                        const importedDatabases: ImportedDatabase[] = []
                        data.data.forEach((importedDatabase: object) => {
                            importedDatabases.push(jsonObjToImportedDatabase(importedDatabase))
                        })
                        data.data = importedDatabases
                        return data
                    } else {
                        data.data = jsonObjToImportedDatabase(data.data)
                        return data
                    }
                case "table":
                    if (Array.isArray(data.data)) {
                        const tables: Table[] = []
                        data.data.forEach((table: object) => {
                            tables.push(jsonObjToTable(table))
                        })
                        data.data = tables
                        return data
                    } else {
                        data.data = jsonObjToTable(data.data)
                        return data
                    }
                case "column":
                    if (Array.isArray(data.data)) {
                        const columns: Column[] = []
                        data.data.forEach((column: object) => {
                            columns.push(jsonObjToColumn(column))
                        })
                        data.data = columns
                        return data
                    } else {
                        data.data = jsonObjToColumn(data.data)
                        return data
                    }
                case "cluster":
                    if (Array.isArray(data.data)) {
                        const clusters: Cluster[] = []
                        data.data.forEach((cluster: object) => {
                            clusters.push(jsonObjToCluster(cluster))
                        })
                        data.data = clusters
                        return data
                    } else {
                        data.data = jsonObjToCluster(data.data)
                        return data
                    }
                case "tag":
                    if (Array.isArray(data.data)) {
                        const tags: Tag[] = []
                        data.data.forEach((tag: object) => {
                            tags.push(jsonObjToTag(tag))
                        })
                        data.data = tags
                        return data
                    } else {
                        data.data = jsonObjToTag(data.data)
                        return data
                    }
                default:
                    return data
            }
        } else {
            if (data) {
                if (data.message === "Token is expired") {
                    // Router.push("/dashboard").then(() => {
                    //     return signOut()
                    // })
                    return signOut()
                }
                return data
            }
            return data
        }
    }
    return null
}
