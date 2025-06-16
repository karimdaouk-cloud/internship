interface Admin {
    name: string;
    email: string;
    createUser(user: UserRole): void;
  }
  
  interface Moderator {
    name: string;
    email: string;
    banUser(user: UserRole): void;
  }
  
  interface RegularUser {
    name: string;
    email: string;
    viewContent(): void;
  }
  
  type UserRole = Admin | Moderator | RegularUser;
  
  function performAdminTask(user: UserRole, task: () => void): void {
    if (isAdmin(user)) {
      console.log('Admin is doing admin stuff...');
      task();
    } else {
      console.log("Error: not admin");
    }
  }
  
  const moderateContent = (user: UserRole, contentId: string): void => {
    if (isModerator(user)) {
      console.log(`moderating content ${contentId}`);
      console.log('Content banned!');
    } else {
      console.log("can't moderate - not a moderator");
    }
  }
  
  function viewContentAsUser(user: UserRole): void {
    if (isRegularUser(user)) {
      console.log('viewing content...');
      user.viewContent();
    } else {
      console.log('Error: cant view');
    }
  }
  
  function isAdmin(user: UserRole): user is Admin {
    return 'createUser' in user;
  }
  
  function isModerator(user: UserRole): user is Moderator {
    return 'banUser' in user;
  }
  
  function isRegularUser(user: UserRole): user is RegularUser {
    if('viewContent' in user && !('createUser' in user) && !('banUser' in user)) {
      return true;
    }
    return false;
  }
  
  type SuperUser = Admin & Moderator;
  
  const superUserTask = (user: SuperUser, task: () => void): void => {
    console.log("SuperUser doing task");
    task();
  }
  
  class AdminType implements Admin {
    name: string;
    email: string;
    
    constructor(name: string, email: string) {
      this.name = name;
      this.email = email;
    }
    
    createUser(user: UserRole): void {
      console.log(`${this.name} created user ${user.name}`);
    }
  }
  
  class ModeratorType implements Moderator {
    constructor(public name: string, public email: string) {}
    
    banUser(user: UserRole): void {
      console.log(this.name + " banned " + user.name);
    }
  }
  
  class User1 implements RegularUser {
    constructor(public name: string, public email: string) {}
    
    viewContent(): void {
      console.log(this.name + ' is looking at content');
    }
  }
  
  class SuperUserType implements SuperUser {
    constructor(public name: string, public email: string) {}
    
    createUser(user: UserRole): void {
      console.log("SuperUser created: " + user.name);
    }
    
    banUser(user: UserRole): void {
      console.log("SuperUser banned: " + user.name);
    }
  }
  
  let admin1 = new AdminType("Karim", "daoukkarim70@gmail.com");
  let mod = new ModeratorType('Karim2', "Karim2@gmail.com");
  const regularUser = new User1("Karim3", "Karim3@gmail.com");
  var superUser = new SuperUserType("Karim4", "Karim4@gmail.com");
  
  console.log("Testing type guards:");
  console.log(isAdmin(admin1));
  console.log(isModerator(mod));
  console.log(isRegularUser(regularUser));
  
  console.log("\nTesting functions:");
  performAdminTask(admin1, () => console.log("making new user"));
  performAdminTask(regularUser, () => console.log("this wont work"));
  
  moderateContent(mod, "post123");
  moderateContent(admin1, "post456");
  
  viewContentAsUser(regularUser);
  viewContentAsUser(admin1);
  
  console.log("\nTesting SuperUser:");
  superUserTask(superUser, () => {
    console.log("doing super user stuff");
    superUser.createUser(regularUser);
    superUser.banUser(regularUser);
  });