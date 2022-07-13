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
    it("should get info of the added user", async () => {
      const user = await crud.addUser("James");
      const [id, name] = await crud.getUser(1);
      assert.equal(id.toString(), "1");
      assert.equal(name, "James");
    });

    it("Should revert if the user with an id does not exist", async () => {
      await expect(crud.getUser(1)).to.be.reverted;
    });
  });
});
