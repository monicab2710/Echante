import axiosHelper from "@/app/helper/axiosHelper";
export const userData = async (id) => {
    try {
    const token = sessionStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json',
     };
    const apiUrl = await axiosHelper.get(
      `/api/v1/users/${id}`, {headers})
    
    console.log('moni', apiUrl)

       

    } catch (error) {
        console.error('Error en la petición POST:', error);
    }
  };