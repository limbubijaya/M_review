function signOut() {
    // Delete the cookie
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
    // Redirect the user to the login page or any other desired page
    window.location.href = '/';
}