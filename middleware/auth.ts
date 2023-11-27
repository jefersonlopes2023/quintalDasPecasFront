export default defineNuxtRouteMiddleware((to, from) => {
    const logged = localStorage.getItem('logged');
    if (!logged) {
        return navigateTo('/');
    }
  })