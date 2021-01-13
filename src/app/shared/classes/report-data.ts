export class ReportData {
  id: number;
  name: string;
  usersResolved: number;
  active: boolean;
  imageUrl: string;

  constructor(value: any = {}) {
    this.id = value.id || void 0;
    this.name = value.name || void 0;
    this.usersResolved = value.users_resolved || void 0;
    this.active = value.active || void 0;
    this.imageUrl = value.image_url || void 0;
  }
}
