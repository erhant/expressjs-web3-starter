export interface redisSetKeyBody {
  key: string;
  value: string;
}

export interface redisGetKeyQuery {
  key: string;
}

export interface redisDeleteKeyBody {
  key: string;
}
