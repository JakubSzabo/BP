import {Component, OnInit} from '@angular/core';
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {RouterLink} from "@angular/router";
import {FormService} from "./form/form.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-form-table',
  standalone: true,
  imports: [
    SharedModule,
    TableModule,
    RouterLink,
    DatePipe
  ],
  templateUrl: './form-table.component.html',
  styleUrl: './form-table.component.scss'
})
export class FormTableComponent implements OnInit {
  data: any[] = [];

  constructor(private service: FormService) {
  }

  ngOnInit(): void {
    this.service.getAllForms().subscribe(res => {
      this.data = res;
    });
  }

  delete(id: string) {
    this.service.deleteForm(id);
  }


}
