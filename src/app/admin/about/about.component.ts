import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {NgxSimpleTextEditorModule} from "ngx-simple-text-editor";
import {EditorModule} from "primeng/editor";
import {TableModule} from "primeng/table";
import {SelectButtonModule} from "primeng/selectbutton";
import {AboutService} from "./about.service";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    NgxSimpleTextEditorModule,
    EditorModule,
    TableModule,
    SelectButtonModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @ViewChild('photoInput', { static: false }) photoInput!: ElementRef;

  id: string = ""
  title: string = "";
  text: string = "";
  map?: File = undefined;
  fileName: string = "";
  language: string = "SK";
  stateLanguages: { label: string, value: string }[] = [
    { label: 'SK', value: 'SK' },
    { label: 'EN', value: 'EN' }
  ];
  documents: any[] = [];
  photos: any[] = [];
  selectedFileBase64?: string;

  constructor(
    private service: AboutService
  ) {
  }

  ngOnInit(): void {
    this.getAllFiles();
    this.getPhotos();
    this.getAboutSD()
  }

  //ABOUT
  private getAboutSD() {
    this.service.getAboutSD().subscribe(res => {
      this.id = res.id;
      this.title = res.title;
      this.text = res.text;
    })
  }

  async saveAbout() {
    let body: { title: string; text: string; map?: string } = {
      title: this.title,
      text: this.text
    }

    if (this.map) {
      try {
        const photoTo64Promise = this.convertToBase64Photo(this.map);
        const photoToUpload = await Promise.all([photoTo64Promise])
        body = {
          title: this.title,
          text: this.text,
          map: photoToUpload[0]
        }
      } catch (error) {
        console.error("Error converting map to base64:", error);
        return;
      }
    }

    if (this.id === "") {
      this.service.creteAboutSD(body).subscribe(_ => {
          this.getAboutSD();
        }
      );
    } else {
      this.updateAbout(body);
    }
  }

  private async updateAbout(body: any) {
    this.service.updateAboutSD(this.id, body).subscribe(_ => {
        this.getAboutSD();
      }
    );
  }

  //MAP
  onMapSelected($event: Event) {
    const input = event?.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.map = input.files[0];
    }
  }

  //PHOTO
  triggerPhotoInput() {
    this.photoInput.nativeElement.click();
  }

  async onPhotoSelected(event: Event) {
    const input = event?.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const photoFile = input.files[0];
      const photoTo64Promise = this.convertToBase64Photo(photoFile);
      const photoToUpload = await Promise.all([photoTo64Promise])
      this.uploadPhoto(photoToUpload[0]);
    }
  }

  getPhotos() {
    this.service.getPhotoByCategory("aboutSD").subscribe(res => {
      this.photos = res;
    })
  }

  uploadPhoto(photo: string) {
    const body = {
      data: photo,
      category: "aboutSD"
    };
    this.service.createPhoto(body).subscribe(_ => {
      this.getPhotos();
    });
  }

  deletePhoto(id: string) {
    this.service.deletePhoto(id).subscribe(_ => {
      if (this.photos.length === 1) this.photos = [];
      this.getPhotos();
    })
  }

  private convertToBase64Photo(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  //FILES
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.convertToBase64(file);
    }
  }

  download(file: any) {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    link.click();
  }

  private getAllFiles() {
    this.service.getAllFiles().subscribe(res => {
      this.documents = res;
    })
  }

  uploadFile() {
    if (!this.selectedFileBase64) {
      return;
    }

    const body = {
      name: this.fileName,
      data: this.selectedFileBase64,
      language: this.language
    };

    this.service.creteFile(body).subscribe(res => {
      this.getAllFiles();
    })
  }

  delete(id: string) {
    this.service.deleteFile(id).subscribe( res => {
      if (this.documents.length === 1) this.documents = [];
      this.getAllFiles();
    })
  }

  private convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFileBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
