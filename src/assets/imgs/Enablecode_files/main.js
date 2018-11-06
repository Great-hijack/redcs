(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	var module = __webpack_require__(id);
	return module;
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/account-login/account-login.component.css":
/*!***********************************************************!*\
  !*** ./src/app/account-login/account-login.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/account-login/account-login.component.html":
/*!************************************************************!*\
  !*** ./src/app/account-login/account-login.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  account-login works!\n</p>\n"

/***/ }),

/***/ "./src/app/account-login/account-login.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/account-login/account-login.component.ts ***!
  \**********************************************************/
/*! exports provided: AccountLoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountLoginComponent", function() { return AccountLoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AccountLoginComponent = /** @class */ (function () {
    function AccountLoginComponent() {
    }
    AccountLoginComponent.prototype.ngOnInit = function () {
    };
    AccountLoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-account-login',
            template: __webpack_require__(/*! ./account-login.component.html */ "./src/app/account-login/account-login.component.html"),
            styles: [__webpack_require__(/*! ./account-login.component.css */ "./src/app/account-login/account-login.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AccountLoginComponent);
    return AccountLoginComponent;
}());



/***/ }),

/***/ "./src/app/account-signup/account-signup.component.css":
/*!*************************************************************!*\
  !*** ./src/app/account-signup/account-signup.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/account-signup/account-signup.component.html":
/*!**************************************************************!*\
  !*** ./src/app/account-signup/account-signup.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <form [formGroup]=\"form\" (ngSubmit)=\"login()\">\n    <div formGroupName=\"account\">\n      <div class=\"form-group\">\n        <label for=\"username\">Username:</label>\n        <input type=\"email\" formControlName=\"username\" class=\"form-control\" id=\"username\">\n        <div *ngIf=\"username.touched &&username.invalid\" class=\"alert alert-danger\">\n          <div *ngIf=\"username.errors.required\">Username is required</div>\n          <div *ngIf=\"username.errors.minlength\">Username should be at least {{username.errors.minlength.requiredLength}} characters</div>\n          <!-- <div *ngIf=\"username.errors.cannotContainSpace\">Username should not have space</div>\n          <div *ngIf=\"username.errors.shouldBeUnique\">Username is already taken</div> -->\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"password\">Password:</label>\n        <input type=\"password\" formControlName=\"password\" class=\"form-control\" id=\"password\">\n        <div *ngIf=\"password.touched &&password.invalid\" class=\"alert alert-danger\">Password is required</div>\n      </div>\n    </div>\n    <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"!form.valid\">Sign Up</button>\n  </form>\n</div>\n\n<!-- Note:\n- import ReactiveFormsModule -->"

/***/ }),

/***/ "./src/app/account-signup/account-signup.component.ts":
/*!************************************************************!*\
  !*** ./src/app/account-signup/account-signup.component.ts ***!
  \************************************************************/
/*! exports provided: AccountSignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountSignupComponent", function() { return AccountSignupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AccountSignupComponent = /** @class */ (function () {
    function AccountSignupComponent(fb) {
        this.form = fb.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            account: fb.group({
                username: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3)]],
                password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
            })
        });
    }
    AccountSignupComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(AccountSignupComponent.prototype, "username", {
        get: function () {
            // return this.form.get('username');
            return this.form.get('account.username');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountSignupComponent.prototype, "password", {
        get: function () {
            return this.form.get('account.password');
        },
        enumerable: true,
        configurable: true
    });
    AccountSignupComponent.prototype.login = function () {
        //  let isValid = authService.log(this.form.value);
        //  if(!isValid){
        //     this.form.setErrors({
        //      invalidLogin: true 
        //     })
        //  }
        this.form.setErrors({
            invalidLogin: true
        });
    };
    AccountSignupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-account-signup',
            template: __webpack_require__(/*! ./account-signup.component.html */ "./src/app/account-signup/account-signup.component.html"),
            styles: [__webpack_require__(/*! ./account-signup.component.css */ "./src/app/account-signup/account-signup.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], AccountSignupComponent);
    return AccountSignupComponent;
}());



/***/ }),

/***/ "./src/app/account/account.component.css":
/*!***********************************************!*\
  !*** ./src/app/account/account.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/account/account.component.html":
/*!************************************************!*\
  !*** ./src/app/account/account.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-account-signup *ngIf=\"!isSigned\"></app-account-signup>\n<app-account-login *ngIf=\"!isSigned\"></app-account-login>\n"

/***/ }),

