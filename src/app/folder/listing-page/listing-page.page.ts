import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonList, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { ExpressMongoService } from 'src/app/express-mongo.service';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.page.html',
  styleUrls: ['./listing-page.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonLabel, IonList, IonItem, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class ListingPagePage implements OnInit {
  outMsg: any; question: any; answer: any;
  outRec: any = []; id: any;

  constructor(private mongo: ExpressMongoService) { }

  ngOnInit() {
  }

  retrieve() {
    const params = { question: this.question, answer: this.answer, _id: this.id };
    this.mongo.retrieve().subscribe({
      next: (data: any) => {
        console.log(data);
        this.outRec = data;
        this.outMsg = this.outRec.length + 'retrieved';
      },
      error: (e) => {
        console.error(e);
        this.outMsg = e.message;
      },
      complete: () => console.info('Complete')
    });
  }
}