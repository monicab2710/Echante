import axiosHelper from "@/app/helper/axiosHelper";
export const userData = async (id) => {
    try {
    const token = sessionStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json',
     };
    const user = await axiosHelper.get(
      `/api/v1/users/${id}`, {headers})
     return user
        
    } catch (error) {
        console.error('Error en la petición POST:', error);
    }
  };

  export const updateUserData = async (newUser, fireSuccess, fireError) => {
    try {

      console.log(newUser)
      const response = await axiosHelper.put(`/api/v1/users/auth/update/${newUser.userId}`,
      {
        name: newUser.name,
        lastName: newUser.lastName,
        userName: newUser.userName,
        email: newUser.email,
        password: newUser.password,
      });
      if (response.status === 200) {
        fireSuccess()
        
      } else {
        console.log('Error:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      fireError()
    }
  };

   