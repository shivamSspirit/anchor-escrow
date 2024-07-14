'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import { useEscrowProgram } from './escrow-data-access';
import { EscrowCreate, EscrowAccountList } from './escrow-ui';

export default function EscrowFeature() {
  const { publicKey } = useWallet();
  const { programId } = useEscrowProgram();

  return publicKey ? (
    <div>
      <AppHero
        title="Escrow"
        subtitle={
          'Create a new account by clicking the "Create" button. The state of a account is stored on-chain and can be manipulated by calling the program\'s methods (make, refund, and take).'
        }
      >
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <EscrowCreate />
      </AppHero>
      <EscrowAccountList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  );
}
