type Product = {
  id?: number;
  name: string;
  price: number;
  description: string;
  image: any;
  count: number;
};

type Info = {
  email: string;
  phoneNumber: string;
  address: string;
  openHours: string;
}

type RegisterForm = {
  username: string;
  password: string;
  password2: string;
  email: string;
}

type LoginForm = {
  username: string;
  password: string;
}

type UserInfo = {
  username: string
  is_superuser: boolean
}