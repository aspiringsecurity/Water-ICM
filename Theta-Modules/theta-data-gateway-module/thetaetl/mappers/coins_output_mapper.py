# MIT License
#
# Copyright (c) 2018 Evgeny Medvedev, evge.medvedev@gmail.com
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

from thetaetl.domain.coins_output import ThetaCoinsOutput
from thetaetl.mappers.coins_mapper import ThetaCoinsMapper

class ThetaCoinsOutputMapper(object):
    def __init__(self, coins_mapper=None):
        if coins_mapper is None:
            self.coins_mapper = ThetaCoinsMapper()
        else:
            self.coins_mapper = coins_mapper

    def json_dict_to_coins_output(self, json_dict):
        coins_output = ThetaCoinsOutput()
        coins_output.address = json_dict.get('address')
        coins_output.coins = self.coins_mapper.json_dict_to_coins(json_dict.get('coins'))
        return coins_output

    def coins_output_to_dict(self, coins_output):
        return {
            'type': 'coins_output',
            'address': coins_output.address,
            'coins': self.coins_mapper.coins_to_dict(coins_output.coins)
        }
