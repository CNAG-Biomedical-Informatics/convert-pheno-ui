import os

from convertPheno_server.server.config.general_config import GeneralConfig
from flask import Flask, request

app = Flask(__name__)

@app.route('/convert', methods=['POST'])
def convert():
    user_id_hash = request.form['user_id_hash']
    
    # Check if user exists in the database
    # This is a placeholder and should be replaced with actual database query
    user_exists = False

    if not user_exists:
        # Replace the placeholder in the directory paths with the actual user ID hash
        user_upload_dir = GeneralConfig.USER_UPLOAD_DIR.replace('{{user_id_hash}}', user_id_hash)
        user_output_dir = GeneralConfig.USER_OUTPUT_DIR.replace('{{user_id_hash}}', user_id_hash)

        # Create the directories if they do not already exist
        os.makedirs(user_upload_dir, exist_ok=True)
        os.makedirs(user_output_dir, exist_ok=True)

    # Continue with the rest of the /convert endpoint's functionality

    return "Conversion complete"
