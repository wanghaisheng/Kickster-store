import { auth } from "../utils/firebaseConfigures";

const signOut = async () => {
    await auth.signOut();
};

export default signOut;