import { User } from "../models/user.model"

const createUser = (user) => {
    return User.create(user)
}

export { createUser }