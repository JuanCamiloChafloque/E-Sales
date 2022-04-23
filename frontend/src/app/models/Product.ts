export class Product {
  constructor(
    public _id: String,
    public title: String,
    public description: String,
    public image: String,
    public saleCost: Number,
    public purchaseCost: Number,
    public stock: Number,
    public category: String,
    public points: Number
  ) {}
}
