function fetchPdfUsingXHR(staticUrl) {
    return new Promise((resolve, reject) => {
       const xhr = new XMLHttpRequest();
       xhr.open('GET', staticUrl, true);
       xhr.responseType = 'blob';
 
       xhr.onload = function () {
          if (this.status === 200 || this.status === 201 ) {
             const myBlob = this.response;
             const reader = new FileReader();
 
             // Lire les données du blob
             reader.readAsDataURL(myBlob);
             reader.onloadend = function () {
                resolve(reader.result); // Résoudre avec la chaîne base64
             };
          } else {
             reject(`Failed to fetch PDF. Status: ${this.status}`);
          }
       };
 
       xhr.onerror = function () {
          reject('An error occurred during the request.');
       };
 
       xhr.send();
    });
 }
 
 export default fetchPdfUsingXHR
 