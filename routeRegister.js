global.registeredRoutes = [];
export default class RouteRegister {
    static add(method, controllerName, actionName = "index") {
        registeredRoutes.push({
            method,
            controllerName,
            actionName
        });
    }
    static find(httpContext) {
        let path = httpContext.path;
        let foundRoute = null;
        registeredRoutes.forEach(route => {
            if (route.method == httpContext.req.method) {
                if (path.model != undefined && path.model.toLowerCase() == route.controllerName.toLowerCase()) {
                    if (path.action != undefined && path.action == route.actionName) {
                        route.id = path.id;
                        foundRoute = route;
                    }
                }
            }
        });
        return foundRoute;
    }
}