/***/ "./src/app/account/account.component.ts":
/*!**********************************************!*\
  !*** ./src/app/account/account.component.ts ***!
  \**********************************************/
/*! exports provided: AccountComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountComponent", function() { return AccountComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AccountComponent = /** @class */ (function () {
    function AccountComponent() {
    }
    AccountComponent.prototype.ngOnInit = function () {
    };
    AccountComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-account',
            template: __webpack_require__(/*! ./account.component.html */ "./src/app/account/account.component.html"),
            styles: [__webpack_require__(/*! ./account.component.css */ "./src/app/account/account.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AccountComponent);
    return AccountComponent;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'enablecode';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _tasks_tasks_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tasks/tasks.component */ "./src/app/tasks/tasks.component.ts");
/* harmony import */ var _projects_projects_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./projects/projects.component */ "./src/app/projects/projects.component.ts");
/* harmony import */ var _timesheet_timesheet_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./timesheet/timesheet.component */ "./src/app/timesheet/timesheet.component.ts");
/* harmony import */ var _project_list_project_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./project-list/project-list.component */ "./src/app/project-list/project-list.component.ts");
/* harmony import */ var _project_new_add_project_new_add_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./project-new-add/project-new-add.component */ "./src/app/project-new-add/project-new-add.component.ts");
/* harmony import */ var _task_new_add_task_new_add_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./task-new-add/task-new-add.component */ "./src/app/task-new-add/task-new-add.component.ts");
/* harmony import */ var _task_list_task_list_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./task-list/task-list.component */ "./src/app/task-list/task-list.component.ts");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _account_account_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./account/account.component */ "./src/app/account/account.component.ts");
/* harmony import */ var _account_signup_account_signup_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./account-signup/account-signup.component */ "./src/app/account-signup/account-signup.component.ts");
/* harmony import */ var _account_login_account_login_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./account-login/account-login.component */ "./src/app/account-login/account-login.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














// import firebase from "firebase";




var appRoutes = [
    { path: 'tasks', component: _tasks_tasks_component__WEBPACK_IMPORTED_MODULE_6__["TasksComponent"] },
    { path: 'projects', component: _projects_projects_component__WEBPACK_IMPORTED_MODULE_7__["ProjectsComponent"] },
    { path: 'timesheet', component: _timesheet_timesheet_component__WEBPACK_IMPORTED_MODULE_8__["TimesheetComponent"] },
    { path: 'account', component: _account_account_component__WEBPACK_IMPORTED_MODULE_15__["AccountComponent"] },
    // {
    //   path: 'heroes',
    //   component: HeroListComponent,
    //   data: { title: 'Heroes List' }
    // },
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    },
];
firebase_app__WEBPACK_IMPORTED_MODULE_14__["initializeApp"](_environments_environment_prod__WEBPACK_IMPORTED_MODULE_13__["environment"].firebase);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_5__["HeaderComponent"],
                _tasks_tasks_component__WEBPACK_IMPORTED_MODULE_6__["TasksComponent"],
                _projects_projects_component__WEBPACK_IMPORTED_MODULE_7__["ProjectsComponent"],
                _timesheet_timesheet_component__WEBPACK_IMPORTED_MODULE_8__["TimesheetComponent"],
                _project_list_project_list_component__WEBPACK_IMPORTED_MODULE_9__["ProjectListComponent"],
                _project_new_add_project_new_add_component__WEBPACK_IMPORTED_MODULE_10__["ProjectNewAddComponent"],
                _task_new_add_task_new_add_component__WEBPACK_IMPORTED_MODULE_11__["TaskNewAddComponent"],
                _task_list_task_list_component__WEBPACK_IMPORTED_MODULE_12__["TaskListComponent"],
                _account_account_component__WEBPACK_IMPORTED_MODULE_15__["AccountComponent"],
                _account_signup_account_signup_component__WEBPACK_IMPORTED_MODULE_16__["AccountSignupComponent"],
                _account_login_account_login_component__WEBPACK_IMPORTED_MODULE_17__["AccountLoginComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(appRoutes, { enableTracing: false } // <-- debugging purposes only
                )
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/header/header.component.css":
/*!*********************************************!*\
  !*** ./src/app/header/header.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/header/header.component.html":
/*!**********************************************!*\
  !*** ./src/app/header/header.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n  <a class=\"navbar-brand\" href=\"#\">EnableCode</a>\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavDropdown\" aria-controls=\"navbarNavDropdown\"\n    aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <div class=\"collapse navbar-collapse\" id=\"navbarNavDropdown\">\n    <ul class=\"navbar-nav\">\n      <li class=\"nav-item active\">\n        <a class=\"nav-link\" routerLink=\"/tasks\" routerLinkActive=\"active\">Tasks</a>\n        <!-- <a class=\"nav-link\" href=\"#\">Tasks\n          <span class=\"sr-only\">(current)</span>\n        </a> -->\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/projects\" routerLinkActive=\"active\">Projects</a>\n        <!-- <a class=\"nav-link\" href=\"#\">Projects</a> -->\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/timesheet\" routerLinkActive=\"active\">TimeSheet</a>\n        <!-- <a class=\"nav-link\" href=\"#\">TimeSheet</a> -->\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/account\" routerLinkActive=\"active\">Account</a>\n        <!-- <a class=\"nav-link\" href=\"#\">TimeSheet</a> -->\n      </li>\n      <!-- <li class=\"nav-item dropdown\">\n        <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdownMenuLink\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n          Dropdown link\n        </a>\n        <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdownMenuLink\">\n          <a class=\"dropdown-item\" href=\"#\">Projects</a>\n          <a class=\"dropdown-item\" href=\"#\">Another action</a>\n          <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n        </div>\n      </li> -->\n    </ul>\n  </div>\n</nav>"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/project-list/project-list.component.css":
/*!*********************************************************!*\
  !*** ./src/app/project-list/project-list.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/project-list/project-list.component.html":
/*!**********************************************************!*\
  !*** ./src/app/project-list/project-list.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  project-list works!\n</p>\n"

/***/ }),

