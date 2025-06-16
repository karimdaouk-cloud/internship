interface User {
    id: number;
    name: string;
    age: number;
    email: string;
  }
  
  interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
  }
  
  interface Person {
    name: string;
    age: number;
    socialSecurityNumber: string;
  }
  
  interface Config {
    apiKey: string;
    baseUrl: string;
    timeout: number;
  }
  
  function updateUser(user: Partial<User>) {
    console.log('Updating:', user);
  }
  
  function getProductInfo(product: Product): Pick<Product, 'id' | 'name' | 'price'> {
    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }
  
  function getSafePersonInfo(person: Person): Omit<Person, 'socialSecurityNumber'> {
    return {
      name: person.name,
      age: person.age
    };
  }
  
  function makeConfigReadonly(config: Config): Readonly<Config> {
    return config;
  }
  
  type NumberDict = Record<string, number>;
  
  type AvailableColors = "red" | "green" | "blue" | "yellow";
  type PrimaryColors = Exclude<AvailableColors, "green" | "yellow">;
  
  type WarmColors = Extract<AvailableColors, "red" | "yellow">;
  
  type Address = string | null | undefined;
  type CleanAddress = NonNullable<Address>;
  updateUser({ name: "Karim" });
  updateUser({ age: 25 });
  
  const prod: Product = {
    id: 1,
    name: "Laptop",
    description: "Gaming laptop",
    price: 1200
  };
  
  const info = getProductInfo(prod);
  
  const person: Person = {
    name: "Ali",
    age: 30,
    socialSecurityNumber: "123-45-6789"
  };
  
  const publicData = getSafePersonInfo(person);
  
  const appConfig: Config = {
    apiKey: "key123",
    baseUrl: "https://api.com",
    timeout: 5000
  };
  
  const readonlyConfig = makeConfigReadonly(appConfig);
  
  const scores: NumberDict = {
    "karim": 85,
    "ali": 92
  };
  
  function setColor(color: PrimaryColors) {
    console.log(color);
  }
  
  setColor("red");
  
  function setWarmColor(color: WarmColors) {
    console.log(color);
  }
  
  setWarmColor("red");
  
  function processAddr(addr: Address): CleanAddress | null {
    if (addr === null || addr === undefined) {
      return null;
    }
    return addr;
  }