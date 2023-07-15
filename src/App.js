// import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Menu from "./pages/menu/Menu";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Users from "./pages/users/Users";
import Sponsors from "./pages/sponsors/Sponsors";
import EarnedPoints from "./pages/earnedPoints/EarnedPoints";
import ExchangePoints from "./pages/exchangePoints/ExchangePoints";
import CoinPkg from "./pages/coinPkg/CoinPkg";
import NewCoinPkg from "./pages/newCoinPkg/NewCoinPkg";
import SendGift from "./pages/sendGift/SendGift";
import SendCrypto from "./pages/sendCrypto/SendCrypto";
import Incentive from "./pages/incentive/Incentive";
import Subscription from "./pages/subscription/Subscription";
import NewSubscription from "./pages/newSubscription/NewSubscription";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import UpdateCoinPkg from "./pages/updateCoinPkg/UpdateCoinPkg";
import UpdateSubscription from "./pages/updateSubscription/UpdateSubscription";
import Incentives from "./pages/incentives/Incentives";
import AppSetting from "./pages/appSetting/AppSetting";
import UpdateIncentive from "./pages/updateIncentive/UpdateIncentive";
import AccumulatedPoints from "./pages/accumulatedPoints/AccumulatedPoints";
import MyRewards from "./pages/myRewards/MyRewards";
import UserExchangePoints from "./pages/userExchangePoints/UserExchangePoints";
import CreateBusiness from "./pages/createbusiness/CreateBusiness";
import UpdateBusiness from "./pages/updateBusiness/UpdateBusiness";
import BusinessList from "./pages/business/BusinessList";
import BusinessDetail from "./pages/businessDetail/BusinessDetail";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    // <BrowserRouter>
    //   {/* <div className='App'> */}
    //   {user && <Header />}

    //   <Routes>
    //     <Route path='/' element={<Login />} />
    //     <Route
    //       path='/home'
    //       element={
    //         <PrivateRoute>
    //           <Home />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/menu'
    //       element={
    //         <PrivateRoute>
    //           <Menu />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/profile'
    //       element={
    //         <PrivateRoute>
    //           <Profile />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/users'
    //       element={
    //         <PrivateRoute>
    //           <Users />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/earnedPoints'
    //       element={
    //         <PrivateRoute>
    //           <EarnedPoints />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/exchangedPoints'
    //       element={
    //         <PrivateRoute>
    //           <ExchangePoints />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/sponsors'
    //       element={
    //         <PrivateRoute>
    //           <Sponsors />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/coinPackages'
    //       element={
    //         <PrivateRoute>
    //           <CoinPkg />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/addNewcoinPackage'
    //       element={
    //         <PrivateRoute>
    //           <NewCoinPkg />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/updateCoinPackage/:id'
    //       element={
    //         <PrivateRoute>
    //           <UpdateCoinPkg />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/sendGift'
    //       element={
    //         <PrivateRoute>
    //           <SendGift />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/sendCrypto'
    //       element={
    //         <PrivateRoute>
    //           <SendCrypto />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/createIncentive'
    //       element={
    //         <PrivateRoute>
    //           <Incentive />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/addSubscription'
    //       element={
    //         <PrivateRoute>
    //           <Subscription />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/addNewSubscription'
    //       element={
    //         <PrivateRoute>
    //           <NewSubscription />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path='/updateSubscription/:id'
    //       element={
    //         <PrivateRoute>
    //           <UpdateSubscription />
    //         </PrivateRoute>
    //       }
    //     />
    //   </Routes>
    //   {/* </div> */}
    // </BrowserRouter>

    <BrowserRouter>
      {/* <div className='App'> */}
      {user && <Header />}

      <Routes>
        {user ? (
          <Route
            path="/"
            element={
              // <PrivateRoute>
              <Home />
              // </PrivateRoute>
            }
          />
        ) : (
          <Route path="/" element={<Login />} />
        )}

        <Route
          path="/menu"
          element={
            <PrivateRoute>
              <Menu />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/createBusiness"
          element={
            <PrivateRoute>
              <CreateBusiness />
            </PrivateRoute>
          }
        />
        <Route
          path="/updateBusiness"
          element={
            <PrivateRoute>
              <UpdateBusiness />
            </PrivateRoute>
          }
        />
        <Route
          path="/businessList"
          element={
            <PrivateRoute>
              <BusinessList />
            </PrivateRoute>
          }
        />
        <Route
          path="/BusinessDetail/:id"
          element={
            <PrivateRoute>
              <BusinessDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/accumulatedPoints/:id"
          element={
            <PrivateRoute>
              <AccumulatedPoints />
            </PrivateRoute>
          }
        />
        <Route
          path="/userRewards/:id"
          element={
            <PrivateRoute>
              <MyRewards />
            </PrivateRoute>
          }
        />
        <Route
          path="/userExchangePoints/:id"
          element={
            <PrivateRoute>
              <UserExchangePoints />
            </PrivateRoute>
          }
        />
        <Route
          path="/earnedPoints"
          element={
            <PrivateRoute>
              <EarnedPoints />
            </PrivateRoute>
          }
        />
        <Route path="/pointsEarned/search" element={<EarnedPoints />} />

        <Route
          path="/exchangedPoints"
          element={
            <PrivateRoute>
              <ExchangePoints />
            </PrivateRoute>
          }
        />
        <Route path="/exchangePoints/search" element={<ExchangePoints />} />

        {/* <Route
          path="/sponsors"
          element={
            <PrivateRoute>
              <Sponsors />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/coinPackages"
          element={
            <PrivateRoute>
              <CoinPkg />
            </PrivateRoute>
          }
        />
        <Route
          path="/addNewcoinPackage"
          element={
            <PrivateRoute>
              <NewCoinPkg />
            </PrivateRoute>
          }
        />
        <Route
          path="/updateCoinPackage/:id"
          element={
            <PrivateRoute>
              <UpdateCoinPkg />
            </PrivateRoute>
          }
        />
        <Route
          path="/sendGift"
          element={
            <PrivateRoute>
              <SendGift />
            </PrivateRoute>
          }
        />
        <Route
          path="/sendCrypto"
          element={
            <PrivateRoute>
              <SendCrypto />
            </PrivateRoute>
          }
        />
        <Route
          path="/createIncentive"
          element={
            <PrivateRoute>
              <Incentive />
            </PrivateRoute>
          }
        />
        <Route
          path="/incentives"
          element={
            <PrivateRoute>
              <Incentives />
            </PrivateRoute>
          }
        />
        <Route
          path="/updateIncentive/:id"
          element={
            <PrivateRoute>
              <UpdateIncentive />
            </PrivateRoute>
          }
        />
        <Route
          path="/addSubscription"
          element={
            <PrivateRoute>
              <Subscription />
            </PrivateRoute>
          }
        />
        <Route
          path="/addNewSubscription"
          element={
            <PrivateRoute>
              <NewSubscription />
            </PrivateRoute>
          }
        />
        <Route
          path="/updateSubscription/:id"
          element={
            <PrivateRoute>
              <UpdateSubscription />
            </PrivateRoute>
          }
        />
        <Route
          path="/appSetting"
          element={
            <PrivateRoute>
              <AppSetting />
            </PrivateRoute>
          }
        />
      </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;

// <BrowserRouter>
//   <div className='app'>
//     <Header />
//     <Routes>
//       <Route path='/' element={<Home />} />
//       <Route path='/menu' element={<Menu />} />
//       <Route path='/profile' element={<Profile />} />
//       <Route path='/users' element={<Users />} />
//       <Route path='/register' element={<Register />} />
//       <Route path='/login' element={<Login />} />
//       <Route path='/earnedPoints' element={<EarnedPoints />} />
//       <Route path='/exchangedPoints' element={<ExchangePoints />} />
//       <Route path='/sponsors' element={<Sponsors />} />
//       <Route path='/coinPackages' element={<CoinPkg />} />
//       <Route path='/addNewcoinPackage' element={<NewCoinPkg />} />
//       <Route path='/sendGift' element={<SendGift />} />
//       <Route path='/sendCrypto' element={<SendCrypto />} />
//       <Route path='/createIncentive' element={<Incentive />} />
//       <Route path='/addSubscription' element={<Subscription />} />
//       <Route path='/addNewSubscription' element={<NewSubscription />} />
//     </Routes>
//     {/* )} */}
//   </div>
// </BrowserRouter>
