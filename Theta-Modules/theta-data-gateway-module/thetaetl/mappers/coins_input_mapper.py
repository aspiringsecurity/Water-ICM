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

from thetaetl.domain.coins_input import ThetaCoinsInput
from thetaetl.mappers.coins_mapper import ThetaCoinsMapper

class ThetaCoinsInputMapper(object):
    def __init__(self, coins_mapper=None):
        if coins_mapper is None:
            self.coins_mapper = ThetaCoinsMapper()
        else:
            self.coins_mapper = coins_mapper

    def json_dict_to_coins_input(self, json_dict):
        coins_input = ThetaCoinsInput()
        coins_input.address = json_dict.get('address')
        coins_input.sequence = json_dict.get('sequence')
        coins_input.signature = json_dict.get('signature')
        coins_input.coins = self.coins_mapper.json_dict_to_coins(json_dict.get('coins'))
        return coins_input

    def coins_input_to_dict(self, coins_input):
        return {
            'type': 'coins_input',
            'address': coins_input.address,
            'sequence': coins_input.sequence,
            'signature': coins_input.signature,
            'coins': self.coins_mapper.coins_to_dict(coins_input.coins)
        }
