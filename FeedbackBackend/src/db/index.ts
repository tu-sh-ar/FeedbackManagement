//const mysql = require('mysql');
import { MongoClient, Collection, Db } from 'mongodb';
import mongoose from 'mongoose';

let FeedbackDb: { [key: string]: Function } = {};
let database: Db;
let client: MongoClient | null = null;

interface DocumentData {
    [key: string]: any;
}

export async function configureDB() {
    await mongoose.connect("mongodb+srv://yashraj7011:12345@feedbackmanagement.llintv8.mongodb.net/feedbackmanagement")
        .then(res => console.log("Database connected successfully"))
        .catch(err => console.log(`Database not connected : ${err}`))
}


FeedbackDb.maxId = async (collectionName: string): Promise<number | null> => {
    let maxCount: number | null = null;
    try {
        await configureDB();
        const collection: Collection<DocumentData> = database.collection(collectionName);
        const cursor = collection.aggregate([
            {
                "$group": {
                    "_id": null,
                    "MaximumValue": { "$max": "$id" }
                }
            }
        ]);

        for await (const doc of cursor) {
            maxCount = doc.MaximumValue;
        }
    } catch (e) {
        console.log("Error: " + e);
    } finally {
        console.log("Connection Closed");
        await client?.close();
    }
    return maxCount;
};

FeedbackDb.createDocument = async (collectionName: string, documentData: DocumentData): Promise<void> => {
    try {
        await configureDB();
        const collection: Collection<DocumentData> = database.collection(collectionName);
        await collection.insertOne(documentData);
    } catch (e) {
        console.log("Error: " + e);
    } finally {
        console.log("Connection Closed");
        await client?.close();
    }
};

FeedbackDb.updateDocument = async (collectionName: string, documentData: DocumentData, documentId: string | number): Promise<void> => {
    try {
        const options = { upsert: false };
        let oldData: DocumentData = {};

        if (collectionName === "batch") {
            oldData = { "batchId": parseInt(documentId as string) };
        } else {
            oldData = { "id": parseInt(documentId as string) };
        }

        console.log(collectionName + " " + JSON.stringify(documentData) + " " + JSON.stringify(oldData));
        await configureDB();
        const collection: Collection<DocumentData> = database.collection(collectionName);
        await collection.updateOne(oldData, documentData, options);
    } catch (e) {
        console.log("Error: " + e);
    } finally {
        console.log("Connection Closed");
        await client?.close();
    }
};

FeedbackDb.getDocument = async (collectionName: string, field: string, value: any) => {
    console.log("field " + field);
    try {
        const query: DocumentData = {};
        query[field] = value;

        console.log("query " + JSON.stringify(query));
        const items: DocumentData[] = [];
        await configureDB();
        const collection: Collection<DocumentData> = database.collection(collectionName);
        const cursor = collection.find(query);
        for await (const doc of cursor) {
            items.push(removeFields(doc, collectionName));
        }
        console.log("items " + JSON.stringify(items));
        return items;
    } catch (e) {
        console.log("Error: " + e);
    } finally {
        console.log("Connection Closed");
        await client?.close();
    }
};


FeedbackDb.getInitialDocument = async (collectionName: string, field: string, value: any) => {
    console.log("field " + field);
    try {
        const query: DocumentData = {};
        query[field] = value;
        console.log("query " + JSON.stringify(query));
        const items: DocumentData[] = [];
        await configureDB();
        const collection: Collection<DocumentData> = database.collection(collectionName);
        const cursor = collection.find(query);
        for await (const doc of cursor) {
            items.push(doc);
        }
        console.log("items " + JSON.stringify(items));
        return items;
    } catch (e) {
        console.log("Error: " + e);
    } finally {
        console.log("Connection Closed");
        await client?.close();
    }
};

FeedbackDb.getDocumentByFilter = async (collectionName: string, filter: DocumentData) => {
    try {
        const query: DocumentData = {};

        for (const attributename in filter) {
            if (attributename === "id") {
                query.id = parseInt(filter[attributename] as string);
            } else {
                query[attributename] = filter[attributename];
            }
        }

        console.log("query " + JSON.stringify(query));
        const items: DocumentData[] = [];
        await configureDB();
        const collection: Collection<DocumentData> = database.collection(collectionName);
        const cursor = collection.find(query);
        for await (const doc of cursor) {
            items.push(doc);
        }
        return items;
    } catch (e) {
        console.log("Error: " + e);
    } finally {
        console.log("Connection Closed");
        await client?.close();
    }
};

FeedbackDb.deleteDocument = async (collectionName: string, documentId: string | number): Promise<void> => {
    try {
        let data: DocumentData = {};
        if (collectionName === "batch") {
            data = { "batchId": parseInt(documentId as string) };
        } else {
            data = { "id": parseInt(documentId as string) };
        }
        await configureDB();
        const collection: Collection<DocumentData> = database.collection(collectionName);
        await collection.deleteOne(data);
    } catch (e) {
        console.log("Error: " + e);
    } finally {
        console.log("Connection Closed");
        await client?.close();
    }
};


FeedbackDb.getDocumentByObject = async (collectionName: string, query: DocumentData) => {
    try {
        console.log("query " + JSON.stringify(query));
        const items: DocumentData[] = [];
        await configureDB();
        const collection: Collection<DocumentData> = database.collection(collectionName);
        const cursor = collection.find(query);

        for await (const doc of cursor) {
            items.push(doc);
        }

        return items;
    } catch (e) {
        console.log("Error: " + e);
    } finally {
        console.log("Connection Closed");
        await client?.close();
    }
};

function removeFields(doc: DocumentData, collectionName: string): DocumentData {
    return doc;
}

export default FeedbackDb;