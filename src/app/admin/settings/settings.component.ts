import {Component, OnInit} from '@angular/core';
import {MessageService, SharedModule} from "primeng/api";
import { TableModule } from "primeng/table";
import { Member } from "../../shared/models/member";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {SettingService} from "./setting.service";
import {ToastModule} from "primeng/toast";
import {DropdownModule} from "primeng/dropdown";
import {AboutService} from "../articles/about.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    SharedModule,
    TableModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    ToastModule,
    DropdownModule,
    TranslateModule
  ],
  providers: [MessageService],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  members: Member[] = []
  id?: string = "";
  name: string = "";
  room: string = "";
  phoneNumber: string = "";
  visible: boolean = false;
  edit: boolean = false;
  roles = [
    { name: "Predseda", code: "PREDSEDA" },
    { name: "Podpredseda", code: "POD_PREDSEDA" },
    { name: "Člen predsedníctva", code: "CLEN_PREDSEDNICTVA" },
    { name: "Člen", code: "CLEN" },
    { name: "Adept", code: "ADEPT" },
  ]
  selectedRole = "CLEN";

  idAbout: string = "";
  firstText: string = "";
  firstPhoto?: File = undefined;
  secondText: string = "";
  secondPhoto?: File = undefined;
  aboutCreated = false;

  constructor(
    private service: SettingService,
    private messageService: MessageService,
    private aboutService: AboutService,
  ) {
  }

  ngOnInit() {
    this.getAllMembers();
    this.getAll();
  }

  getAll() {
    this.aboutService.getAll().subscribe( res => {
      this.aboutCreated = true;
      this.idAbout = res[0].id;
      this.firstText = res[0].firstText;
      this.secondText = res[0].secondText;
    });
  }

  private getAllMembers() {
    this.service.getAllMembers().subscribe(res => {
      this.members = res;
    })
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  async saveAbout() {
    if (this.aboutCreated) {
      await this.updateAbout();
      return;
    }
    try {
      if (!this.firstPhoto || !this.secondPhoto || !this.firstText || !this.secondText || this.firstText === "" || this.secondText === "") {
        return;
      }

      const firstPhotoBase64Promise = this.convertToBase64(this.firstPhoto);
      const secondPhotoBase64Promise = this.convertToBase64(this.secondPhoto);

      const [firstPhotoBase64, secondPhotoBase64] = await Promise.all([firstPhotoBase64Promise, secondPhotoBase64Promise]);

      const data = {
        firstText: this.firstText,
        secondText: this.secondText,
        firstPhotos: firstPhotoBase64,
        secondPhotos: secondPhotoBase64,
      };

      this.aboutService.createAbout(data).subscribe(response => {
        this.getAll();
      }, error => {
      });
    } catch (error) {
    }
  }

  private async updateAbout() {
    try {
      if (!this.idAbout || !this.firstText || !this.secondText || this.firstText === "" || this.secondText === "") {
        return;
      }

      let firstPhotoBase64 = null;
      let secondPhotoBase64 = null;

      if (this.firstPhoto) {
        const firstPhotoBase64Promise = this.convertToBase64(this.firstPhoto);
        firstPhotoBase64 = await firstPhotoBase64Promise;
      }

      if (this.secondPhoto) {
        const secondPhotoBase64Promise = this.convertToBase64(this.secondPhoto);
        secondPhotoBase64 = await secondPhotoBase64Promise;
      }

      const data: any = {
        id: this.idAbout,
        firstText: this.firstText,
        secondText: this.secondText,
      };

      if (firstPhotoBase64) {
        data.firstPhotos = firstPhotoBase64;
      }

      if (secondPhotoBase64) {
        data.secondPhotos = secondPhotoBase64;
      }

      this.aboutService.updateAbout(this.idAbout, data).subscribe(response => {
        this.getAll();
      }, error => {
      });
    } catch (error) {
      console.error(error);
    }
  }

  onFileSelected(event: Event, first: boolean) {
    const input = event.target as HTMLInputElement;
    if (first && input.files && input.files.length > 0) {
      this.firstPhoto = input.files[0];
    } else if (!first && input.files && input.files.length > 0) {
      this.secondPhoto = input.files[0];
    }
  }

  getMember(id: string) {
    this.service.getMember(id).subscribe(res => {
      this.visible = true;
      this.edit = true;
      this.id = res.id;
      this.name = res.name;
      this.room = res.room;
      this.selectedRole = res.role;
      this.phoneNumber = res.phoneNumber;
    })
  }

  createOrUpdateMember() {
    if (this.edit) {
      this.service.updateMember(this.id!, {
        name: this.name,
        room: this.room,
        role: this.selectedRole,
        phoneNumber: this.phoneNumber
      }).subscribe(_ => {
        this.getAllMembers();
        this.visible = false;
        this.clearData();
        this.messageService.add({
          severity: 'success',
          summary: 'Úspešne upravený',
          detail: 'Člen úspešne upravený'
        });
      });
    } else {
      this.service.createMember({
        name: this.name,
        room: this.room,
        role: this.selectedRole,
        phoneNumber: this.phoneNumber
      }).subscribe(_ => {
        this.visible = false;
        this.clearData();
        this.getAllMembers();
        this.messageService.add({
          severity: 'success',
          summary: 'Úspešne vytvorené',
          detail: 'Člen úspešne vytvorený'
        });
      })
    }
  }

  deleteMember(id: string) {
    this.service.deleteMember(id).subscribe(_ => {
      this.getAllMembers();
      this.messageService.add({
        severity: 'success',
        summary: 'Úspešne odstránený',
        detail: 'Člen úspešne odstránený'
      });
    })
  }

  showDialog() {
    this.visible = true;
    this.edit = false;
    this.clearData();
  }

  private clearData() {
    this.edit = false;
    this.name = "";
    this.phoneNumber = "";
    this.room = "";
    this.selectedRole = "CLEN";
  }

  getRole(role: string | null) {
    if (!role) {
      return "";
    }
    const foundRole = this.roles.find(r => r.code === role);
    return foundRole ? foundRole.name : "";
  }
}
