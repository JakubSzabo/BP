import {Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {LightgalleryModule} from "lightgallery/angular";
import {BeforeSlideDetail} from "lightgallery/lg-events";
import lgZoom from 'lightgallery/plugins/zoom';
import {GalleryService} from "./gallery.service";
import {isPlatformBrowser} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {LightGalleryComponent} from "../../shared/components/light-gallery/light-gallery.component";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    LightgalleryModule,
    LightGalleryComponent
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideToggle', [
      state('void', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      state('*', style({ height: '*', opacity: 1, overflow: 'hidden' })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  ]
})
export class GalleryComponent implements OnInit {
  photosByCategory: any[] = [];

  constructor(
    private service: GalleryService,
  ) {
  }

  ngOnInit() {
    this.getAllCategories();
  }

  toggleCategory(category: any) {
    category.expanded = !category.expanded;
    if (category.expanded && !category.photos.length) {
      this.loadPhotos(category);
    }
  }

  private loadPhotos(category: any) {
    category.loading = true;
    this.service.getByCategories(category.name).subscribe(res => {
      category.photos = res;
      category.loading = false;
    }, error => {
      category.loading = false;
    });
  }

  private getAllCategories() {
    this.service.getCategories().subscribe(res => {
      this.photosByCategory = res.map(name => ({
        name,
        expanded: false,
        loading: false,
        photos: []
      }));
    });
  }
}
