export interface CrmTache {
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
        progres?: number;
}
