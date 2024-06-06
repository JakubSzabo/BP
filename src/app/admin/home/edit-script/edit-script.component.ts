import {Component, OnInit} from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {EditorModule} from "primeng/editor";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Member} from "../../../shared/models/member";
import {RusEvent} from "../../../shared/models/rusEvent";
import {HomeService} from "../home.service";
import {ActivatedRoute} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {
  NgxSimpleTextEditorModule,
} from "ngx-simple-text-editor";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-edit-script',
  standalone: true,
  imports: [
    CalendarModule,
    CheckboxModule,
    EditorModule,
    NgxSimpleTextEditorModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    TranslateModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './edit-script.component.html',
  styleUrl: './edit-script.component.scss'
})
export class EditScriptComponent implements OnInit {
  id?: string | null;
  title: string = "";
  date: Date = new Date();
  members: Member[] = [];
  onMeeting: string[] = [];
  events: RusEvent[] = [];
  elseText: string = "";
  constructor(
    private service: HomeService,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {
  }


  ngOnInit() {
    this.service.getAllMembers().subscribe(res => {
      this.members = res;
    })

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.service.get(this.id!).subscribe(res => {
        this.title = res.title;
        this.date = new Date(res.date);
        this.onMeeting = res.onMeeting || [];
        this.events = res.events || [];
        this.elseText = res.other || "";

        if (this.events) {
          this.events = this.events.map(event => ({
            ...event,
            date: new Date(event.date)
          }));
        } else {
          this.events = [];
        }
      })
    });
  }

  addEvent() {
    this.events.push({ id: undefined, title: "", date: new Date(), text: "" });
  }

  saveData() {
    this.service.update(this.id!, {
      title: this.title,
      date: this.date,
      onMeeting: this.onMeeting,
      events: this.events,
      other: this.elseText
    }).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Hotovo', detail: 'Úspešne uložené zmeny' });
    });
  }
}
