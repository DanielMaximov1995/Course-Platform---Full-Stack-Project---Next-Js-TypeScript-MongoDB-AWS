import {LessonType, UserType} from "@/types/SchemasType";

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

export const removeUserById = async (id: string) => {
    let resp = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!resp.ok) {
        let err = await resp.json();
        throw new Error(err);
    }
    return resp.json();
}

export const updateUserById = async (id: string , data : UserType) => {
    let resp = await fetch(`/api/users/[${id}]`, {
        method: 'PUT',
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

export const postNewLesson = async (data : LessonType) => {

    let resp = await fetch('/api/lessons', {
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