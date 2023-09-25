import {UserType} from "@/types/SchemasType";

export const postNewUser = async (data : UserType) => {
    let resp = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!resp.ok) {
        let err = await resp.json();
        throw new Error(err);
    }
    return resp.json();
}