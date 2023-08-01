"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let FeedbackDb = {};
let database;
let client = null;
function configureDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb+srv://yashraj7011:12345@feedbackmanagement.llintv8.mongodb.net/test")
            .then(res => console.log("Database connected successfully"))
            .catch(err => console.log(`Database not connected : ${err}`));
    });
}
exports.configureDB = configureDB;
FeedbackDb.maxId = (collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    let maxCount = null;
    try {
        yield configureDB();
        const collection = database.collection(collectionName);
        const cursor = collection.aggregate([
            {
                "$group": {
                    "_id": null,
                    "MaximumValue": { "$max": "$id" }
                }
            }
        ]);
        try {
            for (var _d = true, cursor_1 = __asyncValues(cursor), cursor_1_1; cursor_1_1 = yield cursor_1.next(), _a = cursor_1_1.done, !_a; _d = true) {
                _c = cursor_1_1.value;
                _d = false;
                const doc = _c;
                maxCount = doc.MaximumValue;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = cursor_1.return)) yield _b.call(cursor_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    catch (e) {
        console.log("Error: " + e);
    }
    finally {
        console.log("Connection Closed");
        yield (client === null || client === void 0 ? void 0 : client.close());
    }
    return maxCount;
});
FeedbackDb.createDocument = (collectionName, documentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield configureDB();
        const collection = database.collection(collectionName);
        yield collection.insertOne(documentData);
    }
    catch (e) {
        console.log("Error: " + e);
    }
    finally {
        console.log("Connection Closed");
        yield (client === null || client === void 0 ? void 0 : client.close());
    }
});
FeedbackDb.updateDocument = (collectionName, documentData, documentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = { upsert: false };
        let oldData = {};
        if (collectionName === "batch") {
            oldData = { "batchId": parseInt(documentId) };
        }
        else {
            oldData = { "id": parseInt(documentId) };
        }
        console.log(collectionName + " " + JSON.stringify(documentData) + " " + JSON.stringify(oldData));
        yield configureDB();
        const collection = database.collection(collectionName);
        yield collection.updateOne(oldData, documentData, options);
    }
    catch (e) {
        console.log("Error: " + e);
    }
    finally {
        console.log("Connection Closed");
        yield (client === null || client === void 0 ? void 0 : client.close());
    }
});
FeedbackDb.getDocument = (collectionName, field, value) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, e_2, _f, _g;
    console.log("field " + field);
    try {
        const query = {};
        query[field] = value;
        console.log("query " + JSON.stringify(query));
        const items = [];
        yield configureDB();
        const collection = database.collection(collectionName);
        const cursor = collection.find(query);
        try {
            for (var _h = true, cursor_2 = __asyncValues(cursor), cursor_2_1; cursor_2_1 = yield cursor_2.next(), _e = cursor_2_1.done, !_e; _h = true) {
                _g = cursor_2_1.value;
                _h = false;
                const doc = _g;
                items.push(removeFields(doc, collectionName));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_h && !_e && (_f = cursor_2.return)) yield _f.call(cursor_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        console.log("items " + JSON.stringify(items));
        return items;
    }
    catch (e) {
        console.log("Error: " + e);
    }
    finally {
        console.log("Connection Closed");
        yield (client === null || client === void 0 ? void 0 : client.close());
    }
});
FeedbackDb.getInitialDocument = (collectionName, field, value) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, e_3, _k, _l;
    console.log("field " + field);
    try {
        const query = {};
        query[field] = value;
        console.log("query " + JSON.stringify(query));
        const items = [];
        yield configureDB();
        const collection = database.collection(collectionName);
        const cursor = collection.find(query);
        try {
            for (var _m = true, cursor_3 = __asyncValues(cursor), cursor_3_1; cursor_3_1 = yield cursor_3.next(), _j = cursor_3_1.done, !_j; _m = true) {
                _l = cursor_3_1.value;
                _m = false;
                const doc = _l;
                items.push(doc);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (!_m && !_j && (_k = cursor_3.return)) yield _k.call(cursor_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        console.log("items " + JSON.stringify(items));
        return items;
    }
    catch (e) {
        console.log("Error: " + e);
    }
    finally {
        console.log("Connection Closed");
        yield (client === null || client === void 0 ? void 0 : client.close());
    }
});
FeedbackDb.getDocumentByFilter = (collectionName, filter) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, e_4, _p, _q;
    try {
        const query = {};
        for (const attributename in filter) {
            if (attributename === "id") {
                query.id = parseInt(filter[attributename]);
            }
            else {
                query[attributename] = filter[attributename];
            }
        }
        console.log("query " + JSON.stringify(query));
        const items = [];
        yield configureDB();
        const collection = database.collection(collectionName);
        const cursor = collection.find(query);
        try {
            for (var _r = true, cursor_4 = __asyncValues(cursor), cursor_4_1; cursor_4_1 = yield cursor_4.next(), _o = cursor_4_1.done, !_o; _r = true) {
                _q = cursor_4_1.value;
                _r = false;
                const doc = _q;
                items.push(doc);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (!_r && !_o && (_p = cursor_4.return)) yield _p.call(cursor_4);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return items;
    }
    catch (e) {
        console.log("Error: " + e);
    }
    finally {
        console.log("Connection Closed");
        yield (client === null || client === void 0 ? void 0 : client.close());
    }
});
FeedbackDb.deleteDocument = (collectionName, documentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = {};
        if (collectionName === "batch") {
            data = { "batchId": parseInt(documentId) };
        }
        else {
            data = { "id": parseInt(documentId) };
        }
        yield configureDB();
        const collection = database.collection(collectionName);
        yield collection.deleteOne(data);
    }
    catch (e) {
        console.log("Error: " + e);
    }
    finally {
        console.log("Connection Closed");
        yield (client === null || client === void 0 ? void 0 : client.close());
    }
});
FeedbackDb.getDocumentByObject = (collectionName, query) => __awaiter(void 0, void 0, void 0, function* () {
    var _s, e_5, _t, _u;
    try {
        console.log("query " + JSON.stringify(query));
        const items = [];
        yield configureDB();
        const collection = database.collection(collectionName);
        const cursor = collection.find(query);
        try {
            for (var _v = true, cursor_5 = __asyncValues(cursor), cursor_5_1; cursor_5_1 = yield cursor_5.next(), _s = cursor_5_1.done, !_s; _v = true) {
                _u = cursor_5_1.value;
                _v = false;
                const doc = _u;
                items.push(doc);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (!_v && !_s && (_t = cursor_5.return)) yield _t.call(cursor_5);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return items;
    }
    catch (e) {
        console.log("Error: " + e);
    }
    finally {
        console.log("Connection Closed");
        yield (client === null || client === void 0 ? void 0 : client.close());
    }
});
function removeFields(doc, collectionName) {
    return doc;
}
exports.default = FeedbackDb;
