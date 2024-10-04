This /scripts Folder simply contains scripts that are not used in the application or deployed via lambda but are useful for admin type functions.

#####

generate_packages - creates new records in Under Review status by inserting both a OneMAC record and a SEATool record
rebuildPackagesbyPK - force a rebuild of the package record for all packages listed in pk_values.json
setPOCs - set the action_officers (srt) and lead_analyst (cpoc) for all packages listed in pk_values.json
