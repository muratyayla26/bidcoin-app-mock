import React, { useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
    const network = clusterApiUrl('devnet');
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
    const [newAddress, setNewAddress] = useState('');

    // Yeni cüzdan adresi almak için API çağrısı
    const createWallet = async () => {
        const response = await fetch('http://localhost:3001/create-wallet');
        const data = await response.json();
        setNewAddress(data.address);
    };

    return (
        <ConnectionProvider endpoint={network}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div className="App">
                        <h1>Solana Wallet Uygulaması</h1>
                        <WalletMultiButton />
                        <button onClick={createWallet}>Yeni Cüzdan Adresi Oluştur</button>
                        {newAddress && <p>Yeni Cüzdan Adresi: {newAddress}</p>}
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;
