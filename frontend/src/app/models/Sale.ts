import { Detail } from './Detail';

export class Sale {
  constructor(
    public _id: String,
    public client: String,
    public user: String,
    public date?: Date,
    public details?: [Detail]
  ) {}
}
