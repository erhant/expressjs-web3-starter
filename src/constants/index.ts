import {ethers} from 'ethers';

/**
 * Constants or literals to be used throughout the application.
 */
const constants = {
  Signatures: {
    Challenge: ethers.utils.sha256(Buffer.from('grateful-dead', 'hex')), // this challenge is arbitrary
    PublicKeyKey: 'public-key',
    HeaderKey: 'client-signature',
  },
};

export default constants as Readonly<typeof constants>;
