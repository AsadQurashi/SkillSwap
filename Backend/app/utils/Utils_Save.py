import os
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'uploads/skills'

def save_file(file , subfolder):
    """
    Saves an uploaded file to a subfolder inside UPLOAD_FOLDER.
    Returns the file path (relative) for storing in DB.
    """
    if not file:
        return None
    
    filename = secure_filename(file.filename)
    folder_path = os.path.join(UPLOAD_FOLDER , subfolder)
    os.makedirs(folder_path, exist_ok=True) #id folder dosent exist then create it

    filepath = os.path.join(folder_path, filename)
    file.save(filepath)


    return filepath
