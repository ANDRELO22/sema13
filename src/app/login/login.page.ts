import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  formSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private AC: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.formSubmitted = false;
  }

  async loginUser(event: Event): Promise<void> {
    this.formSubmitted = true;
    event.preventDefault();
    if (this.loginForm?.valid) {
      const value = this.loginForm.value;
      this.authService.loginUser(value.email, value.password).then(
        () => {
          this.router.navigateByUrl('home');
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
    if (this.loginForm.get(field)!.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  getErrorMessage(field: string): string {
    let message = '';
    if (this.loginForm.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.loginForm.get(field)!.hasError('email')) {
      message = `Este campo debe no cumple con el formato de correo`;
    }

    return message;
  }

  get emailField() {
    return this.loginForm?.get('email');
  }

  get passField() {
    return this.loginForm?.get('password');
  }
}
