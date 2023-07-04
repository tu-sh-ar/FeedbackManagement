import { Component, OnInit } from '@angular/core';
import { FeedbackTemplate } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FormGroup, FormControl,FormArray, FormBuilder } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feedback-templates',
  templateUrl: './feedback-templates.component.html',
  styleUrls: ['./feedback-templates.component.scss']
})
export class FeedbackTemplatesComponent implements OnInit{

  activatedTemplateId!:string;
  activeFeedbackTemplate!:FeedbackTemplate[];
  currentQA!:{question:string; answerFormat:string;}[];
  enableEditing:boolean = false;

  constructor(
    private _feedbackService: FeedbackService,
    private _snackbar: MatSnackBar
  ){}

  ngOnInit(): void {
    this._feedbackService.getFeedbackTemplate().subscribe((res)=>{
      this.activeFeedbackTemplate = res;
      this.activatedTemplateId = this.activeFeedbackTemplate[0]._id;
      this.currentQA = this.activeFeedbackTemplate[0].qas;
    })
  }

  removeQAField(i:number): void{
    if(confirm("Do you want to remove the QA?")) {
      this.currentQA.splice(i,1);
    }
  }

  disableEditingFeature():void{
    this.enableEditing = !this.enableEditing;
    window.location.reload();
  }

  enableEditingFeature():void{
    this.enableEditing = !this.enableEditing;
  }

  addQA():void{
    this.currentQA.unshift({question:"", answerFormat:""});
  }

  updateQuesInNewQA(e:any, idx:number) {
    this.currentQA[idx].question = e.target.value;
  }

  updateAnsFormatInNewQA(e:any,idx:number):void{
    this.currentQA[idx].answerFormat = e.value;
  }

  saveQA():void{
    for(let qas of this.currentQA) {
      if(qas.answerFormat == "" || qas.question == "") {
        alert("Question or Rating Method can not be empty in QAS.");
        return;
      }
    }
    this.activeFeedbackTemplate[0].qas = this.currentQA;
    console.log(this.activeFeedbackTemplate[0])
    this._feedbackService.updateFeedbackTemplate(this.activatedTemplateId, this.activeFeedbackTemplate[0]).subscribe((res)=>{
      this._snackbar.open("Feedback Template updated!", "OK")
      setTimeout(()=>{
        window.location.reload();
      }, 2000)
    })
  }

}
