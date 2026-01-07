import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

import {
  fetchUserById,
  fetchUserListings,
  // fetchUserFavorites
} from "../../api/usersApi";

import UserHeader from "../users/sections/UserHeader";
// import UserProfileCard from "./sections/UserProfileCard";
import UserListingsCard from "./sections/UserListingsCard";
import UserActionsCard from "./sections/UserActionsCard";
import UserSubscriptionCard from "./sections/UserSubscriptionCard";
import UserFavoritesCard from "./sections/UserFavoritesCard";



export default function UserDetailsPage() {
  const { userId } = useParams();
  const { token } = useAuth();

  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [favorites, setFavorites] = useState([]);


  async function load() {
    try {
      setLoading(true);

      const [
        userData,
        userListings,
        // userFavorites,
      ] = await Promise.all([
        fetchUserById(token, userId),
        fetchUserListings(token, userId),
        // fetchUserFavorites(token, userId),
      ]);

      setUser(userData);
      setListings(userListings || []);
      // setFavorites(Array.isArray(userFavorites) ? userFavorites : []);
    } finally {
      setLoading(false);
    }
  }

  console.log(userId);

  // console.log(user.accountStatus);
  useEffect(() => {
    load();
  }, [userId]);

  if (loading) return <div className="p-4">Loading user…</div>;
  if (!user) return <div className="p-4 text-danger">User not found</div>;

  return (
    <div className="container-fluid">
      <h4 className="mb-3">User Details</h4>
      <UserHeader user={user} />
      {/* <UserProfileCard user={user} /> */}
      <UserSubscriptionCard userId={user.id} />
      {/* <UserFavoritesCard favorites={favorites} /> */}
      <UserActionsCard user={user} onChange={load} />
      <UserListingsCard listings={listings} />
    </div>
  );
}
