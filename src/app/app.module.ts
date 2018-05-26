import { AuthService } from './../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LottieAnimationViewModule } from 'ng-lottie';
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'

export const firebaseConfig = {
  apiKey: "AIzaSyANDF_JZ5JRFoRujilerenGgh_YpFT8Ksk",
    authDomain: "mercado-iopwa.firebaseapp.com",
    databaseURL: "https://mercado-iopwa.firebaseio.com",
    projectId: "mercado-iopwa",
    storageBucket: "mercado-iopwa.appspot.com",
    messagingSenderId: "269249801820"
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LottieAnimationViewModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
		AuthService
  ]
})
export class AppModule {}
