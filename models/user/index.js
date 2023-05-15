const { v4: uuidv4 } = require("uuid");

const UserList = [];

function addUser(user) {
  const newUser = {
    id: uuidv4(),
    name: user.name,
    email: user.email,
    password: user.password,
  };

  UserList.push(newUser);

  return newUser;
}

function getUser(userId) {
  const user = UserList.find((user) => user.id === userId);
  if (user) return { id: user.id, name: user.name, email: user.email };
  else return null;
}

function loginUser(email, password) {
  const user = UserList.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    return { id: user.id, name: user.name, email: user.email };
  } else throw new Error("Wrong user or password");
}

module.exports = {
  addUser,
  getUser,
  loginUser,
};
