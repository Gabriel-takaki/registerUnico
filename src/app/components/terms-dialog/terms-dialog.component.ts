import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terms-dialog',
  templateUrl: './terms-dialog.component.html',
  styleUrls: ['./terms-dialog.component.css']
})
export class TermsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TermsDialogComponent>) {}

  ngOnInit(): void {
  }

}
