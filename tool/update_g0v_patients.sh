#!/bin/bash
TS=`date +"%Y-%m-%dT%H:%M:%S"`

curl 'https://raw.githubusercontent.com/kelvin2go/covid19-tw/master/latest.json' > downloads/patients_raw.json
go run tw_g0v_google_sheet_json_to_pat_data.go > ../data/patients.json


if [[ `git status --porcelain ../data/patients.json ../data/data.json` ]]; then
    # Changes
    echo 'g0v parients data update Updated.'
    git add '../data/patients.json' '../data/data.json';
    git commit -S -m "Update patients.json in ${TS}";
    # git push;

else
	echo "There are no new patients data. ${TS}"
fi




