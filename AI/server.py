"""
Optional SenseiUI backend.
This intentionally does not execute commands. It provides a safe boundary
for connecting a local model such as Ollama later.
"""
from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class Handler(BaseHTTPRequestHandler):
    def _send(self, obj, code=200):
        data=json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type","application/json")
        self.send_header("Content-Length",str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_POST(self):
        if self.path != "/analyze":
            return self._send({"error":"not found"},404)
        n=int(self.headers.get("Content-Length","0"))
        body=json.loads(self.rfile.read(n) or b"{}")
        prompt=body.get("prompt","")
        self._send({
            "safe": True,
            "answer": "Backend placeholder received your request. Add an Ollama/API adapter in this layer; never execute generated shell commands automatically.",
            "prompt": prompt
        })

if __name__=="__main__":
    print("SenseiUI optional backend listening on http://127.0.0.1:8765")
    HTTPServer(("127.0.0.1",8765),Handler).serve_forever()
