const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("DUMPDaysCollection", function () {
  let collection;

  beforeEach(async function () {
    const DUMPDaysCollection = await ethers.getContractFactory(
      "DUMPDaysCollection"
    );
    collection = await DUMPDaysCollection.deploy();
    await collection.deployed();
  });

  it("should return correct name", async function () {
    const name = await collection.name();
    expect(name).to.equal("DUMP Days Collection");
  });

  it("should return correct symbol", async function () {
    const symbol = await collection.symbol();
    expect(symbol).to.equal("DDC");
  });
});
