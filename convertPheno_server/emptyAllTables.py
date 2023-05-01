"""
empties all tables in the database
but does not drop the schema

based on:
https://stackoverflow.com/questions/4763472/sqlalchemy-clear-database-content-but-dont-drop-the-schema
"""

from sys import argv

import contextlib
from sqlalchemy import create_engine, MetaData

user_pw = argv[1]
db = argv[2]
ip = argv[3]

engine = create_engine(f"postgresql://{user_pw}@{ip}:5432/{db}")

# Load all available table definitions from the database
meta = MetaData()
meta.reflect(bind=engine)

with contextlib.closing(engine.connect()) as con:
    transaction = con.begin()
    # reverse ensures that children are deleted before parents
    for table in reversed(meta.sorted_tables):
        print(f"deleting table {table.name}")
        con.execute(table.delete())
    transaction.commit()
