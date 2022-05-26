#!/bin/bash

stage=${1:-dev}
oneTable="onemac-$1-one"
echo "Table name is: $oneTable\n"

# plan is to:
# -  verify one table exists
# -  download things we need to keep (maybe only in production)
# -  create seed json
# -  attach test seed data for branches using test data
# -  destroy one table
# resetIds=(
#     "MD-22-0018"
#     "MD-22-0019"
#     "MD-22-0020"
#     "MD-22-0021"
#     "MD-22-0022"
#     "MD-22-0023"
#     "MD.12896"
#     "MD.12958"
#     "MD.38430"
#     "MD.33463.R00.00"
#     "MD.39253.R00.00"
#     "MD.33463.R00.TE00"
#     "MD.33463.R00.TE01"
# )

# resetData() {
#     echo "{\":pk1\": {\"S\": \"$1\"}}" > expression-attributes1.json
#     more expression-attributes1.json
#     aws dynamodb query --table-name $oneTable --projection-expression "pk,sk" --key-condition-expression "pk = :pk1" --expression-attribute-values file://expression-attributes1.json --return-consumed-capacity TOTAL | jq "[.Items[]]" > allItems.json
#     more allItems.json
# }

# for i in "${resetIds[@]}"; do
#     resetData $i
# done

# for i in "${toDeleteList[@]}"
#     do
#         printf 'An Item: %s\n' "${i}"
#        # aws dynamodb delete-item --table-name $oneTable --key $i --return-values ALL_OLD --return-consumed-capacity TOTAL --return-item-collection-metrics SIZE
#     done

echo "Here in resetOne!"