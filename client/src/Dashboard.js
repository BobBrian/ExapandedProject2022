import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminDashboard from "./Components/admin/AdminDashboard";
import CustomerDashboard from "./Components/customer/CustomerDashboard";
import EditorDashboard from "./Components/editor/EditorDashboard";


//This will serve as the central topbar for all the indicual landing pages before going back to the extra pages
//Basically When you Login In your reirected and then filtered into the various assorted Dashboards based 
//on the role.

function Dashboard({ setAuth}) {

  const [role, setRole] = useState("");

  const getRole = async () => {
    try {
      const res = await fetch("http://localhost:5000/restaurant/getrole", {
        method: "GET",
        headers: {token: localStorage.token}
      });
      const parseData = await res.json();
      setRole(parseData.role);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
    getRole();
  }, []);

  return (
    <div>
      <button onClick={e => logout(e)} class="btn btn-primary btn-lg btn-block">Logout </button>
      {role == "Customer" && <CustomerDashboard/>}
      {role == "Editor" && <EditorDashboard/>}
      {role == "Admin" && <AdminDashboard/>}
    </div>
  )
}

export default Dashboard