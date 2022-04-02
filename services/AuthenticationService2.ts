import UserDao from "../daos/UserDao";
import mongoose from "mongoose";

const userDao: UserDao = UserDao.getInstance();

// const PROTOCOL = "mongodb+srv";
// const DB_USERNAME = process.env.DB_USERNAME;
// const DB_PASSWORD = process.env.DB_PASSWORD;
// const HOST = "cluster0.m8jeh.mongodb.net";
// const DB_NAME = "myFirstDatabase";
// const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = "mongodb+srv://parth2118:Parth2608@cluster0.e4v81.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// connect to the database
mongoose.connect(connectionString);


export const login = async (u: string, p: string) => {
  try {
    const user = await userDao.findUserByCredentials(u, p);
    if (!user) {
      throw "Unknown user";
    }
    return user;
  } catch (e) {
    return e;
  }
}

export const register = async (u: string, p: string, e: string) => {
  try {
    const user = await userDao.findUserByUsername(u);
    if (user) {
      throw 'User already exists';
    }
    const newUser = await userDao.createUser({username: u, password: p, email: e});
    return newUser;
  } catch (e) {
    return e;
  }
}

export const initializeSalaries = async (salary: number) => {
  const users = await userDao.findAllUsers()
  const salaryPromises = users.map(user =>
    userDao.updateUserSalaryByUsername(user.username, salary));
  const values = await Promise.all(salaryPromises);
  return values;
}

register('alice678', 'alice234', 'alice234@gmail.com')

login('alice678', 'alice234')
// login('alice', 'alice123')

// userDao.findAllUsers()
//     .then(users => console.log(users));