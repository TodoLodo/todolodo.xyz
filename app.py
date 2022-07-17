from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

"""
domain : todolodo.xyz

subdomains:
    sub1: cod-python-api
"""


@app.route('/')
def index():
    return render_template("index.html")


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


@app.after_request
def add_header(response):
    response.headers['contact'] = 'me@todolodo.xyz'
    response.headers['x-server'] = 'todolodo.xyz'
    return response


if __name__ == '__main__':
    app.config['SERVER_NAME'] = 'localhost:5000'
    app.run()
