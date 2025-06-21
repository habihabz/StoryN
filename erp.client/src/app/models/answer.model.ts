export class Answer {
  a_id: number;
  a_story: number;
  a_story_name :string;
  a_step: number;
  a_answer: string;
  a_cre_by: number;
  a_cre_by_name :string;
  a_cre_date: string;

  constructor() {
    this.a_id = 0;
    this.a_story = 0;
    this.a_story_name='';
    this.a_step = 0;
    this.a_answer = '';
    this.a_cre_by = 0;
    this.a_cre_by_name='';
    this.a_cre_date = '';
  }
}