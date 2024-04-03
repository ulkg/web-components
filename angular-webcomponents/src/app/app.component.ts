import { Component } from '@angular/core';
//import the custom components and register it with the browser. 
import './webcomponents/AutoCompleteTextInput';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  count: number = 0;
  suggestions: string[] = ['Advanced IT Project Management', 'Advanced Modeling', 'Advanced Software Testing', 'Führung von verteilten, multikulturellen und inernationalen Teams', 'Funktionale Programmierung', 'Requirements Engineering',
    'Softwarearchitektur', 'Software Engineering', 'User Centered Design', 'Advanced Software Quality Mangement', 'Software Frameworks'];
  placeholder = 'Enter subject...';
  selection: string;
  lostFocusWithoutInput: boolean = false;
  enteredValue: string;

  // called whenever lostFocus event was dispatched 
  handleLostFocus(event) {
    console.log("Received lost focus CustomEvent: " + event);
    const detail: string = event.detail;
    if (detail === undefined || detail.length == 0) {
      this.lostFocusWithoutInput = true;
      this.selection = null;
      return;
    }
    this.lostFocusWithoutInput = false;
    if (event.detail.length > 0) {
      this.enteredValue = event.detail;
    }
  }

  // called whenever chosenSubject event was dispatched 
  handleSelection(event) {
    console.log("Received chosenSubject CustomEvent: " + event);
    this.selection = event.detail;
  }
}