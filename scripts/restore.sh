#!/usr/bin/env bash
sql=`cat ./restore.sql`

mysql -uroot -p -e "$sql"