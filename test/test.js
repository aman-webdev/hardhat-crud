const { ethers } = require("hardhat");
const { assert, expect } = require("chai");
describe("CRUD", () => {
  let crud;
  beforeEach(async () => {
    const contractFactory = await ethers.getContractFactory("CRUD");
    crud = await contractFactory.deploy();
    await crud.deployed();
  });
  describe("Create User", () => {
    it("Should create a new user", async () => {
      const user = await crud.addUser("James");
      const nextId = await crud.nextId();
      const { id, name } = await crud.users(0);
      assert(nextId.toString() === "2");
      assert(id.toString() === "1");
      assert(name === "James");
    });
  });

  describe("Read User", () => {
    it("");
  });
});
