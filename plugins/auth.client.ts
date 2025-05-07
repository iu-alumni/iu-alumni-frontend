export default defineNuxtPlugin(async (nuxtApp) => {
    console.debug("[auth.ts] Plugin initialized");

    // Skip plugin when rendering error page
    if (nuxtApp.payload.error) {
        console.debug("[auth.ts] Skipping plugin due to error page rendering");
        return {};
    }

    // Create a reactive reference to the authentication state
    const authToken = useState("authToken", () => {
        const token = localStorage.getItem("iu_alumni_token");
        console.debug("[auth.ts] Initial authToken:", token);
        return token;
    });

    // Computed property to check if user is logged in
    const loggedIn = computed(() => !!authToken.value);
    console.debug("[auth.ts] Initial loggedIn state:", loggedIn.value);

    // Create a ref to know where to redirect the user when logged in
    const redirectTo = useState("authRedirect", () => "/users");
    console.debug("[auth.ts] Initial redirectTo:", redirectTo.value);

    /**
     * Add global route middleware to protect pages
     */
    addRouteMiddleware(
        "auth",
        (to) => {
            console.debug(
                "[auth.ts] Route middleware triggered for path:",
                to.path,
            );
            const publicRoutes = ["/"];

            if (
                (to.meta.auth || !publicRoutes.includes(to.path)) &&
                !loggedIn.value
            ) {
                console.debug(
                    "[auth.ts] User not logged in, redirecting to login page",
                );
                redirectTo.value = to.path;
                return "/";
            }

            if (loggedIn.value && to.path === "/") {
                console.debug(
                    "[auth.ts] User logged in on login page, redirecting to home",
                );
                return redirectTo.value || "/users";
            }
        },
        { global: true },
    );

    const currentRoute = useRoute();
    console.debug("[auth.ts] Current route:", currentRoute.path);

    // Client-side watchers
    // Update token when localStorage changes
    window.addEventListener("storage", (event) => {
        if (event.key === "iu_alumni_token") {
            console.debug(
                "[auth.ts] localStorage token changed:",
                event.newValue,
            );
            authToken.value = event.newValue;
        }
    });

    // Watch for login state changes
    watch(loggedIn, async (isLoggedIn) => {
        console.debug("[auth.ts] loggedIn state changed:", isLoggedIn);
        if (!isLoggedIn && currentRoute.meta.auth) {
            console.debug(
                "[auth.ts] User logged out, redirecting to login page",
            );
            redirectTo.value = currentRoute.path;
            await navigateTo("/");
        }
    });

    // If logged in and on login page, redirect to saved path or home
    if (loggedIn.value && currentRoute.path === "/") {
        console.debug(
            "[auth.ts] User logged in, redirecting to:",
            redirectTo.value || "/users",
        );
        await navigateTo(redirectTo.value || "/users");
    }

    // Provide auth utilities to components
    return {
        provide: {
            auth: {
                loggedIn,
                token: authToken,
                redirectTo,
                login: (token: string) => {
                    console.debug("[auth.ts] Login called with token:", token);
                    localStorage.setItem("iu_alumni_token", token);
                    authToken.value = token;
                },
                logout: async () => {
                    console.debug("[auth.ts] Logout called");
                    localStorage.removeItem("iu_alumni_token");
                    authToken.value = null;
                    await navigateTo("/");
                },
                getToken: () => {
                    console.debug(
                        "[auth.ts] getToken called, returning:",
                        authToken.value,
                    );
                    return authToken.value;
                },
            },
        },
    };
});
