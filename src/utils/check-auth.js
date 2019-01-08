export default function checkAuth() {
    setTimeout(() => {
        if (window.netlifyIdentity && window.netlifyIdentity.currentUser() === null) {
            window.location = `/`;
        }
    }, 1500);
}
