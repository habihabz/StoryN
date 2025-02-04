import { Component, ElementRef } from '@angular/core';
import { Feedback } from '../../../models/feedback.model';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../services/isnackbar.service';
import { IFeedbackService } from '../../../services/ifeedback.service';
import { DbResult } from '../../../models/dbresult.model';

@Component({
  selector: 'app-contact.us',
  templateUrl: './contact.us.component.html',
  styleUrl: './contact.us.component.css'
})
export class ContactUsComponent {
  feedback:Feedback=new Feedback();


  constructor(
    private elRef: ElementRef,
    private router: Router,
    private snackBarService: SnackBarService,
    private ifeedbackService: IFeedbackService,

  ) 
  {
    
  }



  createOrUpdateFeedback() {
    if (this.feedback.f_first_name != "" && this.feedback.f_last_name != "") {
      this.ifeedbackService.createOrUpdateFeedback(this.feedback).subscribe(
        (result: DbResult) => {
          if (result.message == "Success") {
            this.feedback=new Feedback();
            this.snackBarService.showSuccess("Your feedback has been sent successfully. Thank you for sharing your thoughts!");
          } else {
            this.snackBarService.showError(result.message);
          }
        },
        (error: any) => {
          
        }
      );
    }else{
      this.snackBarService.showError("Please enter all details !!.")
    }
  }
}
