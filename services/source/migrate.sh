# exit on error
set -eo pipefail

# tables
TABLE_FROM=$1
TABLE_TO=$2

# read
aws dynamodb scan \
  --table-name "$TABLE_FROM" \
  --output json \
 | jq "[ .Items[] | { PutRequest: { Item: . } } ]" \
 > "${TABLE_FROM}-dump.json"

table_size="$(cat "${TABLE_FROM}-dump.json" | jq '. | length')"
echo "table size: ${table_size}"

# write in batches of 25
for i in $(seq 0 25 $table_size); do
  j=$(( i + 25 ))
  cat "${TABLE_FROM}-dump.json" | jq -c '{ "'$TABLE_TO'": .['$i':'$j'] }' > "${TABLE_TO}-batch-payload.json"
  echo "Loading records $i through $j (up to $table_size) into ${TABLE_TO}"
  aws dynamodb batch-write-item --request-items file://"${TABLE_TO}-batch-payload.json"
  rm "${TABLE_TO}-batch-payload.json"
done


# clean up
rm ".dump.json"