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

from thetaetl.domain.vote import ThetaVote

class ThetaVoteMapper(object):
    def json_dict_to_vote(self, json_dict):
        vote = ThetaVote()
        vote.Block = json_dict.get('Block')
        vote.Epoch = json_dict.get('Epoch')
        vote.Height = json_dict.get('Height')
        vote.ID = json_dict.get('ID')
        vote.Signature = json_dict.get('Signature')
        return vote

    def vote_to_dict(self, vote):
        return {
            'type': 'vote',
            'Block': vote.Block,
            'Epoch': vote.Epoch,
            'Height': vote.Height,
            'ID': vote.ID,
            'Signature': vote.Signature
        }