/***/ "./src/app/project-list/project-list.component.ts":
/*!********************************************************!*\
  !*** ./src/app/project-list/project-list.component.ts ***!
  \********************************************************/
/*! exports provided: ProjectListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectListComponent", function() { return ProjectListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProjectListComponent = /** @class */ (function () {
    function ProjectListComponent() {
    }
    ProjectListComponent.prototype.ngOnInit = function () {
    };
    ProjectListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-project-list',
            template: __webpack_require__(/*! ./project-list.component.html */ "./src/app/project-list/project-list.component.html"),
            styles: [__webpack_require__(/*! ./project-list.component.css */ "./src/app/project-list/project-list.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ProjectListComponent);
    return ProjectListComponent;
}());



/***/ }),

/***/ "./src/app/project-new-add/project-new-add.component.css":
/*!***************************************************************!*\
  !*** ./src/app/project-new-add/project-new-add.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/project-new-add/project-new-add.component.html":
/*!****************************************************************!*\
  !*** ./src/app/project-new-add/project-new-add.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  project-new-add works!\n</p>\n"

/***/ }),

/***/ "./src/app/project-new-add/project-new-add.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/project-new-add/project-new-add.component.ts ***!
  \**************************************************************/
/*! exports provided: ProjectNewAddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectNewAddComponent", function() { return ProjectNewAddComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProjectNewAddComponent = /** @class */ (function () {
    function ProjectNewAddComponent() {
    }
    ProjectNewAddComponent.prototype.ngOnInit = function () {
    };
    ProjectNewAddComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-project-new-add',
            template: __webpack_require__(/*! ./project-new-add.component.html */ "./src/app/project-new-add/project-new-add.component.html"),
            styles: [__webpack_require__(/*! ./project-new-add.component.css */ "./src/app/project-new-add/project-new-add.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ProjectNewAddComponent);
    return ProjectNewAddComponent;
}());



/***/ }),

/***/ "./src/app/projects/projects.component.css":
/*!*************************************************!*\
  !*** ./src/app/projects/projects.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/projects/projects.component.html":
/*!**************************************************!*\
  !*** ./src/app/projects/projects.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-project-list></app-project-list>\n<app-project-new-add></app-project-new-add>"

/***/ }),

