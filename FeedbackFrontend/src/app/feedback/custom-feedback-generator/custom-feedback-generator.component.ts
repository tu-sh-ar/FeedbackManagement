import { Component, OnInit } from '@angular/core';
import { CustomFeedbackFormBodySchema } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private _feedbackService: FeedbackService, private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.custom.businessCategory = JSON.parse(localStorage.getItem('user')!).businessCategory;
    this.custom.feedbackType = this._activatedRoute.snapshot.paramMap.get("id")!;
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
      this.custom.sections[outerIdx].questions[innerIdx].answerFormat.options = ["Yes", "No", "Not Sure"];
    }
    if(e==="starrating" || e==="emojirating"){
      this.custom.sections[outerIdx].questions[innerIdx].answerFormat.upperBound = 5;
    }
    if(e==="numberrating"){
      this.custom.sections[outerIdx].questions[innerIdx].answerFormat.upperBound = 10;
    }
  }

  saveCustomTemplate(): void {
    if(this.custom.feedbackFormName === ""){
      alert("Invalid feedback template format.")
      return
    }
    for(let section of this.custom.sections){
      if(section.title===""){
        alert("Invalid feedback template.")
        return
      }
      for(let qa of section.questions){
        if(qa.question === ""){
          alert("Invalid feedback template format.")
          return
        }
        if(qa.answerFormat.type === ""){
          alert("Invalid feedback template format.")
          return
        }
      }
    }

    this._feedbackService.createCustomTemplate(this.custom).subscribe((res) => {
      window.location.reload();
    })
  }
}