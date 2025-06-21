export class Step {
  sp_id: number;
  sp_story: number;
  sp_story_name: string;
  sp_q_type: string;
  sp_question:string;
  sp_attachment :string;
  sp_hint:string;
  sp_answer: string;
  sp_priority: number;
  sp_cre_by: number;
  sp_cre_by_name: string;
  sp_cre_date: string;
  constructor() {
    this.sp_id = 0;
    this.sp_story=1,
    this.sp_story_name='';
    this.sp_q_type='';
    this.sp_question='';
    this.sp_attachment='';
    this.sp_hint='';
    this.sp_answer='';
    this.sp_priority=0;
    this.sp_cre_by = 0;
    this.sp_cre_by_name = '';
    this.sp_cre_date = '';
  }

}
