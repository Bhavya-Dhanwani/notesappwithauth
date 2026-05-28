function sanitize({name, email, _id}) {
    return {
        id: _id,
        name,
        email
    }
}

export default sanitize;