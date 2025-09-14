
import pandas as pd
import sys

if len(sys.argv) < 2:
    print("No Excel file path provided!", flush=True)
    sys.exit(1)

file_path = sys.argv[1]

try:
    df = pd.read_excel(file_path, skiprows=1)

    print("Preview of Data:", flush=True)
    print(df.head(5), flush=True)
    print("\nColumns:", df.columns.tolist(), flush=True)

    if "Commodity" in df.columns:
        grouped = df.groupby("Commodity").sum(numeric_only=True)
        print("\nGrouped by Commodity:", flush=True)
        print(grouped.head(5), flush=True)

    print("\nSummary statistics:", flush=True)
    print(df.describe(include="all"), flush=True)
except Exception as e:
    print(f"Error: {e}", flush=True)
    sys.exit(1)

