'use client'
import LoadingAnimation from '@/app/components/atoms/LoadingAnimation';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
    params?: {
        num?: string;
    };
    searchParams: {
        code: any;
    };
};
var isCodeUsed = false;
export default function AuthRedirect(props: Props) {

    const router = useRouter();
    const [token, setToken] = useState(null);

    const getToken = async () => {
        if (!isCodeUsed && props && props.searchParams && props.searchParams.code) {
            isCodeUsed = true;
            try {
                const res = await axios.get('/api/auth/signin', {
                    params: { code: props.searchParams.code }
                })
                setToken(res.data.token);
            } catch (error) {
                router.replace('/')
            }
        }
    }

    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        if (token !== null) {
            router.push('/dashboard')
        }
    }, [token]);

    return (
        <LoadingAnimation />
    )
}