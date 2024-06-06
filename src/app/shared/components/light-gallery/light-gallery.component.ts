import {Component, Inject, Input, PLATFORM_ID} from '@angular/core';
import {LightgalleryModule} from "lightgallery/angular";
import lgZoom from "lightgallery/plugins/zoom";
import {BeforeSlideDetail} from "lightgallery/lg-events";

@Component({
  selector: 'app-light-gallery',
  standalone: true,
    imports: [
        LightgalleryModule
    ],
  templateUrl: './light-gallery.component.html',
  styleUrl: './light-gallery.component.scss'
})
export class LightGalleryComponent {
  @Input() photos: any[] = [];

  settings = {
    counter: false,
    plugins: [lgZoom]
  };

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
  };
}
