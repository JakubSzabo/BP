import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  public mainContacts = [
    {
      link: "https://www.facebook.com/RUSSDMladost/",
      icon: "pi-facebook"
    },
    {
      link: "https://www.instagram.com/rus.mladost/",
      icon: "pi-instagram"
    },
  ]

  public otherContacts = [
    {
      link: "https://www.facebook.com/RUSSDMladost/",
      icon: "pi-facebook"
    },
  ]

  public sponsors = [
    {
      link: "",
      img: "./assets/images/logos/STU.png"
    },
    {
      link: "",
      img: "./assets/images/logos/acc.png"
    },
    {
      link: "",
      img: "./assets/images/logos/koniferum.png"
    },
    {
      link: "",
      img: "./assets/images/logos/jagermaister.png"
    },
    {
      link: "",
      img: "./assets/images/logos/budis.svg"
    },
  ]
}
