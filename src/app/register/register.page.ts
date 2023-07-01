import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  formSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private AC: AlertController
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.formSubmitted = false;
  }

  async signUpUser(event: Event): Promise<void> {
    this.formSubmitted = true;
    event.preventDefault();
    if (this.registerForm?.valid) {
      const value = this.registerForm.value;
      this.authService.signUpUser(value.email, value.password).then(
        () => {
          this.router.navigateByUrl('login');
        },
        async (error) => {
          const alert = await this.AC.create({
            message: error.message,
            buttons: [{ text: 'OK', role: 'cancel' }],
          });
          await alert.present();
        }
      );
    }
  }

  invalidField(field: string): boolean {
    if (this.registerForm.get(field)!.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  getErrorMessage(field: string): string {
    let message = '';
    if (this.registerForm.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.registerForm.get(field)!.hasError('email')) {
      message = `Este campo debe no cumple con el formato de correo`;
    }

    return message;
  }

  get emailField() {
    return this.registerForm?.get('email');
  }

  get passField() {
    return this.registerForm?.get('password');
  }
}
