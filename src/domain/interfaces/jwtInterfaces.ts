export enum TokenTypes {
  AUTOLOGIN = 'autologin',
  REFRESH = 'refresh',
}

export interface SignParamsWithJWT {
  tenantId: string
  userId: string
  verifiedAt?: Date
  type: TokenTypes
}

export type DecodedRefreshToken = {
  userId: string
  type?: TokenTypes
}
