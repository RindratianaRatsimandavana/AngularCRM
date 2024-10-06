import { changetheme } from '@/app/store/layout/layout-action'
import { getLayoutColor } from '@/app/store/layout/layout-selector'
import { Component, EventEmitter, Output, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { SimplebarAngularModule } from 'simplebar-angular'
import { TabItems } from './data'
import { User } from '@/app/CRMinterface/user'
import { GeneralService } from '@/app/CRMservice/general.service'
import { CrmNotification } from '@/app/CRMinterface/crm-notification'
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    NgbDropdownModule,
    SimplebarAngularModule,
    NgbNavModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './topbar.component.html',
  styles: ``,
})
export class TopbarComponent {
  tabItems = TabItems
  store = inject(Store)
  scrollY = 0
  @Output() mobileMenuButtonClicked = new EventEmitter()

  generalService = inject(GeneralService)

  listNotif: CrmNotification[] = [];
  coutNotif=100;

  userPrenom!:User;
  
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;
    const tabTemp = userObject.nom.split(" ");
    this.userPrenom = tabTemp[1]; 

    this.generalService.getNotification(userObject.id)
    .subscribe(result => {
      console.log("Liste Notif");
      console.log(result);
      console.log(result.data);
      console.log("fin log resultat");
      this.listNotif = result.data;
      this.coutNotif=  result.data.length

    }); 

  }

  constructor(private router: Router) {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    this.handleScroll()
  }

  toggleMobileMenu() {
    this.mobileMenuButtonClicked.emit()
  }

  // Change Theme
  changeTheme() {
    const color = document.documentElement.getAttribute('data-bs-theme')
    if (color == 'light') {
      this.store.dispatch(changetheme({ color: 'dark' }))
    } else {
      this.store.dispatch(changetheme({ color: 'light' }))
    }
    this.store.select(getLayoutColor).subscribe((color) => {
      document.documentElement.setAttribute('data-bs-theme', color)
    })
  }
  handleScroll = () => {
    this.scrollY = window.scrollY
  }

  logout() {
    localStorage.removeItem('user');
    //this.isConnected = false;
    console.log("ni deconexte");
    this.router.navigate(['/auth/log-in']);
  }

  getAvatarUserConnected(){
    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;
    return userObject.nom
        .split(' ')          // Divise la chaîne en un tableau de mots
        .map((word: string) => word[0]) // Prend la première lettre de chaque mot
        .join('')                     // Recombine les lettres en une seule chaîne
        .toUpperCase();    

  }

  getAvatarUserConnectedOtherUser(nom: string | undefined) {
    if (!nom) {
        return ''; // ou toute autre valeur par défaut
    }

    return nom
        .split(' ')
        .map((word: string) => word[0])
        .join('')
        .toUpperCase();
  }
}
