npm start > log.txt

echo -n "PAJE starts: "
grep paje:start log.txt | wc -l

echo -n "PAJE ends: "
grep paje:end log.txt | wc -l

echo -n "RSA starts: "
grep start:start log.txt | wc -l

echo -n "AL starts: "
grep al:start log.txt | wc -l

echo -n "AL ends: "
grep al:end log.txt | wc -l
