import { User } from "../users/user.model"
import * as bcrypt from 'bcrypt';
import { createToken } from "src/utils";
import { ILogin, IRegister } from "./auth.schema";

export const register = async (userData: IRegister) => {
    const duplicateEmail = await User.findOne({
        email: userData.email,
    }).lean().exec();
    if (duplicateEmail) {
        throw new Error('Email Already in use');
    }

    const hashedPwd = await bcrypt.hash(userData.password, 10);
    const baseData = {
        ...userData,
        password: hashedPwd,
    };

    const newUser = new User(baseData);

    return await newUser.save();

}

export const login = async (userData: ILogin) => {
    const user = await User.findOne({
        email: userData.email,
    }).lean().exec();

    if (!user) {
        throw new Error('User does not exist');
    }

    const { password, ...data } = user

    const match = await bcrypt.compare(userData.password, password);
    if (!match) throw new Error('Username or Password Incorrect')

    const token = await createToken({ id: user._id, role: user.username })

    return { user: data, token }

}