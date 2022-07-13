const { ethers, network, run } = require("hardhat");
const main = async () => {
  const contractFactory = await ethers.getContractFactory("CRUD");
  const contract = await contractFactory.deploy();
  const crud = await contract.deployed();
  console.log(crud.address);
  console.log(network.config.chainId);
  if (network.config.chainId === 4) {
    console.log("Verifying");
    await crud.deployTransaction.wait(6);
    verify(crud.address, []);
  }
};

const verify = async (address, args) => {
  await run("verify:verify", {
    address,
    constructorArguments: args,
  });
  console.log("Verified address: " + address);
};

main();
