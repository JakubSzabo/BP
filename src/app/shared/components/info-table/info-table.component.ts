import {Component, Input, OnInit, Output} from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-info-table',
  standalone: true,
  imports: [NgClass],
  templateUrl: './info-table.component.html',
  styleUrls: ['./info-table.component.scss']
})
export class InfoTableComponent {
  @Input() id: string = "";
  @Input() title: string = "";
  @Input() text: string = "";
  @Input() image: string = "assets/images/internat.svg";
  @Input() open: boolean = false;

  constructor(private sanitizer: DomSanitizer) {}

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
