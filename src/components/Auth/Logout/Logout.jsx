import React, { useState, useEffect } from "react"
function UserLogout(){
    localStorage.clear();
    window.location.href='/'

}
export default UserLogout