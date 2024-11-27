# 🥾 Kickster

Kickster is a modern 🌐 web app built using ⚡️ Vite and ⚛️ React that allows users to explore a variety of 👟 shoe brands. Users can browse, filter, and sort through a diverse collection of shoes, and enjoy seamless shopping 🛒 features. The app integrates 🔒 authentication, protected 🚪 routes, and an admin 🧑‍💻 panel for enhanced user experience and management.

---

## 🎯 Features

### 🔍 Product Filtering and Sorting
- **Filter Options**: Gender (👨 Men/👩 Women), Size (Specific sizes), Brands (🐆 Puma, ✔️ Nike, 🅰️ Adidas, etc.), Purpose (🏋️‍♂️ Training, ⚽ Football, 🏀 Basketball, 🏋️‍♀️ Gym, etc.).
- **Sorting Options**: 💰 Price (⬇️ Low to High, ⬆️ High to Low), ⭐ Ratings.
- **Collections Section**: View products tailored for specific purposes.

### 🔒 Authentication
- **🔥 Firebase Integration**: Email/password ✉️ sign-up, Google 🌐 sign-in.
- **User Role**: Browsing 🖥️ and viewing details is open to everyone. To add items to the cart 🛍️ or wishlist, or to make purchases, users must log in 🔑.
- **Admin Role**: Admins must log in to access a dashboard 📊. Signup is restricted to regular users.

### 🛠️ Admin Panel
- **Admin Capabilities**:
  - Review app metrics 📈, products 🛒, users 👥, and orders 📦.
  - Add ➕, update ✏️, or delete ❌ products.
  - Delete 🗑️ or disable 🚫 users.
- **Role-Based Access**: Admin panel is protected and accessible only to logged-in admin accounts.

### 🚪 Protected Routes
- Role-based routing ensures that users can only access content relevant to their role (e.g., 🛍️ cart and 💖 wishlist for users, admin 🖥️ dashboard for admins).
- Unauthorized attempts to access restricted paths are blocked 🚫.

### 💳 Payment Gateway
- **Razorpay Integration**: Users can proceed with payments seamlessly after finalizing their cart items 🛒.

---

## 🛠️ Technical Details

### ⚛️ Frontend Library: React + Vite
Kickster is powered by React and Vite for fast ⚡️ development and optimized performance.

#### 🏗️ Setting Up React + Vite
1. Install Vite:
   ```bash
   npm create vite@latest kickster --template react
   cd kickster
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

### 🎨 Styling: Tailwind CSS
Used Tailwind CSS for modern, utility-first styling 🎨.

#### ✨ Setting Up Tailwind CSS
1. Install Tailwind CSS:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```
2. Configure Tailwind in `tailwind.config.js` and import styles in `index.css`.

### 🛠️ State Management: Redux Toolkit
Managed app-wide state with Redux Toolkit for efficiency ⚙️ and scalability 📈.

#### 🔧 Setting Up Redux Toolkit
1. Install Redux Toolkit:
   ```bash
   npm install @reduxjs/toolkit react-redux
   ```
2. Create slices and setup the store 🏬.
   Example slice for products:
   ```javascript
   import { createSlice } from '@reduxjs/toolkit';

   const productsSlice = createSlice({
       name: 'products',
       initialState: [],
       reducers: {
           setProducts: (state, action) => action.payload,
       },
   });

   export const { setProducts } = productsSlice.actions;
   export default productsSlice.reducer;
   ```

### 🌀 Interactions: GSAP
Used GSAP for smooth animations 🎥 and interactive UI.

#### 🔄 Setting Up GSAP
1. Install GSAP:
   ```bash
   npm install gsap
   ```
2. Import and use animations:
   ```javascript
   import gsap from 'gsap';

   gsap.to(".box", { x: 100, duration: 1 });
   ```

### 🔥 Backend: Firebase
Used Firebase for backend functionality including 🔒 authentication, Firestore database 📚, and CRUD operations.

#### ⚙️ Setting Up Firebase
1. Install Firebase:
   ```bash
   npm install firebase
   ```
2. Configure Firebase in `firestoreConfig.js`:
   ```javascript
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';
   import { getAuth } from 'firebase/auth';

   const firebaseConfig = {
       apiKey: process.env.REACT_APP_API_KEY,
       authDomain: process.env.REACT_APP_AUTH_DOMAIN,
       projectId: process.env.REACT_APP_PROJECT_ID,
       storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
       messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
       appId: process.env.REACT_APP_APP_ID,
   };

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   export const auth = getAuth(app);
   ```

3. Use a `.env` file to store sensitive keys 🔑.

#### 📚 CRUD Operations with Firestore
- **Add Data**:
   ```javascript
   import { collection, addDoc } from 'firebase/firestore';

   await addDoc(collection(db, 'products'), {
       name: 'Product Name',
       price: 100,
   });
   ```
- **Read Data**:
   ```javascript
   import { collection, getDocs } from 'firebase/firestore';

   const querySnapshot = await getDocs(collection(db, 'products'));
   querySnapshot.forEach((doc) => {
       console.log(doc.id, " => ", doc.data());
   });
   ```
- **Update Data**:
   ```javascript
   import { doc, updateDoc } from 'firebase/firestore';

   const productRef = doc(db, 'products', 'docId');
   await updateDoc(productRef, { price: 200 });
   ```
- **Delete Data**:
   ```javascript
   import { doc, deleteDoc } from 'firebase/firestore';

   await deleteDoc(doc(db, 'products', 'docId'));
   ```

#### 🔐 Firebase Auth
- Sign up/Login:
   ```javascript
   import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

   createUserWithEmailAndPassword(auth, email, password);
   signInWithEmailAndPassword(auth, email, password);
   ```

### 🗺️ Routing: React Router
Used `react-router-dom` for multi-page functionality 🗺️.

#### 🚏 Setting Up React Router
1. Install the library:
   ```bash
   npm install react-router-dom
   ```
2. Create routes in `App.js`:
   ```javascript
   import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

   <Router>
       <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/product/:id" element={<ProductDetail />} />
       </Routes>
   </Router>
   ```

#### 🚧 Protected Routes
Implement role-based access:
```javascript
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuth }) => {
    return isAuth ? children : <Navigate to="/login" />;
};
```

### 💳 Payment Gateway: Razorpay
Integrated Razorpay for secure 🔐 and seamless transactions.

#### 💸 Setting Up Razorpay
1. Install Razorpay SDK:
   ```bash
   npm install razorpay
   ```
2. Implement payment logic:
   ```javascript
   const handlePayment = async () => {
       const options = {
           key: 'RAZORPAY_KEY',
           amount: totalAmount,
           currency: 'INR',
       };

       const paymentObject = new window.Razorpay(options);
       paymentObject.open();
   };
   ```

---

## 🖥️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/kickster.git
   cd kickster
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add Firebase and Razorpay keys.
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Enjoy building and exploring Kickster!
