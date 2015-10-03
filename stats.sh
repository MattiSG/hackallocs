npm start > log.txt

echo -n "PAJE starts: "
grep paje:start log.txt | wc -l

echo -n "PAJE ends: "
grep paje:end log.txt | wc -l

echo -n "RSA starts: "
grep start:start log.txt | wc -l
