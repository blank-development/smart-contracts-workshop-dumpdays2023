const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "🔥 Deploying DUMPDaysCollection with the account: ",
    deployer.address
  );

  const DUMPDaysCollection = await ethers.getContractFactory(
    "DUMPDaysCollection"
  );
  const collection = await DUMPDaysCollection.deploy();
  await collection.deployed();

  console.log("🚀 DUMPDaysCollection deployed to: ", collection.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