/***/ "./src/app/projects/projects.component.ts":
/*!************************************************!*\
  !*** ./src/app/projects/projects.component.ts ***!
  \************************************************/
/*! exports provided: ProjectsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsComponent", function() { return ProjectsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProjectsComponent = /** @class */ (function () {
    function ProjectsComponent() {
    }
    ProjectsComponent.prototype.ngOnInit = function () {
    };
    ProjectsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-projects',
            template: __webpack_require__(/*! ./projects.component.html */ "./src/app/projects/projects.component.html"),
            styles: [__webpack_require__(/*! ./projects.component.css */ "./src/app/projects/projects.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ProjectsComponent);
    return ProjectsComponent;
}());



/***/ }),

/***/ "./src/app/task-list/task-list.component.css":
/*!***************************************************!*\
  !*** ./src/app/task-list/task-list.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/task-list/task-list.component.html":
/*!****************************************************!*\
  !*** ./src/app/task-list/task-list.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  task-list works!\n</p>\n"

/***/ }),

/***/ "./src/app/task-list/task-list.component.ts":
/*!**************************************************!*\
  !*** ./src/app/task-list/task-list.component.ts ***!
  \**************************************************/
/*! exports provided: TaskListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskListComponent", function() { return TaskListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TaskListComponent = /** @class */ (function () {
    function TaskListComponent() {
    }
    TaskListComponent.prototype.ngOnInit = function () {
    };
    TaskListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-task-list',
            template: __webpack_require__(/*! ./task-list.component.html */ "./src/app/task-list/task-list.component.html"),
            styles: [__webpack_require__(/*! ./task-list.component.css */ "./src/app/task-list/task-list.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TaskListComponent);
    return TaskListComponent;
}());



/***/ }),

/***/ "./src/app/task-new-add/task-new-add.component.css":
/*!*********************************************************!*\
  !*** ./src/app/task-new-add/task-new-add.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/task-new-add/task-new-add.component.html":
/*!**********************************************************!*\
  !*** ./src/app/task-new-add/task-new-add.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <form #myForm=\"ngForm\" (ngSubmit)=\"submit(myForm)\">\n    <div class=\"form-row\">\n      <div class=\"col-4\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"Task name\" [(ngModel)]=\"TASK.TTASK\" name=\"TTASK\">\n      </div>\n      <div class=\"col\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"Project\" [(ngModel)]=\"TASK.TPROJECT\" name=\"TPROJECT\">\n      </div>\n      <div class=\"col\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"Handled By\" [(ngModel)]=\"TASK.T_OWNER\" name=\"T_OWNER\">\n      </div>\n      <div class=\"col\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"Est Time\" [(ngModel)]=\"TASK.T_EST_TIME\" name=\"T_EST_TIME\">\n      </div>\n      <div class=\"col\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"Deadline\" [(ngModel)]=\"TASK.T_DEADLINE\" name=\"T_DEADLINE\">\n      </div>\n      <div class=\"col\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"Note\" [(ngModel)]=\"TASK.T_NOTE\" name=\"T_NOTE\">\n      </div>\n    </div>\n    <br>\n\n    <div class=\"row\">\n      <div class=\"col\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"addTask(myForm)\">Add NEW</button>\n      </div>\n      <div class=\"col\">\n        <!-- <fieldset class=\"form-group\">\n          <div class=\"row\">\n            <div class=\"col-sm-10\">\n              <div class=\"form-check\">\n                <input class=\"form-check-input\" type=\"radio\" name=\"gridRadios\" id=\"gridRadios1\" value=\"option1\" [(ngModel)]=\"TASK.T_STATUS\" name=\"T_STATUS\">\n                <label class=\"form-check-label\" for=\"gridRadios1\">\n                  OPEN\n                </label>\n              </div>\n              <div class=\"form-check\">\n                <input class=\"form-check-input\" type=\"radio\" name=\"gridRadios\" id=\"gridRadios2\" value=\"option2\"  [(ngModel)]=\"TASK.T_STATUS\" name=\"T_STATUS\">\n                <label class=\"form-check-label\" for=\"gridRadios2\">\n                  CLOSE\n                </label>\n              </div>\n            </div>\n          </div>\n        </fieldset> -->\n        <div *ngFor=\"let STAT of STATUS\" class=\"form-check\">\n          <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"TASK.T_STATUS\" name=\"T_STATUS\" [value]=\"STAT.id\">\n          <label class=\"form-check-label\">\n            {{STAT.STATE}}\n          </label>\n        </div>\n      </div>\n      <div class=\"col\">\n        <button type=\"button\" class=\"btn btn-success\" (click)=\"updateTask()\">Update</button>\n      </div>\n      <div class=\"col\">\n        <button type=\"button\" class=\"btn btn-warning\" (click)=\"cancelTask(myForm)\">Cancel</button>\n      </div>\n      <div class=\"col\">\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteTask(myForm)\">Delete</button>\n      </div>\n    </div>\n  </form>\n\n  <hr>\n  <ul class=\"list-group\">\n    <li class=\"list-group-item\" *ngFor=\"let TASK of TASKS\" (click)=\"selectTask(TASK)\">\n      <div class=\"row\">\n        <div class=\"col-4\">{{TASK.TTASK}}</div>\n        <div class=\"col\">{{TASK.TPROJECT}}</div>\n        <div class=\"col\">{{TASK.T_OWNER}}</div>\n        <div class=\"col\">{{TASK.T_EST_TIME}}</div>\n        <div class=\"col\">{{TASK.T_DEADLINE}}</div>\n        <div class=\"col\">{{TASK.T_NOTE}}</div>\n        <!-- <button (click)=\"updateTask(TASK)\" class=\"btn btn-default btn-sm btn-primary\">Update</button> -->\n        <div class=\"col\">{{TASK.T_STATUS}}</div>\n      </div>\n    </li>\n  </ul>\n</div>"

/***/ }),

