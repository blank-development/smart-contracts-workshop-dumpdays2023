# :computer: Smart Contracts (Solidity) Workshop

### Kloniranje repozitorija

```
git clone https://github.com/blank-development/smart-contracts-workshop-dumpdays2023.git
code smart-contracts-workshop-dumpdays2023
```

### Instaliranje paketa
```
npm install
```
ili
```
yarn
```

### Možete koristit Gitpod ako nemate pripremljeno okruženje na laptopu (potreban je GitHub račun)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/blank-development/smart-contracts-workshop-dumpdays2023)

## Korisne komande
**Kompajliranje smart contracta:**
```
npx hardhat compile
```

**Pokretanje testova:**
```
npx hardhat test
```

Pokretanje skripte za deploy smart contracta na Sepolia testnet (DEMO):
```
npx hardhat run scripts/deploy-dump-days-collection.js --network sepolia
```

## Korisni linkovi za Solidity

Službena dokumentacija: https://docs.soliditylang.org/en/latest/index.html

Jednostavni primjeri: https://solidity-by-example.org/

Cheatsheet: https://docs.soliditylang.org/en/latest/cheatsheet.html

## :artist: DUMP Days NFT kolekcija (ERC721 standard)
ERC721 standard: https://eips.ethereum.org/EIPS/eip-721

OpenZeppelin-ova implementacija ERC721 standarda koju ćemo koristiti: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol


Početni contract (contracts/DUMPDaysCollection.sol):
```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DUMPDaysCollection is ERC721 {
    uint256 private _tokenIdCounter;

    constructor() ERC721("DUMP Days Collection", "DDC") {}

    function mintToken() external {
        _tokenIdCounter++;
        _mint(0x593092c91bCfEe1Bd73EFcf9729E049e70133154, _tokenIdCounter);
    }
}

```

## :hammer: Zadaci za samostalni rad

:large_blue_circle: **1. ZADATAK**

U početnom contractu je postavljeno da je ime NFT kolekcije "DUMP Days Collection", a simbol NFT kolekcije je "DDC". Promijenite ime i simbol NFT kolekcije u nešto što vam više odgovara :)

:large_blue_circle: **2. ZADATAK**

Funkciju `mintToken` smo već započeli u početnom contractu, a tu funkciju će pozivati korisnici koji žele sebi mintati token (NFT) vaše kolekcije. Mintanje tokena (NFT-a) je zapravo proces stvaranja novog tokena (NFT-a). Izraz "mintanje" dolazi iz svijeta kovanja novca, gdje se novčići mintaju tj. proizvode u kovnici.

Varijabla `_tokenIdCounter` je po defaultu postavljena na 0 (ako joj eksplicitno ne postavimo neku vrijednost). Kada se poziva `mintToken` funkcija, inkrementira se `_tokenIdCounter` za 1. Prvi poziv ove funckije će mintati token čiji je token ID 1. U idućem pozivanju funkcije mintat će se token čiji je token ID 2 i tako dalje.

Za logiku samog mintanja tokena koristimo internu funkciju `_mint` koja se nalazi u ERC721 contractu kojeg nasljeđujemo. `_mint` funkcija prima dva argumenta, prvi argument je adresa na koju će se mintati token, a drugi argument je ID tokena koji želimo da se minta.

Razlog inkrementiranja `_tokenIdCounter` varijable pri svakom mintanju je taj što ne možemo mintati dva puta token s istim ID-em.

U početnom contractu vidimo da je hardkodirana adresa na koju se minta token `0x593092c91bCfEe1Bd73EFcf9729E049e70133154`, znači da bi se svaki token mintao na tu istu adresu. Vaš zadatak je da modificirate `mintToken` funkciju tako da se token minta onome tko poziva tu funkciju jer želimo da token završi na adresi onoga tko je pozvao `mintToken` funkciju.

:bulb: Hint: https://docs.soliditylang.org/en/latest/units-and-global-variables.html

:large_blue_circle: **3. ZADATAK**

Trenutno korisnici mogu mintati tokene vaše kolekcije potpuno besplatno (ako ne računamo troškove transakcija). Recimo da to želite promijeniti tj. da mintanje tokena košta određenu cifru ethera.

Kreirajte novu varijablu na vrhu contracta koja će se zvati `tokenPrice`, u toj varijabli će biti pohranjena vrijednost koliko korisnik mora priložiti ethera uz poziv `mintToken` funkcije da bi uspješno mintao token. Možete kao početnu vrijednost te varijable postaviti `0.01 ether`.

