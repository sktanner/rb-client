
// export type game = {
//     title: string,
//     description: string,
//     image?: string,
//     id: number,
//     collection: string
// }

export type game = {
    id: number,
    name: string,
    description: string,
    thumb_url: string,
    collection: string
}

export type note = {
    content: string,
    id: number
}

export type user = {
    email: string,
    password: string,
    isAdmin: boolean,
    id: number
}