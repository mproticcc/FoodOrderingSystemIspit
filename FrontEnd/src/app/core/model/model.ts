export interface TokenDto {
  token: string;
}

export interface UserDto {
  id: number;
  name: string;
  surname: string;
  email: string;
  permissions: string[];
}

export interface CreateUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
  permissions: string[];
}

export interface ReadUsersDto {
  users: UserDto[];
}

export interface Dish {
  name: string;
  price: number;
}
