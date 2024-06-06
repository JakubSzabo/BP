import {Component, OnInit} from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {Member} from "../../../shared/models/member";
import {CheckboxModule} from "primeng/checkbox";
import {RusEvent} from "../../../shared/models/rusEvent";
import {EditorModule} from "primeng/editor";
import {ChipsModule} from "primeng/chips";
import {HomeService} from "../home.service";
import {NgxSimpleTextEditorModule} from "ngx-simple-text-editor";

@Component({
  selector: 'app-add-script',
  standalone: true,
    imports: [
        CalendarModule,
        FormsModule,
        CheckboxModule,
        EditorModule,
        ChipsModule,
        NgxSimpleTextEditorModule
    ],
  templateUrl: './add-script.component.html',
  styleUrl: './add-script.component.scss'
})
export class AddScriptComponent implements OnInit {
  title: string = "Stretnutie RUŠ";
  date: Date = new Date();
  members: Member[] = [];
  onMeeting: string[] = [];
  events: RusEvent[] = [];
  elseText: string = "";

  constructor(
    private service: HomeService,
  ) {
  }


  ngOnInit() {
    this.service.getAllMembers().subscribe(res => {
      this.members = res;
    })
  }

  addEvent() {
    this.events.push({ id: undefined, title: "", date: new Date(), text: "" });
  }

  saveData() {
    this.service.create({
      title: this.title,
      date: this.date,
      onMeeting: this.onMeeting,
      events: this.events,
      other: this.elseText
    }).subscribe(res => {
      console.log(res);
    });
  }
}
