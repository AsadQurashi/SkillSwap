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
    
    subfolder = subfolder.lower()
    filename = secure_filename(file.filename)
    folder_path = os.path.join(UPLOAD_FOLDER , subfolder)
    os.makedirs(folder_path, exist_ok=True) #id folder dosent exist then create it

    filepath = os.path.join(folder_path, filename)
    file.save(filepath)

    print("Absolute image path on disk:", os.path.abspath(filepath))
    print("Directory exists?", os.path.exists(os.path.dirname(filepath)))
    print("File exists?", os.path.exists(filepath))

    print("File Path : ",filepath)
    return f"{subfolder}/{filename}".replace("\\","/")
    # Convert to URL path (forward slashes only)
    # return f"{UPLOAD_FOLDER}/{subfolder}/{filename}".replace("\\","/")
    
