#!/usr/bin/env sh

OUT_DIR="/home/gefaessc/www/alexanderstriff/volley/data"

# Global time range definitions
MONTH=$(date '+%m')
START_YEAR=$(date '+%Y')
if [ "$MONTH" -lt 7 ]; then
  START_YEAR=$((START_YEAR -= 1))
fi

END_YEAR=$(date '+%Y')
if [ "$MONTH" -ge 7 ]; then
  END_YEAR=$((END_YEAR += 1))
fi

START="${START_YEAR}-07-01"
END="${END_YEAR}-06-30"

# Fetch game data for a single region
# $1 - region name
fetch_for_region() {
  curl --request GET \
    --url "https://api.volleyball.ch/indoor/games?region=$1&dateStart=${START}&dateEnd=${END}" \
    --header 'Accept: application/json' \
    --header 'Authorization: clicsoftGmbhMasterApiKey' \
    --header 'Cache-Control: no-cache' \
    --header 'Connection: keep-alive' \
    --header 'Host: api.volleyball.ch' \
    --header 'cache-control: no-cache' \
    --silent \
    -o "${OUT_DIR}/$1.json"
}

mkdir -p $OUT_DIR
fetch_for_region SVRBESO
