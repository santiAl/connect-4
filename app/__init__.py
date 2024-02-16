from flask import Flask, jsonify
from config import config

def create_app(config_name='development'):
    app = Flask(__name__)

    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    return app
