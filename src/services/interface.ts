interface authCredentials {

    firstName?: string
    lastName?: string
    email: string
    password: string
}

interface orgMember {

    firstName: string
    lastName: string
    role: string
}

export {
    authCredentials,
    orgMember
}
