
export type LocalCodeRepo = {
    code: string;
    token: string;
};
export type TokenData = {
    token: string;
    expires_in: number;
    refresh_token: string;
    timestamp: Date;
};
