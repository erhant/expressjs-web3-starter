import {blockchainClient} from '../../clients/blockchain';

export async function main() {
  const e = blockchainClient().provider;
  console.log('Connection:', e.connection);
  console.log('Block Number:', await e.getBlockNumber());
}

// if this file is executed, it runs the main
if (require.main === module) {
  main();
}
