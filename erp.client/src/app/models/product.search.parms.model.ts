export class ProductSearchParms {
  id: number;
  categories: string;
  subcategories :string ;
  sizes: string;
  country :number;
  orderBy :string;

  constructor() {
    this.id = 0;
    this.categories='',
    this.subcategories='',
    this.sizes='';
    this.country=0;
    this.orderBy='';
  }

}
