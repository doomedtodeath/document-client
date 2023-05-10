import { Component, OnInit } from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";

import * as moment from 'moment';
import {PDFDocumentProxy} from "ng2-pdf-viewer";
import {forEach} from 'lodash';
import {MatSnackBar} from "@angular/material/snack-bar";
import {PdfLoadedEvent} from "ngx-extended-pdf-viewer/lib/events/pdf-loaded-event";

@Component({
  selector: 'app-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrls: ['./pdfviewer.component.css']
})
export class PdfviewerComponent implements OnInit {
  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  current = moment();
  previous = moment();
  data: { [key: string]: number } = {};
  prevPage: number = 1;
  totalPages: number = 0;
  currentPage: number = 0;
  chartData: any = [];
  // ref: AngularFireStorageReference;
  // task: AngularFireUploadTask;
  // uploadProgress: Observable<any>;
  downloadURL: Observable<any> = new Observable<any>();
  randomId = '';

  constructor(private afStorage: AngularFireStorage, private _snackBar: MatSnackBar) { console.log('XXX'); }

  ngOnInit(): void {
  }

  download(){
    this.downloadURL = this.afStorage.ref(this.randomId).getDownloadURL();
    this.downloadURL.subscribe((data) => {this.pdfSrc = data})
  }

  onClick(e: any) {
    console.log(e.target)
  }

  page(e: number) {
    this.openSnackBar(e.toString());
    this.current = moment();
    this.currentPage = e;
    // console.log(this.current);
    // console.log(moment(this.current).diff(this.previous, 'second'));
    console.log(this.prevPage, moment(this.current).diff(this.previous, 'second'));
    this.data[this.prevPage] = (this.data[this.prevPage] ? this.data[this.prevPage] : 0) + moment(this.current).diff(this.previous, 'second')
    this.prevPage = e;
    console.log(this.prevPage);
    this.previous = moment();
    console.log(this.data);
    this.mapData()
  }

  mapData(){
    forEach(this.data, (v, k) => {
      console.log(k,v)
      this.chartData = [...this.chartData, {name: k, value: v}]
    })
  }

  afterLoadComplete(e: PdfLoadedEvent) {
    console.log(e);
    this.totalPages = e.pagesCount
    this.makeObj(e.pagesCount)
  }

  makeObj(num: number) {
    for (let i = 1; i <= num; i++) {
      this.data[i] = 0;
    }
  }

  openSnackBar(message: string) {
    let str = `${message}/${this.totalPages}`
    this._snackBar.open(str);
  }

}