Modificirajte `mintToken` funkciju tako da korisniku ne dopustimo mintanje ako nije priložio dovoljno ethera tj. ethera koliko je zapisano u `tokenPrice` varijabli. Ako korisnik ne priloži dovoljno ethera, izvršite `revert()` (revert će vratiti stanje svih varijabli na početno stanje prije izvršavanja funkcije, tj. kao da se funkcija nikada nije ni pozvala).

Kreirajte novu funkciju `setTokenPrice` koja će imati jedan parametar, a to je nova cijena tokena. Logika funkcije je da ažurira varijablu `tokenPrice` na novu cijenu tokena. Pomoću ove funkcije se može mijenjati cijena tokena, npr. može se povećati cijena tokena na 0.05 ether.

:bulb: Hint: https://docs.soliditylang.org/en/latest/units-and-global-variables.html

:large_blue_circle: **4. ZADATAK**

Trenutno korisnici mogu mintati neograničen broj tokena samo za sebe, naravno moraju ih platiti. Jedan korisnik bi mogao mintati 500 tokena za sebe, recimo da to želimo spriječiti pa ćemo postaviti limit koliko svaki korisnik maksimalno može mintati tokena.

Kreiraj novu varijablu koja će se zvati `mintLimitPerWallet` i postavi je da bude 5, nećemo je mijenjati tako da možeš je staviti kao konstantu.

Promisli šta će nam još trebati (osim `mintLimitPerWallet` varijable) tako da možemo pratiti koliko je svaki wallet mintao tokena, složenije je od obične varijable.

Nakon toga modificiraj `mintToken` funkciju tako da korisnik ne može mintati više od 5 tokena. Ne zaboravi ažurirati broj mintanih tokena za tog korisnika nakon svakog mintanja. U slučaju da korisnik ide mintati svoj 6. token, izvršite `revert()`.

:large_blue_circle: **5. ZADATAK**

Recimo da je nekoliko korisnika uspješno mintalo tokene, znači da imamo neki iznos ethera (novaca) na contractu. Ako želimo podići te ethere iz contracta, moramo imati funkciju koja nam to omogućava jer inače bi ti etheri ostali zauvijek zarobljeni u contractu.

Kreirajte funkciju koja se zove `withdrawAllFunds` koja će poslati ukupni iznos ethera s contracta na adresu onoga tko poziva funkciju.

:bulb: Hint: https://docs.soliditylang.org/en/latest/types.html#members-of-addresses

<br/>

:gem: **BONUS ZADACI**

:large_blue_circle: **6. ZADATAK**

Korisnici trenutno mogu pozvati bilo koju funkciju na contractu, čak one i koje možda ne bi smjeli, a to su: `withdrawAllFunds` i `setTokenPrice`. Želite da samo vi kao vlasnik contracta možete pozvati te dvije osjetljive funkcije.

Kreirajte novu varijablu koja će se zvati `owner` i postavite je u konstruktoru na adresu onoga tko je deployao contract. Ta varijabla će imati spremljenu adresu vlasnika contracta. Modificirajte `withdrawAllFunds` i `setTokenPrice` funkcije tako da se ne mogu uspješno izvršiti ako pozivatelj nije vlasnik contracta i u tom slučaju izvršite `revert()`.

:large_blue_circle: **7. ZADATAK**

Napišite funkciju `getTokenIdCounter` koja će vraćati trenutnu vrijednost `_tokenIdCounter` varijable. Funkcija `getTokenIdCounter` nam može poslužiti da vidimo koliko je tokena trenutno mintano u kolekciji.


:large_blue_circle: **8. ZADATAK**

Korisnici mogu neograničen broj puta pozvati funkciju `mintToken`, to znači da u kolekciji može biti jako velik broj tokena npr. sto tisuća ili više. Recimo da želite limitirati da u vašoj kolekciji može biti mintano maksimalno 200 tokena. Kreirajte novu varijablu koja će se zvati `tokenMaxSupply` i postavite je na 200. Modificirajte `mintToken` funkciju tako da se ne može mintati više od 200 tokena, za logiku iskoristite `tokenMaxSupply` i `_tokenIdCounter` varijable. Ako korisnik ide mintati 201. token u kolekciji, izvršite `revert()`.
