


`$ bash install.sh`

Test it work:

`$ node index.js`

If it is successful, you will see file in list_scam folder. 
To configure running this script every hour, please try:

Open crontab

`$ crontab -e`

Add line below to crontab

`0 * * * * cd ~/Documents/ethereum/scram_website && node index.js`

Where `/Documents/ethereum/scram_website` is folder you push file index.js

