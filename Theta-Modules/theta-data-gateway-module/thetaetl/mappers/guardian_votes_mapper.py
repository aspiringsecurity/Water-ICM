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

from thetaetl.domain.guardian_votes import ThetaGuardianVotes

class ThetaGuardianVotesMapper(object):
    def __init__(self, guardian_votes=None):
        if guardian_votes is None:
            self.guardian_votes = ThetaGuardianVotes()
        else:
            self.guardian_votes = guardian_votes

    def json_dict_to_guardian_votes(self, json_dict):
        guardian_votes = ThetaGuardianVotes()
        guardian_votes.Block = json_dict.get('Block')
        guardian_votes.Gcp = json_dict.get('Gcp')
        guardian_votes.Signature = json_dict.get('Signature')
        guardian_votes.Multiplies = json_dict.get('Multiplies')
        return guardian_votes

    def guardian_votes_to_dict(self, guardian_votes):
        # votes = [
        #     self.vote_mapper.vote_to_dict(vote)
        #     for vote in hcc.Votes
        # ]
        return {
            'type': 'guardian_votes',
            'Block': guardian_votes.Block,
            'Gcp': guardian_votes.Gcp,
            'Signature': guardian_votes.Signature,
            'Multiplies': guardian_votes.Multiplies
        }
