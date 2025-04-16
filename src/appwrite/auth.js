import conf from '../config/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(import.meta.env.VITE_APPWRITE_URL) 
            .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
        this.account = new Account(this.client)
    };

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                //call another method
                return this.login({ email, password })
            } else {
                return userAccount;
            }


        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {

        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (err) {
            console.log(err);
        }
        return null
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("appwrite error: ", erorr)
        }
    }

};

const authService = new AuthService();

export default authService;
