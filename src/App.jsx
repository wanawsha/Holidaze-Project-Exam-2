import { BrowserRouter, Routes, Route } from "react-router-dom";


import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import VenueDetailsPage from "./pages/VenueDetailsPage";
import CreateVenuePage from "./pages/CreateVenuePage";
import EditVenuePage from "./pages/EditVenuePage";
import MyBookingsPage from "./pages/MyBookingsPage";
import MyVenuesPage from "./pages/MyVenuesPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/venues/:id" element={<VenueDetailsPage/>}/>
        <Route path="/venues/create" element={<CreateVenuePage/>}/>
        <Route path="/venues/:id/edit" element={<EditVenuePage/>}/>
        <Route path="/my-bookings" element={<MyBookingsPage/>}/>
        <Route path="/my-venues" element={<MyVenuesPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
