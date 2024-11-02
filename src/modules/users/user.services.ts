import CustomError from "../../utils/CustomError"
import { IRegister } from "../auth/auth.schema"
import { User } from "./user.model"

export const createUser = async (data: IRegister) => {
    return User.create(data)
}

export const validateCreateUser = async (data: IRegister) => {
    const user = await User.findOne({
        $or: [
            { username: data.username },
            { email: data.email },
        ]
    })

    if (!!user) {
        throw new CustomError('Username or email already exists')
    }
}

export const getUser = async (userId: string) => {
    const user = await User.findById(userId)

    if (!user) {
        throw new CustomError('User not found')
    }

    return user
}
