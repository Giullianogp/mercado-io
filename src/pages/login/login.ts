import { LottieAnimationViewModule } from 'ng-lottie';
import { HomePage } from './../home/home';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	lottieConfig: any;

	loginForm: FormGroup;
	loginError: string;

	buttonVisible: boolean = true;

	constructor(
		private navCtrl: NavController,
		private auth: AuthService,
		fb: FormBuilder
	) {
		
		LottieAnimationViewModule.forRoot();

		this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
	}

	login() {
		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.setRoot(HomePage),
				error => this.loginError = error.message
			);
	}

	signup() {
		this.navCtrl.push("SignupPage");
	}

	loginWithGoogle() {


		this.auth.signInWithGoogle()
			.then(
				() => { this.navCtrl.setRoot(HomePage); },
				error => console.log(error.message)
			);
	}

	loading(carregando: boolean) {
		this.buttonVisible = !carregando;

		this.lottieConfig = {
      path: '../assets/lineloading.json',
      autoplay: true,
      loop: true
    }

	}

}
