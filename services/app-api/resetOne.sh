stage=${1:-dev}

# plan is to:
# -  verify one table exists
# -  download things we need to keep (maybe only in production)
# -  create seed json
# -  attach test seed data for branches using test data
# -  destroy one table

echo "Here in resetOne!"