/***/ "./src/app/task-new-add/task-new-add.component.ts":
/*!********************************************************!*\
  !*** ./src/app/task-new-add/task-new-add.component.ts ***!
  \********************************************************/
/*! exports provided: TaskNewAddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskNewAddComponent", function() { return TaskNewAddComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TaskNewAddComponent = /** @class */ (function () {
    function TaskNewAddComponent() {
        this.TASK = {
            TTASKID: '',
            TTASK: '',
            TPROJECT: '',
            TPROJECT_ID: '',
            T_OWNER: '',
            T_OWNER_ID: '',
            T_EST_TIME: '',
            T_DEADLINE: '',
            T_NOTE: '',
            T_CREATEDBY: '',
            T_CHECKEDBY: '',
            T_CHECKEDBY_ID: '',
            T_CREATEDBY_ID: '',
            T_TIME_CLOSE: '',
            T_TIME_OPEN: '',
            T_STATUS: 'OPEN'
        };
        this.USER = { name: 'Tho', id: 'Tho123' };
        this.TASKS = [];
        this.STATUS = [{ id: 'OPEN', STATE: 'OPEN' }, { id: 'CLOSE', STATE: 'CLOSE' }];
        this.isTaskSelected = false;
    }
    TaskNewAddComponent.prototype.ngOnInit = function () {
        // this.getTasks();
        this.getTasksOnTheAir();
    };
    TaskNewAddComponent.prototype.submit = function (f) {
        console.log(f.value);
    };
    TaskNewAddComponent.prototype.addTask = function (f) {
        var TASK = f.value;
        TASK.T_CREATEDBY = this.USER.name;
        TASK.T_CREATEDBY_ID = this.USER.id;
        TASK.T_TIME_OPEN = new Date().getDate().toString();
        console.log(TASK);
        // this.TASKS.push(TASK);
        this.createTask(TASK);
    };
    TaskNewAddComponent.prototype.cancelTask = function (f) {
        console.log(f.value);
    };
    TaskNewAddComponent.prototype.createTask = function (TASK) {
        var _this = this;
        firebase_app__WEBPACK_IMPORTED_MODULE_1__["firestore"]().collection('TASKS').add(TASK)
            .then(function (res) {
            _this.TASK.TTASKID = res.id;
            return res.update({
                TTASKID: res.id
            });
        })
            .then(function (res) {
            console.log(_this.TASK);
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    TaskNewAddComponent.prototype.getTasks = function () {
        var _this = this;
        firebase_app__WEBPACK_IMPORTED_MODULE_1__["firestore"]().collection('TASKS').get()
            .then(function (qSnap) {
            _this.TASKS = [];
            qSnap.forEach(function (doc) {
                var TASK = doc.data();
                _this.TASKS.push(TASK);
            });
        });
    };
    TaskNewAddComponent.prototype.selectTask = function (TASK) {
        this.TASK = TASK;
        this.isTaskSelected = true;
    };
    TaskNewAddComponent.prototype.updateTask = function () {
        console.log(this.TASK);
        firebase_app__WEBPACK_IMPORTED_MODULE_1__["firestore"]().doc('TASKS/' + this.TASK.TTASKID).update(this.TASK)
            .then(function (res) {
            console.log(res);
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    TaskNewAddComponent.prototype.getTasksOnTheAir = function () {
        var _this = this;
        firebase_app__WEBPACK_IMPORTED_MODULE_1__["firestore"]().collection('TASKS').onSnapshot(function (qSnap) {
            _this.TASKS = [];
            qSnap.forEach(function (doc) {
                var TASK = doc.data();
                _this.TASKS.push(TASK);
            });
        });
    };
    TaskNewAddComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-task-new-add',
            template: __webpack_require__(/*! ./task-new-add.component.html */ "./src/app/task-new-add/task-new-add.component.html"),
            styles: [__webpack_require__(/*! ./task-new-add.component.css */ "./src/app/task-new-add/task-new-add.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TaskNewAddComponent);
    return TaskNewAddComponent;
}());



/***/ }),

/***/ "./src/app/tasks/tasks.component.css":
/*!*******************************************!*\
  !*** ./src/app/tasks/tasks.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/tasks/tasks.component.html":
/*!********************************************!*\
  !*** ./src/app/tasks/tasks.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <app-task-list></app-task-list> -->\n<app-task-new-add></app-task-new-add>"

/***/ }),

/***/ "./src/app/tasks/tasks.component.ts":
/*!******************************************!*\
  !*** ./src/app/tasks/tasks.component.ts ***!
  \******************************************/
/*! exports provided: TasksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TasksComponent", function() { return TasksComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TasksComponent = /** @class */ (function () {
    function TasksComponent() {
    }
    TasksComponent.prototype.ngOnInit = function () {
    };
    TasksComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tasks',
            template: __webpack_require__(/*! ./tasks.component.html */ "./src/app/tasks/tasks.component.html"),
            styles: [__webpack_require__(/*! ./tasks.component.css */ "./src/app/tasks/tasks.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TasksComponent);
    return TasksComponent;
}());



/***/ }),

/***/ "./src/app/timesheet/timesheet.component.css":
/*!***************************************************!*\
  !*** ./src/app/timesheet/timesheet.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/timesheet/timesheet.component.html":
/*!****************************************************!*\
  !*** ./src/app/timesheet/timesheet.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  timesheet works!\n</p>\n"

/***/ }),

/***/ "./src/app/timesheet/timesheet.component.ts":
/*!**************************************************!*\
  !*** ./src/app/timesheet/timesheet.component.ts ***!
  \**************************************************/
/*! exports provided: TimesheetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimesheetComponent", function() { return TimesheetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TimesheetComponent = /** @class */ (function () {
    function TimesheetComponent() {
    }
    TimesheetComponent.prototype.ngOnInit = function () {
    };
    TimesheetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-timesheet',
            template: __webpack_require__(/*! ./timesheet.component.html */ "./src/app/timesheet/timesheet.component.html"),
            styles: [__webpack_require__(/*! ./timesheet.component.css */ "./src/app/timesheet/timesheet.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TimesheetComponent);
    return TimesheetComponent;
}());



/***/ }),

/***/ "./src/environments/environment.prod.ts":
/*!**********************************************!*\
  !*** ./src/environments/environment.prod.ts ***!
  \**********************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
var environment = {
    production: true,
    firebase: {
        apiKey: "AIzaSyBQYqkYQ0WnYFEatemxV5I4NrtQVR7Ua68",
        authDomain: "ec-pm-tool.firebaseapp.com",
        databaseURL: "https://ec-pm-tool.firebaseio.com",
        projectId: "ec-pm-tool",
        storageBucket: "ec-pm-tool.appspot.com",
        messagingSenderId: "686932679410"
    }
};


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://0.0.0.0:0 ./src/main.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/mac/Desktop/angular/enablecode/node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:0 */"./node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:0");
module.exports = __webpack_require__(/*! /Users/mac/Desktop/angular/enablecode/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map