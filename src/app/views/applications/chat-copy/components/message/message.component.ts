import { Component, inject, Input, ViewChild } from '@angular/core';
import { ContactList, type ContactType } from '../../data';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import {
  SimplebarAngularModule,
  type SimplebarAngularComponent,
} from 'simplebar-angular';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type UntypedFormGroup,
} from '@angular/forms';

@Component({
  selector: 'chat-message',
  standalone: true,
  imports: [
    CommonModule,
    SimplebarAngularModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './message.component.html',
  styles: ``,
})
export class MessageComponent {
  formData!: UntypedFormGroup;
  messageList: any[] = [];
  submitted = false;
  allContact!: ContactType[];

  public formBuilder = inject(UntypedFormBuilder);
  public datePipe = inject(DatePipe);

  @ViewChild('scrollRef', { static: false })
  scrollRef!: SimplebarAngularComponent;

  private _profileDetail!: ContactType;

  @Input()
  set profileDetail(value: ContactType) {
    this._profileDetail = value;
    this.loadMessages();  // Charger les messages spécifiques à ce contact
  }

  get profileDetail(): ContactType {
    return this._profileDetail;
  }

  ngOnInit(): void {
    this.allContact = ContactList;
    localStorage.setItem('allContact', JSON.stringify(this.allContact));

    // Validation du formulaire
    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    // Charger les messages spécifiques à ce contact au démarrage
    this.loadMessages();
  }

  ngAfterViewInit() {
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 300;
    this.onListScroll();
  }

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight;
      }, 100);
    }
  }

  // Charger les messages pour ce contact depuis localStorage
  loadMessages() {
    const storedMessages = localStorage.getItem(`chatMessages_${this.profileDetail.name}`);
    if (storedMessages) {
      this.messageList = JSON.parse(storedMessages);
    } else {
      this.messageList = this.profileDetail.dataMessage || [];  // Si aucun message n'est stocké
    }
  }

  // Sauvegarder les messages spécifiques à ce contact dans localStorage
  saveMessages() {
    localStorage.setItem(`chatMessages_${this.profileDetail.name}`, JSON.stringify(this.messageList));
  }

  messageSend() {
    const message = this.formData.get('message')!.value;

    if (this.formData.valid && message) {
      // Création du nouveau message
      const newMessage = {
        id: this.messageList.length + 1,
        messages: [message],
        time: this.datePipe.transform(new Date(), 'shortTime')!,
        direction: 'right',
        userImage: 'assets/images/users/avatar-3.jpg',
        // userImage: 'assets/images/users/avatar-2.jpg',
        // userImage: 'assets/images/users/avatar-1.jpg',
      };

      // Ajouter le nouveau message à la liste actuelle des messages
      this.messageList.push(newMessage);

      // Sauvegarder les messages spécifiques à ce contact dans localStorage
      this.saveMessages();

      // Réinitialiser le formulaire après l'envoi du message
      this.formData.reset();

      this.onListScroll();
    } else {
      this.submitted = true;
    }
  }
}
