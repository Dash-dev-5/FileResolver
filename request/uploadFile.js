import { LINK_API } from '../confiApp';

export const uploadFile = async ({
  name,
  object,
  numRef,
  binderId,
  note,
  filePath,
  onProgress,
}) => {
  try {
    // Préparation des données du formulaire
    const formData = new FormData();
    formData.append('name', name);
    formData.append('object', object);
    formData.append('num_ref', numRef);
    formData.append('binder_id', binderId);
    formData.append('note', note);
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
    xhr.open('POST', `${LINK_API}/api/files`, true);

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
      if (xhr.status === 201) {
        const responseData = JSON.parse(xhr.responseText);
        console.log('Réponse de l\'API:', responseData);
        return responseData;
      } else {
        throw new Error(`Erreur : ${xhr.status} - ${xhr.responseText}`);
      }
    };

    // Gérer les erreurs
    xhr.onerror = () => {
      throw new Error('Erreur de connexion');
    };

    // Envoi de la requête
    xhr.send(formData);
  } catch (error) {
    console.error('Erreur lors de l\'upload du fichier:', error);
    throw error;
  }
};
