import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EditorModule} from "primeng/editor";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {ArticlesService} from "../articles.service";
import {NgxSimpleTextEditorModule} from "ngx-simple-text-editor";

@Component({
  selector: 'app-edit',
  standalone: true,
    imports: [
        EditorModule,
        InputTextModule,
        PaginatorModule,
        ToastModule,
        NgxSimpleTextEditorModule
    ],
  providers: [MessageService],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  id: string | null = "";
  title: string = "";
  text: string = '';
  favorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: ArticlesService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.service.get(this.id!).subscribe(res => {
        this.title = res.title;
        this.text = res.text;
        this.favorite = res.favorite;
      })
    });
  }

  saveData() {
    const hasTitle = this.title.trim() !== '';
    const hasText = this.text.trim() !== '';

    if ((!hasTitle && !hasText) ||  (!hasTitle && hasText) || (hasTitle && !hasText))  {
      this.messageService.add({ severity: 'info', summary: 'Niečo chýba', detail: 'Niečo si zabudol vyplniť' });
    } else {
      this.service.update(this.id!, { title: this.title, text: this.text, favorite: this.favorite }).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Hotovo', detail: 'Úspešne uložené' });
      })
    }

  }
}
