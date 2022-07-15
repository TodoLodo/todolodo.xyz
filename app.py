from flask import Flask, render_template
app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template("index.html")


@app.after_request
def add_header(response):
    response.headers['contact'] = 'me@todolodo.xyz'
    response.headers['x-server'] = 'todolodo.xyz'
    return response


if __name__ == '__main__':
    app.run(port=9899)
