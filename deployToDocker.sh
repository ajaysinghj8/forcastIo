npm run compile
rm -rf lib
rm -rf dist/test
mv dist lib
docker build -t weather-app .
rm -rf lib
