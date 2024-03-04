interface User {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  date: Date;
}

function getUsers(name: string): User[] {
  const data = JSON.parse(localStorage.getItem("users") || "[]");
  if (name) {
    return data.filter((user: any) => user.name === name);
  } else {
    return data;
  }
}

function addUser(user: User): void {
  const previousData = JSON.parse(localStorage.getItem("users") || "[]");
  localStorage.setItem("users", JSON.stringify([...previousData, user]));
}

export type { User };
export { getUsers, addUser };
