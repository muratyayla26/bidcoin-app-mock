# BIDCOIN

## [Live link of the project](https://bidcoin-app-mock.vercel.app/onboard)

Bidcoin is a decentralized online penny auction platform that integrates blockchain technology to enhance transparency, trust, and security.  
It enables users to bid on a wide variety of products such as digital assets, cryptocurrency, luxury items, and more.  
Key features include automated bidding with BidBot, real-time tracking, and smart contract-based auction processes to ensure fairness.  
The platform also supports cryptocurrency payments and offers a seamless, gamified auction experience​​​.  

To set up the project locally, you need the tool [Node.js](https://nodejs.org/en).

After cloning the project, run the `npm install` command in the root directory.

To ensure the data fetch operations in the project work, create a file named `.env.local` in the root directory and set two environment variables within it:

NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=<[Your Client_ID from Web3Auth](https://web3auth.io/)>
NEXT_PUBLIC_SAMPLE_PROGRAM_ID='C87Mkt2suddDsb6Y15hJyGQzu9itMhU7RGxTQw17mTm' (Sample counter smart contract program id for test purposes)

NEXT_PUBLIC_FIREBASE_API_KEY=<[Firebase_config](https://firebase.google.com/)>  
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<[Firebase_config](https://firebase.google.com/)>  
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<[Firebase_config](https://firebase.google.com/)>  
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<[Firebase_config](https://firebase.google.com/)>  
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<[Firebase_config](https://firebase.google.com/)>  
NEXT_PUBLIC_FIREBASE_APP_ID=<[Firebase_config](https://firebase.google.com/)>  
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<[Firebase_config](https://firebase.google.com/)>  
FIREBASE_ADMIN_SERVICE_ACCOUNT=<[Firebase_config](https://firebase.google.com/)>  


Then, to run the project, use the `npm run dev` command.

If you want to build the project and run the built version, use the `npm run build` and `npm start` commands, respectively.

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
