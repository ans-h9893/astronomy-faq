import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { ExpressMongoService } from 'src/app/express-mongo.service';
import { ITEMS } from 'src/app/data/sample';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonList, IonItem, IonLabel]
})
export class MainPagePage implements OnInit {
  outMsg: any; 
  outRec: any = [];
  dbname!: string;
  colname!: string;
  isDbCreated: boolean = false;
  question!: string;
  answer!: string;

  constructor(private mongo: ExpressMongoService) { }
  ngOnInit(): void {
    
  }

  create() {
    const data = {
      dbname: this.dbname, colname: this.colname
    };
    window.confirm('Are you sure you want to create the database and collection?') &&
    this.mongo.create(data).subscribe({
      next: (data:any) => {
        console.log(data);
        this.outMsg = data.message;
        this.outRec = [];
      },
      error: (e) => {
        console.error(e);
        this.outMsg = e.message;
      },
      complete: () => console.info('Database creation complete')
    })
    this.isDbCreated= true;
  }

  batchLoad(){
    window.confirm('Are you sure you want to load the batch of items?') &&
    this.mongo.batchLoad(ITEMS).subscribe({
      next: (data: any) => {
        console.log(data);
        this.outMsg = data.message;
        this.outRec = [];
      },
      error: (e) => {
        console.error(e);
        this.outMsg = e.message;
      },
      complete: () => console.info('Batch load complete')
    });
  }

  deleteAllItems() {
    window.confirm('Are you sure you want to delete all items?') && 
    this.mongo.deleteAll().subscribe({
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