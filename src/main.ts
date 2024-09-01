/// <reference types="@angular/localize" />

import 'zone.js';// resolvez ngzone problem
import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './app/app.config'
import { AppComponent } from './app/app.component'

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err))
