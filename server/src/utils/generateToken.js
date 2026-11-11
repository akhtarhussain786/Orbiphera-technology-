import jwt from 'jsonwebtoken'

const DEFAULT_SECRET = 'nexvora_jwt_secret_key_development_change_in_production_12345678'
const DEFAULT_REFRESH = 'nexvora_jwt_refresh_secret_key_development_change_in_production_87654321'

export const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || DEFAULT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  })
}

export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || DEFAULT_REFRESH, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d'
  })
}
