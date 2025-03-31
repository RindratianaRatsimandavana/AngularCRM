export interface CrmFeedbackCommentaire {
    id?: string  ;
    id_tache?: string;
    commentaireChefProjet?: string  ;
    commentaireClient?: string  ;
    scoreClient?:  number ;
    scoreChefProjet?:  number ;
    id_client?: string  ;
    id_employe_assigne?: string  ;
    date_creation?: Date  ;
    statut?: number;
}
