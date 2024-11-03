# RateCaster

## Introduction
RateCaster is a decentralized application (Dapp) built on the Arbitrum blockchain, designed to enhance transparency and trust within the Web3 ecosystem. This repository contains the core application, which includes the website and the smart contracts. The app is built using Scaffold-ETH 2, an open-source toolkit for building Dapps.

## Why RateCaster?
The Web3 space is rapidly expanding with numerous Dapps available to users. However, the sheer volume can leave users uncertain about the security, reliability, and trustworthiness of these applications. RateCaster addresses this challenge by leveraging the Ethereum Attestation System (EAS), providing a platform where community feedback determines the trustworthiness of Dapps.

## Features

### Website
- **Home Page**: Displays a list of registered Dapps along with community ratings. Users can search and filter through the list to find applications of interest.
- **Dapp Registration**: Allows users to register new Dapps on the platform, ensuring the database stays updated with the latest applications.
- **Dapp Rating and Reviews**: Users can leave detailed reviews and rate Dapps, contributing to each application's overall trust score.
- **My Reviews**: Users can view and manage their review history, with options to update or delete past contributions.
- **Profile Management**: Users can link their wallet addresses to enhance review credibility and manage their platform identity.

## Quickstart

To get started with the RateCaster application, follow the steps below:

1. **Clone this repository & install dependencies**

    ```bash
    git clone https://github.com/Rainbow1nTheDark/RateCaster.git
    cd RateCasterDapp
    yarn install
    ```

2. **Run a local network**

    In the first terminal, start a local Ethereum network using Hardhat:

    ```bash
    yarn chain
    ```

3. **Deploy the test contract**

    In a second terminal, deploy the test smart contract to the local network:

    ```bash
    yarn deploy
    ```

4. **Start the NextJS app**

    In a third terminal, start your NextJS app:

    ```bash
    yarn start
    ```

    Visit your app on: [http://localhost:3000](http://localhost:3000). You can interact with your smart contract using the `Debug Contracts` page.

## Future Directions

We believe in decentralized social applications and are focused on integrating and mapping Farcaster IDs to provided reviews. This will allow us to see Warpcaster profiles attached to reviews, enhancing credibility and trust.

## Contact Us

For support or further inquiries, reach us at [@crypto_fencer](https://twitter.com/crypto_fencer) / [#0xbuilders](https://0xbuilders.org) or by email at [web3enthusiast@icloud.com](mailto:web3enthusiast@icloud.com).


Mainnet Arbitrum:
Resolver 0x879CB3144def6047d1c3eA9784E82932d55Ebe67
Schema: 0xf16f81ef6f8b8e8aaa4eb3ddc467a5d52bf2ab52c96bf8438a01e93d373b9405
RatingSystem: 0x3cc9894AeE61e5c22b620cb09273040D485Ae555d