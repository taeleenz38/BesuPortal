import { serialize } from "cookie";
import * as crypto from 'crypto';
import { cookies } from "next/headers";
import { TokenData } from "./AuthTypes";

const baseUrl = process.env.NEXT_PUBLIC_PINGONE_AUTH_BASE_URL;
const envId = process.env.NEXT_PUBLIC_PINGONE_AUTH_ENV_ID;
const clientId = process.env.NEXT_PUBLIC_PINGONE_AUTH_CLIENT_ID;
const redirectUrl = process.env.NEXT_PUBLIC_PINGONE_AUTH_REDIRECT_URL;
const clientSecret = process.env.NEXT_PUBLIC_PINGONE_AUTH_CLIENT_SECRET;
const secretKey = process.env.NEXT_PUBLIC_PINGONE_AUTH_ENCRYPT_KEY ? process.env.NEXT_PUBLIC_PINGONE_AUTH_ENCRYPT_KEY : 'naji73i-39iol0-3efva';
const algorithm = "aes-256-cbc";

export function getAuthHeaders(): any {


    const encodedData = Buffer.from(clientId + ":" + clientSecret).toString('base64');

    return { Authorization: `Basic ${encodedData}`, "Content-Type": "application/x-www-form-urlencoded", }

}

export enum AuthApi {
    TOKEN = 'token',
    USER_INFO = 'userinfo',
    SIGN_OFF = 'signoff',
    INTROSPECT = 'introspect'
}

export function getAuthApiFor(api: AuthApi) {
    return `${baseUrl}/${envId}/as/${api}`
}


export function getResponseCookieHeader(tokenData: TokenData | null): any {
    if (tokenData !== null) {
        const ckt = serialize('token', encrypt(JSON.stringify(tokenData)), {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: tokenData.expires_in
        });

        return { 'Set-Cookie': ckt };
    }
    return undefined;
}

export function encrypt(data: string) {
    // generate 16 bytes of random data
    const initVector = crypto.randomBytes(16).toString('base64');
    // secret key generates 32 bytes of random data
    const securityKey = crypto.createHash('sha256').update(String(secretKey)).digest('base64').substr(0, 32);// crypto.randomBytes(32);
    //The cipher function
    const cipher = crypto.createCipheriv(algorithm, securityKey, Buffer.from(initVector, 'base64'));
    //Encrypt the message
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    const encryptedCookie = encryptedData.concat('.').concat(initVector.toString());
    return encryptedCookie;

}

export function decrypt(data: string) {
    const ckData = data.split('.');
    const securityKey = crypto.createHash('sha256').update(String(secretKey)).digest('base64').substr(0, 32);// crypto.randomBytes(32);
    const decipher = crypto.createDecipheriv(algorithm, securityKey, Buffer.from(ckData[1], 'base64'));
    let decryptedData = decipher.update(ckData[0], "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
}


export function isValidTokenInCookie() {
    const token = cookies().get('token')?.value;
    if (token) {
        const decryptedCookie = JSON.parse(decrypt(token)) as TokenData;
        const now = new Date().getTime() / 1000;
        const tokenCreationTime = new Date(decryptedCookie.timestamp).getTime() / 1000;
        if ((tokenCreationTime + decryptedCookie.expires_in) - now > 0) {
            return true;
        }
    }
    return false;

}

export function getTokenDataInCookie(): TokenData | null {
    const token = cookies().get('token')?.value;
    if (token) {
        return JSON.parse(decrypt(token)) as TokenData;
    }
    return null;
}

