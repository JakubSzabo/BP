import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {EditorModule} from "primeng/editor";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ArticlesService} from "../articles.service";
import {NgxSimpleTextEditorModule} from "ngx-simple-text-editor";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-add-new',
  standalone: true,
  imports: [
    FormsModule,
    ChipsModule,
    EditorModule,
    ToastModule,
    NgxSimpleTextEditorModule,
    TranslateModule
  ],
  providers: [MessageService],
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.scss'
})
export class AddNewComponent {
  title: string = "";
  text: string = "";
  favorite: boolean = false;

  constructor(
    private messageService: MessageService,
    private service: ArticlesService,
  ) {
  }

  saveData() {
    const hasTitle = this.title.trim() !== '';
    const hasText = this.text.trim() !== '';

    if ((!hasTitle && !hasText) ||  (!hasTitle && hasText) || (hasTitle && !hasText))  {
      this.messageService.add({ severity: 'info', summary: 'Niečo chýba', detail: 'Niečo si zabudol vyplniť' });
    } else {
      this.service.create({ title: this.title, text: this.text, favorite: this.favorite }).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Hotovo', detail: 'Úspešne uložené' });
      })
    }
  }
}
