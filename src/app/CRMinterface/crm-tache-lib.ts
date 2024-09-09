export interface CrmTacheLib {
    id?: string  ;
    etat?: number ;
    nom?: string  ;
    descTache?: string  ;
    statut?: number;
    priorite?: number;
    temps_estime?: number ;
    temps_actuel?: number  ;
    id_employe_assigne?: string;
    id_projet?: string;
    id_sprint?: string;
    id_tache_parent?: string;
    date_creation?: Date;
    projet_nom?: string  ;
    projet_date_creation?: Date  ;
    projet_date_echeance?: Date;
    projet_description?: string;
    employe_nom?: string ;
    sprint_nom?: string  ;
    sprint_date_debut?: Date;
    sprint_date_fin?: Date;
    sprint_statut?: number;
    sprint_active?: number;
}
