import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-logo-box',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="brand">
      <a routerLink="/" class="logo">
        <span class="me-6">
          <img
            src="assets/images/etantanalogosm.png"
            alt="logo-small"
            class="logo-sm"
          />
        </span>
        <span class="">
          <img
            src="assets/images/etantanalogodarkOff.png"
            alt="logo-large"
            class="logo-lg logo-light"
          />
          <img
            src="assets/images/etantanalogodarkOff.png"
            alt="logo-large"
            class="logo-lg logo-dark"
          />
        </span>
      </a>
    </div>
  `,
  styles: ``,
})
export class LogoBoxComponent {}
