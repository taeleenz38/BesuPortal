"use client"
const Signout = () => {

    const signOutUrl = `${process.env.NEXT_PUBLIC_PINGONE_AUTH_BASE_URL}/${process.env.NEXT_PUBLIC_PINGONE_AUTH_ENV_ID}/as/signoff?response_type=code&client_id=${process.env.NEXT_PUBLIC_PINGONE_AUTH_CLIENT_ID}`

    return (
        <div className="w-20 float-right ">
            <button onClick={() => window.location.href = signOutUrl} >Sign out</button>
        </div>
    );
}

export default Signout;