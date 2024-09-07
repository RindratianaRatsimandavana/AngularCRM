export interface CRMMembreProjet {
    id?: string  ;
    id_projet?: string  ;
    id_employe?: string  ; 
    permission?: string  ;
    projet_nom?: string  ;
    projet_description?: string  ; 
    projet_date_creation?: Date  ;
    projet_date_echeance?: Date  ;
    projet_statut?: number  ; 
    id_chef_projet?: string  ;
    chef_projet_nom?: string  ;
    employe_nom?: string  ; 
    employe_email?: string  ;

}
