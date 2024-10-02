import { AuthenticationService } from '@/app/core/service/auth.service'
import { login } from '@/app/store/authentication/authentication.actions'
import { Component, OnInit, inject } from '@angular/core'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule,NgbAlertModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent implements OnInit {
  signInForm!: UntypedFormGroup
  submitted: boolean = false

  public fb = inject(UntypedFormBuilder)
  public store = inject(Store)

  wrongAuth:boolean | undefined;

  constructor(private authService:AuthenticationService,private router: Router
  ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  get formValues() {
    return this.signInForm.controls
  }

  login() {
    this.submitted = true
    this.wrongAuth = false
    if (this.signInForm.valid) {
      // const email = this.formValues['email'].value
      // const password = this.formValues['password'].value
      const login = {
        email: this.formValues['email'].value,
        password: this.formValues['password'].value
      }

      // Login Api
      //this.store.dispatch(login({ email: email, password: password }))
      console.log('Login Data:', login);
      // console.log('Login Data:', password);
      this.authService.authentification(login).subscribe(
        response => {
          console.log('Connexion réussie:', response.data);
          if (response.data) {
            const jsonString = JSON.stringify(response.data[0]);
            localStorage.setItem('user', jsonString);
            const idUserRole= response.data[0].id_user_role;
            // console.log("response.data",response.data)
            // console.log("id_user_role",response.data.id_user_role)
            if(idUserRole==='FWUR1'){
              console.log("employe")
              this.router.navigate(['/pages/projectList']).then(() => {
                //window.location.reload();
              }); 
            }
            else if(idUserRole==='FWUR2'){
              console.log("client")
              this.router.navigate(['/pages/projectClList']).then(() => {
                //window.location.reload();
              }); 
            }
            //localStorage.setItem('id_matiere', response.id_matiere);
          }

        },
        error => {
          console.error('Login error:', error);
          this.wrongAuth = true;
          //this.openSnackBar('Login error', 'Close');
        }
      );


    }
  }

  
}
