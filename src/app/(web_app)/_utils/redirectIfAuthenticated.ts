import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function redirectIfAuthenticated() {
    const token = cookies().get('token');
    if (token) {
        redirect('/home');
    }
}