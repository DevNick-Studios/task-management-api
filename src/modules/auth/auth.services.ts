import { User } from "../users/user.model"
import * as bcrypt from 'bcrypt';
import { createToken } from '../../utils/index';
import { ILogin, IRegister } from "./auth.schema";
import CustomError from "../../utils/CustomError";
import { createUser, validateCreateUser } from "../users/user.services";

export const register = async (userData: IRegister) => {
    await validateCreateUser(userData)

    const hashedPwd = await bcrypt.hash(userData.password, 10);
    const baseData = {
        ...userData,
        password: hashedPwd,
    };

    return createUser(baseData);
}

export const login = async (userData: ILogin) => {
    const user = await User.findOne({
        email: userData.email,
    }).lean().exec();

    if (!user) {
        throw new CustomError('User does not exist');
    }

    const { password, ...data } = user

    const match = await bcrypt.compare(userData.password, password);
    if (!match) throw new CustomError('Username or Password Incorrect')

    const token = await createToken({ id: user._id })

    return { user: data, token }

}