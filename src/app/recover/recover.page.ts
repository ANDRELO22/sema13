import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  recoverForm: FormGroup;
  formSubmitted = false;
  constructor(
    private FB: FormBuilder,
    private AS: AuthService,
    private router: Router,
    private AC: AlertController
  ) {
    this.recoverForm = this.FB.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  resetPassword(event: Event): void {
    this.formSubmitted = true;
    event.preventDefault();
    if (this.recoverForm?.valid) {
      const value = this.recoverForm.value;
      this.AS.recoverPassword(value.email).then(
        async () => {
          const alert = await this.AC.create({
            message:
              'Revisa tu correo, que te enviamos el link para que cambies tu contraseña.',
            buttons: [
              {
                text: 'OK',
                role: 'cancel',
                handler: () => {
                  this.router.navigateByUrl('login');
                },
              },
            ],
          });
          await alert.present();
        },
        async (error) => {
          const ErrorAlert = await this.AC.create({
            message: error.message,
            buttons: [{ text: 'OK', role: 'cancel' }],
          });
          await ErrorAlert.present();
        }
      );
    }
  }

  invalidField(field: string): boolean {
    if (this.recoverForm.get(field)!.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  getErrorMessage(field: string): string {
    let message = '';
    if (this.recoverForm.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.recoverForm.get(field)!.hasError('email')) {
      message = `Este campo debe no cumple con el formato de correo`;
    }

    return message;
  }

  get emailField() {
    return this.recoverForm?.get('email');
  }
}
