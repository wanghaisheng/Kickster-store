import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../utils/firebaseConfigures";
import { toast } from "react-toastify";
import { setWishlist } from "../../../store/features/wishlistSlice";
import { setCartItems } from "../../../store/features/cartSlice";
import { priceStringToInt } from "../../universal/priceCorrection";



export const cartHandler = async (product, size, processing, dispatch, navigate) => {
    processing(true);
    const user = auth.currentUser;
    if (user) {
        let updatedCart;
        let action = "";
        try {
            const docSnap = await getDoc(doc(db, "carts", `${user.uid}`));
            if (docSnap.exists()) {
                const cartItems = docSnap.data().cart;
                //Checking if the product is in the cart already
                if (cartItems.some(item => item.id === product.id)) {
                    //REMOVING CART ITEM
                    updatedCart = cartItems.filter(item => item.id !== product.id);
                    action = "remove"
                }
                else {
                    if(!size){
                        toast.error("Please select a size!");
                        return;
                    }
                    //ADDING CART ITEM
                    updatedCart = [...cartItems, { ...product, quantity: 1, price: priceStringToInt(product.price), totalPrice: priceStringToInt(product.price), selectedSize: size }];
                }
            }
            else {
                if(!size){
                    toast.error("Please select a size!");
                    return;
                }
                //ADDING FIRST CART ITEM
                updatedCart = [{ ...product, quantity: 1, price: priceStringToInt(product.price), totalPrice: priceStringToInt(product.price), selectedSize: size }]
            }
            await setDoc(doc(db, "carts", `${user.uid}`), { cart: updatedCart });
            dispatch(setCartItems(updatedCart));
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            toast.success(action === "remove" ? "Product removed from cart!" : "Product added to cart!");
        }
        catch (error) {
            toast.error(error.message || "An error occurred");
        }
        finally {
            processing(false);
        }
    }
    else {
        toast.error("Please sign in to add to cart!");
        navigate("/login");
    }
}


export const wishlistHandler = async (productId, processing, dispatch, navigate) => {
    processing(true);
    const user = auth.currentUser;
    if (user) {
        let updatedWishlist;
        let action = "";
        try {
            const product = await getDoc(doc(db, "products", `${productId}`))
            const docSnap = await getDoc(doc(db, "wishlists", `${user.uid}`));
            if (docSnap.exists() && product) {
                const wishlistItems = docSnap.data().wishlist;
                //Checking if the product is in the wishlist already
                if (wishlistItems.some(item => item.id === product.data().id)) {
                    //REMOVING WISHLIST ITEM
                    updatedWishlist = wishlistItems.filter(item => item.id !== product.data().id);
                    action = "remove"
                }
                else {
                    //ADDING WISHLIST ITEM
                    updatedWishlist = [...wishlistItems, product.data()];
                }
            }
            else {
                //ADDING FIRST WISHLIST ITEM
                updatedWishlist = [product.data()]
            }
            await setDoc(doc(db, "wishlists", `${user.uid}`), { wishlist: updatedWishlist });
            dispatch(setWishlist(updatedWishlist));
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            toast.success(action === "remove" ? "Product removed from wishlist!" : "Product added to wishlist!");
        }
        catch (error) {
            toast.error(error.message || "An error occurred");
        }
        finally {
            processing(false);
        }
    }
    else {
        toast.error("Please sign in to add to wishlist!");
        navigate("/login");
    }
}