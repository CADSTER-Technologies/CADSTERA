import os
from app.main import API

api = API()
application = api.app 

if __name__ == "__main__":
    print("wsgi() :: Flask API is starting at: http://127.0.0.1:8080")
    api.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))