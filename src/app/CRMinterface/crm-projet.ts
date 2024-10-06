export interface CrmProjet {
    id?: string  ;
    nom?: string  ;
    id_type_suivi?: string  ;
    id_type_projet?: string  ; 
    id_client?: string  ; 
    id_createur_projet?: string  ;
    date_creation?: Date;
    date_echeance?: Date;
    description?: string;
    statut?: number;
}
