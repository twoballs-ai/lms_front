function StudentLogout(){
    localStorage.removeItem('studentLoginStatus')
    window.location.href='/student-login'
    return (
        <>
        </>
    )
}
export default StudentLogout