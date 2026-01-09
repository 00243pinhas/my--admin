// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/useAuth";
// import {
//   fetchListingById,
//   updateListingStatus,
//   deleteListing,
// } from "../api/listingsApi";
// import { fetchRealEstateDetails } from "../api/realEstateApi";

// export default function ListingDetailsPage() {
//   const { listingId } = useParams();
//   const navigate = useNavigate();
//   const { token } = useAuth();

//   const [listing, setListing] = useState(null);        // base
//   const [details, setDetails] = useState(null);        // chil
//   const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState("");
// useEffect(() => {
//   if (!token || !listingId) return;

//   async function load() {
//     try {
//       setLoading(true);

//       const base = await fetchListingById(token, listingId);
//       setListing(base);

//       // 👇 THIS is the whole point
//       switch (base.listing_type?.code) {
//         case "real_estate": {
//           const res = await fetchRealEstateDetails(token, listingId);
//           setDetails(res);
//           break;
//         }

//         case "vehicle": {
//           // later
//           break;
//         }

//         default:
//           setDetails(null);
//       }

//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   }

//   load();
// }, [token, listingId]);


//   async function changeStatus(status) {
//     await updateListingStatus(token, listing.id, status);
//     setListing((prev) => ({ ...prev, status }));
//   }

//   async function handleDelete() {
//     if (!confirm("Delete this listing permanently?")) return;
//     await deleteListing(token, listing.id);
//     navigate(-1);
//   }

//   if (loading) return <div>Loading…</div>;
//   if (error) return <div>{error}</div>;
//   if (!listing) return <div>Listing not found</div>;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <button onClick={() => navigate(-1)}>← Back</button>

//       <h1>Listing details</h1>
//       <p>
//         <strong>Listing:</strong> {listing?.title}
//       </p>
//       <p>
//         <strong>Type:</strong> {listing?.listing_type?.name}
//       </p>


//       {/* BASE LISTING */}
//       {/* <table border="1" cellPadding="8" cellSpacing="0">
//         <tbody>
//           <tr><th>Title</th><td>{listing.title}</td></tr>
//           <tr><th>Description</th><td>{listing.description}</td></tr>
//           <tr><th>Price</th><td>{listing.price} {listing.currency}</td></tr>
//           <tr><th>Status</th><td>{listing.status}</td></tr>
//           <tr><th>Type</th><td>{listing.listing_type?.name}</td></tr>
//           <tr><th>Owner</th><td>{listing.user?.email || listing.user_id}</td></tr>
//         </tbody>
//       </table> */}

//       {/* REAL ESTATE DETAILS */}
      
//         {details && listing.listing_type.code === "real_estate" && (
//           <table border="1">
//             <tbody>
//               <tr>
//                 <td>Purpose</td>
//                 <td>{details.purpose}</td>
//               </tr>
//               <tr>
//                 <td>Furnishing</td>
//                 <td>{details.furnishing}</td>
//               </tr>
//               <tr>
//                 <td>Year Built</td>
//                 <td>{details.year_built}</td>
//               </tr>
//               <tr>
//                 <td>Parking Spots</td>
//                 <td>{details.parking_spots}</td>
//               </tr>
//             </tbody>
//           </table>
//         )}


//       {/* ADMIN ACTIONS */}
//     <h3>Admin actions</h3>

//     {listing.status === "pending" && (
//       <>
//         <button onClick={() => changeStatus("active")}>Approve</button>
//         <button onClick={() => changeStatus("rejected")}>Reject</button>
//       </>
//     )}

//     <button onClick={handleDelete} style={{ color: "red" }}>
//       Delete listing
//     </button>

//         </div>
//   );
// }
