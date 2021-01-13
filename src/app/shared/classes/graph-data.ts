export class GraphData {
  data: any;
  type: string;

  constructor(value: any = {}) {
    this.data = value.data || {};
    this.type = value.type || void 0;
  }
}
