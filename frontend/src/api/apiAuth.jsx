import useAxios from ".";

const SignUp = async (data) => {
  try {
    const axiosInstance = useAxios();
    const response = await axiosInstance.post("/register", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const SignIn = async (data) => {
  try {
    const axiosInstance = useAxios();
    const response = await axiosInstance.post("/login", data);

    console.log("Full login response:", response);

    const token = response.data.token;
    const user = response.data.user;

    if (token) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      console.log("Token saved to sessionStorage:", token);
    } else {
      console.error("No token found in the login response.");
    }

    return response.data;
  } catch (error) {
    console.error("SignIn error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};


const SignOut = async () => {
  try {
    console.log("Session storage at logout:", sessionStorage);

    const token = sessionStorage.getItem("token");
    if (!token) {
      console.warn("No token found in session storage.");
      return { success: false, error: "No token found" };
    }

    console.log("Token for logout:", token);

    const axiosInstance = useAxios();
    const response = await axiosInstance.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Logout response:", response.data);

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      console.warn("Unauthorized - token issue detected.");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    }

    return { success: false, error: error.response?.data || error.message };
  }
};


export { SignUp, SignIn, SignOut };