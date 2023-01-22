from eme.static import EmeStaticWebsite

from project import project


if __name__ == "__main__":
    import sys

    try:
        _, env = sys.argv
    except:
        env = 'dev'

    project.debug_builders = True

    # todo: later: use S3 service to service static app
    with project.app_builder('FaaS:static_app', env=env) as app_builder:
        app = app_builder.build_app(env=env)

    app.run(host=app.host, port=app.port, threaded=False, debug=True)
