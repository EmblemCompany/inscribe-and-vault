Needs to be updated to use the new API for curated vaults

## Example of vault creation for Emblem Open Contract
```
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://v2.emblemvault.io/create-curated',
  'headers': {
    'accept': '*/*',
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    "fromAddress": "0x16AC7b1598329D95e6C6C6372B12b6E0FB51c96c",
    "toAddress": "0x16AC7b1598329D95e6C6C6372B12b6E0FB51c96c",
    "chainId": 1,
    "experimental": true,
    "targetContract": {
      "1": "0x184ddb67E2EF517f6754F055b56905f2A9b29b6A",
      "name": "EmblemOpen"
    },
    "targetAsset": {
      "name": "test open 2",
      "image": "https://emblem.finance/btc.png",
      "description": "test desc 2",
      "ownedImage": ""
    },
    "imageDisplayType": "embed",
    "isPrivate": false,
    "vaultPassword": ""
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```