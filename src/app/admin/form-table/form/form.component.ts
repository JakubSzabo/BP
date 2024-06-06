import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from "./form.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  max = 50;
  date: Date = new Date();
  id: string | null = "";

  form: {fieldType: string, inputType: string | null, fieldName: string, requiredField: boolean}[] = []

  constructor(
    private service: FormService,
    private route: ActivatedRoute
  ) {
    this.form.push({fieldType: "input", inputType: "email", fieldName: "Email", requiredField: true});
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      if (this.id) {
        this.service.getFormById(params.get('id') ?? "").subscribe(res => {
          this.max = res.maxAnswers;
          this.date = res.endDate;
          this.form = res.form;
        })
      }
    });
  }

  addField() {
    this.form.push({fieldType: "input", inputType: 'text', fieldName: "Nazov", requiredField: false});
  }

  deleteField(index: number) {
    if (index !== 0) {
      this.form.slice(index, index);
    }
  }

  saveForm() {
    const body = {
      maxAnswers: this.max,
      endDate: this.date,
      form: this.form
    };

    this.service.createForm(body).subscribe(res => {
      console.log(res)
    });
  }
}
