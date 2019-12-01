#!/usr/bin/env sh

OUT_DIR="/home/gefaessc/www/alexanderstriff/volley/data"

# Global time range definitions
TODAY=$(date '+%Y-%m-%d')
MONTH=$(date '+%m')
YEAR=$(date '+%Y')

if [ "$MONTH" -ge 7 ]; then
  YEAR=$((YEAR += 1))
fi

END="${YEAR}-06-30"
START=$TODAY

# Fetch game data for a single region
# $1 - region name
fetch_for_region() {
  curl --request GET \
    --url "https://api.volleyball.ch/indoor/games?region=$1&dateStart=${START}&dateEnd=${END}" \
    --header 'Accept: application/json' \
    --header 'Accept-Encoding: gzip, deflate' \
    --header 'Authorization: clicsoftGmbhMasterApiKey' \
    --header 'Cache-Control: no-cache' \
    --header 'Connection: keep-alive' \
    --header 'Host: api.volleyball.ch' \
    --header 'cache-control: no-cache' \
    --silent \
    -o "${OUT_DIR}/$1.json"
}


mkdir -p $OUT_DIR
fetch_for_region SVRBE
