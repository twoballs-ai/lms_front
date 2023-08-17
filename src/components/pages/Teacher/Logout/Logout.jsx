import React from 'react';
function TeacherLogout(){
    localStorage.removeItem('teacherLoginStatus')
    window.location.href='/teacher-login'
    return (
        <>
        </>
    )
}
export default TeacherLogout