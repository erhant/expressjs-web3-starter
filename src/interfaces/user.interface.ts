export interface addUserBody {
  publicKey: Buffer;
}

export interface deleteUserBody {
  publicKey: Buffer;
}

export interface getUserParams {
  publicKey: string;
}
