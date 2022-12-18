_routes = {}


def route(route_key, methods=None):
    if methods is None:
        methods = ['GET']

    def decorator(func):
        for method in methods:
            _routes[f'{method.upper()} {route_key}'] = func
        return func
    return decorator


def handle(event, context):
    if lambda_handler := _routes.get(event['routeKey']):
        return lambda_handler(event, context)
