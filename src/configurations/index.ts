type envType = 'dev' | 'test';

/**
 * General configurations, such as environment and server details.
 */
const config = {
  Environment: (process.env.NODE_ENV as envType) || 'dev',
  Server: {
    Port: Number(process.env.PORT) || 3000,
  },
  Network: {
    Local: {
      URL: process.env.GRPC_LOCAL_URL!,
      CHAINID: Number(process.env.GRPC_LOCAL_CHAINID!),
    },
    AvalancheC: {
      URL: process.env.GRPC_AVALANCHE_URL!,
      CHAINID: Number(process.env.GRPC_AVALANCHE_CHAINID!),
    },
  },
  Redis: {
    URL: process.env.REDIS_URL!,
  },
};

export default config as Readonly<typeof config>;
