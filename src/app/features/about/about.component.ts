import {Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import { AboutService } from "./about.service";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { SharedModule } from "primeng/api";
import { TableModule } from "primeng/table";
import lgZoom from "lightgallery/plugins/zoom";
import { BeforeSlideDetail } from "lightgallery/lg-events";
import { LightgalleryModule } from "lightgallery/angular";
import { isPlatformBrowser } from "@angular/common";
import {LightGalleryComponent} from "../../shared/components/light-gallery/light-gallery.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    SharedModule,
    TableModule,
    LightgalleryModule,
    LightGalleryComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  data?: { title: string, text: string, map: string };
  photos: any[] = [];
  documents: any[] = [];
  settings = {
    counter: false,
    plugins: [lgZoom]
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private service: AboutService,
    private sanitizer: DomSanitizer,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.settings = {
        counter: false,
        plugins: [lgZoom]
      };
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getAll();
    }
  }

  private getAll() {
    this.service.getAll().subscribe(res => {
      this.data = res;
    });
    this.service.getByCategory().subscribe(res => {
      this.photos = res;
    });
    this.service.getAllFiles().subscribe(res => {
      this.documents = res;
    });
  }

  download(file: any) {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    link.click();
  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
  };
}
