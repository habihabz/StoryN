export class RequestParms {
  id: number;
  story:number;
  name: string;
  type: string;
  country :number;
  details:string;
  user:number;
  constructor() {
    this.id = 0;
    this.story=0;
    this.name='',
    this.type='',
    this.country=0;
    this.details='';
    this.user=0;
  }

}
