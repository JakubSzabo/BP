import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HomeService} from "./home.service";
import {Script} from "../../shared/models/script";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  data: Script[] = [];

  constructor(
    private service: HomeService
  ) {
  }
  ngOnInit() {
    this.getAll();
  }

  private getAll() {
    this.service.getAll().subscribe(res => {
      this.data = res;
    })
  }

  get(id: string) {
    this.service.get(id).subscribe(res => {
      console.log(res)
    })
  }

  delete(id: string) {
    this.service.delete(id).subscribe(_ => {
      this.getAll();
    })
  }

  copyItem(item: Script) {
    this.service.copy(item.id!, {
      title: item.title,
      date: item.date,
      onMeeting: item.onMeeting,
      events: item.events,
      other: item.other}
    ).subscribe(_ => {
      this.getAll();
    });
  }
}
