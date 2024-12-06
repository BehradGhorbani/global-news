import { MongoClient, Db } from 'mongodb';

export class MongoDbClient {
    private client: MongoClient | null = null;
    private uri: string;
    private dbName: string;
    private db?: Db;

    constructor() {
        const {DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT} = process.env;

        this.dbName = DB_NAME || 'globalNews';
        this.uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
    }

    async connect(): Promise<void> {
        try {
            if (!this.client) {
                this.client = new MongoClient(this.uri);
            }

            await this.client.connect();
            this.db = this.client.db(this.dbName);
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw new Error('Failed to connect to the database');
        }
    }

    getDatabase(): Db {
        if (!this.db) {
            throw new Error('Database is not connected');
        }
        return this.db;
    }

    async disconnect(): Promise<void> {
        if (this.client) {
            await this.client.close();
        }
    }
}