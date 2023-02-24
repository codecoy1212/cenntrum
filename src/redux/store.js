import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import UserReducer from "./features/userSlice";
import CoinReducer from "./features/coinSlice";
import SubscriptionReducer from "./features/subscriptionSlice";
import IncentiveReducer from "./features/incentiveSlice";
import earnedReducer from "./features/earnedSlice";
import exchangeReducer from "./features/exchangeSlice";
import profileReducer from "./features/profileSlice";
import settingReducer from "./features/settingSlice";
import giftReducer from "./features/giftSlice";
import cryptoReducer from "./features/cryptoSlice";
import businessReducer from "./features/businessSlice";


export default configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
    coinPkg: CoinReducer,
    subsPkg: SubscriptionReducer,
    incentive: IncentiveReducer,
    earnedPoint: earnedReducer,
    exchangePoint: exchangeReducer,
    profile: profileReducer,
    appSetting: settingReducer,
    gift: giftReducer,
    crypto: cryptoReducer,
    business: businessReducer
  },
});
