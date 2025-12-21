export default defineNuxtRouteMiddleware((to, from) => {
	if (import.meta.server) {
		return;
	}
	const access_token = useCookie("access_token");
	if (!access_token.value) {
		if (from.fullPath === to.fullPath) {
			return navigateTo("/");
		} else {
            return navigateTo(from.fullPath);
		}
	}
});
