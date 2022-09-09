import {ethers} from 'ethers';
import constants from '../../constants';
import common from '../data/common';

export async function main() {
  const client = new ethers.Wallet(common.avalanchePrivateKey);
  const signature = client._signingKey().signDigest(constants.Signatures.Challenge);
  const publicKey = ethers.utils.computePublicKey(client.publicKey, true);
  console.log('Client public key:', publicKey);
  console.log('Client message:', constants.Signatures.Challenge);
  console.log('Client signature:', signature);

  const uncompressedPublicKey = ethers.utils.recoverPublicKey(constants.Signatures.Challenge, signature);

  // add key to locals
  console.log(
    Buffer.from(
      ethers.utils.computePublicKey(uncompressedPublicKey, true).slice(2), // slice removes 0x prefix
      'hex'
    )
  );
}

// if this file is executed, it runs the main
if (require.main === module) {
  main();
}
