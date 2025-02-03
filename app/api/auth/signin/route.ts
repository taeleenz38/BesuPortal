import axios from "axios";
import { NextRequest } from "next/server";
import { LocalCodeRepo, TokenData } from "../AuthTypes";
import { AuthApi, getAuthApiFor, getAuthHeaders, getResponseCookieHeader } from "../AuthUtils";

export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const code = url.searchParams.get("code");

    if (code !== null) {
        const token = await retrieveToken(code);
        if (token !== null) {
            return new Response(JSON.stringify({ message: 'Authenticated!' }), {
                status: 200,
                headers: getResponseCookieHeader(token)
            })
        }
    }
}



var usedCodes: LocalCodeRepo[] = [];

async function retrieveToken(code: string): Promise<TokenData | null> {

    if (!usedCodes.find(val => { return val.code === code })) {

        usedCodes.push({ code: code, token: '' });
        // console.log('###################################: ' + code);
        const clientId = process.env.NEXT_PUBLIC_PINGONE_AUTH_CLIENT_ID;
        const redirectUrl = process.env.NEXT_PUBLIC_PINGONE_AUTH_REDIRECT_URL;
        const requestData = {
            client_id: clientId,
            redirect_uri: redirectUrl,
            grant_type: "authorization_code",
            code: code,
        };

        const formData = new URLSearchParams();

        Object.entries(requestData).forEach(([key, value]) => {
            formData.append(key, (value != undefined ? value : ''));
        });

        try {
            const response = await axios.post(getAuthApiFor(AuthApi.TOKEN),
                formData, { headers: getAuthHeaders() });

            if (response.status === 200) {
                // console.log(JSON.stringify(response.data))
                const accessToken = response.data.access_token;
                const refreshToken = response.data.refresh_token;
                return {
                    token: accessToken, refresh_token: refreshToken,
                    expires_in: response.data.expires_in,
                    timestamp: new Date()
                };
            }
        } catch (error) {
            console.log(error)
        }
    }

    return null;
}