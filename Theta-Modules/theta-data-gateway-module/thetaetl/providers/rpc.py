# The MIT License (MIT)
#
# Copyright (c) 2016 Piper Merriam
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.


import requests
import json
import logging


class BatchHTTPProvider(object):
    def __init__(self, endpoint_uri):
        self.endpoint_uri = endpoint_uri
        self.logger = logging.getLogger('BatchHTTPProvider')

    def make_request(self, text):
        self.logger.info("Making request HTTP. URI: %s, Request: %s",
                          self.endpoint_uri, text)
        request_data = text.encode('utf-8')
        headers = {'Content-type': 'application/json'}
        raw_response = requests.post(
            self.endpoint_uri,
            data = request_data,
            headers = headers
        )

        response = raw_response.json()
        self.logger.debug("Getting response HTTP. URI: %s, "
                          "Request: %s, Response: %s",
                          self.endpoint_uri, text, response)
        return response

    # will be deprecated
    def make_batch_request(self, text):
        self.logger.info("Making request HTTP. URI: %s, Request: %s",
                          self.endpoint_uri, text)
        # request_data = text.encode('utf-8')
        headers = {'Content-type': 'application/json'}
        raw_response = requests.post(
            self.endpoint_uri,
            data = text,
            headers = headers
        )
        response = raw_response.json()
        
        self.logger.debug("Getting response HTTP. URI: %s, "
                          "Request: %s, Response: %s",
                          self.endpoint_uri, text, response)
        return response
