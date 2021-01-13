export class User {
  firstname: string;
  lastname: string;
  role?: string;
  token?: string;
  email?:string;
  groups?: Array<string>;

  constructor(user: any = {}) {
    this.firstname = user.first_name || void 0;
    this.lastname = user.last_name || void 0;
    this.role = user.role || void 0;
    this.token = user.token || void 0;
    this.email = user.email || void 0;
    this.groups = user.groups || void 0;
  }
}
