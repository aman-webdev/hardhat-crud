// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

error CRUD__NotExist();

contract CRUD {
    struct User {
        uint256 id;
        string name;
    }

    uint256 public nextId = 1;

    User[] public users;

    function addUser(string memory name) public {
        users.push(User(nextId, name));
        nextId++;
    }

    function getUser(uint256 id) public view returns (uint256, string memory) {
        uint256 index = find(id);
        return (users[index].id, users[index].name);
    }

    function find(uint256 id) internal view returns (uint256) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].id == id) return i;
        }
        revert CRUD__NotExist();
    }

    function updateUser(uint256 id, string memory name)
        public
        returns (string memory)
    {
        uint256 index = find(id);
        users[index].name = name;
        return users[index].name;
    }

    function deleteUser(uint256 id) public {
        uint256 index = find(id);
        delete users[index];
    }
}
