import {ContactType, LessonType, ObjectIdType, SettingSiteType, SiteContentType, UserType} from "@/types/SchemasType";

export const postFile = async (file : File , folder : string) => {
    const data = new FormData()
    data.set('file' , file)

    let resp = await fetch(`/api/upload-file?folder=${folder}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    });

    if (!resp.ok) {
        let err = await resp.json();
        throw new Error(err);
    }
    return resp.json();
}

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

export const updateUserById = async (id: any , data : UserType) => {
    let resp = await fetch(`/api/users/${id}`, {
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

export const removeLessonById = async (id: ObjectIdType | any) => {
    let resp = await fetch(`/api/lessons/${id}`, {
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

export const updateLessonById = async (id: ObjectIdType | any , data : LessonType | any) => {
    let resp = await fetch(`/api/lessons/${id}`, {
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

export const updateLessonOrder = async (data : LessonType | any) => {
    let resp = await fetch(`/api/lessons`, {
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

export const updateContentBySlug = async (slug : string , data : SiteContentType) => {
    let resp = await fetch(`/api/site-content/${slug}`, {
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

export const updateSettings = async (data : SettingSiteType) => {
    let resp = await fetch(`/api/settings`, {
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

export const contactUsPost = async (data : ContactType) => {
    let resp = await fetch('/api/contact', {
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