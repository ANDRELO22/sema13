import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  authState
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  homePassword(email: any) {
    throw new Error('Method not implemented.');
  }
  constructor(public afAuth: Auth, public router: Router) {}

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signUpUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.afAuth, email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  recoverPassword(passwordResetEmail: string) {
    return sendPasswordResetEmail(this.afAuth, passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('');
    });
  }

  getUser() {
    let user = this.afAuth.currentUser;
    return user;
  }
}
