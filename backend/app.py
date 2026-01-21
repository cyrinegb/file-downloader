import os
from flask import Flask, jsonify, send_from_directory, abort
from datetime import datetime
from flask_cors import CORS
import re
from pathlib import Path

app = Flask(__name__)
CORS(app)

# Dossier des fichiers
# Chemin absolu vers le dossier files (plus sûr sur Windows et partout)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FILES_DIR = os.path.join(BASE_DIR, 'files')

# Crée le dossier automatiquement s'il n'existe pas
os.makedirs(FILES_DIR, exist_ok=True)

@app.route('/api/files', methods=['GET'])
def get_files():
    """Renvoie la liste des fichiers en JSON."""
    try:
        files = []
        # Liste des extensions autorisées (modifiable)
        ALLOWED_EXTENSIONS = {'.pdf', '.png', '.jpg', '.jpeg', '.txt', '.doc', '.docx'}
        
        for filename in os.listdir(FILES_DIR):
            filepath = os.path.join(FILES_DIR, filename)
            
            # Ne lister que les fichiers (pas les dossiers)
            if not os.path.isfile(filepath):
                continue
                
            # Filtrer les fichiers système et cachés
            if filename.startswith('.') or filename.startswith('__'):
                continue
                
            # Filtrer par extension (optionnel mais recommandé)
            _, ext = os.path.splitext(filename)
            if ALLOWED_EXTENSIONS and ext.lower() not in ALLOWED_EXTENSIONS:
                continue
            
            stat = os.stat(filepath)
            files.append({
                'name': filename,
                'size': stat.st_size,
                'last_modified': datetime.fromtimestamp(stat.st_mtime).isoformat() + 'Z',
                'type': ext.lower().lstrip('.') or 'unknown'
            })
        
        return jsonify(files)
    except Exception as e:
        app.logger.error(f"Erreur dans get_files: {str(e)}")
        abort(500, description="Erreur interne du serveur")

@app.route('/download/<name>', methods=['GET'])
def download_file(name):
    """Télécharge le fichier demandé."""
    try:
        return send_from_directory(FILES_DIR, name, as_attachment=True)
    except FileNotFoundError:
        abort(404, description="Fichier non trouvé")

if __name__ == '__main__':
    app.run(debug=True, port=5000)