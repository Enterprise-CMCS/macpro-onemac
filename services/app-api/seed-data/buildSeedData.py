#!/usr/bin/env python3

import argparse
import json
import os

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Combine all the different seed-data files into one."
    )
    parser.add_argument("baseDir", help="the base directory to start (seed-data is default)")
    args = parser.parse_args()

    if os.path.exists('all-data.json'):
        os.remove('all-data.json')

    all_data = []

    for (root, dir, file) in os.walk(args.baseDir):
        for f in file:
            print("file: " + f)
            if '.json' in f:
                f1 = open(os.path.join(root, f))
                all_data.extend(json.load(f1))
                f1.close()
    for oneItem in all_data:
        print(oneItem['pk'] + "  " + oneItem['sk'])

    with open("all-data.json", "w") as df:
        json.dump(all_data, df, indent=4)