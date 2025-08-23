import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { ExpressMongoService } from 'src/app/express-mongo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.page.html',
  styleUrls: ['./update-page.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput, IonButton, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class UpdatePagePage implements OnInit {
  private route = inject(ActivatedRoute);
  outMsg: any; question= ''; answer= ''; outRec: any = []; isEdit: boolean = false; _id= '';

  constructor(private mongo: ExpressMongoService) { }

  ngOnInit(){
    this.route.queryParams.subscribe(p => {
      this.question = p['question'] || '';
      this.answer  = p['answer']  || '';
      this._id      = p['_id']     || '';
    });
  }


  insert() {
    const data = {
      question: this.question, answer: this.answer
    };
    window.confirm('Are you sure you want to insert this item?') &&
    this.mongo.insert(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.outMsg = data.message;
        this.outRec = [];
      },
      error: (e) => {
        console.error(e);
        this.outMsg = e.message;
      },
      complete: () => console.info('Complete')
    });
  }

  update(){
    const data = {
       question: this.question, answer: this.answer
    };
    window.confirm('Are you sure you want to update this item?') &&
    this.mongo.update(this._id,data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.outMsg = data.message;
        this.outRec = [];
      },
      error: (e) => {
        console.error(e);
        this.outMsg = e.message;
      },
      complete: () => console.info('Complete')
    });
  }

  delete(){
    const data = {
      question: this.question, answer: this.answer
    };
    window.confirm('Are you sure you want to delete this item?') &&
    this.mongo.delete(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.outMsg = data.message;
        this.outRec = [];
      },
      error: (e) => {
        console.error(e);
        this.outMsg = e.message;
      },
      complete: () => console.info('Complete')
    });
  }
}
