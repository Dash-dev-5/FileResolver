import axios from "axios";
import { LINK_API } from "../confiApp";


const updatePassword = async (currentPassword, newPassword, passwordConfirmation) => {
  const data = JSON.stringify({
    current_password: currentPassword,
    password: newPassword,
    password_confirmation: passwordConfirmation,
  });

  const userDetailsStr = localStorage.getItem('userDetails');
  const userDetailsObj = JSON.parse(userDetailsStr);

  if (!userDetailsObj?.access_token) {
    throw new Error('Token d\'authentification non trouvé.');
  }

  const token = userDetailsObj.access_token;
  const companyId = userDetailsObj.data?.company?.[0]?.id;

  // Configuration de la requête API
  console.log('UPDATING :',data);
  

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: LINK_API+'/api/users/update-password',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: data,
  };

  try {
    const response = await axios(config);
    console.log('Password update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export default updatePassword
