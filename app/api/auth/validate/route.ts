import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { TokenData } from "../AuthTypes";
import { AuthApi, getAuthApiFor, getAuthHeaders, getResponseCookieHeader, getTokenDataInCookie, isValidTokenInCookie } from "../AuthUtils";

export async function GET(request: NextRequest) {

    const token = cookies().get('token')?.value;
    if (isValidTokenInCookie()) {
        return new Response(JSON.stringify({ isAuthenticated: true }), { status: 200 });
    }

    const tokenData = getTokenDataInCookie();
    // console.log("Verifying Token for: " + tokenData?.token + ", Timestamp: " + tokenData?.timestamp)
    if (tokenData && await verifyToken(tokenData.token)) {
        // console.log('##### TOKEN VERIFIED #####')
        return new Response(JSON.stringify({ isAuthenticated: true }), { status: 200 });
    }


    const refreshToken = getTokenDataInCookie()?.refresh_token;
    if (refreshToken) {
        // console.log("Renweing token using refresh token.")
        const tokenData = await renewToken(refreshToken);

        // console.log(JSON.stringify("Refresh Token: \t " + JSON.stringify(tokenData) + '\n'))
        if (tokenData)
            return new Response(JSON.stringify({ isAuthenticated: true }),
                { status: 200, headers: getResponseCookieHeader(tokenData) });
    }

    return new Response(JSON.stringify({ isAuthenticated: false }), { status: 401 });
}

async function verifyToken(token: string): Promise<boolean> {
    const requestData = {
        client_id: process.env.NEXT_PUBLIC_PINGONE_AUTH_CLIENT_ID,
        token: token,
    };

    const formData = new URLSearchParams();

    Object.entries(requestData).forEach(([key, value]) => {
        formData.append(key, (value != undefined ? value : ''));
    });

    const response = await axios.post(getAuthApiFor(AuthApi.INTROSPECT),
        formData, { headers: getAuthHeaders() });

    // console.log('response: ' + response.status);
    if (response.status === 200 && response.data.active) {
        return true;
    }
    return false;
}

async function renewToken(refreshToken: string): Promise<TokenData | null> {
    const requestData = {
        grant_type: "refresh_token",
        refresh_token: refreshToken
    };

    const formData = new URLSearchParams();

    Object.entries(requestData).forEach(([key, value]) => {
        formData.append(key, (value != undefined ? value : ''));
    });

    try {
        const response = await axios.post(getAuthApiFor(AuthApi.TOKEN),
            formData, { headers: getAuthHeaders() });
        if (response.status === 200) {
            return {
                token: response.data.access_token,
                refresh_token: response.data.refresh_token,
                expires_in: response.data.expires_in,
                timestamp: new Date()
            };
        }
    } catch (error) {
        console.log('Error occurred while retreiving refresh token! \n' + error)
    }
    return null;
}