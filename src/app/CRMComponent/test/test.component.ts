import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './test.component.html',
  styles: []
})
export class TestComponent {

  valueScore=1;
  commentValue="";


  //scoreClient scoreChefProjet commentaireClient commentaireChefProjet (mbol misy cdt sy onnée tsy ampy)
  submitFeedBackAndScore(){
    const object = {
      id_tache:"iddddd",
      scoreClient: this.valueScore,
      commentaireClient : this.commentValue
    }
    console.log("Objeeeeeeeeeeect",object);
  }
}
