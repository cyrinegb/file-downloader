import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
from app import app  

@pytest.fixture
def client():
    app.testing = True
    return app.test_client()

def test_get_files(client):
    response = client.get('/api/files')
    assert response.status_code == 200
    assert 'application/json' in response.content_type

def test_download_file(client):
    # Suppose que tu as au moins un fichier dans le dossier files/
    response = client.get('/download/cloudera .png')
    assert response.status_code in (200, 404)  # 200 si présent, 404 si absent pour le test

def test_download_missing_file(client):
    response = client.get('/download/fichier_qui_nexiste_pas.xyz')
    assert response.status_code == 404
