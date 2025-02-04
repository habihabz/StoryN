export class ProductReview {
  pr_id: number;
  pr_prod_id: number;
  pr_overall_rating: number;
  pr_head_line: string;
  pr_review: string;
  pr_cre_by: number;
  pr_cre_by_name: string;
  pr_created_on: string;

  constructor() {
    this.pr_id = 0;
    this.pr_prod_id = 0;
    this.pr_overall_rating = 0;
    this.pr_head_line = '';
    this.pr_review = '';
    this.pr_cre_by = 0;
    this.pr_cre_by_name = '';
    this.pr_created_on = '';
  }
  
}
