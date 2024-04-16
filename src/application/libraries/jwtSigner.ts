import { AppSingleton } from '../../infrastructure/webserver/appSingleton'
import { DecodedRefreshToken, SignParamsWithJWT } from '../../domain/interfaces/jwtInterfaces'
import config from '../../infrastructure/config/config'

export const signParamsWithJWT = (params: SignParamsWithJWT): string => {
  
  return AppSingleton.getInstance().jwt.sign(params, { expiresIn: config.security.tokenExpiry })
}

export const signJWTRefresh = (params: DecodedRefreshToken): string => {
  return AppSingleton.getInstance().jwt.sign(
    { date: new Date(), ...params },
    { expiresIn: config.security.tokenExpiryRefresh },
  )
}

