import { auth } from "../utils/firebaseConfigures";

const signOut = async () => {
    await auth.signOut();
    location.reload();
};

export default signOut;