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

from thetaetl.domain.hcc import ThetaHCC
from thetaetl.mappers.vote_mapper import ThetaVoteMapper

class ThetaHCCMapper(object):
    def __init__(self, vote_mapper=None):
        if vote_mapper is None:
            self.vote_mapper = ThetaVoteMapper()
        else:
            self.vote_mapper = vote_mapper

    def json_dict_to_hcc(self, json_dict):
        hcc = ThetaHCC()
        hcc.BlockHash = json_dict.get('BlockHash')
        hcc.Votes = [
            self.vote_mapper.json_dict_to_vote(vote)
            for vote in json_dict['Votes']
        ]
        return hcc

    def hcc_to_dict(self, hcc):
        votes = [
            self.vote_mapper.vote_to_dict(vote)
            for vote in hcc.Votes
        ]
        return {
            'type': 'hcc',
            'BlockHash': hcc.BlockHash,
            'Votes': votes
        }
