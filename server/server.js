const express = require('express');
const { Keypair } = require('@solana/web3.js');

const app = express();
const PORT = 3001;

// Kullanıcıya yeni bir cüzdan adresi oluşturacak endpoint
app.get('/create-wallet', (req, res) => {
    // Yeni bir anahtar çifti (cüzdan) oluşturuyoruz
    const newWallet = Keypair.generate();
    
    // Cüzdan adresini döndürüyoruz
    res.json({ address: newWallet.publicKey.toString() });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
