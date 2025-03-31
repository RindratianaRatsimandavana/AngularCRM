/// <reference types="@angular/localize" />

import 'zone.js'; // résout le problème ngzone
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'; // Importation des locales françaises
import { LOCALE_ID } from '@angular/core';

// Enregistrez la locale française
registerLocaleData(localeFr, 'fr-FR');

// Bootstrap de l'application avec configuration pour la locale française
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,  // Garder les providers existants dans appConfig
    { provide: LOCALE_ID, useValue: 'fr-FR' }  // Définir la locale sur français
  ]
}).catch((err) => console.error(err));
