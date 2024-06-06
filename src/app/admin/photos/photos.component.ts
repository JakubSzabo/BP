import {Component, OnInit} from '@angular/core';
import {FileUploadModule} from "primeng/fileupload";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PhotosService} from "./photos.service";

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    FileUploadModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent implements OnInit {
  uploadedFiles: any[] = [];
  photosByCategory: { [category: string]: { photoId: string, data: string }[] } = {};
  category: string = "";

  photos: { id: string, data: string, category: string}[] = [];

  constructor(private service: PhotosService) {}

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.service.getAll().subscribe(res => {
      this.parseToCategories(res);
    })
  }

  private parseToCategories(data: any[]) {
    this.photosByCategory = {};
    data.forEach(photo => {
      if (!this.photosByCategory[photo.category]) {
        this.photosByCategory[photo.category] = [];
      }
      this.photosByCategory[photo.category].push({
        photoId: photo.id,
        data: photo.data
      });
    });
  }

  getCategories(): string[] {
    return Object.keys(this.photosByCategory);
  }

  onUpload(event: any) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  async save() {
    for (let file of this.uploadedFiles) {
      const base64 = await this.convertToBase64(file);
      this.uploadPhoto(base64);
    }

    this.uploadedFiles = [];
    this.category = "";
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  private uploadPhoto(base64: string) {
    if (this.category === "") return;

    const body = {
      data: base64,
      category: this.category
    };

    this.service.createPhoto(body).subscribe(_ => {
      this.getAll();
      }
    )
  }

  deletePhoto(id: string) {
    this.service.deletePhoto(id).subscribe(_ => {
      if (this.photos.length === 1) this.photos = [];
      this.getAll();
    })
  }
}
