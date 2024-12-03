import { LINK_API } from '../confiApp';
import { alertParam } from './alertParam';

export const updateFile = async ({
  idFile,
  filePath,
  onProgress,
},callBack) => {
  try {
    // Préparation des données du formulaire
    const formData = new FormData();
    formData.append('file', filePath); // Supposons que filePath est un fichier de type File/Blob

    // Récupération des détails de l'utilisateur depuis localStorage
    const userDetailsStr = localStorage.getItem('userDetails');
    const userDetailsObj = JSON.parse(userDetailsStr);

    if (!userDetailsObj || !userDetailsObj.access_token) {
      throw new Error('Token d\'authentification non trouvé.');
    }

    const token = userDetailsObj.access_token;
    const companyId = userDetailsObj.data?.company?.[0]?.id;

    if (!companyId) {
      throw new Error('ID de l\'entreprise non trouvé.');
    }

    // Création de l'objet XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Configuration de la requête
    xhr.open('POST', `${LINK_API}/api/files/${idFile}/edit`, true);

    // Ajout des headers
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    // Suivi de la progression
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        if (onProgress) {
          onProgress(percent); // Appel de la fonction de mise à jour du pourcentage
        }
      }
    });

    // Gérer la réponse
    xhr.onload = async () => {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);

        console.log('Réponse de l\'API:', responseData);
        alertParam("Le fichier "+responseData.data.name+' mise a jour avec succes','success',5000)
        callBack()
        return responseData;
      } else {
        alertParam("Oups ! une erreur survenue lors de l'envoi du fichier. Si ca persiste contacter le service technique",'failed',5000)
        throw new Error(`Erreur : ${xhr.status} - ${xhr.responseText}`);
      }
    };
    
    // Gérer les erreurs
    xhr.onerror = () => {
      alertParam("Oups ! Erreur de connexion. Si ca persiste contacter le service technique",'failed',5000)
      throw new Error('Erreur de connexion');
    };
    
    // Envoi de la requête
    xhr.send(formData);
  } catch (error) {
    alertParam("Oups ! Erreur lors de l\'upload du fichier. Si ca persiste contacter le service technique",'failed',5000)
    console.error('Erreur lors de l\'upload du fichier:', error);
    throw error;
  }
};
