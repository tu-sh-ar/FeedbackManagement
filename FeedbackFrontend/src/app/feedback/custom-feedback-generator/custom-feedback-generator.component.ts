import { Component, OnInit } from '@angular/core';
import { CustomFeedbackFormBodySchema } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-feedback-generator',
  templateUrl: './custom-feedback-generator.component.html',
  styleUrls: ['./custom-feedback-generator.component.scss']
})
export class CustomFeedbackGeneratorComponent implements OnInit {
  options = [
    {
      type: "starrating",
      label: "Star Rating",
      value: "number",
      needsUpperBound: true
    },
    {
      type: "numberrating",
      label: "Number Rating",
      value: "number",
      needsUpperBound: true
    },
    {
      type: "emojirating",
      label: "Emoji Rating",
      value: "number",
      needsUpperBound: true
    },
    {
      type: "textarea",
      label: "Long Text",
      value: "textarea",
      isTextType: true
    },
    {
      type: "radio",
      label: "Radio",
      value: "radio",
      needsOptions: true,
      isTextType: false
    },
    {
      type: "file",
      label: "File",
      value: "file",
      needsOptions: false,
      isTextType: false
    }
  ];

  custom: CustomFeedbackFormBodySchema = {
    feedbackFormName: "",
    businessCategory: 0,
    feedbackType: "",
    sections: [
      {
        title: "New Section",
        order: 1,
        questions: [
          {
            question: "",
            order: 1,
            answerFormat: {
              type: "",
              required: false
            }
          }
        ]
      }
    ]
  };

  constructor(
    private _feedbackService: FeedbackService,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
    ){}

  ngOnInit(): void {
    this.custom.businessCategory = JSON.parse(localStorage.getItem('user')!).businessCategory;
    this.custom.feedbackType = this._activatedRoute.snapshot.paramMap.get("categoryId")!;
    console.log(this.custom.feedbackType);
  }

  trackByFn(index:number, item:any) {
    return index;  
  }

  addSection(): void {
    this.custom.sections.push({ title: "New Section", questions: [{ question: "", order: 1, answerFormat: { type: "", required: false } }] })
    for (let section of this.custom.sections) {
      section.order = (this.custom.sections.indexOf(section)) + 1;
    }
  }

  addQAToSection(outerIdx: number): void {
    this.custom.sections[outerIdx].questions.push({ question: "", answerFormat: { type: "", required: false } })
    for (let qa of this.custom.sections[outerIdx].questions) {
      qa.order = (this.custom.sections[outerIdx].questions.indexOf(qa)) + 1;
    }
  }

  removeQAFromSection(outerIdx: number, innerIdx: number): void {
    this.custom.sections[outerIdx].questions.splice(innerIdx, 1);
    for (let qa of this.custom.sections[outerIdx].questions) {
      qa.order = (this.custom.sections[outerIdx].questions.indexOf(qa)) + 1;
    }
  }

  deleteSection(outerIdx: number): void {
    this.custom.sections.splice(outerIdx, 1);
    for (let section of this.custom.sections) {
      section.order = (this.custom.sections.indexOf(section)) + 1;
    }
  }

  handleAnswerType(e:string, outerIdx:number, innerIdx:number):void{
    if(e==="radio"){
      this.custom.sections[outerIdx].questions[innerIdx].answerFormat.options = [""];
    }
    if(e==="starrating" || e==="emojirating"){
      this.custom.sections[outerIdx].questions[innerIdx].answerFormat.upperBound = 5;
    }
    if(e==="numberrating"){
      this.custom.sections[outerIdx].questions[innerIdx].answerFormat.upperBound = 10;
    }
  }

  addOption(outerIdx:number, innerIdx:number):void{
    this.custom.sections[outerIdx].questions[innerIdx].answerFormat.options?.push("");
  }


  deleteOption(outerIdx:number, innerIdx:number,optionIdx:number){
    this.custom.sections[outerIdx].questions[innerIdx].answerFormat.options?.splice(optionIdx, 1);
  }

  saveCustomTemplate(): void {
    console.log(this.custom);

    if(this.custom.feedbackFormName === ""){
      alert(`Template Name is a mandatory field.`)
      return
    }
    for(let section of this.custom.sections){
      if(section.title===""){
        alert(`Section Names are mandatory fields.`)
        return
      }
      for(let qa of section.questions){
        if(qa.question === ""){
          alert(`Empty question fields are not allowed in section - ${section.title}`)
          return
        }
        if(qa.answerFormat.type === ""){
          alert(`Empty answer fields are not allowed in section - ${section.title}`)
          return
        }
        if(qa.answerFormat.type==="radio"){
          if(qa.answerFormat.options?.length===0){
            alert(`You must provide options for radio based answer types in section - ${section.title}`)
            return
          }else{
            for(let opt of qa.answerFormat.options!){
              if(opt === ""){
                alert(`You can't have an empty option for a radio answer type in section - ${section.title}`)
                return
              }
            }
          }  
        }
      }
    }

    this._feedbackService.createCustomTemplate(this.custom).subscribe((res) => {
      console.log(res);
      this._snackBar.open("Template successfully created.", "OK")
      setTimeout(()=>{
        window.location.reload();
      }, 2500);
    }, (err)=>{
      this._snackBar.open("Failed to create the template.", "OK")
    })
  }
}