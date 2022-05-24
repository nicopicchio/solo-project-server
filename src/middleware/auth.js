import { PrismaClient } from "@prisma/client"
import jwt from 'jsonwebtoken'
const secretKey = process.env.SECRET_KEY;

const prisma = new PrismaClient();

export async function validateAuthentication(req, res, next) {
  const header = req.header('authorization')
  if (!header) {
    return res.status(401).json( {
      authorization: 'Missing Authorization header'
    })
  }

  const [type, token] = header.split(' ')

  const isTypeValid = validateTokenType(type)
  if (!isTypeValid) {
    return res.status(401).json( {
      authentication: `Invalid token type, expected Bearer but got ${type}`
    })
  }

  const isTokenValid = validateToken(token)
  if (!isTokenValid) {
    return res.status(401).json( {
      authentication: 'Invalid or missing access token'
    })
  }

  const decodedToken = jwt.decode(token)
  const foundUser = await prisma.user.findUnique({
    where: {
      username: decodedToken
    }
  })
  delete foundUser.password

  req.user = foundUser

  next()
}

function validateToken(token) {
  if (!token) {
    return false
  }

  return jwt.verify(token, secretKey, (error) => {
    return !error
  })
}

function validateTokenType(type) {
  if (!type) {
    return false
  }

  if (type.toUpperCase() !== 'BEARER') {
    return false
  }

  return true
}