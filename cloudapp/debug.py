from project import project


if __name__ == "__main__":
    import sys

    try:
        _, api_name, env = sys.argv
    except:
        api_name = 'metabolite_index'
        env = 'dev'

    project.debug_builders = True

    with project.app_builder('FaaS:eme_app', env=env) as app_builder:
        app_builder.init_services()
        app_builder.inject_dependencies()

        app = app_builder.build_api(api_name, env=env)

        app_builder.deject_dependencies()

    app.run(host=app.host, port=app.port, threaded=False, debug=True)
