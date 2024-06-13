import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export function redirectIfNotAuthenticated() {
    const token = cookies().get('token');
    if (!token) {
        redirect('/login');
    }
}