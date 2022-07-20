from flask import Flask, render_template, request, jsonify, send_file
import requests
import os
import json

app = Flask(__name__)


"""
domain : todolodo.xyz

subdomains:
    sub1: cod-python-api
"""


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/auth', methods=['POST'])
def auth():
    client = request.form['client']
    #print(client)

    if client in json.loads(os.environ['clients']):
        return os.environ['realName']
    else:
        return "", 401


@app.route('/status')
def status():
    return jsonify({
        "schemaVersion": 1,
        "namedLogo": "vercel",
        "logoColor": "white",
        "label": "vercel",
        "labelColor": "#191919",
        "message": "active",
        "color": "brightgreen"
    })


@app.route('/', subdomain='cod-python-api')
def sub1_index():
    return render_template("cod-python-api/index.html")


@app.route('/stats', subdomain='cod-python-api')
def sub1_stats():
    q = request.args.get('q')
    if q == 'downloads':
        response = {
            "schemaVersion": 1,
            "label": "downloads",
            "labelColor": "#282E33",
            "message": 0,
            "color": "green"
        }
        try:
            for data in requests.get('https://pypistats.org/api/packages/cod-api/overall').json()['data']:
                response["message"] += data['downloads']
            response["message"] = str(response["message"])
        except Exception as e:
            response["message"] = "error"
            response["color"] = "orange"
        return jsonify(response)

    elif q == "version":
        response = {
            "schemaVersion": 1,
            "namedLogo": "pypi",
            "logoColor": "#959DA5",
            "label": "pypi",
            "labelColor": "#282E33",
            "message": 'error',
            "color": "red"
        }
        try:
            response['message'] = requests.get('https://pypi.org/pypi/cod-api/json').json()['info']['version']
            response['color'] = 'informational'
        except Exception as e:
            pass
        return jsonify(response)


@app.route('/css/<path>', subdomain='cod-python-api')
def css(path):
    print(path)
    return send_file(f"static/css/cod-python-api/{path}.css")


@app.route('/js/<path>', subdomain='cod-python-api')
def js(path):
    print(path)
    return send_file(f"static/js/cod-python-api/{path}.js")


@app.route('/images/<path>', subdomain='cod-python-api')
def images(path):
    print(path)
    return send_file(f"static/images/cod-python-api/{path}")


@app.after_request
def add_header(response):
    response.headers['contact'] = 'me@todolodo.xyz'
    response.headers['x-server'] = 'todolodo.xyz'
    return response


if __name__ == '__main__':
    app.config['SERVER_NAME'] = 'localhost:5000'
    app.run()
