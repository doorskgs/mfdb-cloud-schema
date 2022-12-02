from flask import Flask
from werkzeug.routing import BaseConverter

class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]

app = Flask('',  static_folder='static', template_folder='templates')
app.url_map.converters['regex'] = RegexConverter

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def _index(path=None, **kwargs):
    return "A Jo budos kurva anyad akkor"
static_path = '/<regex("(img/|css/|fonts/|js/).*"):filename>/'

app.config['TEMPLATES_AUTO_RELOAD'] = True
app.run(host='0.0.0.0', port=5000)

