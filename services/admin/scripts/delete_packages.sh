#!/bin/bash

# Variables
DYNAMODB_TABLE="onemac-masterclone-one"
PK_VALUES=("NY-24-9356" "NY-24-6035" "NY-24-3865" "NY-24-1282" "NY-24-1036" "NY-24-9253" "NY-24-9972" "NY-24-1717" "NY-24-5342" "NY-24-8523" "NY-24-1571" "NY-24-7203" "NY-80815.R01.02" "NY-66338.R01.02" "NY-84734.R01.00" "NY-23214.R01.02" "NY-94872.R00.00" "NY-93400.R00.00" "NY-72598.R01.02" "NY-84074.R01.00" "NY-49584.R00.01" "NY-52227.R00.00" "NY-27845.R01.00" "NY-95809.R00.01" "NY-53801.R01.02" "NY-38783.R00.01" "NY-75550.R00.01" "NY-92181.R01.00" "NY-18445.R00.00" "NY-57782.R01.00" "NY-52513.R00.00" "NY-99845.R00.01" "NY-76823.R00.01" "NY-42146.R01.02" "NY-52725.R00.00" "NY-14938.R01.00")

# Counter for deleted items
DELETED_COUNT=0

# Loop through each pk value
for PK in "${PK_VALUES[@]}"; do
  # Query DynamoDB for items with the specified pk
  ITEMS=$(aws dynamodb query \
    --table-name "$DYNAMODB_TABLE" \
    --key-condition-expression "pk = :pk" \
    --expression-attribute-values '{":pk": {"S": "'"$PK"'"}}' \
    --projection-expression "pk, sk" \
    --output json | jq -c '.Items[]')

  # Loop through the found items and delete them
  echo "$ITEMS" | while read -r item; do
    pk=$(echo "$item" | jq -r '.pk.S')
    sk=$(echo "$item" | jq -r '.sk.S')

    # Skip if pk or sk is empty
    if [[ -z "$pk" || -z "$sk" ]]; then
      continue
    fi

    # Delete the record
    aws dynamodb delete-item \
      --table-name "$DYNAMODB_TABLE" \
      --key "{\"pk\": {\"S\": \"$pk\"}, \"sk\": {\"S\": \"$sk\"}}"

    echo "Deleted record with pk: $pk and sk: $sk"
    ((DELETED_COUNT++))
  done
done

# Output the total number of deleted items
echo "Total number of deleted items: $DELETED_COUNT"