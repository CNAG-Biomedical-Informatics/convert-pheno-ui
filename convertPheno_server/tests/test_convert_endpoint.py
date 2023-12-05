import os

import pytest
from convertPheno_server.server.main import app
from flask.testing import FlaskClient


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def simulate_user_in_db(user_id_hash):
    os.makedirs(f"/home/uploads/{user_id_hash}", exist_ok=True)
    os.makedirs(f"/home/output/{user_id_hash}", exist_ok=True)

def test_convert_endpoint_creates_directories_for_new_user(client: FlaskClient):
    user_id_hash = "new_user"
    
    response = client.post('/convert', data={'user_id_hash': user_id_hash})
    
    assert response.status_code == 200
    assert os.path.isdir(f"/home/uploads/{user_id_hash}")
    assert os.path.isdir(f"/home/output/{user_id_hash}")

def test_convert_endpoint_does_not_create_directories_for_existing_user(client: FlaskClient):
    user_id_hash = "existing_user"
    simulate_user_in_db(user_id_hash)
    
    num_dirs_before = len(os.listdir("/home/uploads")) + len(os.listdir("/home/output"))
    
    response = client.post('/convert', data={'user_id_hash': user_id_hash})
    
    assert response.status_code == 200
    num_dirs_after = len(os.listdir("/home/uploads")) + len(os.listdir("/home/output"))
    assert num_dirs_before == num_dirs_after
