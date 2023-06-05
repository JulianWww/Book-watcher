clear
echo
echo
echo "installing Yarn dependancies"
yarn
yarn cache clean

echo
echo
echo "installing composer dependancies"
composer update
composer clearcache

echo
echo
echo "compiling"
yarn build

mv build/htaccess build/.htaccess
mv build/server_backend/data/htaccess build/server_backend/data/.htaccess

echo
echo
echo downloading server data
rsync -z -r ubuntu@wandhoven.ddns.net:/media/B/html/book-watcher/server_backend/data/login build/server_backend/data/ --delete
rsync -z -r ubuntu@wandhoven.ddns.net:/media/B/html/book-watcher/server_backend/data/books build/server_backend/data/ --delete


echo
echo
echo moving to server
rsync -z -r build/ ubuntu@wandhoven.ddns.net:/media/B/html/book-watcher --delete
ssh ubuntu@wandhoven.ddns.net "
cd /media/B/html/book-watcher/server_backend/data;

sudo chmod -R 777 books login; 
"

echo
echo
echo cleaning
rm -r build