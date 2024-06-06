import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SelectButtonModule} from "primeng/selectbutton";
import {ContactsService} from "./contacts.service";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    ReactiveFormsModule,
    SelectButtonModule,
    FormsModule
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit {
  @ViewChild('contactInput', { static: false }) logoInput!: ElementRef;

  contacts: { id: string, name: string, logo: string, link: string, category: string }[] = [];
  categories= [
    { label: 'Kontakty', value: 'contacts' },
    { label: 'Sponzory', value: 'sponsors' },
    { label: 'Iné', value: 'other' },
  ];
  selectedCategories = 'contacts';
  selectedFileBase64: string = "";
  fileName: string = "";
  link: string = "";

  constructor(private service: ContactsService) {}

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.service.getAll().subscribe(res => {
      this.contacts = res;
    })
  }

  uploadFile() {
    if (!this.fileName && this.fileName === "" && !this.selectedFileBase64 && this.selectedFileBase64 === "") {
      return
    }

    const body = {
      name: this.fileName,
      logo: this.selectedFileBase64,
      link: this.link,
      category: this.selectedCategories
    }

    this.service.createContact(body).subscribe(_ => {
      this.getAll();
      this.fileName = "";
      this.link = "";
      this.selectedFileBase64 = "";
    })
  }

  delete(id: string) {
    this.service.deleteContact(id).subscribe(_ => {
      if (this.contacts.length === 1) this.contacts = [];
      this.getAll();
    })
  }

  triggerContactInput() {
    this.logoInput.nativeElement.click();
  }

  onContactSelected($event: Event) {
    const input = event?.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.convertToBase64(file);
    }
  }

  private convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFileBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
