import {providers} from 'ethers';
import config from '../configurations';
import {Client} from '.';

class BlockchainClient implements Client {
  private static instance: BlockchainClient;
  private url: string;
  private chainID: number;
  public provider: providers.JsonRpcProvider;

  private constructor(url: string, chainID: number) {
    this.url = url;
    this.chainID = chainID;
    this.provider = new providers.JsonRpcProvider(url, chainID);
    // @TODO: add signer
  }

  /// No async setup required
  public async setup(): Promise<void> {
    return;
  }

  /// No async destroy required
  public async destroy(): Promise<void> {
    return;
  }

  /// Check block number
  public async healthcheck(): Promise<boolean> {
    const network = await this.provider.detectNetwork();
    return network.chainId === this.chainID;
  }

  /**
   * Singleton accessor of BlockchainClient
   * @returns single instance
   */
  public static getInstance(): BlockchainClient {
    if (!BlockchainClient.instance) {
      BlockchainClient.instance = new BlockchainClient(
        config.Network.Local.URL,
        config.Network.Local.CHAINID
      );
    }
    return BlockchainClient.instance;
  }
}

export function blockchainClient(): BlockchainClient {
  return BlockchainClient.getInstance();
}
