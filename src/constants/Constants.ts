import dotenv from 'dotenv';

export default class Constants{

    static API_URL = process.env.API_URL ?? '';
    static AUTH_URL =  process.env.AUTH_URL ?? '';
    static CSRF_URL = process.env.CSRF_URL ?? '';
    static FRONTEND_URL = process.env.FRONTEND_URL ?? '';

}