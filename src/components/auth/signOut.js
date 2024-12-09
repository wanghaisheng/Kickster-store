import { auth } from "../../utils/firebaseConfigures";

const signOut = async () => {
    await auth.signOut();
    localStorage.removeItem("filters");
    localStorage.removeItem("sorting");
};

export default signOut;