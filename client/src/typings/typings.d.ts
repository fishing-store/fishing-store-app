type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  categories: string[] | string;
  image: any;
  count: number;
};

type Info = {
  email: string;
  phoneNumber: string;
  address: string;
  openHours: string;
};

type RegisterForm = {
  username: string;
  password: string;
  password2: string;
  email: string;
  number: string;
};

type LoginForm = {
  username: string;
  password: string;
};

type UserInfo = {
  username: string;
  is_superuser: boolean;
};

type User = {
  username: string;
  email: string;
  number: string;
}

type Category = {
  name: string;
};

type Orders = {
  id: string;
  status: string;
  deliveryType: string;
  email: string;
  totalCost: number;
}

type MyToken = {
  username: string
  email: string
  is_superuser: boolean
};
