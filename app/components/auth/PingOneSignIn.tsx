'use client'
import Link from "next/link";
import ButtonNoIcon from "../atoms/ButtonNoIcon";


const PingOneSignInButton = (props: any) => {

    const oauthUrl = `${process.env.NEXT_PUBLIC_PINGONE_AUTH_BASE_URL}/${process.env.NEXT_PUBLIC_PINGONE_AUTH_ENV_ID}/as/authorize?response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_PINGONE_AUTH_REDIRECT_URL}&client_id=${process.env.NEXT_PUBLIC_PINGONE_AUTH_CLIENT_ID}`;

    const signIn = () => {
        window.location.href = oauthUrl;
    }

    return (
        <Link href='/' onClick={(e) => signIn()} >
            <ButtonNoIcon text="Sign In" />
        </Link>
    )
}

export default PingOneSignInButton;