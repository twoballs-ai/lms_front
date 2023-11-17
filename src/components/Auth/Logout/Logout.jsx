import React, { useState, useEffect } from "react"
import AuthService from "../../../services/auth.service";
function UserLogout(){
    AuthService.logout()
}
export default UserLogout