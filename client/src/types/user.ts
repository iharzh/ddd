export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface CurrentUserData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}
