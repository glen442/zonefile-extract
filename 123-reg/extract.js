// CONFIG BEGIN
var defaultTTL = 14400;
// CONFIG END

var table = document.getElementsByClassName('advanced_dns')[0];
var rows = table.getElementsByTagName('tr');
var i, len, row;
var hostname, type, priority, ttl, destination;
var output = '';

output += '$TTL ' + defaultTTL + '\n'; // start with default TTL

// skip header and last two rows (add new entry, delete all entries)
for (i = 1, len = rows.length - 2; i < len; i++) {
  row = rows[i];
  hostname = row.getElementsByClassName('dns_hostname')[0].innerText;
  type = row.getElementsByClassName('dns_type')[0].innerText;
  priority = row.getElementsByClassName('dns_priority')[0].innerText;
  ttl = row.getElementsByClassName('dns_ttl')[0].innerText || defaultTTL;
  destination = row.getElementsByClassName('dns_data')[0].title;

  if (type === 'TXT/SPF') {
    type = 'TXT';
    
    //Check that there aren't already quotes there
    //probably only need to to check one end
    if (destination.charAt(0) != '"') && (destination.charAt(destination.length-1) != '"' ) {
      destination = '"' + destination + '"';
    }// else no change
  }

  output += [hostname, ttl, 'IN', type, priority, destination].join(' ') + '\n';
}

console.log(output);
