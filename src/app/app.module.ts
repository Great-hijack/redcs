// // import { BrowserModule } from '@angular/platform-browser';
// // import { ErrorHandler, NgModule } from '@angular/core';
// // import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// // import { MyApp } from './app.component';
// // import { HomePage } from '../pages/home/home';
// // import { ListPage } from '../pages/list/list';

// // import { StatusBar } from '@ionic-native/status-bar';
// // import { SplashScreen } from '@ionic-native/splash-screen';

// // @NgModule({
// //   declarations: [
// //     MyApp,
// //     HomePage,
// //     ListPage
// //   ],
// //   imports: [
// //     BrowserModule,
// //     IonicModule.forRoot(MyApp),
// //   ],
// //   bootstrap: [IonicApp],
// //   entryComponents: [
// //     MyApp,
// //     HomePage,
// //     ListPage
// //   ],
// //   providers: [
// //     StatusBar,
// //     SplashScreen,
// //     {provide: ErrorHandler, useClass: IonicErrorHandler}
// //   ]
// // })
// // export class AppModule {}

// import { BrowserModule } from '@angular/platform-browser';
// import { ErrorHandler, NgModule } from '@angular/core';
// import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// import { MyApp } from './app.component';
// // import { HomePage } from '../pages/home/home';
// // import { ListPage } from '../pages/list/list';

// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { AppService } from '../services/app.service';
// import { GmapService } from '../services/gmap.service';
// import { LocalService } from '../services/local.service';
// import { LoadingService } from '../services/loading.service';
// import { AuthService } from '../services/auth.service';
// import { DbService } from '../services/db.service';
// import { ImageService } from '../services/image.service';
// import { CrudService } from '../services/crud.service';
// import { PaymentService } from '../services/payment.service';

// // import * as firebase from 'firebase/app';
// // import 'firebase/auth';

// @NgModule({
//   declarations: [
//     MyApp,
//     // HomePage,
//     // ListPage
//   ],
//   imports: [
//     BrowserModule,
//     IonicModule.forRoot(MyApp),

//   ],
//   bootstrap: [IonicApp],
//   entryComponents: [
//     MyApp,
//     // HomePage,
//     // ListPage
//   ],
//   providers: [
//     StatusBar,
//     SplashScreen,
//     {provide: ErrorHandler, useClass: IonicErrorHandler},
//     AppService,
//     GmapService,
//     LocalService,
//     LoadingService,
//     AuthService,
//     DbService,
//     ImageService,
//     CrudService,
//     PaymentService
//   ]
// })
// export class AppModule {}
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppService } from '../services/app.service';
import { GmapService } from '../services/gmap.service';
import { LocalService } from '../services/local.service';
import { LoadingService } from '../services/loading.service';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { ImageService } from '../services/image.service';
import { CrudService } from '../services/crud.service';
import { PaymentService } from '../services/payment.service';
import { ComponentsModule } from '../components/components.module';
// import { TestOneComponent } from '../components/test-one/test-one';
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
import firebase from 'firebase/app';
import { firebaseConfig } from '../config/firebase-config';
import { DirectivesModule } from '../directives/directives.module';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';
import { LangService } from '../services/lang.service';
import { LoginModel } from '../languages/loginModel';
import { HomeModel } from '../languages/homeModel';
import { EnModel } from '../languages/en';
import { VnModel } from '../languages/vn';
// import { MyPopularCitiesComponent } from '../components/my-popular-cities/my-popular-cities';

// For AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MailService } from '../services/mail.service';
import { NotificationService } from '../services/notification.service';
// import { AngularFireMessagingModule } from '@angular/fire/messaging';
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    // ListPage,
    // TestOneComponent,
    // MyPopularCitiesComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    DirectivesModule,
    IonicModule.forRoot(
      MyApp,
      {
        iconMode: 'ios',
        mode: 'ios',
        preloadModules: true
      }
    ),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    // AngularFireMessagingModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage,
    // ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppService,
    GmapService,
    LocalService,
    LoadingService,
    AuthService,
    DbService,
    ImageService,
    CrudService,
    PaymentService,
    AccountService,
    LangService,
    MailService,
    NotificationService,
    LoginModel,
    HomeModel,
    EnModel,
    VnModel
    // HttpClient
  ]
})
export class AppModule { }

