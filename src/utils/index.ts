import * as jwt from 'jsonwebtoken'
import env from '../configs'

const createToken = async (value: object) => jwt.sign(value, env.JWT_SEC, { expiresIn: '1d' })

export { createToken }